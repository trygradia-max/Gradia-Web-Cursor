# Claims matrix — site-v2 public copy audit

_Pass 7 QA · 2026-09-02. Source of truth: `_docs/WHAT_GRADIA_DOES.md` §4–§6 + `platform/docs/gradia-v2/04-capability-map.md` (D-028). Every public string on branch `site-v2` was swept against this table._

## Legend

| Status | Meaning |
|---|---|
| ✅ | Claimable now — shown on live public routes |
| ⚠ beta | Claimable with beta label |
| 🔒 gated | Built on branch but not reachable (middleware 308 or `notFound`) |
| ⛔ | Must not appear in public copy |

## Matrix

| Claim | Status | Where shown | Notes |
|---|---|---|---|
| One CRM: customers, vehicles, leads, quotes, jobs, conversations | ✅ | Home, Product, Industries | No Instagram/Facebook DMs as product channels |
| Gradia Agent: ask → staged → approve | ✅ | Home §6, Product, Demo | "Send it / Tweak it / Drop it" vocabulary |
| Whisper: speak → staged work | ✅ | Home §6, Product, Demo | No auto-send framing |
| Approve-first; money + calendar always ask | ✅ | Home, Product, FAQ, Security | Guarantee #1 — drumbeat intentional |
| SMS + email campaigns, dry-run, caps, opt-outs | ✅ | Home Agent demo, Product campaigns, Demo | Never "autopilot sent" |
| Operations Home dashboard + operational counts | ✅ | Home §4 (sample frame) | Counts OK; no performance/ROI prose |
| ROI receipt strip (sample UI) | ✅ | Home §4 sample frame | Labels match real component; no aggregate stats in prose |
| Import customers/vehicles/calendar | ⚠ beta | Home FAQ, Final CTA | "currently in beta" in FAQ answer |
| Built for detailing & automotive appearance | ✅ | Hero, metadata, footer | D-033 category line |
| Knowledge base / service menu / persona | ✅ | Teach Gradia section | Guarantee #2 ("we/us") |
| Public quote page (customer view) | ✅ | Core system panel | "Book it / Not this time" — source-faithful |
| Earned autonomy (graduation UX) | ✅ | Product approvals section | Framed as owner choice; money/calendar always ask |
| Fail-closed credits / spending caps | ✅ | Asks First, Product comparison, Security | Guarantee #5 |
| Voice receptionist answers/quotes/books | ⛔ | — | Homepage §7 + `/receptionist` built (`SHOW_RECEPTIONIST=false` + middleware 308); nav/footer links hidden; §9.3 floor copy only |
| Pricing tiers / dollar amounts | 🔒 | `/pricing` only | `SHOW_PRICING=false` + middleware 308; 14-day trial copy OK inside gated page |
| Customer recovery / opportunity engine | ⛔ | — | Not mentioned |
| Meta lead ads / social DMs as product | ⛔ | — | Problem section shows IG DM as *shop's scattered reality*, not Gradia channel |
| Fabricated metrics, testimonials, logos | ⛔ | — | Sample records fictional; operational counts in frames only |
| SOC2 / bank-level / certification claims | ⛔ | — | Security page uses audited truths only |
| Fleet management features | ⛔ | — | Fleet industry page: shops that *serve* fleets only |
| Team seats live | ⛔ | — | Operator tier: "Team seats — arriving" (D-036) |
| Competitor names | ⛔ | — | "Industry default" / "typical AI receptionists" only |

## Pass 7 QA sweep result

**PASS** — zero violations on all 16 public URLs (`lib/site-routes.ts`). Gated routes (`/pricing`, `/receptionist`, `/contact`) correctly 308 or hidden from nav. Housecall Pro and Slack approvals: absent (SITE_SYNC batch ff66cc9).

## Cutover gates (unchanged)

- **N1:** `TRIAL_CTA_HREF` → `/#trial` until signup ships (founder decision)
- **P0-013:** flip `SHOW_PRICING` + middleware before pricing publishes
- **Telephony acceptance run:** flip `SHOW_RECEPTIONIST` + middleware before receptionist publishes
- **D-035 trial build:** keep "14-day" copy off public surfaces until trial ships (currently only on gated `/pricing`)
