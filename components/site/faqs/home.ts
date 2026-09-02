/** Homepage FAQ — single source for visible UI and FAQPage JSON-LD (Pass 6). */

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on. Everything starts suggest-first, and money and calendar actions always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it or discard it at review — nothing sends until you approve.",
  },
  {
    q: "Do I have to start over with a new system?",
    a: "No. Importing your existing customers, vehicles and calendar is built in (currently in beta) — your history comes with you.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes, jobs and the calendar all work with every AI feature ignored.",
  },
  {
    q: "Could Gradia spam my customers?",
    a: "No. Outreach has hard caps and cooldowns, and opt-outs are honored before anything is even staged for your approval.",
  },
  {
    q: "Who does the customer hear from?",
    a: "Your shop. Gradia writes as “we” — your name, your voice — never as a third-party bot.",
  },
];
