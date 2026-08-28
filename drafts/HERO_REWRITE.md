# DRAFT — Landing Page Hero Rewrite
_Status: DRAFT · Do not publish without Harry's review_
_All claims verified against `_docs/WHAT_GRADIA_DOES.md` + `_docs/GRADIA_PRICING.md` · 2026-06-11_

---

## Context

The current hero (AnimatedShaderHero.tsx) is already largely on-brief. These rewrites are **alternatives** — options for A/B testing or evolution as the launch date approaches. The primary rewrite targets the moment voice receptionist goes live (acceptance run passes), at which point pricing needs updating.

---

## Version A — Current (reference, on-brief)

> **Your entire front office. Two AI agents, one brain.**
> **Never miss another call.**
>
> Gradia answers your phone 24/7, quotes and books over the phone, follows up with every lead by text and email, and revives the customers you forgot — all in one CRM, and you approve everything before it sends. $20/month.

✅ This is already compliant. Keep as-is unless testing alternatives.

---

## Version B — Outcome-led, voice pricing included
_(Use once voice receptionist clears acceptance run)_

**Badge (eyebrow):**
> Launching July 10, 2026 · Founders get early access

**H1 line 1 (white):**
> Stop losing calls to voicemail.

**H1 line 2 (gradient):**
> Your shop works while you detail.

**Subhead:**
> Gradia answers every call 24/7, quotes the job, and books it straight onto your calendar — then texts and emails every lead until they book, with you approving everything before it sends. One app. From $20/month. Voice receptionist add-on: +$29/mo.

**CTAs:**
> [Join the waitlist →]   [See how it works]

**Rationale:** Leads with the concrete pain (voicemail), follows with the outcome (shop works while you detail), then explains the mechanism. Adds the +$29 voice price inline with the $20 so there's no checkout surprise.

---

## Version C — Minimalist / direct
_(Strong for detailer Facebook group audiences who need blunt copy)_

**H1:**
> Every call answered.
> Every lead followed up.
> You approve. It sends.

**Subhead:**
> Gradia is the AI front office for auto detailers — two agents, one brain, one app. $20/month. Less than one detail.

**CTA:**
> [Get early access →]

**Rationale:** Extremely scannable. Mirrors the way detailers talk — short, direct, no SaaS vocabulary. Good for mobile, social ads, and any surface where attention span is seconds.

---

## Version D — Social proof hook
_(Use once beta users provide real testimonials)_

**Badge:**
> "Gradia booked 3 jobs while I was under a car." — [Beta user name, city]

**H1:**
> Your front office doesn't take days off.

**Subhead:**
> Two AI agents that share one brain — one answers your phone 24/7, one works your leads by text and email. You stay in control: nothing sends without your OK. $20/month.

**CTA:**
> [Join the waitlist →]

**Rationale:** Opens with proof, then explains the product. "Doesn't take days off" is a concrete reference to the pain of being a solo detailer with no staff.

---

## Hero badge / eyebrow variants

Current: `Launching July 10, 2026 · Founders get early access`

Alternatives:
- `Founding 100 · Lock in $10/month for life`
- `July 10, 2026 · Built for detailers`
- `Private beta open · Only 100 founding spots`

---

## Metadata (page title + OG) — already on-brief

Current title: "AI Front Office for Car Detailers — Answer, Quote & Book 24/7 · Gradia"
Current description: "An AI office for auto detailers. Two agents, one brain: answer every call 24/7, quote and book over the phone..."

Suggested tweak to description (once voice launches, add pricing):
> "Two agents, one brain — answer every call 24/7, quote and book over the phone, follow up by text and email. You approve everything. From $20/month; voice receptionist +$29/mo."

---

## Notes on voice pricing rule

Per `_docs/GRADIA_PRICING.md`: *"Voice add-on price appears WITH the $20 price everywhere — never a checkout surprise."*

Once voice receptionist clears the acceptance run:
- Every "$20/month" reference on the page needs to become "From $20/month" or "$20/month · Voice Receptionist add-on +$29/mo"
- The FAQ "How much will it cost?" needs the full pricing table (see EMAIL_SEQUENCE.md for draft language)
- The WaitlistForm left column needs the updated pitch
