/** Homepage FAQ — single source for visible UI and FAQPage JSON-LD. D-067. */

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on for a specific workflow. Everything starts suggest-first, and calendar bookings always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it or discard it at review — nothing sends until you approve.",
  },
  {
    q: "Do I have to start over with a new system?",
    a: "No. Importing your existing customers and vehicles is built in (currently in beta) — your history comes with you.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes and the calendar all work with every AI feature ignored.",
  },
  {
    q: "Who is Gradia for?",
    a: "Established automotive appearance shops with staff (roughly 3–30 people), already spending on ads — detailing, ceramic coating, PPF and tint. Not built for solo operators.",
  },
  {
    q: "Who does the customer hear from?",
    a: "Your shop. Gradia writes as “we” — your name, your voice — never as a third-party bot.",
  },
];
