import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { alertFailedSignup } from "@/lib/notify";

async function clientIpKey(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip") ?? "unknown";
}

const ALL_FIELDS = [
  "email",
  "phone",
  "role",
  "shopName",
  "currentTools",
  // honeypot
  "company_alt",
] as const;

type Payload = Partial<Record<(typeof ALL_FIELDS)[number], string>>;

const MAX_LEN = 5000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ipKey = await clientIpKey();
  const limited = checkRateLimit(`waitlist:${ipKey}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(limited.retryAfterSec ?? 60),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  let body: Payload;
  try {
    const raw = (await request.json()) as unknown;
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    body = raw as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const cleaned = {
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    role: sanitize(body.role),
    shopName: sanitize(body.shopName),
    currentTools: sanitize(body.currentTools),
    company_alt: sanitize(body.company_alt),
  };

  // Honeypot — bots auto-fill every field. Real users never see this.
  // Pretend success so spammers don't learn we caught them.
  if (cleaned.company_alt) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!cleaned.email || !EMAIL_RE.test(cleaned.email)) {
    return NextResponse.json(
      { error: "A valid email is required", field: "email" },
      { status: 400 },
    );
  }

  const row = {
    email: cleaned.email.toLowerCase(),
    phone: cleaned.phone || null,
    role: cleaned.role || null,
    shop_name: cleaned.shopName || null,
    current_tools: cleaned.currentTools || null,
    ip: ipKey,
  };

  // Persist to Supabase (see supabase/migrations/005_waitlist.sql). Upsert on
  // lower(email) so a repeat signup is an idempotent no-op rather than an error.
  try {
    const supabase = createAdminSupabaseClient();
    const { error } = await supabase
      .from("waitlist")
      .upsert(row, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw error;
  } catch (err) {
    // Don't lose the signup if the DB is unconfigured (e.g. local dev without
    // SUPABASE_SERVICE_ROLE_KEY) or unavailable (e.g. a Supabase outage during
    // launch traffic). Two independent safety nets, neither of which depends on
    // the failing database:
    const reason = err instanceof Error ? err.message : String(err);
    const record = { receivedAt: new Date().toISOString(), ...row };

    // 1) Out-of-band alert — delivers the full payload off-platform (Slack /
    //    Discord / generic webhook) so the founder is notified and can recover
    //    the email by hand even if the DB is completely down. No-op until
    //    WAITLIST_ALERT_WEBHOOK_URL is set.
    await alertFailedSignup(record, reason);

    // 2) Structured, grep-able log as a second net (surfaces in Vercel logs).
    console.error("[waitlist-signup] persist failed, alerted + logging:", reason);
    console.log("[waitlist-signup]", JSON.stringify(record));
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
