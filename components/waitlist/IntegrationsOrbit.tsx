"use client";

import {
  Users,
  MessageSquare,
  Mail,
  CalendarCheck,
  PhoneCall,
  Mic,
} from "lucide-react";
import RadialOrbitalTimeline, {
  type OrbitItem,
} from "@/components/ui/RadialOrbitalTimeline";

/**
 * Gradia's channels and integrations orbiting the one shared brain. Both agents
 * read and write the same CRM, so the voice agent knows what the chat agent did
 * two hours ago. Click a node to expand it and see how it connects.
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
    relatedIds: [2, 3, 4, 5, 6],
    content:
      "Every customer, vehicle, quote, and job lives in one place — the single source of truth both agents read and write to.",
  },
  {
    id: 2,
    title: "Calendar",
    date: "Live",
    category: "Scheduling",
    icon: CalendarCheck,
    status: "completed",
    energy: 90,
    relatedIds: [1, 6],
    content:
      "Real bookings land on the calendar you already use — the voice agent quotes and books straight onto it, over the phone.",
  },
  {
    id: 3,
    title: "Email",
    date: "Live",
    category: "Messaging",
    icon: Mail,
    status: "completed",
    energy: 80,
    relatedIds: [1, 4],
    content:
      "Follow-ups and lead revival go out by email — drafted by the chat agent and sent the moment you approve them.",
  },
  {
    id: 4,
    title: "SMS",
    date: "Live",
    category: "Messaging",
    icon: MessageSquare,
    status: "completed",
    energy: 80,
    relatedIds: [1, 3],
    content:
      "Two-way texting: confirmations, reminders, and follow-ups — staged for your approval before anything sends.",
  },
  {
    id: 5,
    title: "Voice",
    date: "Live",
    category: "Calls",
    icon: PhoneCall,
    status: "completed",
    energy: 95,
    relatedIds: [1, 6],
    content:
      "The voice agent answers every call 24/7, quotes the job, and books it — speaking as your shop, never a third-party bot.",
  },
  {
    id: 6,
    title: "Gradia Whisper",
    date: "New",
    category: "Voice",
    icon: Mic,
    status: "in-progress",
    energy: 70,
    relatedIds: [1, 5],
    content:
      "Speak an instruction and Gradia turns it into notes, tasks, and staged actions the agents can act on — ready for your OK.",
  },
];

export function IntegrationsOrbit() {
  return (
    <RadialOrbitalTimeline timelineData={INTEGRATIONS} centerLabel="One brain" />
  );
}
