# REVIEW_NOTES — site-v2 build

> Loop: Claude Code pushes a section → Reviewer writes notes here → Claude Code addresses
> them in a follow-up commit and checks the box → next section.

## Review — Section 1: Hero (e168720) — 2026-08-29

**VERDICT: APPROVED — no blocking changes. Proceed to Section 2 (Problem) after reading the notes below.**

Verified: D-033 headline + support copy verbatim · chip eyebrow · ink pill + underlined
secondary per reference-trygtm · trust line correct · graphite frame labeled "Sample data"
with the canonical record (Sarah Mitchell · 2024 BMW X5 · $485) · approve-step highlighted
in accent — the control differentiator is visible in the hero itself, which is exactly right ·
metadata override so waitlist-era title/description never rides on this page — good catch ·
every string passes WHAT_GRADIA_DOES §4. The foundation-fixes commit (f28f6d0) was audited:
all seven fixes are legitimate Pass-1 bugs (the Tailwind `text-[var()]` length/color
ambiguity was real and would have poisoned every size utility) — good work.

Carry-forward notes (address in later sections, not as rework now):

- [ ] **N1 (founder decision, before cutover):** `Start your trial` points at `/#trial`,
  which doesn't exist — there is no signup flow yet. Decide the CTA destination at cutover:
  platform-app signup route, or waitlist capture until trial build (D-035/E01) ships.
  Until decided, the dead anchor is acceptable on the branch only.
- [x] **N2:** `See how it works` targets `#how` — Section 3 (Connected flow) must carry
  `id="how"` when built. _Done with Section 3; anchor verified (see review below)._
- [x] **N3:** Extract the sample record (Sarah Mitchell / 2024 BMW X5 / Full Detail +
  Ceramic Maintenance / $485) into `components/site/sample.ts` and import it in every
  section that shows product UI (3, 4, 5, 6). The continuity of ONE record across the page
  is the moat being demonstrated — it must be impossible for sections to drift.
  _Done with Section 2: `sample.ts` created; Hero + Problem now import SAMPLE._
- [ ] **N4 (founder, tooling):** Reviewer cannot see Vercel branch previews — Deployment
  Protection redirects to Vercel login. Either review previews yourself each round, or
  disable protection for preview deployments on `gradia-web-cursor` so the reviewer can
  screenshot them.

## Review — Section 2: Problem (b3c9800) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to Section 3 (Connected flow).**

Verified: §3.2 headline verbatim · the scattered/consolidated visual tells the right story —
the SAME lead (via SAMPLE) hiding in six places, then one clean record · sharp claim
discipline: "Instagram DM, unread" sits only on the *today/scattered* side (the shop's current
reality), while the Gradia surface lists exactly the claimable channels ("Texts + email, one
thread") — this is precisely how to show the problem without over-claiming the product ·
three pains match the plan and the copy is strong ("nothing moves unless you touch it") ·
N3 done properly: `sample.ts` canonical, Hero + Problem both import it, checkbox updated ·
band alternation correct · primitives used throughout.

Notes:
- The consolidation motion (chips flowing into the surface) is correctly deferred to Pass 4 —
  do not add it now.
- **Reminder for Section 3: it must carry `id="how"` (N2).** Same customer (SAMPLE) through
  all six stages; Approve is the highlighted stage, consistent with the hero's treatment.

## Review — Section 3: Connected flow (d25df2d) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to Section 4 (Operations dashboard).**

Verified: all six §3.3 stages in order · SAMPLE record persists through every stage with its
state shown at each moment — the one-example technique executed properly · `id="how"` present,
hero anchor resolves (N2 ✅) · Approve is the lifted, accent-marked stage — consistent with the
hero, so the control story now repeats twice before section 6 argues it · every line passes the
claim list ("Nothing goes out until you say so" = guarantee #1; Retain is "drafted for your
review", not auto-sent) · "lands in Gradia — not in six inboxes" ties back to Section 2 ·
semantic `<ol>` · band alternation correct.

Notes:
- This section is deliberately the page's centerpiece and currently reads as a competent list.
  That is CORRECT for Pass 2 — but flagging now so it isn't forgotten: Pass 3 gives each stage
  a real UI vignette, and Pass 4's scroll motion (the record visibly traveling down the stages)
  is what makes this section the demo. Do not ship cutover before this section gets its
  Pass 3/4 treatment.

## Review — Section 4: Operations dashboard (f4196ef) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to Section 5 (Core operating system).**

Verified: zero analytics/counts/charts — every row is an operational item, exactly per the
#17-is-building guardrail · every outbound framed approve-first ("Waiting for your review",
"you approve before it goes out") · timeline continuity is excellent: Sarah's quote is now
"Accepted · job booked" (consistent with Section 3) and the frame's clock (Tuesday 7:58 AM)
sits just before her 9:00 AM job — the page reads as one morning in one shop · no second
invented customer name (walk-in and anonymous lead only) · accent reserved for the
recommended-actions/approval signal · band alternation correct.

Design watch-item for Section 5 (important): the page now has FOUR graphite frames in a row
(hero, problem, flow, dashboard). Section 5's four alternating panels must break this rhythm —
screens sit in LIGHT surface cards (hairline border, white surface) with smaller graphite
used only inside where product chrome genuinely needs it. Do not build a fifth full-width
dark frame; the page must not become a graphite tunnel.

## Next up

Section 5 — Core operating system ("Everything stays connected."), per NEXT_TASK.md scope 5:
four alternating full-width panels — Customers & Vehicles · Leads & Pipeline · Quotes, Jobs &
Scheduling · Conversations. One headline + one sentence + one screen each; alternate
image/text left-right; light section (alternation after the wash band). Screens in LIGHT
surface cards per the design watch-item above. Conversations = texts + email only. SAMPLE
everywhere a record shows. Same rhythm: build, screenshot, review, push, stop.
