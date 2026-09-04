# Cursor brief — reposition the site to the new Gradia (2026-09-03)

_Read `../platform/CONTEXT.md` first — it is the product's source of truth. This brief tells you what to change on the site to match it. Work on branch `site-v2`. One commit per section. Never push. Never touch `../platform`._

## What changed

Gradia was positioned as **"the operating system for detailing and automotive appearance shops"** (D-033). That is superseded. The product has been narrowed by founder decision **D-067** to:

> **An AI-native CRM for automotive appearance shops — detailing, ceramic coating, PPF, tint.**
> Every channel flows in: phone calls, SMS, email, website forms, Meta lead ads. The Gradia Agent qualifies leads, quotes, books, and moves them through the pipeline. The owner reads what happened and approves what matters.

Positioning contrast to lead with: **Jobber and Urable are systems of record you operate. Gradia does the work and reports it.**

ICP: **established shops with staff (3–30 employees) already spending on ads.** Not solo operators.

## Out of scope — remove every claim, feature mention, nav entry and page

Per D-067 these are not the product: jobs / work orders / checklists / team scheduling · invoices, deposits, payments, Stripe Connect, any payment processing · recurring jobs, memberships, fleet accounts · locations and bays · B2B companies · mobile/PWA app · support tooling · funnel and campaign analytics suite · website building · social posting · photo quoting · Instagram/Facebook DMs.

If a page exists for any of these, flag-hide it and remove it from nav and sitemap. Do not delete files.

## Claims discipline — this is binding, not stylistic (D-028, D-025)

Only claim what is **live and verified**. As of 2026-09-03:

- **Do NOT claim SMS works.** There is no approved A2P brand or campaign — SMS is not carrier-approved. No "texts your leads in 60 seconds" copy anywhere.
- **Do NOT claim the voice receptionist works.** It has never passed a live acceptance call.
- **Do NOT claim Meta lead ads integration.** Not built.
- **Do NOT claim invoicing or payments.** Not built and out of scope.
- Safe to describe today: the CRM (customers, vehicles, leads, pipeline, quotes, calendar), the approval/agent model, email connection, and the shop keeping its own data with export.
- Where something is coming, label it plainly as coming. Never imply live.

If you cannot tell whether a claim is true, do not make it — write it in `REVIEW_NOTES.md` as a question for the founder instead.

## Work items

1. **Home** — new headline and subhead on the CRM + channels + agent story; contrast against systems of record; ICP made explicit. Remove OS-category language.
2. **Product page** — restructure to the three flagships: every lead lands and gets worked · Chief of Staff (see what the agent did, ask it for work) · it becomes a booked job. Honest state labels throughout.
3. **Nav + sitemap + footer** — remove out-of-scope destinations.
4. **Industries / trade pages** — keep, but re-cut copy to the new positioning and ICP.
5. **Pricing page** — stays flag-hidden. Core $99 / Pro $149 / Operator $249 is the direction, but live billing is not aligned yet; do not publish.
6. **Sweep every page for superseded claims** — grep for "operating system", "invoice", "payments", "jobs", "memberships", "fleet", "receptionist" and fix or remove.

## When done

Append what you changed to `REVIEW_NOTES.md` with a `NEXT:` line, and list any claim you were unsure about as a founder question. Do not push.
