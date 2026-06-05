import {
  PhoneCall,
  Camera,
  CalendarCheck,
  Receipt,
  Megaphone,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";

export type Agent = {
  /** Two-digit step, e.g. "01" */
  step: string;
  /** Role name, e.g. "The Receptionist" */
  name: string;
  /** Verb shown on the day-sequence card, e.g. "Answer" */
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
 * The cast of 7 — Gradia's brand. Order is the order of a detailer's day:
 * a lead comes in, gets quoted, booked, paid, marketed, reviewed, and any
 * cold ones get re-closed.
 */
export const AGENTS: Agent[] = [
  {
    step: "01",
    name: "The Receptionist",
    verb: "Answer",
    job: "Answers every call, text, and DM — 24/7.",
    pain: "Missed leads",
    demo: "Every call, text, and DM picked up in seconds, day or night.",
    icon: PhoneCall,
  },
  {
    step: "02",
    name: "The Estimator",
    verb: "Quote",
    job: "Quotes any car from a photo in seconds.",
    pain: "Slow quotes lose jobs",
    demo: "Snap a photo of any car; an accurate quote goes out in seconds.",
    icon: Camera,
  },
  {
    step: "03",
    name: "The Scheduler",
    verb: "Book",
    job: "Books, reschedules, and backfills no-show slots.",
    pain: "Empty bays",
    demo: "Fills your calendar and backfills cancellations automatically.",
    icon: CalendarCheck,
  },
  {
    step: "04",
    name: "The Collector",
    verb: "Collect",
    job: "Sends invoices and chases what's owed.",
    pain: "Unpaid invoices",
    demo: "Sends invoices and follows up on what's owed — no awkward texts.",
    icon: Receipt,
  },
  {
    step: "05",
    name: "The Marketer",
    verb: "Post",
    job: "Posts your before/afters and runs the feed.",
    pain: "Dead social",
    demo: "Turns your before/afters into posts that keep the leads coming.",
    icon: Megaphone,
  },
  {
    step: "06",
    name: "The Reviewer",
    verb: "Review",
    job: "Turns happy clients into 5-star Google reviews.",
    pain: "Stuck rating",
    demo: "Asks every happy client for the review at the right moment.",
    icon: Star,
  },
  {
    step: "07",
    name: "The Closer",
    verb: "Close",
    job: "Re-engages cold leads and dead quotes.",
    pain: "Money on the table",
    demo: "Re-engages stalled quotes so nothing's left on the table.",
    icon: Target,
  },
];
