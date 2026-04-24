import type { SupabaseClient } from "@supabase/supabase-js";

export type AppointmentBoardRow = {
  id: string;
  client_id: string;
  scheduled_at?: string | null;
  appointment_date?: string | null;
  contact_name?: string | null;
  customer_name?: string | null;
  notes?: string | null;
  status?: string | null;
  deal_value?: number | null;
  performance_fee?: number | null;
  confirmed_at?: string | null;
};

const PERFORMANCE_RATE = 0.005;

export function computePerformanceFee(dealValue: number): number {
  return Math.round(dealValue * PERFORMANCE_RATE * 100) / 100;
}

/** UTC calendar month boundaries (inclusive start, exclusive end). */
export function utcMonthRange(now: Date = new Date()): {
  start: Date;
  end: Date;
} {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0),
  );
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0),
  );
  return { start, end };
}

export function isConfirmedAtInUtcMonth(
  confirmedAt: string | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!confirmedAt) return false;
  const t = new Date(confirmedAt).getTime();
  if (!Number.isFinite(t)) return false;
  const { start, end } = utcMonthRange(now);
  return t >= start.getTime() && t < end.getTime();
}

export async function getMonthlyPerformanceFeesSum(
  supabase: SupabaseClient,
  clientId: string,
  now: Date = new Date(),
): Promise<number> {
  const { start, end } = utcMonthRange(now);
  const { data, error } = await supabase
    .from("appointments")
    .select("performance_fee")
    .eq("client_id", clientId)
    .eq("status", "sold")
    .gte("confirmed_at", start.toISOString())
    .lt("confirmed_at", end.toISOString());

  if (error || !data) return 0;
  return (data as { performance_fee: number | null }[]).reduce(
    (sum, row) => sum + Number(row.performance_fee ?? 0),
    0,
  );
}
