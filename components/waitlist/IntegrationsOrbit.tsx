"use client";

import {
  Users,
  MessageSquare,
  Mail,
  AudioLines,
  CreditCard,
  Star,
} from "lucide-react";
import RadialOrbitalTimeline, {
  type OrbitItem,
} from "@/components/ui/RadialOrbitalTimeline";

/**
 * Gradia's integrations orbiting the Gradia AI core. Click a node to expand it
 * and see how it connects to the rest of the stack.
 */
const INTEGRATIONS: OrbitItem[] = [
  {
    id: 1,
    title: "CRM",
    date: "Core",
    category: "Data",
    icon: Users,
    status: "completed",
    energy: 100,
    relatedIds: [2, 3, 6],
    content:
      "Every customer, vehicle, quote, and job lives in one place — the single source of truth your agents read and write to.",
  },
  {
    id: 2,
    title: "SMS",
    date: "Live",
    category: "Messaging",
    icon: MessageSquare,
    status: "completed",
    energy: 90,
    relatedIds: [1, 3, 4],
    content:
      "Two-way texting handled by the Receptionist and Collector — replies, quotes, reminders, and invoice nudges.",
  },
  {
    id: 3,
    title: "Email marketing",
    date: "Live",
    category: "Marketing",
    icon: Mail,
    status: "completed",
    energy: 80,
    relatedIds: [1, 2, 6],
    content:
      "The Marketer sends before/after campaigns, win-back flows, and seasonal ceramic offers — on autopilot.",
  },
  {
    id: 4,
    title: "Gradia Whisper",
    date: "New",
    category: "Voice",
    icon: AudioLines,
    status: "in-progress",
    energy: 70,
    relatedIds: [2, 5],
    content:
      "Live call transcription + intent capture. Whisper turns every phone call into a structured lead the agents can act on.",
  },
  {
    id: 5,
    title: "Payments",
    date: "Live",
    category: "Money",
    icon: CreditCard,
    status: "completed",
    energy: 85,
    relatedIds: [1, 4],
    content:
      "Deposits, invoices, and ceramic-coating upsells collected automatically by the Collector — no awkward asks.",
  },
  {
    id: 6,
    title: "Reviews",
    date: "Live",
    category: "Reputation",
    icon: Star,
    status: "completed",
    energy: 75,
    relatedIds: [1, 3],
    content:
      "The Reviewer asks every happy client for a 5-star Google review at the perfect moment, then routes it back to marketing.",
  },
];

export function IntegrationsOrbit() {
  return <RadialOrbitalTimeline timelineData={INTEGRATIONS} centerLabel="Gradia AI" />;
}
