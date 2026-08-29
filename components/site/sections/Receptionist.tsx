import { Check, PhoneMissed } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";

/* Section 7 — Receptionist (site-v2-plan §3.7 + §9.3, NEXT_TASK scope 7).
   SHIPPED HIDDEN: rendered only when SHOW_RECEPTIONIST (app/page.tsx) is
   true — the live telephony acceptance run has not passed (claim law §5,
   capability #20 internal). Even the built copy stays inside the §9.3
   honest framing: capture / organize / prepare ONLY — no answering,
   quoting or booking-on-calls claims until the run passes.
   Band note: built light; alternation must be recomputed when un-hidden
   (REVIEW_NOTES §6→7 instruction). Caller is nameless on purpose — Sarah's
   story started from a text, and no second sample customer exists. */

const steps: { label: string; title: string; meta: string; accent?: boolean }[] = [
  {
    label: "Missed call",
    title: "You're under a car — the phone rings out",
    meta: "New caller · asked about a ceramic coating",
  },
  {
    label: "Captured",
    title: "The opportunity is saved, not lost",
    meta: "Caller, request and vehicle noted on a new lead",
  },
  {
    label: "Prepared",
    title: "A reply is drafted for your review",
    meta: "Send it when you surface — nothing goes out on its own",
    accent: true,
  },
];

export function Receptionist() {
  return (
    <Section>
      <Eyebrow>Receptionist</Eyebrow>
      <h2 className="max-w-[22ch]">Don&apos;t lose the customer because you&apos;re under a car.</h2>
      <Lead>
        When a call comes in and your hands are full, Gradia captures, organizes and prepares
        the opportunity so your business can respond properly.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="flex items-center gap-2 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            <PhoneMissed size={13} strokeWidth={2} aria-hidden />
            One missed call, kept
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>
        <ol className="grid gap-2.5 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.label}
              className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
            >
              <p
                className={`flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] ${
                  s.accent ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                }`}
              >
                {s.accent && <Check size={13} strokeWidth={2.5} aria-hidden />}
                {s.label}
              </p>
              <p className="mt-2.5 font-medium text-white">{s.title}</p>
              <p className="mt-1.5 text-[length:var(--sv-text-xs)] leading-relaxed text-white/50">{s.meta}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
