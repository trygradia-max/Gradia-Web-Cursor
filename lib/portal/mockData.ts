import type { PortalPerformance } from "./types";

const byClient: Record<string, PortalPerformance> = {
  "client-acme": {
    accountName: "Acme Dental Collective",
    summary: {
      periodLabel: "Last 30 days",
      callsHandled: 1842,
      bookingsCreated: 312,
      resolutionRate: 0.81,
      avgHandleTimeSec: 142,
    },
    employees: [
      {
        id: "de-1",
        name: "Jordan",
        role: "Front desk & scheduling",
        status: "active",
      },
      {
        id: "de-2",
        name: "Riley",
        role: "Insurance & billing Q&A",
        status: "active",
      },
    ],
    recentActivity: [
      {
        id: "act-1",
        at: "2026-04-12T14:22:00.000Z",
        channel: "voice",
        summary: "New patient intake — booked cleaning next week",
        outcome: "booked",
      },
      {
        id: "act-2",
        at: "2026-04-12T13:05:00.000Z",
        channel: "voice",
        summary: "Reschedule request — offered two slots, confirmed",
        outcome: "resolved",
      },
      {
        id: "act-3",
        at: "2026-04-12T11:40:00.000Z",
        channel: "sms",
        summary: "Hours & location — answered without transfer",
        outcome: "resolved",
      },
      {
        id: "act-4",
        at: "2026-04-12T10:12:00.000Z",
        channel: "voice",
        summary: "Complex clinical question — escalated to nurse line",
        outcome: "escalated",
      },
      {
        id: "act-5",
        at: "2026-04-11T16:58:00.000Z",
        channel: "web",
        summary: "Web chat abandoned mid-flow",
        outcome: "abandoned",
      },
    ],
  },
  "client-globex": {
    accountName: "Globex Field Services",
    summary: {
      periodLabel: "Last 30 days",
      callsHandled: 642,
      bookingsCreated: 198,
      resolutionRate: 0.74,
      avgHandleTimeSec: 189,
    },
    employees: [
      {
        id: "de-g1",
        name: "Casey",
        role: "Dispatch & triage",
        status: "active",
      },
    ],
    recentActivity: [
      {
        id: "act-g1",
        at: "2026-04-12T09:30:00.000Z",
        channel: "voice",
        summary: "Emergency route — technician ETA text sent",
        outcome: "resolved",
      },
      {
        id: "act-g2",
        at: "2026-04-11T18:20:00.000Z",
        channel: "voice",
        summary: "Warranty repair — appointment booked",
        outcome: "booked",
      },
    ],
  },
};

export function getMockPerformance(clientId: string): PortalPerformance | null {
  return byClient[clientId] ?? null;
}
