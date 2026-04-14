# Gradia web

Marketing site + Supabase-authenticated client portal.

## Portal auth + data requirements

Set these in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The portal uses Supabase Auth email/password and stores the session access token in an httpOnly cookie for middleware protection.

## Routes

- `/portal/login` - Supabase Auth login
- `/portal/dashboard` - protected dashboard
- `POST /api/portal/auth/login` - writes server session cookie
- `POST /api/portal/auth/logout` - clears server session cookie
- `GET /api/portal/summary` - dashboard JSON payload

## Dashboard tables

Portal data is queried from:

- `clients`
- `call_logs`
- `appointments`

All queries are filtered by the authenticated user's `client_id`.

## Run

```bash
npm install
npm run dev
```
