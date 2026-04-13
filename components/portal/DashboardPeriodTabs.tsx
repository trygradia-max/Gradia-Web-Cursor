import Link from "next/link";
import type { PeriodDays } from "@/lib/portal/period";
import { cn } from "@/lib/cn";

type Props = {
  periodDays: PeriodDays;
};

const tabClass =
  "rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-amber)]";

export function DashboardPeriodTabs({ periodDays }: Props) {
  return (
    <div
      className="inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1"
      role="group"
      aria-label="Reporting period"
    >
      <Link
        href="/portal/dashboard?period=7"
        className={cn(
          tabClass,
          periodDays === 7
            ? "bg-[var(--brand-dark)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-white",
        )}
        aria-current={periodDays === 7 ? "true" : undefined}
      >
        Last 7 days
      </Link>
      <Link
        href="/portal/dashboard?period=30"
        className={cn(
          tabClass,
          periodDays === 30
            ? "bg-[var(--brand-dark)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-white",
        )}
        aria-current={periodDays === 30 ? "true" : undefined}
      >
        Last 30 days
      </Link>
    </div>
  );
}
