# Claims matrix — site-v2 public copy audit

_Updated 2026-09-03 for D-067 reposition (CURSOR_BRIEF). Source of truth: `../platform/CONTEXT.md` + this brief. Prior Pass 7 matrix retained as history below the fold in git._

## Legend

| Status | Meaning |
|---|---|
| ✅ | Claimable now — shown on live public routes |
| ⚠ beta | Claimable with beta label |
| 🔒 gated | Built on branch but not reachable (middleware 308 or `notFound`) |
| ⛔ | Must not appear in public copy |
| Coming | Mentioned only with an honest Coming / not-live label |

## Matrix (D-067)

| Claim | Status | Where shown | Notes |
|---|---|---|---|
| AI-native CRM for automotive appearance shops | ✅ | Home, Product, Industries, footer, metadata | Replaces D-033 "operating system" |
| Jobber / Urable = systems of record you operate; Gradia does the work | ✅ | Hero, AsksFirst, Product comparison | Founder commercial claim (CONTEXT §1) |
| ICP: shops with staff (3–30), already spending on ads | ✅ | Hero, Industries, FAQs | Not solo operators |
| CRM: customers, vehicles, leads, pipeline, quotes, calendar | ✅ | Home, Product flagships | No jobs/work-orders, invoices, payments |
| Gradia Agent + approvals (draft → Send it / Tweak it / Drop it) | ✅ | Home, Product, Demo | No SMS/voice delivery claim |
| Chief of Staff (consolidated Home) | Coming | Product flagship 2 | Approvals + Ask Gradia Live; screen Coming |
| Whisper: speak → staged work | ✅ | Home Agent, Demo | Staged only |
| Calendar bookings always ask | ✅ | Product, FAQ, Security | Payments out of scope — never claim charges |
| Import customers/vehicles | ⚠ beta | Home FAQ, Final CTA | |
| Email connection (Gmail) | ✅ | Product flagship 1 Live list | Read connection Live; sending Coming |
| SMS outbound / "texts in 60s" | ⛔ / Coming | — | No A2P brand/campaign — do not claim works |
| Voice receptionist answers/quotes/books | ⛔ | 🔒 `/receptionist` | `SHOW_RECEPTIONIST=false` |
| Meta lead ads | ⛔ / Coming | Product flagship 1 | Not built |
| Campaigns / marketing suite | ⛔ | — | Removed from Home Agent, Product, Demo |
| Invoices / deposits / payments / Stripe Connect | ⛔ | FAQ (explicit no) | Permanently out of scope |
| Fleet accounts industry page | 🔒 | `/industries/fleet` | `SHOW_FLEET_INDUSTRY=false` + middleware |
| Pricing Core $99 / Pro $149 / Operator $249 | 🔒 | `/pricing` | Direction only; live billing not aligned — do not publish |
| Fabricated metrics, testimonials, logos | ⛔ | — | Sample records fictional; operational counts OK |

## Sweep result — 2026-09-03

Public routes updated for D-067. Gated: `/pricing`, `/receptionist`, `/industries/fleet`. Named competitors (Jobber, Urable) appear only in the founder-approved commercial contrast.

## Cutover gates

- **N1:** `TRIAL_CTA_HREF` → `/#trial` until signup ships
- **Billing align:** flip `SHOW_PRICING` only when live Stripe prices match Core/Pro/Operator
- **Telephony acceptance run:** flip `SHOW_RECEPTIONIST` before receptionist publishes
- **A2P Brand + Campaign approved:** before any SMS-works claim
- **Fleet:** leave `SHOW_FLEET_INDUSTRY=false` unless D-067 revisited
