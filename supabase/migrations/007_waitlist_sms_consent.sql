-- A2P 10DLC / TCPA consent record for waitlist signups.
--
-- Additive and nullable-safe: apply this before or after the app deploy. The
-- waitlist API retries the insert without these columns when they are missing,
-- so an un-migrated database degrades to "signup saved, consent only in the
-- structured log" rather than dropping signups on the floor.
--
-- Run in the Supabase SQL editor or `supabase db push`.

alter table public.waitlist
  add column if not exists sms_consent boolean not null default false,
  add column if not exists sms_consent_at timestamptz,
  add column if not exists sms_consent_version text;

comment on column public.waitlist.sms_consent is
  'True only when the subscriber ticked the unchecked-by-default SMS opt-in box AND supplied a mobile number.';
comment on column public.waitlist.sms_consent_at is
  'UTC timestamp the opt-in was submitted — the proof-of-consent date for carrier/TCPA audits.';
comment on column public.waitlist.sms_consent_version is
  'SMS_CONSENT_VERSION from lib/sms-consent.ts — identifies the exact disclosure text agreed to.';

-- Partial index: the only query that matters is "who opted in".
create index if not exists waitlist_sms_consent_idx
  on public.waitlist (sms_consent)
  where sms_consent;

notify pgrst, 'reload schema';
