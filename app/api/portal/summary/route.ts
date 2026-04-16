import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getDashboardData } from "@/lib/portal/dashboard";
import { getPortalSession } from "@/lib/portal/session";
import { checkRateLimit } from "@/lib/rate-limit";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function clientIpKey(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip") ?? "unknown";
}

export async function GET() {
  const ipKey = await clientIpKey();
  const limited = checkRateLimit(`portal_summary:${ipKey}`);
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

  const supabase = await createServerSupabaseClient();
  const session = await getPortalSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getDashboardData(supabase, session.clientId);

  return NextResponse.json(
    {
      companyName: session.companyName,
      stats: {
        totalCalls: data.totalCalls,
        appointmentsBooked: data.appointmentsBooked,
        avgCallDurationSeconds: data.avgCallDurationSeconds,
      },
      recentCalls: data.recentCalls,
      upcomingAppointments: data.upcomingAppointments,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
