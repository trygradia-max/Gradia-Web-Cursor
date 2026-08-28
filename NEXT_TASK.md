> **Note (2026-08-28):** still tactically valid, but the site is being rebuilt per `../platform/docs/gradia-v2/marketing-site/site-v2-plan.md` — read that first; SEO work folds into its Pass 1/Pass 5.

# NEXT TASK — SEO: get trygradia.com ranking for buyer searches

> Work order for Claude Code. Read `HANDOFF.md` first for repo orientation, then the full strategy in `docs/seo/Gradia-SEO-Audit-Action-Plan.md`. Ready-to-paste snippets (metadata, JSON-LD, robots, middleware/sitemap diffs) are in `docs/seo/BUILD-KIT.md`. **Goal:** rank for high-intent searches car detailers actually make (e.g. "AI receptionist for car detailers", "car detailing software", "stop missing calls detailing") — NOT vanity terms like "newest AI startup".

## Before you write any code

1. Read `docs/seo/Gradia-SEO-Audit-Action-Plan.md` (full keyword strategy + 30/60/90 plan).
2. Explore the repo and confirm the current state of:
   - `middleware.ts` (the takedown redirect — this is gating everything)
   - `app/(marketing)/*` (the existing hidden pages)
   - `app/sitemap.ts`, `app/layout.tsx` (metadata)
3. **Report back a plan before editing.** Don't bulk-change. Propose, get approval, then implement section by section, committing after each.

## The key realization

The SEO pages **already exist** — they're just turned off by the takedown middleware (see `HANDOFF.md`). So most of this task is **re-enabling and re-targeting**, not greenfield building.

---

## Phase 1 — Fast, safe, on the page that's already live (do first)

These touch only the live homepage and metadata. Low risk.

1. **`app/layout.tsx` metadata**
   - Tighten the `title.default` to lead with the primary keyword, e.g. `AI Front Office for Car Detailers — Answer, Quote & Book 24/7`.
   - Front-load "AI software for car detailers" in the first words of `description`.
   - (The `keywords` array is fine but note Google ignores the keywords meta tag — don't over-invest there.)
2. **`app/page.tsx`** — ensure a real, crawlable H1 contains the primary keyword (the current visual headline "A front office that never sleeps" is great for humans but keyword-invisible). Keep the visual headline; add/adjust a semantic H1.
3. **Image alt text** — add descriptive alt to hero/screenshot images across `components/marketing/` and `components/waitlist/` (e.g. "Gradia AI receptionist booking a car detailing job").
4. **Structured data (JSON-LD)** — add to the homepage:
   - `SoftwareApplication` (category, offers/pricing, brand)
   - `FAQPage` (the FAQ already rendered on the page — mark it up for rich results; high ROI)
   - `Organization` (name, logo, sameAs social links)
   Implement as `<script type="application/ld+json">` via Next metadata or a component. Validate with Google Rich Results Test.

## Phase 2 — Re-enable the hidden pages (the #1 structural lever)

1. In `middleware.ts`, whitelist the SEO-valuable routes so they stop 307-redirecting to `/`. Extend the `isFunctional` check (or the matcher) to allow the chosen paths. Reference `_backup/middleware.original.ts` for the pre-takedown logic.
2. Add each re-enabled route to `app/sitemap.ts` (currently root-only). Reference `_backup/sitemap.original.ts`.
3. **Re-target the content for detailers.** The existing `resources/` articles skew generic/healthcare ("front-desk-automation-for-healthcare-practices"). Rewrite/replace toward detailer buyer-intent topics from the audit (§5), e.g.:
   - "How mobile detailers handle calls while their hands are wet"
   - "What a missed call really costs a detailing shop"
   - "AI receptionist vs. answering service for detailers"
   - "How to quote a car detail from a single photo"
4. Use the `industries/[slug]` dynamic route for per-audience landing pages (mobile detailer, shop owner, ceramic/PPF installer) — it's already scaffolded.
5. Give every re-enabled page a unique `title` + `description` + canonical, and a keyword-aligned H1.

## Phase 3 — Technical SEO

- [ ] `robots.txt` (or `app/robots.ts`) allows crawl + points to sitemap.
- [ ] Canonical tags on every page.
- [ ] Confirm pages are server-rendered (they are — Next App Router) and not blocked by middleware after Phase 2.
- [ ] Core Web Vitals: the hero uses three/gsap/tsparticles — lazy-load below-the-fold and check PageSpeed on mobile (most detailers search on phones).

## Out of scope for Claude Code (Harry handles — account/manual)

- Verify Google Search Console + Bing Webmaster, submit sitemap.
- Claim G2 / Capterra / GetApp listings.
- Product Hunt / BetaList launch, link outreach, detailing-creator shout-outs.
- Resolve the open `www` DNS item (see `HANDOFF.md`).

## Definition of done (this task)

- Homepage metadata + H1 + alt text + JSON-LD shipped and validating.
- Chosen marketing/resource pages reachable (no longer 307'd), in the sitemap, detailer-targeted, each with unique metadata.
- `robots` + canonicals in place.
- Each phase committed separately with clear messages.
