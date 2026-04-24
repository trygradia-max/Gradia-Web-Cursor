import { NextResponse } from "next/server";
import {
  computePerformanceFee,
  getMonthlyPerformanceFeesSum,
} from "@/lib/portal/appointments";
import { getPortalSession } from "@/lib/portal/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const { id: appointmentId } = await params;
  if (!appointmentId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const dealValue = Number((body as { dealValue?: unknown }).dealValue);
  if (!Number.isFinite(dealValue) || dealValue <= 0) {
    return NextResponse.json({ error: "Invalid deal value" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const session = await getPortalSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const performanceFee = computePerformanceFee(dealValue);
  const confirmedAt = new Date().toISOString();

  const { data: updated, error } = await supabase
    .from("appointments")
    .update({
      status: "sold",
      deal_value: dealValue,
      performance_fee: performanceFee,
      confirmed_at: confirmedAt,
    })
    .eq("id", appointmentId)
    .eq("client_id", session.clientId)
    .select(
      "id, status, deal_value, performance_fee, confirmed_at, scheduled_at, appointment_date, contact_name, customer_name, notes",
    )
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Update failed" },
      { status: 500 },
    );
  }
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const monthlyPerformanceFeesTotal = await getMonthlyPerformanceFeesSum(
    supabase,
    session.clientId,
  );

  return NextResponse.json(
    {
      appointment: updated,
      monthlyPerformanceFeesTotal,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
