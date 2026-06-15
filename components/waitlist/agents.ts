import {
  PhoneCall,
  MessageSquare,
  Mic,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Agent = {
  /** Two-digit step, e.g. "01" */
  step: string;
  /** Name, e.g. "Voice agent" */
  name: string;
  /** Verb shown on the day-sequence card, e.g. "Answers the phone" */
  verb: string;
  /** One-line job */
  job: string;
  /** The pain it kills */
  pain: string;
  /** Short demo micro-copy for the day sequence */
  demo: string;
  icon: LucideIcon;
};

/**
 * The flagship pair you command — Gradia Whisper (speak/type an instruction) and
 * Gradia Agent (describe a workflow, it runs it) — plus the two channels they
 * work through: voice (calls) and chat (SMS + email). The old 7-named-agent
 * vision folded into this — see _docs/WHAT_GRADIA_DOES.md. Every outbound step
 * is staged for the owner's approval; nothing auto-sends.
 */
export const AGENTS: Agent[] = [
  {
    step: "01",
    name: "Gradia Whisper",
    verb: "Speak it, it stages",
    job: "Turns a spoken or typed instruction into staged work.",
    pain: "Notes that go nowhere",
    demo: "Say an instruction like an employee and Gradia turns it into notes, tasks, and staged actions, ready for your approval.",
    icon: Mic,
  },
  {
    step: "02",
    name: "Gradia Agent",
    verb: "Describe a workflow",
    job: "Plans a multi-step job across your shop and stages every step.",
    pain: "Repetitive busywork",
    demo: "Lay out a job in plain English — quote, book, follow up, run a campaign; Gradia plans it and stages every outbound step behind one approval.",
    icon: Zap,
  },
  {
    step: "03",
    name: "Voice agent",
    verb: "Answers the phone",
    job: "Answers every call 24/7, quotes, and books over the phone.",
    pain: "Missed calls",
    demo: "Picks up every call 24/7 — even after hours — quotes the job and books it over the phone, speaking as your shop.",
    icon: PhoneCall,
  },
  {
    step: "04",
    name: "Chat agent",
    verb: "Works your leads",
    job: "Follows up new leads and revives old ones by text and email.",
    pain: "Leads gone cold",
    demo: "Texts and emails new leads, revives the ones you forgot, and sends reminders — all from your CRM, staged for your OK.",
    icon: MessageSquare,
  },
];
