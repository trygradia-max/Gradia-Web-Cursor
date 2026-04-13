import type { PortalPerformance } from "./types";

const MS_PER_DAY = 86_400_000;

export type PeriodDays = 7 | 30;

export function parsePeriodDays(value: string | string[] | undefined): PeriodDays {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === "7") return 7;
  return 30;
}

/**
 * Mock data is authored as a ~30d snapshot; scaling + activity window approximate
 * a 7d view for the MVP period selector.
 */
export function applyMockPeriod(
  data: PortalPerformance,
  periodDays: PeriodDays,
): PortalPerformance {
  if (periodDays === 30) {
    return {
      ...data,
      summary: { ...data.summary, periodLabel: "Last 30 days" },
    };
  }

  const times = data.recentActivity.map((a) => new Date(a.at).getTime());
  const maxAt = times.length ? Math.max(...times) : Date.now();
  const cutoff = maxAt - periodDays * MS_PER_DAY;
  const recentActivity = data.recentActivity.filter(
    (a) => new Date(a.at).getTime() >= cutoff,
  );
  const scale = periodDays / 30;

  return {
    ...data,
    summary: {
      ...data.summary,
      periodLabel: "Last 7 days",
      callsHandled: Math.max(
        1,
        Math.round(data.summary.callsHandled * scale),
      ),
      bookingsCreated: Math.max(
        1,
        Math.round(data.summary.bookingsCreated * scale),
      ),
      resolutionRate: data.summary.resolutionRate,
      avgHandleTimeSec: data.summary.avgHandleTimeSec,
    },
    recentActivity,
  };
}

export function labelForPeriod(periodDays: PeriodDays): string {
  return periodDays === 7 ? "Last 7 days" : "Last 30 days";
}
