import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getMonthlyPerformanceFeesSum,
  type AppointmentBoardRow,
} from "@/lib/portal/appointments";

export type CallRow = {
  id: string;
  client_id: string;
  created_at?: string | null;
  call_date?: string | null;
  caller?: string | null;
  caller_name?: string | null;
  caller_phone?: string | null;
  duration_seconds?: number | null;
  duration?: number | null;
  outcome?: string | null;
  summary?: string | null;
};

export type AppointmentRow = AppointmentBoardRow;

export type DashboardData = {
  totalCalls: number;
  appointmentsBooked: number;
  avgCallDurationSeconds: number;
  recentCalls: Array<{
    id: string;
    date: string;
    caller: string;
    durationSeconds: number;
    outcome: string;
    summary: string;
  }>;
  upcomingAppointments: Array<{
    id: string;
    date: string;
    customer: string;
    notes: string;
    status: string;
  }>;
  appointmentsBoard: Array<{
    id: string;
    date: string;
    customer: string;
    notes: string;
    status: string | null;
    dealValue: number | null;
    performanceFee: number | null;
    confirmedAt: string | null;
  }>;
  monthlyPerformanceFeesTotal: number;
};

function pickCallDate(row: CallRow): string {
  return row.created_at ?? row.call_date ?? new Date(0).toISOString();
}

function pickCaller(row: CallRow): string {
  return row.caller_name ?? row.caller ?? row.caller_phone ?? "Unknown caller";
}

function pickDuration(row: CallRow): number {
  return row.duration_seconds ?? row.duration ?? 0;
}

function pickOutcome(row: CallRow): string {
  return row.outcome ?? "unknown";
}

function pickSummary(row: CallRow): string {
  return row.summary ?? "No summary";
}

function pickAppointmentDate(row: AppointmentRow): string {
  return row.scheduled_at ?? row.appointment_date ?? new Date(0).toISOString();
}

function pickAppointmentCustomer(row: AppointmentRow): string {
  return row.contact_name ?? row.customer_name ?? "Unknown";
}

function pickAppointmentNotes(row: AppointmentRow): string {
  return row.notes ?? "No notes";
}

function pickAppointmentStatus(row: AppointmentRow): string {
  return row.status ?? "pending";
}

export async function getDashboardData(
  supabase: SupabaseClient,
  clientId: string,
): Promise<DashboardData> {
  const [
    { count: callCount, error: callCountError },
    { data: recentCallsRows, error: callsError },
    { data: appointmentsRows, error: appointmentsError },
    monthlyPerformanceFeesTotal,
  ] = await Promise.all([
    supabase
      .from("call_logs")
      .select("id", { count: "exact", head: true })
      .eq("client_id", clientId),
    supabase
      .from("call_logs")
      .select(
        "id, client_id, created_at, call_date, caller, caller_name, caller_phone, duration_seconds, duration, outcome, summary",
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("appointments")
      .select(
        "id, client_id, scheduled_at, appointment_date, contact_name, customer_name, notes, status, deal_value, performance_fee, confirmed_at",
      )
      .eq("client_id", clientId)
      .order("scheduled_at", { ascending: false })
      .limit(25),
    getMonthlyPerformanceFeesSum(supabase, clientId),
  ]);

  // RLS or schema mismatches should not blank the whole dashboard for signed-in users.
  if (callCountError || callsError || appointmentsError) {
    return {
      totalCalls: 0,
      appointmentsBooked: 0,
      avgCallDurationSeconds: 0,
      recentCalls: [],
      upcomingAppointments: [],
      appointmentsBoard: [],
      monthlyPerformanceFeesTotal: 0,
    };
  }

  const callRows = (recentCallsRows ?? []) as CallRow[];
  const avgCallDurationSeconds =
    callRows.length > 0
      ? Math.round(
          callRows.reduce((sum, row) => sum + pickDuration(row), 0) /
            callRows.length,
        )
      : 0;

  const now = Date.now();
  const appointmentRows = (appointmentsRows ?? []) as AppointmentRow[];
  const upcoming = appointmentRows.filter((row) => {
    const ts = new Date(pickAppointmentDate(row)).getTime();
    return Number.isFinite(ts) && ts >= now;
  });

  const boardRows = appointmentRows.filter((row) => {
    const s = pickAppointmentStatus(row).toLowerCase();
    return s !== "cancelled" && s !== "canceled";
  });

  const appointmentsBooked = appointmentRows.filter((row) => {
    const status = pickAppointmentStatus(row).toLowerCase();
    return status.includes("book") || status.includes("confirm");
  }).length;

  return {
    totalCalls: callCount ?? 0,
    appointmentsBooked,
    avgCallDurationSeconds,
    recentCalls: callRows.map((row) => ({
      id: row.id,
      date: pickCallDate(row),
      caller: pickCaller(row),
      durationSeconds: pickDuration(row),
      outcome: pickOutcome(row),
      summary: pickSummary(row),
    })),
    upcomingAppointments: upcoming.map((row) => ({
      id: row.id,
      date: pickAppointmentDate(row),
      customer: pickAppointmentCustomer(row),
      notes: pickAppointmentNotes(row),
      status: pickAppointmentStatus(row),
    })),
    appointmentsBoard: boardRows.map((row) => ({
      id: row.id,
      date: pickAppointmentDate(row),
      customer: pickAppointmentCustomer(row),
      notes: pickAppointmentNotes(row),
      status: row.status ?? null,
      dealValue:
        row.deal_value != null ? Number(row.deal_value) : null,
      performanceFee:
        row.performance_fee != null ? Number(row.performance_fee) : null,
      confirmedAt: row.confirmed_at ?? null,
    })),
    monthlyPerformanceFeesTotal,
  };
}
