# NEXT TASK — Build the v2 homepage (Pass 2)

> **Work order for Claude Code (Builder role).** Review + adjustments come from the founder's
> Cowork session (Reviewer). Cursor runs independent QA at Pass 7 — not now.
> _Issued 2026-08-28. Supersedes the SEO work order (git history; SEO folds into Pass 1/5 per the plan)._

## Read first, in this order

1. `HANDOFF.md` — repo orientation (stack, gotchas, deploy).
2. `../platform/docs/gradia-v2/marketing-site/site-v2-plan.md` — **the plan of record.** Homepage = its §3 (9 sections). Design rules = §5.
3. `../_docs/WHAT_GRADIA_DOES.md` — the claim list. **If a claim isn't in §4, you don't write it.** §5 gates and §6 forbidden claims are hard rules.
4. The Pass 1 foundation (already merged to this branch): `app/v2/site-v2.css`, `components/site/primitives.tsx`, `components/site/SiteNav.tsx`, `components/site/SiteFooter.tsx`, and the style guide at `/v2`.

## Branch & workflow — non-negotiable

- Work **only on branch `site-v2`**. Never commit to `main` (it auto-deploys to trygradia.com, which is the live waitlist).
- Build the new homepage as `app/page.tsx` **on this branch** (replacing the waitlist page *in the branch only* — merge to main is the founder's cutover act, not yours).
- One commit per homepage section, descriptive message, push after each so Vercel previews update.
- After each pushed section, **stop and wait for review notes** in `REVIEW_NOTES.md` before starting the next section. Address notes in a follow-up commit before moving on.
- Do not touch the platform repo, the portal (`app/portal`), or `middleware.ts` beyond what already exists.

## Scope — the 9 sections (site-v2-plan §3, in order)

1. Hero — D-033 headline verbatim; CTA "Start your trial" / "See how it works"; trust line "Guided setup · You approve what goes out".
2. Problem — scattered tools consolidating into one Gradia surface; three pains max.
3. Connected flow — Capture → Understand → Prepare → **Approve** → Schedule → Retain; same sample customer throughout (Sarah Mitchell · 2024 BMW X5).
4. Operations dashboard — calm, prioritized; placeholder visual now (Pass 3 swaps in real UI).
5. Core operating system — four alternating full-width panels: Customers & Vehicles · Leads & Pipeline · Quotes, Jobs & Scheduling · Conversations.
6. Gradia Agent + control (ONE section) — ask → list → prepare → Review/Edit/Approve → logged. "Start with approvals. Money and calendar always ask."
7. Receptionist — **build it behind a flag, default HIDDEN** (`SHOW_RECEPTIONIST = false` constant). Not claimable until the telephony acceptance run passes.
8. Industries — four tiles linking to the five industry routes (pages come in Pass 5; links can 308 for now).
9. Final CTA — "Run the shop without the shop running you." + trust line incl. "Import your existing customers — no starting over."

**Deliberately absent — do not add:** credibility/logo strips, Customer Recovery, Meta Ads teaser, pricing numbers or tier names, testimonials, metrics, stock imagery. Trial copy allowed: "14-day guided trial · starts after your setup · trial usage limits apply" — nothing beyond that sentence.

## Build rules

- Use the Pass 1 primitives (`Section`, `Container`, `Card`, `Button`, `Eyebrow`, `Lead`, `SiteNav`, `SiteFooter`) and `--sv-*` tokens. Extend the primitives file if genuinely needed; never fork a parallel system. Check `/v2` before inventing any new pattern.
- Product visuals: Pass 2 uses clean structural placeholders (bordered frames with realistic sample data text, e.g. "Sarah Mitchell · 2024 BMW X5 · Full Detail + Ceramic Maintenance · $485"). No fake charts, no invented metrics. Pass 3 replaces these with real app UI.
- Copy: short. Headline → ≤2 sentences → visual. Customer language only — no "AI agents", "HITL", "orchestration", "context layer".
- Motion: restrained, explanatory only, `prefers-reduced-motion` respected; framer-motion is already a dependency. No always-running animation.
- Semantic HTML, real H1 (the D-033 headline), keyboard nav, visible focus, alt text, no horizontal overflow at any width, mobile-first.
- Keep JS light: no three.js/tsparticles/gsap on the new homepage (they belong to the old waitlist page and will be pruned at cutover).
- Keep JSON-LD/metadata work from the old SEO plan in mind but do NOT do it in Pass 2 — it rides in Pass 5/6.

## Tools you have (see CLAUDE.md for rules)

- **Playwright MCP** (`.mcp.json`) — screenshot every section at 375/768/1440 against `npm run dev`; review your own screenshots before pushing.
- **21st.dev MCP + registry** — inspiration search and featured shadcn-format components (`npx shadcn@latest add "https://21st.dev/r/<author>/<component>"`). Retoken everything to `--sv-*` before commit — no component ships with its own colors/fonts/spacing.
- **framer-motion** — already a dependency; one shared set of curves/durations.

## Definition of done (per section)

Compiles (`npx tsc --noEmit` clean) · Playwright screenshots reviewed at 375px, 768px, 1440px · every string passes the claim list · uses foundation primitives · committed + pushed · review notes addressed.
