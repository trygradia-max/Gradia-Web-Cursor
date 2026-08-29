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

## Review — Section 5: Core operating system (aa20c99) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to Section 6 (Gradia Agent + control).**

Verified: the graphite-tunnel watch-item was followed exactly — light surface screens with a
wash chrome strip, alternating sides; the page now breathes · Conversations is texts + email
only, with the draft chip in accent-soft "waiting for your review" — the approval signal
stays consistent across every surface · all four panel lines are claim-safe and well written
("so none of them get lost" · "you approve what goes out") · SAMPLE used wherever Sarah
appears; pipeline/inbox extras stay nameless · no fake metrics ("customer since spring" is
the right kind of vague).

Accepted with rationale (not a defect): the Customer-record screen shows Sarah's job
*completed* with the next maintenance reminder drafted, while Sections 3–4 show it upcoming.
Each §5 panel deliberately shows its feature at its most illustrative moment (inbox = day
one; record = after the job), and each screen is self-contained. Fine as-is — but if Pass 3's
real-UI compositions can make the record panel read clearly as "later," take the opportunity.

## Review — Section 6: Gradia Agent + control (d2c05c5) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to Section 7 (Receptionist, flag-hidden).**

Verified: the demo runs the exact §3.6 sequence — ask → result list → "Prepare follow-ups" →
Prepared (accent label) → Review/Edit pills with Approve as the single solid-accent action →
activity log "approved by you · sent · logged" · every step staged, zero autonomous framing ·
closes on the trust copy with "Money and calendar always ask." emphasized · action pills are
non-interactive spans, so the demo doesn't fake affordances · PPF casing self-caught and fixed.

Reviewer note on the continuity call: the Builder correctly OVERRODE my "Sarah is fine" note —
Sarah is booked in this page's timeline, so she cannot appear in a "hasn't booked" list. The
nameless result list is right and my note was wrong. This is exactly the kind of pushback the
loop should produce; keep doing it.

## Next up

Section 7 — Receptionist, per NEXT_TASK.md scope 7: build the full section but ship it
HIDDEN behind `SHOW_RECEPTIONIST = false` (telephony acceptance run pending; claim law §5).
Copy per site-v2-plan §9.3 honest framing: "Don't lose the customer because you're under a
car." + "Gradia captures, organizes and prepares the opportunity so your business can respond
properly." No quote/book-on-calls claims while gated. IMPORTANT: compute band alternation
from VISIBLE sections — with 7 hidden, Industries (8) follows band-6 and must be light;
verify alternation still holds for when 7 flips visible later (acceptable: revisit
alternation at un-hiding). Then continue straight into Section 8 (Industries) in the same
work cycle — four tiles → the five industry routes, one sentence each, SAMPLE-consistent
imagery notes only. Build both, screenshot, push once, stop.
