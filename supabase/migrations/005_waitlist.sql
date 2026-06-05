-- Waitlist signups from the public /waitlist landing page.
-- Writes go through POST /api/waitlist using the service role key server-side
-- (see lib/supabase/admin.ts). Run in the Supabase SQL editor or `supabase db push`.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  -- Monotonic signup order — drives "position in line" and the live counter.
  position bigint generated always as identity,
  -- Always stored lowercased by the API, so a plain unique constraint on the
  -- column is enough — and it's what PostgREST's on_conflict upsert targets.
  email text not null unique,
  phone text,
  role text,
  shop_name text,
  current_tools text,
  -- Captured server-side for abuse triage; never shown to users.
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

-- No policies: the Next.js app uses the service role key server-side only.
-- The anon/browser key has no access. Do not expose the service role to the browser.
