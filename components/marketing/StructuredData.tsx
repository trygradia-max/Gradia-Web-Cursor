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
    a: "Gradia is a 7-agent AI front office built for car detailers. The agents answer your calls and DMs, quote cars from a photo, book and reschedule jobs, send and chase invoices, post your before/afters, ask for reviews, and re-engage cold leads — so you can keep your hands on the car.",
  },
  {
    q: "Do I have to change how I work?",
    a: "No. Gradia plugs into the phone number, inbox, and calendar you already use. Your agents work in the background; you approve anything you want to keep an eye on, and ignore the rest.",
  },
  {
    q: "How much will it cost?",
    a: "Less than one detail a month. Final pricing is set before launch — the founding 100 lock in 50% off for life plus early access to new features and our private beta, and the first 1,000 get 50% off their first month.",
  },
  {
    q: "When does it launch?",
    a: "We're in private beta now and opening up in waves. Join the waitlist and we'll email you the moment your spot is ready.",
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
      "AI front office for car detailers — 7 AI agents that answer calls, quote cars from a photo, book jobs, collect payments, and win back old customers.",
    offers: {
      "@type": "Offer",
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
      "https://www.linkedin.com/in/gradia-undefined-4100963a9/",
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
