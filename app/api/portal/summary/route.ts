import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/portal/dashboard";
import { getPortalSession } from "@/lib/portal/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
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
