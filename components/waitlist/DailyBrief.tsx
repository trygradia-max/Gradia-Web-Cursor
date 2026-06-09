import { Check } from "lucide-react";

const HANDLED = [
  "7 calls answered",
  "4 jobs booked",
  "3 quotes given",
  "6 follow-ups drafted",
  "2 old leads revived",
];

const NEEDS_YOU = [
  {
    initials: "MJ",
    name: "Marcus James",
    reason: "Ceramic quote opened twice, no reply. Worth a call.",
  },
  {
    initials: "TL",
    name: "Toyota dealer lot",
    reason: "Asked about a 12-car fleet rate. High value.",
  },
  {
    initials: "DR",
    name: "Dana Ruiz",
    reason: "Detail anniversary next week — perfect re-book window.",
  },
  {
    initials: "SP",
    name: "Sam Park",
    reason: "Detail done yesterday. Chat agent drafted a thank-you + re-book — approve to send.",
  },
  {
    initials: "CV",
    name: "Cold quote · Civic full detail",
    reason: "Stalled 9 days. The chat agent drafted a nudge — approve to send.",
  },
];

export function DailyBrief() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
          Daily brief
        </span>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
          Wake up to a night&rsquo;s work, staged for you.
        </h2>
        <p className="mt-4 max-w-md text-[var(--muted)]">
          Your agents answer the phones and draft every follow-up overnight.
          Each morning you get one screen: what&rsquo;s waiting for your OK, and
          the handful of leads only you should call.
        </p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--bg)] shadow-card">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Daily Brief
            </p>
            <p className="text-xs text-[var(--muted)]">
              Thursday, June 4 · from calls, follow-ups &amp; bookings
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--brand-primary)]">
            Gradia
          </span>
        </div>

        <div className="border-b border-[var(--border)] px-5 py-4">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
            Overnight
          </p>
          <div className="flex flex-wrap gap-2">
            {HANDLED.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs text-[var(--foreground)]"
              >
                <Check className="h-3 w-3 text-[var(--dash-success)]" />
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
            Needs you today · 5 contacts
          </p>
          <ul className="flex flex-col">
            {NEEDS_YOU.map((c) => (
              <li
                key={c.initials}
                className="flex gap-3 border-b border-[var(--border)] py-3 last:border-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--bg-elevated)] text-[11px] font-semibold text-[var(--brand-primary)]">
                  {c.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium text-[var(--foreground)]">
                    {c.name}
                  </span>
                  <span className="block text-xs text-[var(--muted)]">
                    {c.reason}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
