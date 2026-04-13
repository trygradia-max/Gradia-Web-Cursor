import { getSupabaseServer } from "@/lib/supabase/server";

/** True when live reads should come from Supabase (no mock fallback for missing tenants). */
export function isSupabasePortalEnabled(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}
import type {
  ActivityChannel,
  ActivityItem,
  ActivityOutcome,
  DigitalEmployee,
  PortalPerformance,
} from "./types";

type AccountRow = { id: string; account_name: string };
type SummaryRow = {
  client_id: string;
  period_label: string;
  calls_handled: number;
  bookings_created: number;
  resolution_rate: number;
  avg_handle_time_sec: number;
};
type EmployeeRow = {
  id: string;
  client_id: string;
  name: string;
  role: string;
  status: "active" | "paused";
};
type ActivityRow = {
  id: string;
  client_id: string;
  at: string;
  channel: ActivityChannel;
  summary: string;
  outcome: ActivityOutcome;
};

function mapActivity(row: ActivityRow): ActivityItem {
  return {
    id: row.id,
    at: row.at,
    channel: row.channel,
    summary: row.summary,
    outcome: row.outcome,
  };
}

function mapEmployee(row: EmployeeRow): DigitalEmployee {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    status: row.status,
  };
}

/**
 * Loads portal dashboard data from Supabase for the given tenant id (`clientId`
 * from the session). Returns null if Supabase is not configured, the tenant
 * is missing, or a query fails.
 */
export async function getPerformanceFromSupabase(
  clientId: string,
): Promise<PortalPerformance | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const { data: account, error: accountError } = await supabase
    .from("portal_accounts")
    .select("id, account_name")
    .eq("id", clientId)
    .maybeSingle<AccountRow>();

  if (accountError || !account) return null;

  const { data: summaryRow, error: summaryError } = await supabase
    .from("portal_summary")
    .select(
      "client_id, period_label, calls_handled, bookings_created, resolution_rate, avg_handle_time_sec",
    )
    .eq("client_id", clientId)
    .maybeSingle<SummaryRow>();

  if (summaryError || !summaryRow) return null;

  const { data: employeeRows, error: employeesError } = await supabase
    .from("portal_employees")
    .select("id, client_id, name, role, status")
    .eq("client_id", clientId)
    .order("name", { ascending: true });

  if (employeesError) return null;

  const { data: activityRows, error: activityError } = await supabase
    .from("portal_activity")
    .select("id, client_id, at, channel, summary, outcome")
    .eq("client_id", clientId)
    .order("at", { ascending: false })
    .limit(100);

  if (activityError) return null;

  return {
    accountName: account.account_name,
    summary: {
      periodLabel: summaryRow.period_label,
      callsHandled: summaryRow.calls_handled,
      bookingsCreated: summaryRow.bookings_created,
      resolutionRate: summaryRow.resolution_rate,
      avgHandleTimeSec: summaryRow.avg_handle_time_sec,
    },
    employees: (employeeRows ?? []).map((r) =>
      mapEmployee(r as EmployeeRow),
    ),
    recentActivity: (activityRows ?? []).map((r) =>
      mapActivity(r as ActivityRow),
    ),
  };
}
