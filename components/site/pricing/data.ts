/* Pricing page data — mirrors _docs/GRADIA_PRICING.md (D-034/D-035). No crossed-out prices. */

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
    tagline: "For solo and smaller shops.",
    features: [
      "Full CRM — customers, vehicles, leads, pipeline, quotes, jobs, conversations, calendar",
      "Gradia Agent + Whisper + Ask Gradia — suggest-first only",
      "SMS + email follow-ups, campaigns and reminders — all approve-first",
      "7,000 message credits per month",
      "Imports and approvals inbox",
      "Money and calendar always ask first",
    ],
  },
  {
    name: "Pro",
    price: 149,
    tagline: "For growing shops that want the phone answered and trusted work running itself.",
    highlighted: true,
    features: [
      "Everything in Core",
      "Voice receptionist + business number included",
      "Earned autonomy — graduate agents per workflow, reversible; money + calendar always ask",
      "6,000 message credits + 100 voice minutes per month",
    ],
  },
  {
    name: "Operator",
    price: 249,
    tagline: "For established shops and teams running volume.",
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
    q: "What are message credits?",
    a: "One credit equals one cent of retail usage. SMS, email, outreach drafts and agent plans draw from your monthly allowance. Inbound classification, approvals, CRM work and calendar operations are never metered.",
  },
  {
    q: "Could I get a surprise bill?",
    a: "No. Spending caps and owner-set ceilings are built in. At the cap, Gradia stops — it never keeps spending. Credit and minute packs are optional, offered with ROI framing; auto-top-up respects your ceiling.",
  },
  {
    q: "What happens to unused credits?",
    a: "Up to 25% of unused included credits roll forward one month. Two separate meters — message credits and voice minutes — never cross.",
  },
  {
    q: "Does Gradia send on its own?",
    a: "Everything starts suggest-first. On Pro, you can graduate individual workflows to earned autonomy — reversible, logged, with money and calendar always asking first.",
  },
];
