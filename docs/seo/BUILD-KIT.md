# SEO Build Kit — ready-to-paste assets

> Concrete snippets for the work in `../../NEXT_TASK.md`. Claude Code should adapt these to the codebase's conventions, not paste blindly. Replace every `TODO` placeholder with a real value before shipping.

---

## 1. Homepage metadata (`app/layout.tsx`)

Replace the current `title.default` / `description`:

```ts
title: {
  default: "AI Front Office for Car Detailers — Answer, Quote & Book 24/7",
  template: "%s · Gradia",
},
description:
  "AI software for car detailers: Gradia's 7 AI agents answer every call, quote any car from a photo, fill your calendar, and chase invoices — so you keep your hands on the car. Join the waitlist.",
```

Keep the existing `keywords`, `openGraph`, and `twitter` blocks (update their `title`/`description` to match the new homepage title for consistency).

---

## 2. Structured data / JSON-LD

Create `components/marketing/StructuredData.tsx` and render it once in `app/page.tsx` (or in `app/layout.tsx` if you want it site-wide). Three blocks:

```tsx
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trygradia.com";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gradia",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI front office for car detailers — 7 AI agents that answer calls, quote cars, book jobs, and chase invoices.",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      // Pre-launch: pricing not public yet. Use the waitlist URL.
      // When pricing is live, set price + priceCurrency here.
      url: `${siteUrl}/#waitlist`,
      availability: "https://schema.org/PreOrder",
    },
    // Add aggregateRating ONLY when you have real reviews — never fabricate.
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gradia",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    email: "trygradia@gmail.com",
    sameAs: [
      // TODO: replace with REAL profile URLs (footer currently links placeholders)
      "https://instagram.com/TODO",
      "https://tiktok.com/@TODO",
      "https://x.com/TODO",
      "https://youtube.com/@TODO",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // Mirror the EXACT Q&A already rendered in the FAQ section of app/page.tsx.
    // Keep question/answer text in sync with the visible content (Google requires it).
    mainEntity: [
      {
        "@type": "Question",
        name: "What exactly is Gradia?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Gradia is a 7-agent AI front office built for car detailers. The agents answer your calls and DMs, quote cars from a photo, book and reschedule jobs, send and chase invoices, post your before/afters, ask for reviews, and re-engage cold leads — so you can keep your hands on the car.",
        },
      },
      // TODO: add the remaining visible FAQ items (Do I have to change how I work?,
      // How much will it cost?, When does it launch?, Who owns my customer data?)
    ],
  },
];

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

Validate at https://search.google.com/test/rich-results before/after deploy.

---

## 3. robots (`app/robots.ts`)

Add if it doesn't exist:

```ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trygradia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/portal", "/api"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
```

---

## 4. Re-enable hidden pages — `middleware.ts`

Today the `isFunctional` check only allows `/`, `/api`, `/portal`; everything else 307s to `/`. Add an allowlist of the SEO routes you want live. Example:

```ts
const seoAllowlist = [
  "/pricing",
  "/industries",      // covers /industries/[slug]
  "/resources",       // covers the blog articles
  // add others as you re-target them: "/the-cost", "/the-gap", "/the-proof"
];

const isFunctional =
  pathname === "/" ||
  pathname.startsWith("/api") ||
  pathname.startsWith("/portal") ||
  seoAllowlist.some((p) => pathname === p || pathname.startsWith(p + "/"));
```

Reference `_backup/middleware.original.ts` for the pre-takedown behavior. Keep `/privacy` and `/terms` decisions deliberate.

---

## 5. Sitemap — `app/sitemap.ts`

Currently root-only. Add every route you re-enable. Example:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase();
  const routes = ["/", "/pricing", "/resources", "/industries"]; // keep in sync with middleware allowlist
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
```

For `industries/[slug]` and individual resource articles, enumerate their slugs so each gets its own sitemap entry. Reference `_backup/sitemap.original.ts`.

---

## 6. Content re-targeting (the `resources/` articles)

Existing articles skew generic/healthcare. Re-target to detailer buyer-intent (full list in `Gradia-SEO-Audit-Action-Plan.md` §5). Priority rewrites:

| Existing slug | Re-target toward |
|---|---|
| why-every-missed-call-costs-more-than-you-think | Keep, but reframe with **detailer** numbers ("a missed call = a lost $640 detail") |
| the-roi-of-an-always-on-digital-front-desk | "The ROI of an AI front office for a detailing shop" |
| front-desk-automation-for-healthcare-practices | Replace entirely → "How mobile detailers handle calls while their hands are wet" |

Each: keyword in title/H1/URL slug, unique metadata, internal link to `/#waitlist`.

---

## Verification checklist (before deploy)

- [ ] Rich Results Test passes for SoftwareApplication, Organization, FAQPage.
- [ ] FAQ JSON-LD text matches the visible FAQ word-for-word.
- [ ] Every re-enabled route returns 200 (not 307) and has unique title + description.
- [ ] `/sitemap.xml` lists exactly the live routes; middleware allowlist matches.
- [ ] No service-role keys or secrets introduced.
- [ ] `npm run build` succeeds locally.
