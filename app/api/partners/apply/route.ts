import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

async function clientIpKey(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip") ?? "unknown";
}

const REQUIRED_FIELDS = [
  "fullName",
  "businessName",
  "industry",
  "location",
  "monthlyLeads",
  "reason",
] as const;

const ALL_FIELDS = [
  ...REQUIRED_FIELDS,
  "website",
  "heardFrom",
  // honeypot
  "company_alt",
] as const;

type Payload = Partial<Record<(typeof ALL_FIELDS)[number], string>>;

const MAX_LEN = 5000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

export async function POST(request: Request) {
  const ipKey = await clientIpKey();
  const limited = checkRateLimit(`partners_apply:${ipKey}`);
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

  const cleaned: Record<(typeof ALL_FIELDS)[number], string> = {
    fullName: sanitize(body.fullName),
    businessName: sanitize(body.businessName),
    industry: sanitize(body.industry),
    location: sanitize(body.location),
    website: sanitize(body.website),
    monthlyLeads: sanitize(body.monthlyLeads),
    reason: sanitize(body.reason),
    heardFrom: sanitize(body.heardFrom),
    company_alt: sanitize(body.company_alt),
  };

  // Honeypot — bots routinely auto-fill every field. Real users never see this.
  // Pretend success so spammers don't learn we caught them.
  if (cleaned.company_alt) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !cleaned[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", missing },
      { status: 400 },
    );
  }

  const submission = {
    type: "partner_application",
    receivedAt: new Date().toISOString(),
    ip: ipKey,
    data: {
      fullName: cleaned.fullName,
      businessName: cleaned.businessName,
      industry: cleaned.industry,
      location: cleaned.location,
      website: cleaned.website || null,
      monthlyLeads: cleaned.monthlyLeads,
      reason: cleaned.reason,
      heardFrom: cleaned.heardFrom || null,
    },
  };

  // Structured log — surfaces in Vercel / Cloud Run logs and is grep-able.
  // To wire real email delivery (e.g. Resend, SES, Sendgrid), add the
  // provider call here using the subject "New Gradia Partnership Application"
  // and recipient trygradia@gmail.com. The route's response shape stays the
  // same, so no client changes are needed when email is added.
  console.log("[partner-application]", JSON.stringify(submission));

  return NextResponse.json({ ok: true }, { status: 200 });
}
