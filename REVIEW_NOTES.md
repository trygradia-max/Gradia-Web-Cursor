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

## Review — Sections 7+8: Receptionist (4c0ca7f, hidden) + Industries (2f052eb) — 2026-08-29

**VERDICT: BOTH APPROVED — no changes required. Proceed to the final cycle: Sections 9 (FAQ) + 10 (Final CTA).**

Section 7: flag-gating verified in page.tsx · copy stays strictly inside the §9.3 honest frame
("captures, organizes and prepares") · the demo wisely shows a MISSED call being kept rather
than an answered call — under-claiming in exactly the right direction · "nothing goes out on
its own" · nameless caller with documented rationale. Note for un-hide day: when the
acceptance run passes, this section may upgrade to answering/quoting claims (Pro tier's
actual capability) — the current copy is the floor, not the ceiling.

Section 8: four tiles carrying five routes (Mobile & fleet pairing is a clean solve) · tile
sentences describe each trade's reality with the one-system claim as the only product claim ·
"an expensive quote going quiet costs the most" is the sharpest line on the page · accent
used only for links (designated signal) · alternation reasoning documented · dead 308 links
acceptable on branch, pages land in Pass 5.

## Review — Sections 9+10: FAQ (09da270) + Final CTA (609a02a) — 2026-08-29

**VERDICT: BOTH APPROVED. ✅ PASS 2 HOMEPAGE COMPLETE — all 10 sections built (9 visible, Receptionist flag-hidden).**

Section 9: native <details>, no JS accordion · all six answers inside claim law · the honest
ones land ("Only if you turn autonomy on… money and calendar always ask" · "Could Gradia spam
my customers? No — hard caps, cooldowns, opt-outs honored before staging") · import answer
carries its beta label (D-028) · correctly no receptionist or pricing questions yet.
Section 10: full-bleed graphite mirror of the hero · inverse (white) pill keeps monochrome
discipline · trust line includes the import reassurance verbatim · carries id="trial".

## Full-page pass (Pass 2 complete) — Reviewer, 2026-08-29

1. **Narrative** — one record travels the whole page: text message → one record → quote →
   approved → booked (Tue 9:00) → completed → maintenance drafted. Approval is highlighted
   identically in every frame. This is the moat, demonstrated, not described. PASS.
2. **Rhythm** — light/band alternation holds; five dark moments (hero frame · flow · ops ·
   agent · final CTA) separated by light relief (core system · industries · FAQ). PASS.
3. **Claim sweep** — full-copy review: zero violations across all ten sections. No invented
   metrics, names, testimonials, prices, or trial numbers anywhere. PASS.
4. **"Waiting for your review" repetition** — appears across ~5 sections. Reviewer verdict:
   deliberate drumbeat, keep. Founder should confirm on the full preview read; vary phrasing
   only if it grates in situ.
5. **⚠ N1 is now urgent** — the CTA chain is circular (nav/hero → #trial → Final CTA → its
   own section). Fine on a branch; meaningless at cutover. Founder decision needed: signup
   route vs waitlist capture.

## Cutover blockers (running list — updated 2026-08-29 after the site↔product alignment audit)

Pass 3 (real UI, esp. Section 3 vignettes) · Pass 4 motion · Pass 5 subpages (Product page
MUST carry the SMS+email campaigns beat — claimable §4, currently unshown) · Pass 6
conversion + JSON-LD · Pass 7 Cursor QA · N1 CTA destination (founder) · P0-013 before
Pricing publishes · telephony acceptance run before Receptionist un-hides · founder
full-preview approval.

**Site↔product convergence items (verify at cutover, from the 2026-08-29 alignment audit):**
- [ ] Imports must reach BETA (capability #16 is internal today) or the FAQ's "currently in
  beta" answer softens. On the launch path anyway via D-032 trial activation.
- [ ] Earned autonomy (#21 internal, graduation UX in E09) must be user-reachable before Pro
  sells autonomy — sequenced with P0-013; do not un-gate pricing without checking #21.
- [ ] "14-day" trial copy stays OFF the site until the trial build (D-035 implementation)
  ships. Current trust lines ("guided setup") are safe.

## Founder feedback on Pass 2 (received 2026-08-29)

Overall: approved — "looks pretty good." Two directives + three reviewer-derived hooks below.

## Review — P3-A: Home dashboard rebuild (9b28707) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to P3-B (Whisper moment).**

Verified: composition follows the real Home (greeting → count tiles → "What needs a yes" →
today's jobs → suggestion bar) · founder's counts delivered ("3 leads need a reply · 5 open
quotes · $3,850 · 2 jobs today · 1 waiting for your approval") with zero performance/ROI
stats and zero charts · internal consistency is airtight — counts agree with visible rows,
and Sarah's accepted quote is deliberately absent from the open-quotes count · "What needs a
yes" (the app's real approvals name) is a stronger label than anything in the plan · the
greeting line ("Two jobs on the books. One yes needed before the day starts.") is the best
copy on the page · naming rule applied and recorded in CLAUDE.md.

## Review — P3-A2: ROI receipt (bb8c5a0) + P3-B: Whisper (089fc3f) — 2026-08-29

**VERDICT: BOTH APPROVED — no changes required. Proceed to P3-C + P3-D (one commit), then P3-E.**

P3-A2: tile labels match the real roi-receipt component verbatim, singular/plural included ·
"$1,340 in booked work this week" leads the strip · sharp catch by the Builder: the real
component's title ("What your receptionist got done") is receptionist-gated copy, so the strip
header stays neutral ("This week") until §7 un-hides — exactly right · placed in the real
Home order (greeting → receipt → tiles).

P3-B: "Say it once. It's handled." folded into §6 as the second demo — one control story,
two ways to hand Gradia work · the scene is the hook (voice note 0:09 → transcript → quote
drafted · task created · reminder set, all "waiting for your review") · timeline holds (the
note happens after Sarah's morning job — "just finished the X5") · "Nothing sends without
your OK" · fully inside §4 say-it-once claims.

## Review — P3-C+D: flow timestamps + quiet-quote sharpening (be8614c) — 2026-08-29

**VERDICT: APPROVED — no changes required. Proceed to P3-E (real-UI sweep), the final Pass 3 item.**

P3-C: 7:58 → 7:59 → 8:01 → 8:04 (approved, accent) → 8:05 booked, "Weeks later" for Retain —
seven minutes from cold text to booked job, shown entirely inside the sample frame, zero
duration claims in copy. And the Builder caught a continuity bug the Reviewer missed: the
Home frame's 7:58 clock showed Sarah booked before the flow books her at 8:05 — clock moved
to 8:12 so the one-morning story sequences correctly. Right call, cleanly handled, properly
flagged. Verified downstream: at 8:12 the greeting ("before the day starts") and the 2-jobs
tile still hold.

P3-D: the list now hurts — "$740 quote · quiet for 6 days" · "$1,800 quote · quiet for 9
days" · "Never quoted · two weeks old" — and the visible dollar values sit inside the Home
frame's "5 open quotes · $3,850" without contradiction. Work items, not performance stats.

Pass 3 scorecard so far: A ✅ · A2 ✅ · B ✅ · C+D ✅. Remaining: **P3-E** — real product-UI
compositions, Section 3 vignettes first (cutover blocker). Reminder from the alignment audit:
verify each screen against the actual app before composing; if a real surface isn't visually
ready, keep the current faithful abstraction rather than shipping an unflattering screenshot
— flag the choice per surface.

## P3-F — NEW homepage section: "Gradia asks first." (founder decisions, 2026-08-29)

Founder-approved brand move (grounded in `_docs/research/SYNTHESIS.md` #1/#2): the approval
mechanism is now branded **"Gradia asks first."** — a FULL homepage section, placed directly
AFTER Section 6 (it extends the control argument into differentiation). Homepage becomes 11
sections; recompute band alternation from Section 6 onward for visible sections.

Section spec:
- Eyebrow: WHY GRADIA · H2: **"Gradia asks first."**
- Support (category, never competitor names — founder rule): "The industry default is
  autopilot — AI that sends, books, and bills on its own. Gradia was built the other way."
- Three cards, one line each, all claim-law-clean:
  1. **Asks first** — "Every message, booking and charge is prepared, shown to you, and sent
     on your OK. Autopilot is something you turn on — never a default." (guarantee #1)
  2. **No surprise bills** — "Spending caps and owner-set ceilings are built into the
     machinery. At the cap, Gradia stops — it never keeps spending." (guarantee #5,
     fail-closed — this is architecture, claimable)
  3. **Built only for this trade** — "Gradia speaks detailing natively — services, vehicles,
     coatings, follow-up cycles — not a generic tool with your industry pasted on."
- The violet ✓ **"Approved by you" mark is now the formal brand signature** — reuse the exact
  check treatment from the hero/flow/agent frames on card 1.
- Deliberately EXCLUDED for now: a self-serve/"no sales call" card — true by design
  (zero-founder-touch) but not claimable until the trial ships; add it at trial launch.
- Named competitors: NEVER on the site (founder rule). "Industry default" / "typical AI
  receptionists" framing only. Named side-by-sides are sales assets, off-site.
- Pass 5 note: the Product page's comparison table adopts the same three-pillar frame
  (asks-first · predictable cost · vertical) vs "the industry default", unnamed.

Build P3-F before or after P3-E at Builder's discretion (both remain); same rhythm.

## Next up — PASS 3 WORK ORDER (real product UI + founder revisions)

**P3-A · Rebuild Section 4 as the real Home dashboard, with numbers.**
Guardrail CORRECTED: operational COUNTS are allowed and wanted — e.g. "3 leads need a reply" ·
"5 open quotes · $3,850" · "2 jobs today" — matching how the actual Home dashboard prioritizes
(reference: platform HOME_REDESIGN_PLAN build + the home-redesign screenshots in ~/Gradia
root). Still banned: performance/ROI stats (hours saved, revenue growth, shop counts) and
charts. **Naming rule (founder, permanent): never call it "Chief of Operations/Staff" in any
public copy — it is "Home" / "your business, prioritized." Add this to CLAUDE.md.**

**P3-A2 · Add the ROI receipt strip to the Home frame (founder direction, 2026-08-29).**
The real Home opens with the ROI receipt (src/components/gradia/roi-receipt.tsx — OPERATIONAL
per capability #17): leads caught · replies sent for you · bookings secured · $ in booked
work ("money in play") · ~hours of your time saved · customers revived. Add this strip at the
TOP of the site's Home frame with "This week" sample figures (e.g. 7 leads caught · 12
replies sent for you · 4 bookings secured · $1,340 in booked work · ~3 hrs of your time
saved · 1 customer revived), above the count tiles. Match the real component's labels
verbatim. Guardrail nuance (recorded): the receipt's tiles — including ~time-saved — are a
REAL product feature and may appear as sample UI inside the "Sample data" frame; marketing
PROSE still may never make aggregate performance claims ("shops save X hrs/week" stays
banned). Keep everything row-consistent with the rest of the frame where visible.

**P3-B · NEW Whisper moment (the missing flagship hook).**
Add a Whisper beat — either a compact section after the Agent demo or folded into it as a
second demo ("Two ways to hand Gradia work"). The scene: hands-busy owner speaks a voice note
("Just finished the X5 — quote Sarah for a maintenance plan and remind me to order pads") →
transcript → staged: task created · quote drafted · reminder set — all "waiting for your
review." Fully claimable (§4: "say it once and it's filed, quoted, and followed up").
Headline direction: "Say it once. It's handled." Hands-busy framing is the hook.

**P3-C · Timestamps on the connected flow (speed shown, not claimed).**
Sample times on Sarah's stages: lands 7:58 AM → quote drafted 8:01 → approved by you 8:04 →
booked 8:05. Inside the sample-data frame; no "X minutes" claims in copy — let the times say it.

**P3-D · Sharpen the quiet-quote wound in the Agent section.**
Make the found-leads list hurt: e.g. "PPF + ceramic — $1,800 quote · quiet for 9 days."
Sample-data dollar values on the stalled quotes are allowed (work items, not performance
stats). The emotional center is the money sitting silent, then rescued via approve-first
follow-ups.

**P3-E · Real-UI compositions everywhere** (original Pass 3 scope): replace structural
placeholders with compositions faithful to the actual product screens — Section 3 stage
vignettes first (cutover blocker), then hero frame, dashboard, core-system panels, agent
surface. Verify each against the real app before capture; keep "Sample data" labels.

Order: P3-A → P3-B → P3-C+D (one commit) → P3-E. Same rhythm per commit: screenshot at
375/768/1440, review own shots, push, stop for review notes.

Queued for later passes (do not build now): 60-second demo video at the hero secondary CTA
(Pass 4/5, pairs with the Demo route) · comparison table (Product page, Pass 5).
