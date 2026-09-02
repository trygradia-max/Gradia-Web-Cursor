/** Product-page FAQ — visible UI + FAQPage JSON-LD on /product (Pass 6). */

import type { FaqItem } from "./home";

export const PRODUCT_FAQS: FaqItem[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on for a specific workflow. Everything starts suggest-first, and money and calendar actions always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it, tweak it or drop it — nothing sends until you approve.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes, jobs and the calendar all work with every AI feature turned off.",
  },
  {
    q: "Could Gradia spam my customers?",
    a: "No. Outreach has hard caps and cooldowns per run and per customer. Opt-outs are honored before anything is even staged for your approval.",
  },
  {
    q: "Do I have to start over with a new system?",
    a: "No. Importing your existing customers, vehicles and calendar is built in (currently in beta) — your history comes with you.",
  },
];
