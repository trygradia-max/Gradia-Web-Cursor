import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Users,
  ShieldCheck,
  Mic,
  Check,
  MessageSquare,
  ArrowUpRight,
  Send,
} from "lucide-react";

/**
 * Sneak-peek mock of the Gradia platform dashboard — what a shop owner sees
 * when they log in: Gradia's overnight work, this week's numbers, live
 * activity, and a lead-revival follow-up drafted and staged for approval.
 * Static (it's a product preview), dark to match the app. Self-contained colors
 * so it reads like a real screenshot regardless of page theme.
 */
const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Inbox", icon: Inbox, badge: "3" },
  { label: "Calendar", icon: CalendarDays },
  { label: "Customers", icon: Users },
  { label: "Approvals", icon: ShieldCheck, badge: "2" },
  { label: "Whisper", icon: Mic },
];

const STATS = [
  { label: "Calls answered · this week", value: "41", delta: "+18%" },
  { label: "Jobs booked", value: "23", delta: "+4" },
  { label: "New leads", value: "9", delta: "+2" },
  { label: "Follow-ups staged", value: "6", delta: "" },
];

const FEED = [
  { t: "9:47 PM", who: "On the phone", what: "Answered Marcus in 4s" },
  { t: "9:48 PM", who: "On the phone", what: "Quoted a Tahoe — $640 on the call" },
  { t: "9:51 PM", who: "On the phone", what: "Booked Saturday 10:00 AM" },
  { t: "10:02 PM", who: "Follow-up", what: "Drafted a text + email — staged for you" },
];

export function PlatformDashboard() {
  return (
    <div className="flex w-full overflow-hidden bg-[#0b0913] text-white">
      {/* sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col border-r border-white/10 bg-[#0e0b18] p-3 sm:flex">
        <div className="mb-5 flex items-center gap-1 px-2 pt-1 text-sm font-semibold tracking-tight">
          Gradia<span className="text-[#a78bfa]">.</span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((n) => (
            <span
              key={n.label}
              className={[
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px]",
                n.active
                  ? "bg-[#7c3aed]/20 text-white"
                  : "text-white/55",
              ].join(" ")}
            >
              <n.icon className="h-4 w-4" />
              <span className="flex-1">{n.label}</span>
              {n.badge && (
                <span className="rounded-full bg-[#7c3aed] px-1.5 text-[10px] font-medium text-white">
                  {n.badge}
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-2 text-[11px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
          2 agents online
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-semibold">Good morning, Pristine Auto Detail</p>
            <p className="text-[11px] text-white/45">Thursday, June 4 · staged while you slept</p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-[#10b981] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" /> Gradia online
          </span>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-hidden p-4 sm:space-y-4 sm:p-5">
          {/* stat tiles */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[10px] text-white/45">{s.label}</p>
                <p className="mt-1 flex items-baseline gap-1.5 text-lg font-bold tracking-tight sm:text-xl">
                  {s.value}
                  {s.delta && (
                    <span className="text-[11px] font-medium text-[#10b981]">{s.delta}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {/* follow-up — staged for approval */}
            <div className="rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/[0.08] p-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[#a78bfa]">
                  <MessageSquare className="h-3.5 w-3.5" /> Follow-up · staged for your OK
                </span>
                <span className="text-[10px] text-white/45">
                  drafted by Gradia
                </span>
              </div>
              <p className="mt-2 text-[15px] font-semibold">Revive 23 ceramic leads who never booked</p>
              <div className="mt-2 rounded-md border border-white/10 bg-[#0b0913] p-2.5 text-[12px] text-white/70">
                &ldquo;Hey {`{first_name}`} — you quoted a ceramic coating with us a
                while back. Still want it? Reply YES and we&rsquo;ll get you on the
                calendar. — Pristine&rdquo;
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-white/55">
                  23 leads · SMS + Email · <span className="text-white">dry-run ready</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70">
                    Edit
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#7c3aed] px-3 py-1.5 text-[11px] font-medium text-white">
                    <Send className="h-3 w-3" /> Approve &amp; send
                  </span>
                </div>
              </div>
            </div>

            {/* live activity */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wide text-white/45">
                  Live activity
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#10b981]">
                  <ArrowUpRight className="h-3 w-3" /> Live
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {FEED.map((f) => (
                  <li key={f.t} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    <span className="min-w-0 text-[11px] leading-tight">
                      <span className="font-medium text-white">{f.who}.</span>{" "}
                      <span className="text-white/55">{f.what}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
