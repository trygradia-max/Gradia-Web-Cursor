# Gradia web

Marketing site + Supabase-authenticated client portal.

## Configuration

Copy [`.env.example`](.env.example) to `.env.local` (or `.env`, which is gitignored) and set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Use the **anon** key in the app only. Never put the **service role** key in `NEXT_PUBLIC_*` variables or import it in client code.

The portal uses Supabase Auth (email/password) with the SSR cookie pattern from `@supabase/ssr`; middleware protects `/portal/*`.

## Security

- **Row Level Security:** Dashboard data is read with the anon key. You **must** enable RLS on `clients`, `call_logs`, and `appointments` in Supabase so each authenticated user only sees their tenant. Apply [`supabase/migrations/002_rls_clients_call_logs_appointments.sql`](supabase/migrations/002_rls_clients_call_logs_appointments.sql) (or equivalent policies). Policies match the linkage in [`lib/portal/session.ts`](lib/portal/session.ts) (`auth_user_id`, `user_id`, or `clients.id` = `auth.uid()`). JWT `user_metadata.client_id` is **not** honored by those policies—ensure your users are linked via rows in `clients` or adjust policies deliberately.
- **HTTP headers:** Production responses include security headers and a **Content-Security-Policy-Report-Only** policy (see [`next.config.ts`](next.config.ts)). Review browser reports and tighten CSP before switching to enforcing mode.
- **Post-login redirects:** [`lib/portal/safe-callback-url.ts`](lib/portal/safe-callback-url.ts) restricts `callbackUrl` to same-origin `/portal/*` paths (excluding login).
- **API rate limiting:** [`GET /api/portal/summary`](app/api/portal/summary/route.ts) uses an in-memory limit per IP (best-effort on serverless). Add a CDN/WAF or Redis-backed limiter for strict production quotas.

## Routes

- `/portal/login` — sign in
- `/portal/dashboard` — dashboard (middleware + Supabase session)
- `GET /api/portal/summary` — dashboard JSON (401 if unauthenticated; `Cache-Control: private, no-store`)

## Dashboard tables

Portal data is queried from:

- `clients`
- `call_logs`
- `appointments`

Queries filter by the resolved `client_id` for the signed-in user; RLS must enforce the same boundaries at the database.

## Run

```bash
npm install
npm run dev
```
