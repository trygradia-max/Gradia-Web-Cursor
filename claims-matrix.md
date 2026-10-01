# Claims matrix — pilot recruitment site

Source of authority: `platform/docs/gradia-v2/marketing-site/MVP_WEBSITE_HANDOFF_2026-09-29.md`
plus the September 11 MVP package and September 24 commercial decisions.

This matrix supersedes D-067 / D-069 website claims. “Approved MVP” means required by
the product plan. It does **not** mean available to a customer today.

| Capability | Website treatment now |
| --- | --- |
| Customers, vehicles, pipeline, quotes, calendar | Product preview with sample data |
| Chief of Staff | Product preview; no invented revenue |
| One Agent, inquiry → booking | Intended pilot workflow, not a running service |
| SMS, website forms, Meta Lead Ads | Planned pilot channels; enabled after verification |
| Email | After inbox and in-thread reply acceptance |
| Inbound receptionist | Gated; FAQ only until real-call / number continuity |
| Approvals | Approval-required defaults; per-action autonomy is planned |
| Solo and team | Both represented; one location or mobile service area |
| Payments / work orders / campaigns | Not in the initial MVP |
| Public pricing / trial | No checkout prices, no free trial, no $20 / founding / July launch |

## Gates still closed

- `/pricing` — `SHOW_PRICING=false` + middleware
- `/receptionist` — `SHOW_RECEPTIONIST=false` + middleware
- `/industries/fleet` — `SHOW_FLEET_INDUSTRY=false` + exact-path gate

## Conversion

Primary CTA is **Request pilot access** → `/request-access`. Success is shown only after
durable persistence. SMS opt-in remains optional, unchecked, and uses the 2026-09-05 A2P
disclosure. A pilot request is not marketing-text consent.

## Sign in

Public nav does not send prospects to `/portal/login` until the customer login destination
is verified for invited users.
