import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

export function Operations() {
  return (
    <Section band>
      <Eyebrow>Chief of Staff</Eyebrow>
      <h2 className="max-w-[24ch]">Open Gradia. See what needs you.</h2>
      <Lead>
        Review proposed actions, upcoming appointments and recent activity in one place. See what
        is waiting for approval and what has actually happened.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Chief of Staff
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
            Product preview · sample business data
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3.5 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Good morning
            </p>
            <p className="mt-1 font-medium text-white">
              Two appointments today. One draft waiting for your review.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {(
              [
                ["2", "inquiries to qualify"],
                ["3", "quotes in review"],
                ["2", "appointments today"],
                ["1", "waiting for your approval", true],
              ] as const
            ).map(([count, label, accent]) => (
              <div
                key={label}
                className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
              >
                <p
                  className={`font-mono text-[1.6rem] font-semibold leading-none tabular-nums ${
                    accent ? "text-[var(--sv-accent-on-dark)]" : "text-white"
                  }`}
                >
                  {count}
                </p>
                <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/50">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                Waiting for approval
              </p>
              <div className="mt-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                  Quote reply for {SAMPLE.firstName} — {SAMPLE.service}
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                  Proposed · not sent
                </p>
              </div>
            </div>

            <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Upcoming
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
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                    On the calendar
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
              Recent activity
            </p>
            <ul className="mt-3 space-y-2 text-[length:var(--sv-text-xs)] text-white/60">
              <li className="flex items-center gap-2">
                <Check size={13} strokeWidth={2.5} className="text-[var(--sv-accent-on-dark)]" aria-hidden />
                You approved a quote draft for {SAMPLE.firstName}
              </li>
              <li>Held: website form waiting on shop verification</li>
              <li>Failed: one quote exception flagged for review — not sent</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
