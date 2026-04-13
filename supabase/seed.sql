-- Optional seed for local / demo tenants matching demo logins in auth.ts.
-- Run after 001_portal_tables.sql.

insert into public.portal_accounts (id, account_name) values
  ('client-acme', 'Acme Dental Collective'),
  ('client-globex', 'Globex Field Services')
on conflict (id) do update set account_name = excluded.account_name;

insert into public.portal_summary (
  client_id, period_label, calls_handled, bookings_created, resolution_rate, avg_handle_time_sec
) values
  ('client-acme', 'Last 30 days', 1842, 312, 0.81, 142),
  ('client-globex', 'Last 30 days', 642, 198, 0.74, 189)
on conflict (client_id) do update set
  period_label = excluded.period_label,
  calls_handled = excluded.calls_handled,
  bookings_created = excluded.bookings_created,
  resolution_rate = excluded.resolution_rate,
  avg_handle_time_sec = excluded.avg_handle_time_sec;

insert into public.portal_employees (id, client_id, name, role, status) values
  ('de-1', 'client-acme', 'Jordan', 'Front desk & scheduling', 'active'),
  ('de-2', 'client-acme', 'Riley', 'Insurance & billing Q&A', 'active'),
  ('de-g1', 'client-globex', 'Casey', 'Dispatch & triage', 'active')
on conflict (id) do update set
  client_id = excluded.client_id,
  name = excluded.name,
  role = excluded.role,
  status = excluded.status;

insert into public.portal_activity (id, client_id, at, channel, summary, outcome) values
  ('act-1', 'client-acme', '2026-04-12T14:22:00.000Z', 'voice', 'New patient intake — booked cleaning next week', 'booked'),
  ('act-2', 'client-acme', '2026-04-12T13:05:00.000Z', 'voice', 'Reschedule request — offered two slots, confirmed', 'resolved'),
  ('act-3', 'client-acme', '2026-04-12T11:40:00.000Z', 'sms', 'Hours & location — answered without transfer', 'resolved'),
  ('act-g1', 'client-globex', '2026-04-12T09:30:00.000Z', 'voice', 'Emergency route — technician ETA text sent', 'resolved'),
  ('act-g2', 'client-globex', '2026-04-11T18:20:00.000Z', 'voice', 'Warranty repair — appointment booked', 'booked')
on conflict (id) do update set
  client_id = excluded.client_id,
  at = excluded.at,
  channel = excluded.channel,
  summary = excluded.summary,
  outcome = excluded.outcome;
