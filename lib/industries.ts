export type IndustryItem = {
  number: string;
  title: string;
  body: string;
};

export type Industry = {
  slug: string;
  /** Short label used in the footer / industries lists. */
  name: string;
  /** Display label rendered above the hero headline (uppercased visually via CSS). */
  label: string;
  /** Short noun used in the final CTA — "for your <noun>". */
  finalCtaNoun: string;
  /** Short description used for <meta name="description">. */
  metaDescription: string;
  hero: {
    headline: string;
    sub: string;
  };
  pain: {
    headline: string;
    points: IndustryItem[];
  };
  midCtaHeadline: string;
  solutions: {
    headline: string;
    items: IndustryItem[];
  };
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    label: "Healthcare",
    finalCtaNoun: "practice",
    metaDescription:
      "Gradia is the always-on front desk for healthcare practices. Every patient call answered, every after-hours inquiry captured.",
    hero: {
      headline: "Your patients are calling. Is anyone answering?",
      sub: "Every unanswered call is a patient who found another provider. Gradia makes sure that never happens.",
    },
    pain: {
      headline: "The front desk can't do it all.",
      points: [
        {
          number: "01",
          title: "Calls stack up",
          body: "Your front desk is juggling check-ins, insurance, and walk-ins. Calls go to hold. Patients hang up.",
        },
        {
          number: "02",
          title: "After-hours go unanswered",
          body: "Patients don't only need care between 9 and 5. After-hours calls hit voicemail and never come back.",
        },
        {
          number: "03",
          title: "New patient intake is slow",
          body: "First impressions happen on the phone. A slow, clunky intake process loses new patients before they ever walk in.",
        },
        {
          number: "04",
          title: "No-shows hurt your schedule",
          body: "Appointments get forgotten. No reminders, no follow-up, no recovery. Empty slots cost you.",
        },
      ],
    },
    midCtaHeadline: "Sound like your practice?",
    solutions: {
      headline: "Gradia becomes your always-on front desk.",
      items: [
        {
          number: "01",
          title: "Every call answered",
          body: "No hold times. No voicemail. Every patient call answered instantly, 24/7.",
        },
        {
          number: "02",
          title: "After-hours coverage",
          body: "Gradia handles urgent calls, appointment requests, and inquiries around the clock — professionally.",
        },
        {
          number: "03",
          title: "New patient intake on the first call",
          body: "Name, insurance, reason for visit — captured and logged before your team starts their day.",
        },
        {
          number: "04",
          title: "Appointment reminders automated",
          body: "Confirmations sent, reminders delivered, no-shows reduced. Your schedule stays full.",
        },
      ],
    },
  },
  {
    slug: "auto-dealerships",
    name: "Auto Dealerships",
    label: "Auto Dealerships",
    finalCtaNoun: "dealership",
    metaDescription:
      "Gradia keeps your dealership open 24 hours. Every after-hours lead captured, every test drive booked, every buyer pre-qualified.",
    hero: {
      headline: "The dealership that answers first wins the sale.",
      sub: "Car buyers research late and decide fast. If you're not answering at 8pm, your competitor is.",
    },
    pain: {
      headline: "Speed is the deal. You're losing it.",
      points: [
        {
          number: "01",
          title: "After-hours leads go cold",
          body: "A buyer calls at 8pm ready to talk. Nobody answers. By 9am they've already visited the lot down the road.",
        },
        {
          number: "02",
          title: "Test drive requests slip through",
          body: "On a busy Saturday, inbound calls get missed. Those aren't missed calls — those are missed commissions.",
        },
        {
          number: "03",
          title: "Sales team drowns in unqualified calls",
          body: "Your reps spend hours on calls that go nowhere. Tire-kickers eat the time that should go to buyers.",
        },
        {
          number: "04",
          title: "Competitors respond faster",
          body: "Speed to lead determines who gets the deal. If you're second, you're losing.",
        },
      ],
    },
    midCtaHeadline: "How many deals walked out the door this week?",
    solutions: {
      headline: "Gradia keeps your lot open 24 hours.",
      items: [
        {
          number: "01",
          title: "After-hours leads captured",
          body: "Every call answered instantly — day or night. No lead sits unanswered until morning.",
        },
        {
          number: "02",
          title: "Test drives booked automatically",
          body: "Gradia schedules test drives and trade-in appointments directly into your calendar.",
        },
        {
          number: "03",
          title: "Leads pre-qualified before reaching your team",
          body: "Gradia filters and qualifies — your reps only talk to buyers who are ready to move.",
        },
        {
          number: "04",
          title: "Full visibility on every call",
          body: "Every conversation logged, recorded, and visible on your dashboard in real time.",
        },
      ],
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    label: "Real Estate",
    finalCtaNoun: "real estate business",
    metaDescription:
      "Gradia answers every property inquiry, qualifies every buyer, and books showings directly into your calendar — so you only work serious leads.",
    hero: {
      headline: "The agent who responds first closes first.",
      sub: "Buyers and sellers move fast. One missed call is one lost commission.",
    },
    pain: {
      headline: "Leads don't wait. Neither do your competitors.",
      points: [
        {
          number: "01",
          title: "Inquiries come in at all hours",
          body: "Property interest doesn't follow business hours. Evening and weekend calls go unanswered constantly.",
        },
        {
          number: "02",
          title: "Slow response loses buyers instantly",
          body: "A buyer calls two agents. The first one to respond gets the showing. The second gets nothing.",
        },
        {
          number: "03",
          title: "Multiple listings, constant calls",
          body: "Managing several properties means calls are always competing for your attention. Some always lose.",
        },
        {
          number: "04",
          title: "Qualifying buyers takes too long",
          body: "Not every caller is ready to move. Spending 30 minutes qualifying tire-kickers costs you the serious buyers.",
        },
      ],
    },
    midCtaHeadline:
      "That commission didn't disappear. It went to whoever answered.",
    solutions: {
      headline: "Gradia works the phones while you work the deals.",
      items: [
        {
          number: "01",
          title: "Every inquiry answered instantly",
          body: "Evening, weekend, holiday — Gradia picks up and captures the lead before they move on.",
        },
        {
          number: "02",
          title: "Buyer qualification on the first call",
          body: "Budget, timeline, property type — all captured before the lead reaches you. You only talk to serious buyers.",
        },
        {
          number: "03",
          title: "Viewings booked into your calendar",
          body: "No back and forth. Gradia schedules showings directly. You show up ready to close.",
        },
        {
          number: "04",
          title: "Full lead history at your fingertips",
          body: "Every caller, every conversation, every outcome — logged and visible on your dashboard.",
        },
      ],
    },
  },
  {
    slug: "home-services",
    name: "Home Services",
    label: "Home Services",
    finalCtaNoun: "home services business",
    metaDescription:
      "Gradia answers every emergency call, captures every quote request, and books jobs directly — so you keep working while the phones keep ringing.",
    hero: {
      headline:
        "When something breaks, they call you. Make sure you answer.",
      sub: "Emergency calls don't come with a schedule. Your response time determines whether you get the job.",
    },
    pain: {
      headline: "Jobs are slipping through while you're on the job.",
      points: [
        {
          number: "01",
          title: "Emergency calls hit voicemail",
          body: "A pipe bursts at 10pm. They call you — no answer. They call your competitor — someone picks up. You lost the job.",
        },
        {
          number: "02",
          title: "Quote requests go missing",
          body: "When you're on a job site, inbound calls for quotes go unanswered. That's revenue you never knew about.",
        },
        {
          number: "03",
          title: "Scheduling is chaos",
          body: "Managing jobs, callbacks, and follow-ups at the same time means something always falls through the cracks.",
        },
        {
          number: "04",
          title: "Customers don't wait",
          body: "In an emergency, a homeowner calls 3 companies. Whoever responds first gets the job. You need to be first.",
        },
      ],
    },
    midCtaHeadline:
      "How many jobs did you miss this week because the phone wasn't answered?",
    solutions: {
      headline: "Gradia answers every call so you can focus on the work.",
      items: [
        {
          number: "01",
          title: "24/7 emergency call coverage",
          body: "Burst pipe, broken AC, power issue — Gradia answers immediately and captures every emergency lead.",
        },
        {
          number: "02",
          title: "Quote requests captured automatically",
          body: "Every inbound quote request logged and sent to your team. Nothing falls through.",
        },
        {
          number: "03",
          title: "Job scheduling handled for you",
          body: "Gradia books appointments directly into your schedule. No back and forth.",
        },
        {
          number: "04",
          title: "Follow-ups done automatically",
          body: "Gradia follows up with leads who didn't book on the first call. More jobs, less chasing.",
        },
      ],
    },
  },
  {
    slug: "legal",
    name: "Legal",
    label: "Legal",
    finalCtaNoun: "firm",
    metaDescription:
      "Gradia handles intake so your attorneys handle cases. Every call answered professionally, every prospective client qualified before reaching you.",
    hero: {
      headline: "Every missed call is a case you didn't take.",
      sub: "People in legal distress call once. If you're not there, they find someone who is.",
    },
    pain: {
      headline: "Clients in crisis won't wait for a callback.",
      points: [
        {
          number: "01",
          title: "Potential clients move on fast",
          body: "Someone facing a legal situation calls 3 firms. The first one to respond gets the case. The other two never hear back.",
        },
        {
          number: "02",
          title: "After-hours emergencies go to voicemail",
          body: "Urgent situations don't follow office hours. A client in distress hitting voicemail at 9pm calls your competitor at 9:01pm.",
        },
        {
          number: "03",
          title: "Intake pulls attorneys off billable work",
          body: "Initial calls are time-consuming and often unqualified. Attorneys spending 30 minutes on intake lose billable hours.",
        },
        {
          number: "04",
          title: "Inconsistent first impressions",
          body: "Your first call sets the client relationship. An overwhelmed receptionist or voicemail doesn't project the confidence clients need.",
        },
      ],
    },
    midCtaHeadline: "How many cases walked to a competitor this month?",
    solutions: {
      headline: "Gradia handles intake so your team handles cases.",
      items: [
        {
          number: "01",
          title: "Every call answered professionally",
          body: "Gradia responds instantly and professionally — clients feel heard from the first second.",
        },
        {
          number: "02",
          title: "After-hours coverage for urgent matters",
          body: "Evening and weekend calls handled immediately. No distressed client ever reaches voicemail.",
        },
        {
          number: "03",
          title: "New client intake on the first call",
          body: "Name, matter type, urgency level — all captured before the lead reaches an attorney.",
        },
        {
          number: "04",
          title: "Warm handoff with full context",
          body: "Your team receives a complete call summary — who called, why, and how urgent — before they ever speak to the client.",
        },
      ],
    },
  },
  {
    slug: "finance",
    name: "Finance",
    label: "Finance",
    finalCtaNoun: "firm",
    metaDescription:
      "Gradia keeps your firm available when financial decisions get made. Every inquiry answered, every prospect qualified, every consultation booked.",
    hero: {
      headline: "Financial decisions don't wait for business hours.",
      sub: "Your next client is researching right now. If you're not available, your competitor is.",
    },
    pain: {
      headline: "Leads are slipping through at the worst possible moment.",
      points: [
        {
          number: "01",
          title: "Inbound leads call once",
          body: "Someone ready to open an account or discuss their portfolio calls once. No answer means they move to the next advisor.",
        },
        {
          number: "02",
          title: "After-hours inquiries go cold",
          body: "Financial decisions are made in the evening, after work, on weekends. Those calls hit voicemail and lose momentum overnight.",
        },
        {
          number: "03",
          title: "Unqualified calls eat advisor time",
          body: "Advisors spend hours on calls that don't convert. That's time off billable clients and revenue-generating work.",
        },
        {
          number: "04",
          title: "Inconsistent call handling",
          body: "Every call to your firm is a brand moment. An inconsistent or unprofessional first impression costs you the relationship.",
        },
      ],
    },
    midCtaHeadline:
      "How many clients chose a competitor because you were unavailable?",
    solutions: {
      headline: "Gradia keeps you available when it matters most.",
      items: [
        {
          number: "01",
          title: "Every inquiry answered instantly",
          body: "No lead goes cold. Gradia responds immediately — day, evening, or weekend.",
        },
        {
          number: "02",
          title: "Lead qualification before reaching your advisors",
          body: "Gradia filters and qualifies — your team only speaks to serious, ready prospects.",
        },
        {
          number: "03",
          title: "Consultations booked automatically",
          body: "Gradia schedules discovery calls directly into advisor calendars. No back and forth.",
        },
        {
          number: "04",
          title: "Consistent, professional call handling every time",
          body: "Every caller gets the same professional experience — on-brand, on-message, every call.",
        },
      ],
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);
