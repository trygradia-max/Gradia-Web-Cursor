# Gradia web

Marketing site and authenticated **client portal** for reviewing digital employee performance. The portal uses **mock data** in development; swap in a real API via `lib/portal/data.ts` when ready.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Auth.js / NextAuth v5](https://authjs.dev/) (credentials provider for MVP demos)

## Getting started

```bash
npm install
npm run generate:assets   # writes public/favicon.ico + public/images/og-image.jpg (Georgia wordmark raster)
cp .env.example .env.local
# Set AUTH_SECRET for local auth (e.g. openssl rand -base64 32)
# Optional: NEXT_PUBLIC_SITE_URL=https://your-domain.com (for metadataBase / absolute URLs)
npm run dev
```

Social previews use the generated **`app/opengraph-image.tsx`** route (DM Serif Display when the font fetch succeeds). The **`public/images/og-image.jpg`** file from `generate:assets` is for static handoffs; you can also point `metadata.openGraph.images` at it if you prefer only the raster asset.

Open [http://localhost:3000](http://localhost:3000).

## Demo portal login

| Email | Password |
| --- | --- |
| `demo@gradia.example` | `gradia-demo` (or your `PORTAL_DEMO_PASSWORD`) |
| `ops@globex.example` | same password |

Each account maps to a different **tenant** (`client-acme` vs `client-globex`) so you can verify mock dashboards differ per client.

## Routes

- `/` — Marketing home
- `/contact` — Contact form + Calendly placeholder
- `/privacy`, `/terms` — Legal stubs
- `/portal/login` — Client sign-in
- `/portal/dashboard` — Performance metrics (requires session); `?period=7` or `?period=30` for the reporting window
- `GET /api/portal/summary` — JSON snapshot of summary, employees, and recent activity (session required); optional `?period=7|30`

## Replacing mock data

### Supabase (live dashboard)

1. Create a Supabase project and run [`supabase/migrations/001_portal_tables.sql`](supabase/migrations/001_portal_tables.sql), then optionally [`supabase/seed.sql`](supabase/seed.sql) for the demo tenants (`client-acme`, `client-globex`).
2. In `.env.local`, set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API). The app reads tenant data server-side only in [`lib/portal/supabaseData.ts`](lib/portal/supabaseData.ts); **do not** expose the service role key to the browser.
3. When those env vars are present, [`getPerformanceForClient`](lib/portal/data.ts) reads only from Supabase (no mock for that tenant). Omit them locally to use mock data.

### Custom HTTP API

1. Set `PORTAL_API_URL` in `.env.local`.
2. In [`lib/portal/data.ts`](lib/portal/data.ts), replace the mock branch with an authenticated server-side `fetch` to your API. Keep the return type as `PortalPerformance | null` so the dashboard stays unchanged.
3. Types live in [`lib/portal/types.ts`](lib/portal/types.ts); align your API response with these shapes or map in `data.ts`.

## Deploy (Vercel)

1. **Push this repo to GitHub** (or GitLab / Bitbucket). From the project root:
   ```bash
   git remote add origin https://github.com/YOUR_ORG/gradia-web.git
   git push -u origin main
   ```
2. In **[Vercel](https://vercel.com/)** → Add New → Project → import the repo. Framework Preset: **Next.js**. Root directory: repo root. Build command and output are auto-detected; `npm run build` runs `generate:assets` then `next build`.
3. **Environment variables** (Project → Settings → Environment Variables). Add for **Production** (and Preview if you want auth there):

   | Name | Notes |
   | --- | --- |
   | `AUTH_SECRET` | `openssl rand -base64 32` — required |
   | `AUTH_URL` | Your live URL, e.g. `https://gradia-web.vercel.app` or `https://www.yourdomain.com` |
   | `NEXT_PUBLIC_SITE_URL` | Same as `AUTH_URL` (Open Graph / `metadataBase`) |
   | `PORTAL_DEMO_PASSWORD` | Strong password (replaces default `gradia-demo`) |
   | `NEXT_PUBLIC_SUPABASE_URL` | If using live dashboard |
   | `SUPABASE_SERVICE_ROLE_KEY` | If using live dashboard (server-only) |

4. **Redeploy** after saving env vars. Assign a **custom domain** under Project → Domains when ready (DNS as Vercel instructs).
5. **Supabase:** run the SQL in `supabase/migrations/` (and `seed.sql` if desired) in the Supabase SQL editor so production data exists for your demo `client_id` values.

Local production check: `npm run build && npm start`, with `.env.local` mirroring production secrets.
