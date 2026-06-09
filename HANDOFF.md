# Gradia Marketing Site — Handoff

> Orientation for anyone (human or Claude Code) picking up `trygradia.com`. Start here, then read `NEXT_TASK.md` for the current work order.

_Last updated: June 2026_

---

## What this is

Marketing site + Supabase-authenticated client portal for **Gradia** — a 7-agent AI front office for car detailers. This folder (`/Users/harryhatch/Gradia/marketing`) is the repo root for the landing page; the `.git` lives here.

- **Repo:** github.com/trygradia-max/Gradia-Web-Cursor · branch `main`
- **Vercel:** project `gradia-web-cursor` (team `gradia1`) → trygradia.com (`.vercel/project.json`)
- **Wider workspace:** `/Users/harryhatch/Gradia/` is monorepo-style (`platform/`, `voice/`, `sites/`, `_docs/`, root `.claude/CLAUDE.md`). Everything for trygradia.com is under `marketing/`.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind v3** + **framer-motion** (also gsap, three, tsparticles for hero/animation)
- **Supabase** (`@supabase/ssr`) for the `/portal` auth + dashboard
- **Stripe** present (`stripe` dep)
- Node **20** (`.nvmrc`)

## Where things live

| What | Path |
|---|---|
| Landing page | `app/page.tsx` |
| Root metadata (title, description, OG, keywords) | `app/layout.tsx` |
| Sitemap | `app/sitemap.ts` |
| Marketing components | `components/marketing/`, `components/waitlist/`, `components/ui/` |
| Portal (auth'd dashboard) | `app/portal/*`, `lib/portal/*` |
| API | `app/api/*` (e.g. `/api/portal/summary`) |
| **Existing-but-hidden marketing pages** | `app/(marketing)/*` — see takedown note below |
| Asset generation | `scripts/generate-assets.mjs` (runs in `build`) |
| Backups of pre-takedown files | `_backup/` |

## ⚠️ Most important gotcha: the site is in "waitlist-only / takedown" mode

`middleware.ts` **307-redirects every marketing route to `/`** except `/`, `/api/*`, and `/portal/*`. A full set of marketing/SEO pages already exists in the repo but is **currently unreachable** (and excluded from the sitemap). These include:

```
app/(marketing)/
  industries/[slug]      ← programmatic per-industry pages (already scaffolded)
  resources/             ← blog-style articles already written:
    why-every-missed-call-costs-more-than-you-think
    the-roi-of-an-always-on-digital-front-desk
    front-desk-automation-for-healthcare-practices
  pricing/ about/ contact/ partners/ the-cost/ the-gap/ the-proof/ see-it-close/ privacy/ terms/
```

**Implication for SEO:** the #1 lever is NOT building pages from scratch — it's deciding which of these to **re-enable** (whitelist in `middleware.ts` + add to `app/sitemap.ts`), then making them detailer-specific. The middleware header comment documents the restore path. `_backup/` holds the original `middleware.ts`, `sitemap.ts`, and home page.

## Run locally

```bash
nvm use            # Node 20
npm install
npm run dev        # next dev --turbopack → localhost:3000
```

Env: copy `.env.example` → `.env.local`. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. **Anon key only in `NEXT_PUBLIC_*`** — never the service-role key.

## Deploy flow

Deploys are **manual via the Vercel CLI** (no GitHub Actions deploy workflow exists — `.github/` only has dependabot). Production deploy:

```bash
vercel --prod
```

> **TODO — confirm exact command:** Harry uses a `vercel --prod` variant with a **temporary npm-cache workaround** (the "temp-npm-cache trick") to get a clean install on deploy. Paste the exact command/script here so the next person can copy-paste it. If it's a shell snippet, consider committing it as `scripts/deploy.sh` and referencing it here.

## Open items / known TODOs

- [ ] **`www` DNS** — `www.trygradia.com` is not fully wired up yet. Confirm the CNAME/redirect in Vercel + DNS so `www` resolves and 308-redirects to the apex (or vice-versa). _(Carried over — confirm current state.)_
- [ ] **CSP is report-only** — `next.config.ts` ships `Content-Security-Policy-Report-Only`. Review browser reports and switch to enforcing before relying on it.
- [ ] **Supabase RLS** — must be enabled on `clients`, `call_logs`, `appointments` (see `README.md` Security + `supabase/migrations/`).
- [ ] **SEO** — see `NEXT_TASK.md` and `docs/seo/Gradia-SEO-Audit-Action-Plan.md`.

## Pointers

- Detailed portal/security/RLS notes: `README.md`
- Current SEO work order: `NEXT_TASK.md`
- Full SEO strategy + 30/60/90 plan: `docs/seo/Gradia-SEO-Audit-Action-Plan.md`
