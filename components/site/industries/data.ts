/* Pass 5 Cycle 2 — industry page content (REVIEW_NOTES Pass 5).
   Each trade gets its own sample record for the connected-flow retelling;
   fleet page sells the OS for shops that SERVE fleets — no fleet-management
   claims (capability #14 is planned). Homepage SAMPLE stays canonical for
   the homepage only; these are page-local fiction. */

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
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "detailing",
    title: "Detailing",
    headline: "Full details, maintenance visits and repeat customers — organized around every vehicle.",
    lead: "Gradia keeps each customer's history, quotes and follow-ups in one record — so repeat work doesn't depend on your memory.",
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
        title: "You are the system",
        body: "Every vehicle, every promise and every follow-up lives in your head until you touch it.",
      },
    ],
    ask: "When was the black X5 in for its last maintenance detail?",
    frameLabel: "Sarah Mitchell · 2024 BMW X5",
    stages: [
      {
        name: "Capture",
        time: "7:58 AM",
        line: "Sarah's text lands in Gradia — not in six inboxes.",
        detail: "“Hi — do you do ceramic maintenance for a BMW X5?”",
      },
      {
        name: "Understand",
        time: "7:59 AM",
        line: "Her vehicle, history and request become one record.",
        detail: "2024 BMW X5 · texts, quotes and jobs in one file",
      },
      {
        name: "Prepare",
        time: "8:01 AM",
        line: "Gradia drafts the reply and the quote for you.",
        detail: "Full Detail + Ceramic Maintenance — $485 · reply drafted, nothing sent yet",
      },
      {
        name: "Approve",
        time: "8:04 AM",
        line: "Nothing goes out until you say so.",
        detail: "Quote + reply to Sarah — Send it / Tweak it / Drop it",
        approve: true,
      },
      {
        name: "Schedule",
        time: "8:05 AM",
        line: "The job lands on the calendar.",
        detail: "Tue 9:00 AM — Full Detail + Ceramic Maintenance · confirmed with Sarah",
      },
      {
        name: "Retain",
        time: "Weeks later",
        line: "Gradia drafts the follow-up when Sarah is due back.",
        detail: "Maintenance reminder drafted for your review — sends on your OK",
      },
    ],
    metaTitle: "Detailing — Gradia for auto detailing shops",
    metaDescription:
      "Full details, maintenance visits and repeat customers in one operating system. Every outbound action staged for your approval.",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic coating",
    headline: "Big quotes and annual check-ins that shouldn't depend on anyone's memory.",
    lead: "Coating packages, inspection schedules and renewal follow-ups stay tied to each vehicle — drafted for your OK, never auto-sent.",
    pains: [
      {
        title: "Annual check-ins get missed",
        body: "A coating sold last spring is due for inspection — but only if someone remembers to reach out.",
      },
      {
        title: "Big quotes need careful follow-up",
        body: "A $2,000+ package quote deserves a chase — not a sticky note you'll find next month.",
      },
      {
        title: "Service history scatters",
        body: "What you promised at install, what you quoted for correction, and what is due this fall live in different places.",
      },
    ],
    ask: "Which coatings are due for their annual check-in this month?",
    frameLabel: "David Park · 2023 Porsche Cayenne",
    stages: [
      {
        name: "Capture",
        time: "9:12 AM",
        line: "David's inquiry lands as one thread — not lost in DMs.",
        detail: "“Looking for a 2-year ceramic on my Cayenne — what's included?”",
      },
      {
        name: "Understand",
        time: "9:13 AM",
        line: "Vehicle, prior work and coating interest become one record.",
        detail: "2023 Porsche Cayenne · coating inquiry · one customer file",
      },
      {
        name: "Prepare",
        time: "9:18 AM",
        line: "Gradia drafts the package quote from your menu.",
        detail: "2-Year Ceramic Coating — $2,850 · paint correction line item included · reply drafted",
      },
      {
        name: "Approve",
        time: "9:22 AM",
        line: "Nothing goes out until you say so.",
        detail: "Package quote to David — Send it / Tweak it / Drop it",
        approve: true,
      },
      {
        name: "Schedule",
        time: "9:24 AM",
        line: "The install lands on the calendar.",
        detail: "Thu 10:00 AM — 2-Year Ceramic Coating · confirmed with David",
      },
      {
        name: "Retain",
        time: "One year later",
        line: "Gradia drafts the annual check-in when David is due back.",
        detail: "Annual coating inspection reminder — drafted for your review",
      },
    ],
    metaTitle: "Ceramic coating — Gradia for coating shops",
    metaDescription:
      "Coating packages, installs and annual check-ins in one system. Big quotes and renewal follow-ups staged for your approval.",
  },
  {
    slug: "ppf-tint-wrap",
    title: "PPF, tint & wrap",
    headline: "Estimate-heavy work where an expensive quote going quiet costs the most.",
    lead: "High-value PPF, tint and wrap quotes stay visible in your pipeline — with follow-ups drafted for your OK, not buried in threads.",
    pains: [
      {
        title: "Expensive quotes go quiet",
        body: "A $3,000 front-end PPF quote sitting unread for a week is revenue waiting on your reply.",
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
    ask: "Who has a quote over $2,000 I haven't followed up on?",
    frameLabel: "Alex Rivera · 2025 Tesla Model Y",
    stages: [
      {
        name: "Capture",
        time: "2:41 PM",
        line: "Alex's PPF inquiry lands in Gradia — not scattered across apps.",
        detail: "“Full front PPF on a new Model Y — can you quote it?”",
      },
      {
        name: "Understand",
        time: "2:42 PM",
        line: "Vehicle, coverage request and photos become one record.",
        detail: "2025 Tesla Model Y · full front PPF · one customer file",
      },
      {
        name: "Prepare",
        time: "2:48 PM",
        line: "Gradia drafts the estimate from your service menu.",
        detail: "Full Front PPF + Ceramic — $3,200 · reply drafted, nothing sent yet",
      },
      {
        name: "Approve",
        time: "2:51 PM",
        line: "Nothing goes out until you say so.",
        detail: "Estimate to Alex — Send it / Tweak it / Drop it",
        approve: true,
      },
      {
        name: "Schedule",
        time: "3:02 PM",
        line: "Once accepted, the install books cleanly.",
        detail: "Fri 8:00 AM — Full Front PPF + Ceramic · confirmed with Alex",
      },
      {
        name: "Retain",
        time: "6 days later",
        line: "Gradia drafts a follow-up when a high-value quote goes quiet.",
        detail: "$3,200 quote · quiet 6 days — follow-up drafted for your review",
      },
    ],
    metaTitle: "PPF, tint & wrap — Gradia for appearance shops",
    metaDescription:
      "High-value PPF, tint and wrap quotes in one pipeline. Expensive estimates and follow-ups staged for your approval.",
  },
  {
    slug: "mobile-detailing",
    title: "Mobile detailing",
    headline: "Work that happens at the customer's place — with contacts, jobs and follow-ups in the same system.",
    lead: "On-location addresses, route-ready schedules and customer threads stay in one place — so you can run the day from the van, not six apps.",
    pains: [
      {
        title: "Addresses live everywhere",
        body: "The job is at 1847 Cedar Lane — but that address is in a text, not on the calendar.",
      },
      {
        title: "Messages pile up on the road",
        body: "Between stops, leads and quote requests stack up with nowhere clean to put them.",
      },
      {
        title: "Follow-up waits until you're home",
        body: "By evening you're chasing the day's loose ends instead of planning tomorrow's route.",
      },
    ],
    ask: "What's my first job tomorrow and where?",
    frameLabel: "Maria Santos · 2022 Range Rover Sport",
    stages: [
      {
        name: "Capture",
        time: "8:15 AM",
        line: "Maria's request lands while you're between jobs.",
        detail: "“Can you come to my place for a full detail this week?”",
      },
      {
        name: "Understand",
        time: "8:16 AM",
        line: "Vehicle, location and service request become one record.",
        detail: "2022 Range Rover Sport · mobile full detail · address on file",
      },
      {
        name: "Prepare",
        time: "8:19 AM",
        line: "Gradia drafts the quote with your mobile packages.",
        detail: "Mobile Full Detail — $395 · 1847 Cedar Lane noted · reply drafted",
      },
      {
        name: "Approve",
        time: "8:21 AM",
        line: "Nothing goes out until you say so.",
        detail: "Quote + reply to Maria — Send it / Tweak it / Drop it",
        approve: true,
      },
      {
        name: "Schedule",
        time: "8:23 AM",
        line: "The job books with the on-location address attached.",
        detail: "Wed 1:00 PM · Mobile Full Detail · 1847 Cedar Lane",
      },
      {
        name: "Retain",
        time: "Weeks later",
        line: "Gradia drafts the rebook when Maria is due back.",
        detail: "Maintenance detail reminder — drafted for your review",
      },
    ],
    metaTitle: "Mobile detailing — Gradia for mobile detailers",
    metaDescription:
      "On-location jobs, addresses and customer follow-ups in one system. Run your mobile shop from one place.",
  },
  {
    slug: "fleet",
    title: "Fleet",
    headline: "Shops that serve fleet accounts — multiple vehicles, one relationship, one system.",
    lead: "Property managers and fleet contacts with several vehicles on file stay organized in Gradia — scheduling, quotes and follow-ups without a separate fleet tool.",
    pains: [
      {
        title: "One account, many vehicles",
        body: "Riverside Office Park has four vehicles — but each VIN, schedule and quote is tracked separately in your head.",
      },
      {
        title: "Recurring work needs a paper trail",
        body: "Monthly wash programs and standing appointments need clear records — not texts you'll scroll for later.",
      },
      {
        title: "Coordinating takes your afternoon",
        body: "Scheduling the next visit across multiple vehicles means calls, texts and a spreadsheet nobody updated.",
      },
    ],
    ask: "When is Riverside's next scheduled visit?",
    frameLabel: "Riverside Office Park · 4 vehicles",
    stages: [
      {
        name: "Capture",
        time: "10:05 AM",
        line: "The fleet contact's request lands as one thread.",
        detail: "“Need to schedule the monthly wash for our four vans next week.”",
      },
      {
        name: "Understand",
        time: "10:06 AM",
        line: "Account, vehicles and standing program become one record.",
        detail: "4 vehicles on file · monthly wash program · one account",
      },
      {
        name: "Prepare",
        time: "10:11 AM",
        line: "Gradia drafts the visit quote from your fleet menu.",
        detail: "Monthly fleet wash — 4 vehicles · $680 · reply drafted",
      },
      {
        name: "Approve",
        time: "10:14 AM",
        line: "Nothing goes out until you say so.",
        detail: "Quote to Riverside contact — Send it / Tweak it / Drop it",
        approve: true,
      },
      {
        name: "Schedule",
        time: "10:16 AM",
        line: "The standing visit books across the account's vehicles.",
        detail: "Mon 7:30 AM · monthly fleet wash · 4 vehicles scheduled",
      },
      {
        name: "Retain",
        time: "Next month",
        line: "Gradia drafts the renewal when the program is due again.",
        detail: "Monthly program renewal — drafted for your review",
      },
    ],
    metaTitle: "Fleet — Gradia for shops serving fleet accounts",
    metaDescription:
      "Multiple vehicles under one account — scheduling, quotes and follow-ups in one operating system. For shops that serve fleet customers.",
  },
];

export const INDUSTRY_BY_SLUG = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, i]),
) as Record<IndustrySlug, Industry>;

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);
