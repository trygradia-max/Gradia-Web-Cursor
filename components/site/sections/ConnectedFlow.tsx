import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 3 — Connected flow (site-v2-plan §3.3; P3-E real-UI vignettes,
   2026-08-30). Each stage now carries a compact composition of the real
   product surface, verified against platform source before composing:
   - Approvals (approvals-list.tsx): type chips (SMS · Booking · Draft
     quote), "To {name}", Pending badge, "Caught {when}", CTAs "Send it /
     Tweak it / Drop it" — current labels confirmed in source.
   - Conversations: thread row with snippet + "Needs you" tag.
   - Customers: "one file per person" framing.
   Deliberate abstention (flagged per REVIEW_NOTES): no calendar-grid UI in
   the Schedule vignette — capability #9 is building, so it shows the
   booked state, not an invented calendar. Pending/approval accents are
   retokened to --sv-* per CLAUDE.md (no foreign colors).
   P3-C times kept: 7:58 → 8:05, Home clock follows at 8:12. Carries
   id="how" (N2). Approve stays the accent-marked stage. */

function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-[6px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
        accent ? "bg-[var(--sv-accent)]/25 text-[var(--sv-accent-on-dark)]" : "bg-white/10 text-white/60"
      }`}
    >
      {children}
    </span>
  );
}

function Vignette({
  time,
  children,
}: {
  time: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.07] p-3.5 sm:p-4">
      <p className="float-right ml-3 font-mono text-[length:var(--sv-text-xs)] font-medium tabular-nums text-white/60">{time}</p>
      {children}
    </div>
  );
}

const stages: {
  name: string;
  line: string;
  approve?: boolean;
  vignette: ReactNode;
}[] = [
  {
    name: "Capture",
    line: `${SAMPLE.firstName}'s message lands in Gradia — not in six inboxes.`,
    vignette: (
      <Vignette time="7:58 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Text</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">{SAMPLE.customer}</span>
          <Chip accent>Needs you</Chip>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          &ldquo;Hi — do you do ceramic maintenance for a BMW X5?&rdquo;
        </p>
      </Vignette>
    ),
  },
  {
    name: "Understand",
    line: "Her vehicle, history and request become one record.",
    vignette: (
      <Vignette time="7:59 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Customer file</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">{SAMPLE.customer}</span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          {SAMPLE.vehicle} · texts, quotes and jobs in one file
        </p>
      </Vignette>
    ),
  },
  {
    name: "Prepare",
    line: "Gradia drafts the reply and the quote for you.",
    vignette: (
      <Vignette time="8:01 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Draft quote</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.service} — {SAMPLE.price}
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          Reply drafted to send with it — nothing sent yet
        </p>
      </Vignette>
    ),
  },
  {
    name: "Approve",
    line: "Nothing goes out until you say so.",
    approve: true,
    vignette: (
      <Vignette time="8:04 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>SMS</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            To {SAMPLE.customer}
          </span>
          <Chip accent>Pending</Chip>
        </div>
        <p className="mt-2 rounded-[calc(var(--sv-radius-sm)-4px)] bg-white/[0.06] px-3 py-2 text-[length:var(--sv-text-xs)] text-white/70">
          Hi {SAMPLE.firstName} — quote attached. We could get the X5 in Tuesday at 9:00 AM.
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-[6px] bg-[var(--sv-accent)] px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white">
            Send it
          </span>
          {["Tweak it", "Drop it"].map((a) => (
            <span
              key={a}
              className="rounded-[6px] border border-white/20 px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white/70"
            >
              {a}
            </span>
          ))}
          <span className="text-[length:var(--sv-text-xs)] text-white/40">Caught just now</span>
        </div>
      </Vignette>
    ),
  },
  {
    name: "Schedule",
    line: "The job lands on the calendar.",
    vignette: (
      <Vignette time="8:05 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Booking</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.slot} — {SAMPLE.service}
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          On the calendar · confirmed with {SAMPLE.firstName}
        </p>
      </Vignette>
    ),
  },
  {
    name: "Retain",
    line: `Gradia drafts the follow-up when ${SAMPLE.firstName} is due back.`,
    vignette: (
      <Vignette time="Weeks later">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>SMS</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            Maintenance reminder
          </span>
          <Chip accent>Pending</Chip>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          Drafted for your review — sends on your OK
        </p>
      </Vignette>
    ),
  },
];

export function ConnectedFlow() {
  return (
    <Section id="how">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="max-w-[22ch]">One system from first message to finished job.</h2>
      <Lead>
        Watch one customer move through Gradia. Same record at every stage — you approve the
        moments that matter.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            {SAMPLE.customer} · {SAMPLE.vehicle}
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <ol className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
          {stages.map((s, i) => (
            <li
              key={s.name}
              className={`grid gap-3 px-4 py-4 lg:grid-cols-2 lg:items-center lg:gap-8 sm:px-5 ${
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
                    className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                    }`}
                  >
                    {s.approve && <Check size={13} strokeWidth={2.5} aria-hidden />}
                    {s.name}
                  </p>
                  <p className="mt-1 font-medium text-white">{s.line}</p>
                </div>
              </div>
              <div className="pl-10 lg:pl-0">{s.vignette}</div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
