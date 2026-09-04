/* Pricing page data — direction Core $99 / Pro $149 / Operator $249.
   Page stays flag-hidden (SHOW_PRICING=false): live billing is not aligned yet
   (CURSOR_BRIEF 2026-09-03). Do not publish until founder flips the gate. */

export type PricingTier = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Core",
    price: 99,
    tagline: "CRM + agent drafts — suggest-first.",
    features: [
      "Full CRM — customers, vehicles, leads, pipeline, quotes, calendar",
      "Gradia Agent + Ask Gradia — suggest-first only",
      "Approvals inbox — every outbound draft waits for your OK",
      "7,000 message credits per month",
      "Calendar bookings always ask first",
    ],
  },
  {
    name: "Pro",
    price: 149,
    tagline: "For growing shops that want more automation once earned.",
    highlighted: true,
    features: [
      "Everything in Core",
      "Voice receptionist + business number — Coming until acceptance run passes",
      "Earned autonomy — graduate workflows, reversible; calendar always asks",
      "6,000 message credits + 100 voice minutes per month",
    ],
  },
  {
    name: "Operator",
    price: 249,
    tagline: "For established shops with staff running volume.",
    features: [
      "Everything in Pro",
      "10,000 message credits + 180 voice minutes per month",
      "Team seats — arriving",
      "Priority support",
    ],
  },
];

export const TRIAL_LINE =
  "14-day guided trial · starts after your setup · trial usage limits apply";

export const PRICING_FAQS: { q: string; a: string }[] = [
  {
    q: "When does the trial start?",
    a: "After your setup — when you've committed an import or saved your service menu and connected a calendar. The 14-day clock starts at activation, not signup.",
  },
  {
    q: "Do I need a card to start?",
    a: "No — a card is optional to begin. You'll need one on file before converting to a paid plan, with clear reminders before billing starts.",
  },
  {
    q: "What happens at the credit cap?",
    a: "Gradia stops. Credits and voice minutes are fail-closed — at your ceiling, agents stop and voice degrades gracefully. No surprise bills.",
  },
  {
    q: "Does pricing include invoicing or payments?",
    a: "No. Invoices, deposits and payment processing are out of scope. Gradia is an AI-native CRM, not a payment processor.",
  },
];
