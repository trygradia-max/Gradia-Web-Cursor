/* Industry page content. Same truthful capability set on every trade page.
   Fleet stays flag-hidden — fleet accounts are out of scope. */

export type IndustrySlug =
  | "detailing"
  | "ceramic-coating"
  | "ppf-tint-wrap"
  | "mobile-detailing"
  | "fleet";

export type FlowStage = {
  name: string;
  line: string;
  time: string;
  detail: string;
  approve?: boolean;
};

export type Industry = {
  slug: IndustrySlug;
  title: string;
  headline: string;
  lead: string;
  pains: { title: string; body: string }[];
  ask: string;
  frameLabel: string;
  stages: FlowStage[];
  metaTitle: string;
  metaDescription: string;
  gated?: boolean;
};

const sharedStages = (
  firstName: string,
  vehicle: string,
  inquiry: string,
  quote: string,
  slot: string,
): FlowStage[] => [
  {
    name: "Capture",
    time: "Inquiry",
    line: "The inquiry lands as one customer record.",
    detail: inquiry,
  },
  {
    name: "Details",
    time: "Qualify",
    line: "Vehicle, service and timing become part of the same file.",
    detail: `${vehicle} · one customer file`,
  },
  {
    name: "Quote",
    time: "Prepare",
    line: "Gradia prepares a menu-based quote for review.",
    detail: `${quote} · nothing sent yet`,
  },
  {
    name: "Booking",
    time: "Arrange",
    line: "A proposed time is presented for approval when required.",
    detail: `${slot} — Approve / Edit / Hold`,
    approve: true,
  },
  {
    name: "Follow-up",
    time: "Record",
    line: `Pipeline, calendar and conversation stay connected for ${firstName}.`,
    detail: "Individual confirmation, reminder or check-in — drafted for review",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "detailing",
    title: "Detailing",
    headline: "Full details and repeat customers — in one record, not in your head.",
    lead: "Gradia keeps each customer's vehicles, quotes and next step together. The Agent is being built to prepare the next action; you approve what goes out. For a solo detailer or a shop with a team, at one location or within one mobile service area.",
    pains: [
      {
        title: "Repeat customers slip away",
        body: "Maintenance details and check-ins only happen when you remember who is due back.",
      },
      {
        title: "Quotes live in texts",
        body: "A price you sent last week is buried in a thread — and so is the follow-up.",
      },
      {
        title: "The next step depends on memory",
        body: "The customer, the vehicle and the booking live in different places.",
      },
    ],
    ask: "When was the black X5 in for its last maintenance detail?",
    frameLabel: "Sarah Mitchell · 2024 BMW X5",
    stages: sharedStages(
      "Sarah",
      "2024 BMW X5",
      "“Hi — do you do ceramic maintenance for a BMW X5?”",
      "Full Detail + Ceramic Maintenance — $485",
      "Tue 9:00 AM",
    ),
    metaTitle: "Detailing — Gradia CRM for auto detailing businesses",
    metaDescription:
      "AI CRM for detailing businesses — solo or team. Customers, vehicles, quotes and calendar, with an Agent to help move leads toward bookings.",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic coating",
    headline: "Package quotes and scheduled check-ins that shouldn't depend on memory.",
    lead: "Coating packages stay tied to each vehicle. Gradia is being built to prepare the next quote or reminder; you approve before anything goes out. For solo coaters and teams.",
    pains: [
      {
        title: "Scheduled check-ins get missed",
        body: "A coating sold last spring is due for inspection — but only if someone remembers to reach out.",
      },
      {
        title: "Big quotes need a clear next step",
        body: "A package quote deserves a follow-up that is actually tied to the customer record.",
      },
      {
        title: "Service history scatters",
        body: "What you promised at install and what is due next live in different places.",
      },
    ],
    ask: "Which coatings are due for a check-in this month?",
    frameLabel: "David Park · 2023 Porsche Cayenne",
    stages: sharedStages(
      "David",
      "2023 Porsche Cayenne",
      "“Looking for a 2-year ceramic on my Cayenne — what's included?”",
      "2-Year Ceramic Coating — $2,850",
      "Thu 10:00 AM",
    ),
    metaTitle: "Ceramic coating — Gradia CRM for coating businesses",
    metaDescription:
      "AI CRM for ceramic coating businesses. Package quotes and individual follow-ups prepared for your approval.",
  },
  {
    slug: "ppf-tint-wrap",
    title: "PPF, tint & wrap",
    headline: "Estimate-heavy work where a quiet quote needs a clear next step.",
    lead: "High-value PPF, tint and wrap quotes stay visible in the pipeline — with the next step prepared for your OK. For a solo installer or a shop with a team.",
    pains: [
      {
        title: "Expensive quotes go quiet",
        body: "A front-end PPF quote sitting unread is work waiting on a clear next step.",
      },
      {
        title: "Estimates span too many channels",
        body: "Measurements in texts, pricing in your head, photos in your camera roll — nothing connects.",
      },
      {
        title: "Follow-up is manual",
        body: "Chasing a stalled quote means remembering who, what price, and how long it's been quiet.",
      },
    ],
    ask: "Who has a quote I haven't followed up on?",
    frameLabel: "Alex Rivera · 2025 Tesla Model Y",
    stages: sharedStages(
      "Alex",
      "2025 Tesla Model Y",
      "“Full front PPF on a new Model Y — can you quote it?”",
      "Full Front PPF + Ceramic — $3,200",
      "Fri 8:00 AM",
    ),
    metaTitle: "PPF, tint & wrap — Gradia CRM for appearance businesses",
    metaDescription:
      "AI CRM for PPF, tint and wrap businesses. High-value estimates and individual follow-ups staged for your approval.",
  },
  {
    slug: "mobile-detailing",
    title: "Mobile detailing",
    headline: "On-location work with contacts, quotes and follow-ups in the same CRM.",
    lead: "Addresses, schedules and customer records stay in one place. Built for a solo mobile business or a small team, within one service area.",
    pains: [
      {
        title: "Addresses live everywhere",
        body: "The booking is at 1847 Cedar Lane — but that address is in a text, not on the calendar.",
      },
      {
        title: "Messages pile up on the road",
        body: "Between stops, leads and quote requests stack up with nowhere clean to put them.",
      },
      {
        title: "Follow-up waits until you're home",
        body: "By evening you're chasing the day's loose ends instead of seeing the next step.",
      },
    ],
    ask: "What's my first booking tomorrow and where?",
    frameLabel: "Maria Santos · 2022 Range Rover Sport",
    stages: sharedStages(
      "Maria",
      "2022 Range Rover Sport",
      "“Can you come to my place for a full detail this week?”",
      "Mobile Full Detail — $395",
      "Wed 1:00 PM",
    ),
    metaTitle: "Mobile detailing — Gradia CRM for mobile detailers",
    metaDescription:
      "AI CRM for mobile detailing — solo or team. On-location addresses, quotes and follow-ups in one place.",
  },
  {
    slug: "fleet",
    title: "Fleet",
    gated: true,
    headline: "Fleet accounts are not part of this release.",
    lead: "Gradia's initial MVP supports one operating location or mobile service area per workspace. Multi-vehicle fleet accounts are not offered on this site.",
    pains: [
      {
        title: "Out of scope",
        body: "Fleet routing, shared-resource scheduling and multi-account fleet CRM are not part of the initial MVP.",
      },
      {
        title: "One location",
        body: "The product is designed for one operating location or one mobile service area.",
      },
      {
        title: "Same core CRM",
        body: "If you serve a few vehicles for one customer, that still uses the ordinary customer and vehicle records — not a fleet product.",
      },
    ],
    ask: "Is fleet in the initial MVP?",
    frameLabel: "Not offered",
    stages: sharedStages(
      "the customer",
      "one vehicle",
      "Fleet accounts are out of scope for this release.",
      "Ordinary customer and vehicle records only",
      "Not a fleet product",
    ),
    metaTitle: "Fleet — not in the initial Gradia MVP",
    metaDescription:
      "Fleet accounts are out of scope for the initial Gradia MVP. The product supports one location or mobile service area.",
  },
];

export const INDUSTRY_BY_SLUG = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, i]),
) as Record<IndustrySlug, Industry>;

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);

export const PUBLIC_INDUSTRIES = INDUSTRIES.filter((i) => !i.gated);
