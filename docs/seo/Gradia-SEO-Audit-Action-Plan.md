# Gradia SEO Audit & Action Plan
**Site:** trygradia.com · **Goal:** rank for buyer searches (detailers actively looking to book more jobs) · **Date:** June 2026

---

## The honest headline first

You asked to rank for "startups," "AI," and "newest startup built for." **Don't chase those.** No car detailer who is ready to pay you types "newest AI startup" into Google. They type *"car detailing software,"* *"how to stop missing calls,"* and *"AI receptionist for detailers."* Those are the searches that turn into waitlist signups. "Startup / AI / newest" terms attract press, other founders, and tire-kickers — not buyers. I've built this plan around the searches your actual customers make. (There's a small, optional brand-buzz play at the end if you still want it — but it's tier 3, not where the effort goes.)

Second honest point: **your domain is brand new with near-zero authority.** You will *not* outrank Jobber, Urable, or OrbisX for the head term "car detailing software" this year — they have years of backlinks and content. The winning move for a new startup is to **own the long-tail, high-intent terms where you're differentiated (AI front office, AI quoting, missed-call recovery) and build a content engine** so you compound over 6–12 months. This plan does exactly that.

---

## 1. The #1 structural problem: you have one page

Right now `trygradia.com` is a single landing page with anchor sections (`#cast`, `#day`, `#why`). Google ranks **pages, not sections.** One page can realistically rank for *one* primary topic. Your competitors each have **dozens** of dedicated, indexable pages:

- Jobber → `/industries/auto-detailing-software/`
- Urable → `/vehicle-care/`
- Dialzara → `/industries/auto-detailing`
- NextPhone → a whole blog (`/blog/car-detailing-answering-service`)

**Every keyword you want to rank for needs its own URL.** This is the single biggest lever. Until you add pages, the rest is polishing one page that can only go so far.

---

## 2. Keyword strategy — what to actually target

Organized by tier. Start at Tier 1 (winnable now), expand into Tier 2 as authority builds. Tier 3 is the "buzzy" stuff — optional.

### Tier 1 — Win these first (high intent, lower competition, you're differentiated)
| Keyword | Why it's winnable | Target page |
|---|---|---|
| AI receptionist for car detailers | Few specialized players; your 7-agent angle is unique | Dedicated page |
| AI front office for detailers | Almost nobody owns this phrase — it's *your* category | Homepage H1 + page |
| AI answering service for auto detailers | High buyer intent, growing | Dedicated page |
| AI quoting app for car detailers / quote a car from a photo | Your Estimator is a genuine differentiator | Feature page |
| stop missing calls car detailing | Pain-driven, blog-friendly | Blog post |
| ceramic coating business software | Niche, qualified buyers | Use-case page |
| mobile detailing app / software | Big sub-segment of your audience | Audience page |

### Tier 2 — Build toward these (high volume, high competition — 6–12 mo)
| Keyword | Reality |
|---|---|
| car detailing software / auto detailing software | Head term; owned by Jobber/Urable. Need authority + content first |
| auto detailing CRM / detailing CRM | Competitive but core to your platform pitch |
| car detailing booking / scheduling / appointment software | Competitive; strong commercial intent |
| car detailing invoicing software | Competitive but specific |

### Tier 3 — Optional brand buzz (low buyer value — do last, if ever)
"AI for car detailing 2026," "newest AI tool for detailers," "AI detailing startup." Better served by PR, Product Hunt, YouTube, and Reddit than by SEO. Don't build core pages around these.

---

## 3. On-page fixes (do this week — fast wins on the page you already have)

**Current title:** `Gradia — Your 7-agent front office for car detailers` ✅ decent, keep the structure but test a more search-aligned variant.

**Current H1:** "A front office that never sleeps." → Great for humans, invisible to search. Google reads your H1 as the page's topic. Add the keyword.

| Element | Now | Recommended |
|---|---|---|
| Title tag | 7-agent front office for car detailers | `AI Front Office for Car Detailers — Answer, Quote & Book 24/7 \| Gradia` |
| Meta description | Good already | Keep, but front-load "AI software for car detailers" in first 5 words |
| H1 (visible) | A front office that never sleeps | Keep as visual headline **but** ensure an SEO H1 exists: `AI Front Office Software for Car Detailers` (can be visually styled/small) |
| Image alt text | Mostly missing | Add descriptive alt to every screenshot: "Gradia AI receptionist booking a car detailing job" |
| URL anchors | `#cast`, `#day` | Fine for one page — but build real `/` sub-pages (see §1) |

**Rule of thumb:** your primary keyword should appear in the title, the H1, the first 100 words of body copy, and at least one subheading. Right now the phrase "car detailing software" / "AI receptionist" barely appears in crawlable copy — it's mostly in product UI mockup text, which Google weights lightly.

---

## 4. Schema markup (add to `<head>` — helps you show up richer in results)

You currently have good Open Graph tags but no structured data. Add JSON-LD for:

1. **SoftwareApplication** — tells Google you're a software product (category, price, rating). Eligible for rich snippets.
2. **FAQPage** — you already have a visible FAQ ("What exactly is Gradia?" etc.). Marking it up can win you expandable FAQ results directly in the SERP. **High ROI, low effort.**
3. **Organization** — name, logo, social profiles; feeds your brand knowledge panel.

(Ask me and I'll generate the ready-to-paste JSON-LD blocks — you chose the audit format, so I left code out, but it's a 20-minute add.)

---

## 5. The content engine (where new startups actually win)

You can't out-authority incumbents on product pages yet — but you can out-publish them on the **questions detailers ask**. Each article targets a long-tail keyword, builds topical authority, and links back to your waitlist. Ship 1–2 per week.

**First 10 articles, mapped to real searches:**
1. "How mobile detailers handle calls while their hands are wet" → *stop missing calls car detailing*
2. "What a missed call really costs a detailing shop" → *missed call cost detailing* (cite the 62% / $14K stats)
3. "AI receptionist vs. answering service for detailers: which is worth it?" → *AI receptionist for detailers*
4. "How to quote a car detail from a single photo" → *car detail quoting / AI quoting*
5. "The best software for car detailing businesses in 2026 (honest comparison)" → *car detailing software* (comparison posts rank for head terms without head-term authority)
6. "How to fill a detailing calendar without chasing customers" → *detailing scheduling software*
7. "Ceramic coating upsells: how to add $1,000 to a booking" → *ceramic coating business*
8. "Getting more 5-star reviews as a detailer (automatically)" → *detailing reviews*
9. "Solo detailer to booked-solid: running the business side without an employee" → *mobile detailing software*
10. "Should detailers use AI to run their front office?" → *AI for car detailing* (catches your Tier 3 buzz term too)

Each post: 1,000–1,500 words, one clear keyword in the title/H1/URL, internal link to the waitlist, a real stat or two. This is how you'll start ranking in 60–90 days and compounding after.

---

## 6. Technical SEO checklist

Good news: the site appears server-rendered (Next.js), so it's crawlable — that's a common SPA killer you've avoided. Verify/complete:

- [ ] **Google Search Console** + **Bing Webmaster** verified (non-negotiable — this is how you see what you rank for)
- [ ] **XML sitemap** submitted (`/sitemap.xml`) — must list every new page you build
- [ ] **robots.txt** allows crawling and points to the sitemap
- [ ] **Each new page has a unique title + meta description** (no duplicates)
- [ ] **Canonical tags** on every page
- [ ] **Page speed**: keep the heavy animated mockups from blocking load (lazy-load below-the-fold; check Core Web Vitals in PageSpeed Insights)
- [ ] **Mobile-first**: most detailers search on their phone — confirm mobile layout + speed
- [ ] **Alt text** on all images (see §3)
- [ ] **Internal linking**: every blog post links to relevant feature/waitlist pages

---

## 7. Off-page / authority (the part that actually moves rankings)

Rankings = relevance (on-page) **×** authority (links + signals). For a new domain, authority is the bottleneck. Fastest legitimate sources:

- **Product Hunt + BetaList launch** — links + the "new startup" buzz you wanted, in the right place.
- **Software directories**: G2, Capterra, GetApp, Software Advice (all let you list; many detailers browse these). Also niche: detailing forums/Facebook groups.
- **Local / industry**: detailing subreddits (r/AutoDetailing), Facebook detailer groups, detailing podcasts/YouTubers — a single shout-out from a detailing creator beats 50 generic links.
- **Comparison/alternative pages**: "Gradia vs. [competitor]" pages capture people already shopping.
- **HARO / founder PR**: pitch "AI front office for blue-collar businesses" angles to get cited.

Aim for 5–10 quality, relevant links in the first 90 days — quality over volume.

---

## 8. Prioritized 30 / 60 / 90-day plan

**Days 1–30 (foundation + fast wins)**
1. Set up Google Search Console + Bing Webmaster + sitemap + robots.txt
2. Rewrite homepage title, H1, alt text per §3
3. Add SoftwareApplication + FAQPage + Organization schema (§4)
4. Claim G2 / Capterra / GetApp listings
5. Build the first 3 dedicated pages: **AI Receptionist**, **AI Quoting**, **For Mobile Detailers**

**Days 31–60 (content + pages)**
6. Publish 6–8 blog posts from §5
7. Build 2 more pages: **AI Front Office** (category page) + **Ceramic Coating businesses**
8. Product Hunt / BetaList launch
9. Start internal linking everything to the waitlist

**Days 61–90 (compound + measure)**
10. Publish 6–8 more posts; refresh any that are ranking page 2 → page 1
11. Build "Gradia vs. [competitor]" comparison pages (Urable, OrbisX, Jobber)
12. Outreach to detailing creators/forums for links
13. Review Search Console: double down on whatever queries are already getting impressions

---

## 9. How you'll know it's working

Track monthly in Search Console: **impressions** (are you showing up at all?), **clicks**, **average position** for your Tier 1 keywords, and **which queries** you appear for. Expect: meaningful impressions by week 6–8, first page-1 long-tail rankings by month 3, head-term movement months 6–12. Waitlist signups from organic search is the real scoreboard.

---

### Bottom line
Your copy and design are strong — the SEO gap is **structural** (one page) and **strategic** (chasing buzz terms instead of buyer terms). Add real pages, target the high-intent long-tail where you're genuinely differentiated, ship consistent content, and earn a handful of quality links. That's the playbook that gets a new detailer-focused startup found by people ready to buy.
