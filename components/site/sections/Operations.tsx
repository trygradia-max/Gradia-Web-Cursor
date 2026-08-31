import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 4 — Operations dashboard (site-v2-plan §3.4; rebuilt in Pass 3
   per P3-A). Composition follows the real Home: greeting → count tiles →
   "What needs a yes" (the app's actual approvals section name) → today's
   jobs → a Gradia suggestion. Operational COUNTS are allowed and wanted
   (founder correction 2026-08-29): work-item numbers only — no
   performance/ROI stats (hours saved, revenue growth), no charts.
   Naming rule: this surface is "Home" — never "Chief of Operations/Staff".
   Counts agree with visible rows (1 approval ↔ 1 row · 2 jobs ↔ 2 rows);
   Sarah's accepted quote is deliberately NOT among the open ones. Clock
   sits at 8:12 AM — after the flow's 7:58→8:05 booking (P3-C), so this
   frame's booked state follows that sequence in the one-morning story. */

const tiles: { count: string; label: string; accent?: boolean }[] = [
  { count: "3", label: "leads need a reply" },
  { count: "5", label: "open quotes · $3,850" },
  { count: "2", label: "jobs today" },
  { count: "1", label: "waiting for your approval", accent: true },
];

/* ROI receipt (P3-A2, founder direction): a REAL Home feature
   (platform src/components/gradia/roi-receipt.tsx) — tile labels match that
   component verbatim, incl. singular/plural. The real component's title
   ("What your receptionist got done") is receptionist-gated copy, so the
   strip header here stays neutral ("This week") until §7 un-hides. */
const receipt: { value: string; label: string }[] = [
  { value: "7", label: "leads caught" },
  { value: "12", label: "replies sent for you" },
  { value: "4", label: "bookings secured" },
  { value: "~3 hrs", label: "of your time saved" },
  { value: "1", label: "customer revived" },
];

export function Operations() {
  return (
    <Section band>
      <Eyebrow>Operations</Eyebrow>
      <h2 className="max-w-[24ch]">Know what needs attention before it becomes a problem.</h2>
      <Lead>
        Open Gradia in the morning and see what matters, in order. Your business, prioritized
        for you.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Home
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <div className="space-y-2.5">
          {/* Greeting — the real Home opens with the day, not a report */}
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3.5 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Good morning · Tuesday, 8:12 AM
            </p>
            <p className="mt-1 font-medium text-white">Two jobs on the books. One yes needed before the day starts.</p>
          </div>

          {/* ROI receipt strip — real Home order: greeting → receipt → tiles */}
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
              This week
            </p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-mono text-[1.4rem] font-semibold leading-none tabular-nums text-white">$1,340</span>
              <span className="text-[length:var(--sv-text-xs)] text-white/50">in booked work this week</span>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
              {receipt.map((r) => (
                <div key={r.label}>
                  <p className="font-mono font-semibold tabular-nums text-white">{r.value}</p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Count tiles — operational work items only */}
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
              >
                <p
                  className={`font-mono text-[1.6rem] font-semibold leading-none tabular-nums ${
                    t.accent ? "text-[var(--sv-accent-on-dark)]" : "text-white"
                  }`}
                >
                  {t.count}
                </p>
                <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/50">{t.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            {/* What needs a yes — the app's approvals section */}
            <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                What needs a yes
              </p>
              <div className="mt-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                  Reply to a new ceramic coating inquiry
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                  Draft ready · waiting for your review
                </p>
              </div>
            </div>

            {/* Today's jobs — two rows, agreeing with the "2 jobs today" tile */}
            <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Today&apos;s jobs
              </p>
              <ul className="mt-3 space-y-3">
                <li>
                  <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                    9:00 AM — {SAMPLE.service}
                  </p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                    {SAMPLE.customer} · {SAMPLE.vehicle}
                  </p>
                </li>
                <li>
                  <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                    2:00 PM — Interior detail
                  </p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">Walk-in · booked by you</p>
                </li>
              </ul>
            </div>
          </div>

          {/* One Gradia suggestion — the Home suggestion bar, approve-first */}
          <p className="flex flex-wrap items-center gap-2 px-1 pt-1 text-[length:var(--sv-text-xs)] text-white/50">
            <Check size={13} strokeWidth={2.5} aria-hidden className="text-[var(--sv-accent-on-dark)]" />
            Gradia suggests: revive a lead that never booked — follow-up drafted for your review
          </p>
        </div>
      </div>
    </Section>
  );
}
