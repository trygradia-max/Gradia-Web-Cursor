import { NextResponse } from "next/server";
import {
  getMonthlyPerformanceFeesSum,
  isConfirmedAtInUtcMonth,
} from "@/lib/portal/appointments";
import { getPortalSession } from "@/lib/portal/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Params) {
  const { id: appointmentId } = await params;
  if (!appointmentId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const session = await getPortalSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: row, error: fetchError } = await supabase
    .from("appointments")
    .select("id, status, confirmed_at, client_id")
    .eq("id", appointmentId)
    .eq("client_id", session.clientId)
    .maybeSingle();

  if (fetchError || !row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if ((row.status ?? "").toLowerCase() !== "sold") {
    return NextResponse.json({ error: "Not sold" }, { status: 400 });
  }

  if (!isConfirmedAtInUtcMonth(row.confirmed_at as string | null)) {
    return NextResponse.json(
      { error: "Undo only allowed in the confirmation month" },
      { status: 400 },
    );
  }

  const { data: updated, error } = await supabase
    .from("appointments")
    .update({
      status: null,
      deal_value: null,
      performance_fee: null,
      confirmed_at: null,
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
