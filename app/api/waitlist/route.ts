import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { SMS_CONSENT_VERSION } from "@/lib/sms-consent";
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

const STRING_FIELDS = [
  "name",
  "email",
  "phone",
  "shopName",
  "serviceType",
  "teamSize",
  "currentTools",
  "handleRequest",
  "company_alt",
] as const;

type Payload = Partial<Record<(typeof STRING_FIELDS)[number], string>> & {
  smsConsent?: unknown;
};

const MAX_LEN = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEAM_SIZES = new Set(["solo", "team"]);
const SERVICE_TYPES = new Set([
  "detailing",
  "ceramic-coating",
  "ppf-tint",
  "mobile",
  "other",
]);

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

function errorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === "object") {
    const rec = err as { message?: unknown };
    if (typeof rec.message === "string" && rec.message) return rec.message;
    try {
      return JSON.stringify(err);
    } catch {
      return "Unknown persist error";
    }
  }
  return String(err);
}

function jsonError(
  message: string,
  status: number,
  extra?: { field?: string; retryAfterSec?: number },
) {
  const headersInit: HeadersInit = { "Cache-Control": "no-store" };
  if (extra?.retryAfterSec) {
    headersInit["Retry-After"] = String(extra.retryAfterSec);
  }
  return NextResponse.json(
    {
      error: message,
      ...(extra?.field ? { field: extra.field } : {}),
      ...(extra?.retryAfterSec ? { retryAfterSec: extra.retryAfterSec } : {}),
    },
    { status, headers: headersInit },
  );
}

export async function POST(request: Request) {
  const ipKey = await clientIpKey();
  const limited = checkRateLimit(`waitlist:${ipKey}`);
  if (!limited.ok) {
    const retryAfterSec = limited.retryAfterSec ?? 60;
    return jsonError(
      `Too many requests. Please try again in ${retryAfterSec} seconds.`,
      429,
      { retryAfterSec },
    );
  }

  let body: Payload;
  try {
    const raw = (await request.json()) as unknown;
    if (!raw || typeof raw !== "object") {
      return jsonError("Invalid body", 400);
    }
    body = raw as Payload;
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const cleaned = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    shopName: sanitize(body.shopName),
    serviceType: sanitize(body.serviceType),
    teamSize: sanitize(body.teamSize),
    currentTools: sanitize(body.currentTools),
    handleRequest: sanitize(body.handleRequest),
    company_alt: sanitize(body.company_alt),
  };

  if (cleaned.company_alt) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!cleaned.name) {
    return jsonError("A name is required", 400, { field: "name" });
  }
  if (!cleaned.email || !EMAIL_RE.test(cleaned.email)) {
    return jsonError("A valid business email is required", 400, { field: "email" });
  }
  if (!cleaned.shopName) {
    return jsonError("A business name is required", 400, { field: "shopName" });
  }
  if (!SERVICE_TYPES.has(cleaned.serviceType)) {
    return jsonError("Choose a service type", 400, { field: "serviceType" });
  }
  if (!TEAM_SIZES.has(cleaned.teamSize)) {
    return jsonError("Choose solo or team", 400, { field: "teamSize" });
  }
  if (!cleaned.handleRequest) {
    return jsonError("Tell us what you would like Gradia to handle", 400, {
      field: "handleRequest",
    });
  }

  const smsConsent = body.smsConsent === true && cleaned.phone !== "";

  const extra = {
    full_name: cleaned.name,
    service_type: cleaned.serviceType,
    team_size: cleaned.teamSize,
    handle_request: cleaned.handleRequest,
    request_type: "pilot",
  };

  const baseRow = {
    email: cleaned.email.toLowerCase(),
    phone: cleaned.phone || null,
    role: cleaned.teamSize,
    shop_name: cleaned.shopName,
    current_tools: cleaned.currentTools || null,
    ip: ipKey,
  };

  const consentRow = {
    sms_consent: smsConsent,
    sms_consent_at: smsConsent ? new Date().toISOString() : null,
    sms_consent_version: smsConsent ? SMS_CONSENT_VERSION : null,
  };

  const fullRow = { ...baseRow, ...consentRow, ...extra };
  const recoverable = {
    receivedAt: new Date().toISOString(),
    ...fullRow,
  };

  try {
    const supabase = createAdminSupabaseClient();
    const first = await supabase
      .from("waitlist")
      .upsert(fullRow, { onConflict: "email", ignoreDuplicates: true });

    if (first.error) {
      const withoutPilot = { ...baseRow, ...consentRow };
      const second = await supabase
        .from("waitlist")
        .upsert(withoutPilot, { onConflict: "email", ignoreDuplicates: true });

      if (second.error) {
        const third = await supabase
          .from("waitlist")
          .upsert(baseRow, { onConflict: "email", ignoreDuplicates: true });
        if (third.error) throw third.error;
        console.error(
          "[pilot-request] persisted without SMS consent / extra columns — apply migrations 007 and 008:",
          first.error.message,
        );
      } else {
        console.error(
          "[pilot-request] persisted without extra columns — apply supabase/migrations/008_pilot_request_fields.sql:",
          first.error.message,
        );
      }
      console.log("[pilot-request-extra-fields]", JSON.stringify(extra));
    }
  } catch (err) {
    const reason = errorMessage(err);
    await alertFailedSignup(recoverable, reason);
    console.error("[pilot-request] persist failed, alerted + logging:", reason);
    console.log("[pilot-request]", JSON.stringify(recoverable));
    return jsonError("We couldn't save your request. Please try again.", 503);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
