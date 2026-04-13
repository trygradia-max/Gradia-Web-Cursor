export type ActivityOutcome =
  | "resolved"
  | "booked"
  | "escalated"
  | "abandoned";

export type ActivityChannel = "voice" | "sms" | "web";

export type ActivityItem = {
  id: string;
  at: string;
  channel: ActivityChannel;
  summary: string;
  outcome: ActivityOutcome;
};

export type PerformanceSummary = {
  periodLabel: string;
  callsHandled: number;
  bookingsCreated: number;
  resolutionRate: number;
  avgHandleTimeSec: number;
};

export type DigitalEmployee = {
  id: string;
  name: string;
  role: string;
  status: "active" | "paused";
};

export type PortalPerformance = {
  accountName: string;
  summary: PerformanceSummary;
  employees: DigitalEmployee[];
  recentActivity: ActivityItem[];
};
