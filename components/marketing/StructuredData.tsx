/**
 * Homepage JSON-LD. SoftwareApplication (pre-launch — PreOrder offer, no
 * fabricated price/rating), Organization (no sameAs until real social profiles
 * exist), and FAQPage. The FAQ entries below MUST stay word-for-word in sync
 * with the visible FAQ in components/waitlist/WaitlistFAQ.tsx (Google requires
 * the marked-up text to match what users see).
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trygradia.com";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What exactly is Gradia?",
    a: "Gradia is an AI office for auto detailers — two agents that share one brain. A voice agent answers your calls 24/7, quotes and books over the phone, and handles reschedules. A chat agent follows up with every new lead and revives the ones you forgot, by text and email. You approve everything before it sends, and it all lives in one CRM and calendar you own.",
  },
  {
    q: "Do I have to change how I work?",
    a: "No. Gradia plugs into the phone number, inbox, and calendar you already use. The agents draft and stage the work in the background — but nothing gets sent or booked until you approve it. AI does the work; you stay in control.",
  },
  {
    q: "How much will it cost?",
    a: "$20/month — less than one detail. The founding 100 lock in 50% off for life ($10/month), plus early access to new features and our private beta, and the next 900 get 50% off their first month.",
  },
  {
    q: "When does it launch?",
    a: "Gradia launches July 10, 2026. We're in private beta now, and founding members get early access ahead of launch. Join the waitlist and we'll email you the moment your spot opens.",
  },
  {
    q: "Who owns my customer data?",
    a: "You do. Every customer, vehicle, quote, and job lives in one place you fully own and can export anytime. Always portable, always yours.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gradia",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "AI office for auto detailers — two agents that share one brain. A voice agent answers calls 24/7 and books over the phone; a chat agent follows up with leads by text and email. You approve everything before it sends. $20/month.",
    releaseDate: "2026-07-10",
    offers: {
      "@type": "Offer",
      price: "20",
      priceCurrency: "USD",
      url: `${siteUrl}/#waitlist`,
      availability: "https://schema.org/PreOrder",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gradia",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    email: "trygradia@gmail.com",
    sameAs: [
      "https://www.instagram.com/trygradia/",
      "https://x.com/TryGradia",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
