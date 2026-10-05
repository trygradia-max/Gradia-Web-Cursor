# CLAUDE.md — Gradia marketing site (trygradia.com)

> **2026-10-01:** Website copy authority is
> `platform/docs/gradia-v2/marketing-site/MVP_WEBSITE_HANDOFF_2026-09-29.md`.
> Public CTA is **Request pilot access** → `/request-access`. No free trial, no $20 /
> founding / July launch copy, no public checkout prices. Work on a reviewable branch
> from `site-v2`. Do not merge `main` or production-deploy trygradia.com from a website
> update session. "Chief of Staff" is the public name for the summary screen.

You are the **Builder** for the site-v2 visual system. Keep typography, spacing and the
restrained palette. The work order below is historical except where it does not conflict
with the 2026-09-29 handoff.

## Non-negotiables

- NEVER commit or push to `main` (it auto-deploys the live site). Feature branches from `site-v2` are OK.
- No prices, plan entitlements or seat counts on public pages until billing matches.
- No free-trial language. Primary CTA is Request pilot access.
- No fake metrics, testimonials, logos, or stock imagery. Sample records are fictional and
  consistent (Sarah Mitchell · 2024 BMW X5 · Full Detail + Ceramic Maintenance · $485).
  Do not turn proposed quote value into revenue.
- Product UI frames use the caption **Product preview · sample business data**.
- Preserve A2P SMS consent wording in `lib/sms-consent.ts` (version 2026-09-05).

## Visual reference (founder-designated)

**trygtm.com** is the feel target — read `../platform/docs/gradia-v2/marketing-site/reference-trygtm.md`
(adopt vs do-not-copy) and screenshot the live site with Playwright before building sections 1–2.
Net rules: centered hero (chip eyebrow, ink pill CTA, underlined-text secondary, dark graphite
product frame below); monochrome-dominant — primary buttons are INK pills, violet is a signal
color only (links, focus, approval highlights); product UI always sits in graphite rounded frames.
Their aesthetic transfers; their autonomous-agents promise does NOT — Gradia is control-first.

## Design system (Pass 1 — already in repo)

- Tokens: `app/v2/site-v2.css` (`--sv-*`), scoped under `.site-v2`. Primitives:
  `components/site/primitives.tsx` (+ `SiteNav`, `SiteFooter`). Style guide: `/v2` route.
- Extend the primitives file when needed; never fork a parallel styling system.
- Premium-SaaS rules (Stripe/Linear/Vercel discipline): one typeface (Inter) with a systemic
  scale; neutrals + ONE accent (`--sv-accent`, violet) used for meaning, not decoration;
  hairline borders over shadows; design all interactive states (default/hover/focus/active/
  disabled/loading) with custom focus rings; consistent motion curves + durations, motion only
  where it explains; designed empty/loading states, never generic spinners; sparse layout,
  behavior-rich elements.

## Component sourcing (adapted from platform's COMPONENT-SOURCING-MAP, 2026-07-02)

- **The one rule: no component ships with its own colors, fonts, or spacing.** Anything pulled
  from 21st.dev/shadcn/anywhere is retokened to `--sv-*` before commit.
- 21st.dev install: `npx shadcn@latest add "https://21st.dev/r/<author>/<component>"`.
  Only pull **featured** (human-reviewed) components; check the component's license.
- Prefer building on the existing primitives over importing; import only when a component's
  structure/interaction genuinely beats what an hour of building gets.

## Tools (project MCP config in `.mcp.json`)

- **playwright** — after building each section, screenshot your own work at 375 / 768 / 1440px
  against `npm run dev` and LOOK at the screenshots before pushing. Fix what you see.
- **21st** — inspiration search + component registry (registered at user level via `claude mcp add`;
  search is free, installs capped on the free tier). Use for sourcing, then retoken.

## Brand rules (founder-set, 2026-08-29)

- **"Gradia asks first."** is the brand line for the approval moat. "Asks-first" is the
  house adjective (asks-first automation). Use it; never dilute it with "human-in-the-loop"
  or other jargon in public copy.
- The violet ✓ "Approved by you" check is the formal brand mark — identical treatment
  wherever an approval moment appears.
- Competitors are NEVER named on the site. Contrast with "the industry default" /
  "typical AI receptionists" only.

## Naming rules (founder-set)

- The dashboard is called **"Home"** in public copy ("your business, prioritized"). NEVER
  "Chief of Operations" / "Chief of Staff" — internal names, banned on the site.
- Operational counts in sample UI are allowed ("3 leads need a reply", "5 open quotes ·
  $3,850"). The **ROI receipt** (leads caught · replies sent for you · bookings secured ·
  $ in booked work · ~time saved · customers revived) is a REAL product feature and may be
  shown as sample UI inside "Sample data" frames, labels matching the real component.
  Marketing PROSE may never make aggregate performance claims ("shops save X hrs/week",
  revenue growth, customer counts) — that ban is permanent.

## Process hygiene

- When you start a dev server or any background process, record its PID and stop ONLY that
  PID at cleanup. Never `pkill`/`killall` by name or pattern — the founder runs other dev
  servers and Claude sessions on this machine (incident 2026-08-29: a `pkill -f "next dev"`
  killed the founder's unrelated dev server).

## Stack facts

Next.js 15 App Router · React 19 · Tailwind v3 (config zeroes border-radius globally — use
arbitrary values like `rounded-[var(--sv-radius)]` in v2 components) · framer-motion available ·
Node 20 (`nvm use`) · `npm run dev` → localhost:3000 · new homepage must NOT import
three.js/gsap/tsparticles.
