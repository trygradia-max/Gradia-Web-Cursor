/** Product-page FAQ — visible UI + FAQPage JSON-LD on /product. D-067. */

import type { FaqItem } from "./home";

export const PRODUCT_FAQS: FaqItem[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on for a specific workflow. Everything starts suggest-first, and calendar bookings always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it, tweak it or drop it — nothing sends until you approve.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes and the calendar all work with every AI feature turned off.",
  },
  {
    q: "Does Gradia handle invoices or payments?",
    a: "No. Invoices, deposits and payment processing are out of scope — Gradia is an AI-native CRM, not a payment processor.",
  },
  {
    q: "Who is Gradia for?",
    a: "Established automotive appearance shops with staff (roughly 3–30 people), already spending on ads — detailing, ceramic coating, PPF and tint.",
  },
];
