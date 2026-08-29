# CLAUDE.md — Gradia marketing site (trygradia.com)

You are the **Builder** for the site-v2 rebuild. The work order is `NEXT_TASK.md` — read it,
plus `HANDOFF.md`, `../platform/docs/gradia-v2/marketing-site/site-v2-plan.md` (plan of record),
and `../_docs/WHAT_GRADIA_DOES.md` (claim law) before writing code.

## Non-negotiables

- Branch `site-v2` only. NEVER commit or push to `main` (it auto-deploys the live site).
- Every public-facing string must pass `../_docs/WHAT_GRADIA_DOES.md` §4. Its §5 gates and §6
  forbidden claims are law. No prices/tier names on any page; trial copy is exactly
  "14-day guided trial · starts after your setup · trial usage limits apply."
- No fake metrics, testimonials, logos, or stock imagery. Sample records are fictional and
  consistent (Sarah Mitchell · 2024 BMW X5 · Full Detail + Ceramic Maintenance · $485).
- One commit per homepage section, push, then STOP and wait for `REVIEW_NOTES.md`.

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

## Stack facts

Next.js 15 App Router · React 19 · Tailwind v3 (config zeroes border-radius globally — use
arbitrary values like `rounded-[var(--sv-radius)]` in v2 components) · framer-motion available ·
Node 20 (`nvm use`) · `npm run dev` → localhost:3000 · new homepage must NOT import
three.js/gsap/tsparticles.
