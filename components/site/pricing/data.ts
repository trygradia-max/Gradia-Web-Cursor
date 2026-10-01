/* Pricing page data — intended cheat-sheet figures are Core $99 / Pro $149 /
   Operator $249, but those numbers, entitlements and seat guesses are NOT
   published until billing matches. This file no longer drives a checkout UI. */

export type PricingTier = {
  name: string;
  tagline: string;
};

export const PRICING_TIERS: PricingTier[] = [
  { name: "Core", tagline: "Confirmed before onboarding." },
  { name: "Pro", tagline: "Confirmed before onboarding." },
  { name: "Operator", tagline: "Confirmed before onboarding." },
];

export const PRICING_FAQS: { q: string; a: string }[] = [
  {
    q: "Is there a free trial?",
    a: "No free trial is offered. Pricing and pilot terms will be shared before you commit.",
  },
  {
    q: "Does pricing include invoicing or payments?",
    a: "No. Payments, deposits, invoicing, point of sale and full work orders are not included in the initial MVP.",
  },
];
