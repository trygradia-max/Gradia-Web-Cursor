import { auth } from "@/auth";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { DashboardPeriodTabs } from "@/components/portal/DashboardPeriodTabs";
import { getPerformanceForClient } from "@/lib/portal/data";
import { parsePeriodDays } from "@/lib/portal/period";
import type { ActivityOutcome } from "@/lib/portal/types";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

const outcomeStyles: Record<ActivityOutcome, string> = {
  resolved: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  booked: "bg-[var(--brand-amber)]/15 text-amber-100 ring-[var(--brand-amber)]/35",
  escalated: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
  abandoned: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30",
};

const outcomeLabel: Record<ActivityOutcome, string> = {
  resolved: "Resolved",
  booked: "Booked",
  escalated: "Escalated",
  abandoned: "Abandoned",
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

const portalCard =
  "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-card";

export default async function PortalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const session = await auth();
  const clientId = session?.user?.clientId;
  if (!clientId) {
    redirect("/portal/login");
  }

  const { period } = await searchParams;
  const periodDays = parsePeriodDays(period);

  const data = await getPerformanceForClient(clientId, { periodDays });

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-content px-4 py-16 sm:px-6">
        <div
          className={`${portalCard} border-[#e2e8f0] bg-[var(--brand-light)] p-10 text-center shadow-card`}
        >
          <h1 className="font-serif text-xl font-normal text-[var(--brand-dark)]">
            No performance data yet
          </h1>
          <p className="mt-2 text-sm text-[var(--brand-slate)]">
            Your account is connected, but we don&apos;t have metrics to show.
            Contact{" "}
            <a
              href="mailto:hello@gradia.com"
              className="font-semibold text-[var(--brand-dark)] underline decoration-[var(--brand-amber)] underline-offset-2"
            >
              hello@gradia.com
            </a>{" "}
            if this persists.
          </p>
        </div>
      </div>
    );
  }

  const { summary, employees, recentActivity, accountName } = data;

  return (
    <div className="mx-auto w-full max-w-content px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel className="text-[var(--brand-amber)]">
            Performance
          </SectionLabel>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
            {accountName}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {summary.periodLabel} · Digital employee activity overview
          </p>
        </div>
        <DashboardPeriodTabs periodDays={periodDays} />
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Calls handled
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {summary.callsHandled.toLocaleString()}
          </p>
        </li>
        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Bookings created
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {summary.bookingsCreated.toLocaleString()}
          </p>
        </li>
        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Resolution rate
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {Math.round(summary.resolutionRate * 100)}%
          </p>
        </li>
        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Avg. handle time
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {formatDuration(summary.avgHandleTimeSec)}
          </p>
        </li>
      </ul>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-1">
          <h2 className="font-serif text-lg font-normal text-white">
            Digital employees
          </h2>
          <ul className="mt-4 space-y-3">
            {employees.map((de) => (
              <li key={de.id} className={`${portalCard} p-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{de.name}</p>
                    <p className="text-sm text-[var(--muted)]">{de.role}</p>
                  </div>
                  <span
                    className={
                      de.status === "active"
                        ? "shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30"
                        : "shrink-0 rounded-full bg-zinc-500/15 px-2.5 py-0.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-500/30"
                    }
                  >
                    {de.status === "active" ? "Active" : "Paused"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-2">
          <h2 className="font-serif text-lg font-normal text-white">
            Recent activity
          </h2>
          <div className={`mt-4 overflow-hidden ${portalCard}`}>
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-elevated)] text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Channel</th>
                  <th className="px-4 py-3 font-medium">Summary</th>
                  <th className="px-4 py-3 font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--brand-dark)]">
                {recentActivity.map((row) => (
                  <tr key={row.id} className="text-white">
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--muted)] tabular-nums">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }).format(new Date(row.at))}
                    </td>
                    <td className="px-4 py-3 capitalize text-[var(--muted)]">
                      {row.channel}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-white">
                      {row.summary}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${outcomeStyles[row.outcome]}`}
                      >
                        {outcomeLabel[row.outcome]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
