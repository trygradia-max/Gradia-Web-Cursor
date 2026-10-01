/** Homepage FAQ — single source for visible UI and FAQPage JSON-LD. */

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What is Gradia?",
    a: "Gradia brings a detailing business's customer records, vehicles, conversations, quotes and calendar together, with one Agent to help move leads toward appointments.",
  },
  {
    q: "Can I use it today?",
    a: "We're preparing a controlled pilot. You can request access now; access and available features will be confirmed before onboarding.",
  },
  {
    q: "Is it only for larger shops?",
    a: "No. The MVP is designed for solo businesses and teams, at one location or within one mobile service area.",
  },
  {
    q: "Does Gradia send messages or make bookings without asking?",
    a: "Customer-facing actions start with approval required. The planned controls allow the owner to enable specific actions within defined rules. Connecting a channel does not automatically allow every action on it.",
  },
  {
    q: "Which channels will the pilot support?",
    a: "The initial pilot is planned around SMS, website forms and Meta Lead Ads. Each channel must pass setup and verification before it is enabled. Email follows acceptance of its inbox and reply flow. Inbound phone reception follows real-call and forwarding checks.",
  },
  {
    q: "Can I keep my phone number?",
    a: "Keeping your existing number is a requirement for the phone rollout. Forwarding and number continuity must be verified before we offer the receptionist for your business.",
  },
  {
    q: "Does Gradia take payments or manage work orders?",
    a: "Payments, deposits, invoicing, point of sale and full work orders are not included in the initial MVP. Its focus is the customer inquiry, quote, booking and individual follow-up.",
  },
  {
    q: "Can it message all my old customers or request Google reviews?",
    a: "Those campaigns are outside the initial MVP. The planned follow-ups are confirmations, reminders and check-ins for the individual customer already in the booking workflow.",
  },
  {
    q: "Is there a free trial?",
    a: "No free trial is offered. Pricing and pilot terms will be shared before you commit.",
  },
  {
    q: "Can I bring existing customer records?",
    a: "Bounded customer and vehicle import is part of the intended MVP. We'll confirm supported formats and available migration help before onboarding.",
  },
];
