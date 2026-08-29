import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 3 — Connected flow (site-v2-plan §3.3, NEXT_TASK scope 3).
   Capture → Understand → Prepare → APPROVE → Schedule → Retain, with the
   SAMPLE record persisting through every stage (the trygtm one-example
   technique). Carries id="how" — the hero's "See how it works" target (N2).
   Approve is highlighted in the accent, consistent with the hero frame.
   Structural placeholder; Pass 3 swaps real UI, Pass 4 may add motion. */

const stages: {
  name: string;
  line: string;
  state: string;
  approve?: boolean;
}[] = [
  {
    name: "Capture",
    line: `${SAMPLE.firstName}'s message lands in Gradia — not in six inboxes.`,
    state: `New lead · ${SAMPLE.customer}`,
  },
  {
    name: "Understand",
    line: "Her vehicle, history and request become one record.",
    state: `${SAMPLE.vehicle} · asks about ceramic maintenance`,
  },
  {
    name: "Prepare",
    line: "Gradia drafts the reply and the quote for you.",
    state: `Quote — ${SAMPLE.service} · ${SAMPLE.price}`,
  },
  {
    name: "Approve",
    line: "Nothing goes out until you say so.",
    state: "Approved by you · reply sent",
    approve: true,
  },
  {
    name: "Schedule",
    line: "The job lands on the calendar.",
    state: `${SAMPLE.slot} · ${SAMPLE.service}`,
  },
  {
    name: "Retain",
    line: `Gradia drafts the follow-up when ${SAMPLE.firstName} is due back.`,
    state: "Maintenance reminder · drafted for your review",
  },
];

export function ConnectedFlow() {
  return (
    <Section id="how">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="max-w-[22ch]">One system from first message to finished job.</h2>
      <Lead>
        Follow one customer through Gradia. The same record moves through every stage — and
        you approve the moments that matter.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            {SAMPLE.customer} · {SAMPLE.vehicle}
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <ol className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
          {stages.map((s, i) => (
            <li
              key={s.name}
              className={`flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 ${
                i > 0 ? "border-t border-white/10" : ""
              } ${s.approve ? "bg-white/[0.09]" : "bg-white/[0.04]"}`}
            >
              <div className="flex min-w-0 items-baseline gap-4">
                <span
                  className={`w-6 shrink-0 text-[length:var(--sv-text-xs)] font-semibold ${
                    s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/35"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p
                    className={`flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] ${
                      s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                    }`}
                  >
                    {s.approve && <Check size={13} strokeWidth={2.5} aria-hidden />}
                    {s.name}
                  </p>
                  <p className="mt-1 font-medium text-white">{s.line}</p>
                </div>
              </div>
              <p className="pl-10 text-[length:var(--sv-text-xs)] text-white/50 sm:pl-0 sm:text-right">
                {s.state}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
