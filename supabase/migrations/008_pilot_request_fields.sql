-- Pilot-request fields on the existing waitlist table.
-- Additive: the API retries without these columns if they are missing, and
-- logs the extra fields so they are not silently discarded.
--
-- request_type distinguishes a controlled-pilot request from a legacy waitlist
-- row. Existing rows stay null / 'waitlist'.

alter table public.waitlist
  add column if not exists full_name text,
  add column if not exists service_type text,
  add column if not exists team_size text,
  add column if not exists handle_request text,
  add column if not exists request_type text;

comment on column public.waitlist.full_name is
  'Name submitted on the public request-access form.';
comment on column public.waitlist.service_type is
  'Detailing / coating / PPF-tint / mobile / other.';
comment on column public.waitlist.team_size is
  'solo or team — not a seat count.';
comment on column public.waitlist.handle_request is
  'Short answer: what the shop would like Gradia to handle.';
comment on column public.waitlist.request_type is
  'pilot | waitlist. Pilot requests are not a shop-customer lead intake.';

notify pgrst, 'reload schema';
