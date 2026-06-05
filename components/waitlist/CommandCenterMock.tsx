import {
  PhoneCall,
  CalendarCheck,
  Receipt,
  Star,
  TrendingUp,
} from "lucide-react";

/**
 * Static dashboard mock shown inside the ContainerScroll reveal — a
 * "command center" view of a detailer's shop running itself. No animation
 * (it lives inside a scroll-driven frame), brand-blue accents, light theme.
 */
const KPIS = [
  { label: "Jobs booked", value: "4", icon: CalendarCheck },
  { label: "Calls answered", value: "7", icon: PhoneCall },
  { label: "Collected", value: "$1,280", icon: Receipt },
  { label: "Reviews asked", value: "5", icon: Star },
];

const FEED = [
  { t: "9:47 PM", agent: "Receptionist", e: "Replied to a new text in 4s", tag: "Lead" },
  { t: "9:48 PM", agent: "Estimator", e: "Quoted a Tahoe — $640 sent", tag: "Quote" },
  { t: "9:51 PM", agent: "Scheduler", e: "Booked Saturday 10:00 AM", tag: "Booked" },
  { t: "10:02 PM", agent: "Collector", e: "Deposit collected — $120", tag: "Paid" },
  { t: "10:15 PM", agent: "Closer", e: "Nudged a 9-day-cold Civic quote", tag: "Follow-up" },
];

export function CommandCenterMock() {
  return (
    <div className="flex h-full flex-col bg-[var(--bg)] text-left">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
            Gradia
            <span className="text-[var(--brand-primary)]">.</span>
          </span>
          <span className="hidden text-xs text-[var(--muted)] sm:inline">
            · Command center
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--dash-success)]" />
          7 agents online
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-px border-b border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-[var(--bg)] px-4 py-4 sm:px-6 sm:py-5">
            <k.icon className="mb-2 h-4 w-4 text-[var(--brand-primary)]" />
            <p className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
              {k.value}
            </p>
            <p className="text-[11px] text-[var(--muted)] sm:text-xs">{k.label}</p>
          </div>
        ))}
      </div>

      {/* feed */}
      <div className="min-h-0 flex-1 overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
            Handled overnight
          </p>
          <span className="flex items-center gap-1 text-[11px] text-[var(--dash-success)]">
            <TrendingUp className="h-3 w-3" /> Live
          </span>
        </div>
        <ul className="flex flex-col">
          {FEED.map((f) => (
            <li
              key={f.t}
              className="flex items-center gap-3 border-b border-[var(--border)] py-2.5 last:border-0"
            >
              <span className="w-16 shrink-0 font-mono text-[11px] text-[var(--muted)]">
                {f.t}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">
                <span className="font-medium text-[var(--foreground)]">{f.agent}. </span>
                <span className="text-[var(--muted)]">{f.e}</span>
              </span>
              <span className="hidden shrink-0 bg-[var(--bg-elevated)] px-2 py-0.5 text-[11px] text-[var(--brand-primary)] sm:inline">
                {f.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
