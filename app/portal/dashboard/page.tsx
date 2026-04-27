import { redirect } from "next/navigation";
import { AppointmentsBoard } from "@/components/portal/AppointmentsBoard";
import { PerformanceChart } from "@/components/portal/PerformanceChart";
import { getDashboardData } from "@/lib/portal/dashboard";
import { getPortalSession } from "@/lib/portal/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard",
};

type SampleCall = {
  id: string;
  time: string;
  caller: string;
  outcome:
    | "Booked"
    | "Intake"
    | "Triage"
    | "Follow-up"
    | "Missed";
  duration: string;
};

const SAMPLE_RECENT_CALLS: SampleCall[] = [
  { id: "s-1", time: "9:14 AM", caller: "Sarah M.", outcome: "Booked", duration: "4:12" },
  { id: "s-2", time: "9:11 AM", caller: "James T.", outcome: "Intake", duration: "2:40" },
  {
    id: "s-3",
    time: "9:08 AM",
    caller: "(555) 201-8841",
    outcome: "Triage",
    duration: "3:05",
  },
  { id: "s-4", time: "9:02 AM", caller: "Elena R.", outcome: "Booked", duration: "5:18" },
  {
    id: "s-5",
    time: "8:55 AM",
    caller: "Mike P.",
    outcome: "Follow-up",
    duration: "1:52",
  },
];

const OUTCOME_COLORS: Record<SampleCall["outcome"], string> = {
  Booked: "var(--dash-success)",
  Intake: "var(--dash-accent)",
  Triage: "var(--dash-warning)",
  "Follow-up": "var(--dash-warning)",
  Missed: "var(--dash-danger)",
};

function classifyOutcome(raw: string): SampleCall["outcome"] {
  const s = (raw ?? "").toLowerCase();
  if (s.includes("miss")) return "Missed";
  if (s.includes("follow")) return "Follow-up";
  if (s.includes("triage")) return "Triage";
  if (s.includes("intake")) return "Intake";
  if (s.includes("book") || s.includes("confirm")) return "Booked";
  return "Intake";
}

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function formatMmSs(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTodayLabel(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

const tdBase =
  "px-6 py-[14px] border-b border-[#161616] font-sans text-sm align-middle";

export default async function PortalDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const session = await getPortalSession(supabase);
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getDashboardData(supabase, session.clientId);

  const callsHandled = data.totalCalls > 0 ? data.totalCalls : 1272;
  const appointmentsCount =
    data.appointmentsBooked > 0 ? data.appointmentsBooked : 23;

  const recentCalls: SampleCall[] =
    data.recentCalls.length > 0
      ? data.recentCalls.slice(0, 8).map((row) => ({
          id: row.id,
          time: formatTime(row.date),
          caller: row.caller,
          outcome: classifyOutcome(row.outcome),
          duration: formatMmSs(row.durationSeconds),
        }))
      : SAMPLE_RECENT_CALLS;

  return (
    <div className="bg-[var(--dash-bg)] py-8">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-sans text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              Today
            </h1>
            <p className="mt-1 font-sans text-[13px] text-[var(--dash-secondary)]">
              {formatTodayLabel()} · {session.companyName}
            </p>
          </div>

          <span
            className="inline-flex items-center gap-2 border border-[var(--dash-success)] px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-success)]"
            aria-label="Live"
          >
            <span
              className="dash-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--dash-success)]"
              aria-hidden="true"
            />
            Live
          </span>
        </div>

        {/* KPI cards */}
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <li className="border border-[var(--dash-border)] bg-[var(--dash-surface)] px-8 py-7">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
              Calls Handled
            </p>
            <p className="mt-2 font-sans text-[44px] font-bold leading-none tabular-nums text-white sm:text-[48px]">
              {callsHandled.toLocaleString("en-US")}
            </p>
            <p className="mt-1 font-sans text-[13px] text-[var(--dash-success)]">
              +12 vs yesterday
            </p>
          </li>

          <li className="border border-[var(--dash-border)] bg-[var(--dash-surface)] px-8 py-7">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
              Appointments
            </p>
            <p className="mt-2 font-sans text-[44px] font-bold leading-none tabular-nums text-white sm:text-[48px]">
              {appointmentsCount}
            </p>
            <p className="mt-1 font-sans text-[13px] text-[var(--dash-secondary)]">
              Booked today
            </p>
          </li>

          <li className="border border-[var(--dash-border)] bg-[var(--dash-surface)] px-8 py-7">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
              Avg. Answer
            </p>
            <p className="mt-2 font-sans text-[44px] font-bold leading-none tabular-nums text-white sm:text-[48px]">
              1.8s
            </p>
            <p className="mt-1 font-sans text-[13px] text-[var(--dash-secondary)]">
              Rolling 24h
            </p>
          </li>
        </ul>

        {/* Performance chart + stats panel */}
        <section
          className="mt-6 grid grid-cols-1 border border-[var(--dash-border)] bg-[var(--dash-surface)] lg:grid-cols-[2fr_1fr]"
          aria-labelledby="dash-trend-label"
        >
          <div className="px-6 py-7 sm:px-8">
            <header className="flex items-center justify-between">
              <p
                id="dash-trend-label"
                className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]"
              >
                Volume Trend
              </p>
              <p className="font-sans text-[12px] text-[var(--dash-secondary)]">
                Last 30 days
              </p>
            </header>
            <div className="mt-6">
              <PerformanceChart />
            </div>
          </div>

          <aside className="border-t border-[var(--dash-border)] bg-[var(--dash-surface-2)] px-6 py-7 lg:border-l lg:border-t-0">
            <p className="font-sans text-[12px] text-[var(--dash-secondary)]">
              Leads captured
            </p>
            <p className="mt-1 font-sans text-[28px] font-bold leading-none tabular-nums text-white sm:text-[32px]">
              1,284
            </p>

            <p className="mt-6 font-sans text-[12px] text-[var(--dash-secondary)]">
              Revenue influenced
            </p>
            <p className="mt-1 font-sans text-[28px] font-bold leading-none tabular-nums text-[var(--dash-accent)] sm:text-[32px]">
              $482K
            </p>

            <p className="mt-6 font-sans text-[12px] text-[var(--dash-secondary)]">
              Booking rate
            </p>
            <p className="mt-1 font-sans text-[28px] font-bold leading-none tabular-nums text-white sm:text-[32px]">
              34%
            </p>
          </aside>
        </section>

        {/* Recent calls table */}
        <section
          className="mt-6 overflow-hidden border border-[var(--dash-border)] bg-[var(--dash-surface)]"
          aria-labelledby="recent-calls-heading"
        >
          <header className="flex items-center justify-between border-b border-[var(--dash-border)] px-6 py-5">
            <p
              id="recent-calls-heading"
              className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]"
            >
              Recent Calls
            </p>
            <p className="font-sans text-[12px] text-[var(--dash-secondary)]">
              {recentCalls.length} most recent
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead className="bg-[var(--dash-surface-2)]">
                <tr className="border-b border-[var(--dash-border)]">
                  <th
                    scope="col"
                    className="px-6 py-[10px] text-left font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dash-secondary)]"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[10px] text-left font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dash-secondary)]"
                  >
                    Caller
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[10px] text-left font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dash-secondary)]"
                  >
                    Outcome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[10px] text-right font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dash-secondary)]"
                  >
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr
                    key={call.id}
                    className="transition-colors hover:bg-[var(--dash-row-hover)]"
                  >
                    <td className={`${tdBase} text-[var(--dash-secondary)] whitespace-nowrap tabular-nums`}>
                      {call.time}
                    </td>
                    <td className={`${tdBase} font-medium text-white`}>
                      {call.caller}
                    </td>
                    <td className={tdBase}>
                      <span
                        style={{ color: OUTCOME_COLORS[call.outcome] }}
                      >
                        {call.outcome}
                      </span>
                    </td>
                    <td
                      className={`${tdBase} text-right text-[var(--dash-secondary)] whitespace-nowrap tabular-nums`}
                    >
                      {call.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Appointments */}
        <section className="mt-6" aria-label="Appointments">
          <AppointmentsBoard
            initialAppointments={data.appointmentsBoard}
            initialMonthlyFeesTotal={data.monthlyPerformanceFeesTotal}
          />
        </section>
      </div>
    </div>
  );
}
