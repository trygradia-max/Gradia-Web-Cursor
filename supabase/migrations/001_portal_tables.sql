-- Portal dashboard: one row per tenant in portal_accounts; related metrics and activity.
-- Run in the Supabase SQL editor or via `supabase db push` if you use the CLI.

create table if not exists public.portal_accounts (
  id text primary key,
  account_name text not null
);

create table if not exists public.portal_summary (
  client_id text primary key references public.portal_accounts (id) on delete cascade,
  period_label text not null,
  calls_handled integer not null default 0,
  bookings_created integer not null default 0,
  resolution_rate double precision not null,
  avg_handle_time_sec integer not null default 0
);

create table if not exists public.portal_employees (
  id text primary key,
  client_id text not null references public.portal_accounts (id) on delete cascade,
  name text not null,
  role text not null,
  status text not null check (status in ('active', 'paused'))
);

create index if not exists portal_employees_client_id_idx
  on public.portal_employees (client_id);

create table if not exists public.portal_activity (
  id text primary key,
  client_id text not null references public.portal_accounts (id) on delete cascade,
  at timestamptz not null,
  channel text not null check (channel in ('voice', 'sms', 'web')),
  summary text not null,
  outcome text not null check (outcome in ('resolved', 'booked', 'escalated', 'abandoned'))
);

create index if not exists portal_activity_client_at_idx
  on public.portal_activity (client_id, at desc);

alter table public.portal_accounts enable row level security;
alter table public.portal_summary enable row level security;
alter table public.portal_employees enable row level security;
alter table public.portal_activity enable row level security;

-- No policies: the Next.js app uses the service role key server-side only and
-- filters by client_id from the session. Do not expose the service role to the browser.
