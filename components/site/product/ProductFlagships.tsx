import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Eyebrow, Section } from "../primitives";
import { SAMPLE } from "../sample";
import { GraphiteFrame, LightScreen, PanelRow } from "./shared";

/* Three flagships (CURSOR_BRIEF 2026-09-03 / D-067):
   1. Every lead lands and gets worked
   2. Chief of Staff — see what the agent did, ask it for work
   3. It becomes a booked appointment
   Honest Live / Coming labels throughout (D-025). No campaigns, jobs/work
   orders, payments, SMS delivery, voice, or Meta claims. */

type State = "Live" | "Coming";

function StateChip({ state }: { state: State }) {
  const live = state === "Live";
  return (
    <span
      className={`inline-flex rounded-[6px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
        live
          ? "bg-[var(--sv-accent-soft)] text-[var(--sv-accent)]"
          : "bg-[var(--sv-wash)] text-[var(--sv-ink-3)]"
      }`}
    >
      {state}
    </span>
  );
}

type Flagship = {
  eyebrow: string;
  title: string;
  lines: string[];
  states: { label: string; state: State }[];
  screen: ReactNode;
};

const flagships: Flagship[] = [
  {
    eyebrow: "Flagship 1",
    title: "Every lead lands and gets worked.",
    lines: [
      "Inquiries become CRM records — customer, vehicle, pipeline stage — so nothing sits in a DM or sticky note.",
      "The Gradia Agent drafts the next step. You approve before anything goes out.",
    ],
    states: [
      { label: "CRM · pipeline · quotes", state: "Live" },
      { label: "Email connection (Gmail)", state: "Live" },
      { label: "Website form intake", state: "Coming" },
      { label: "SMS · voice · Meta lead ads", state: "Coming" },
    ],
    screen: (
      <LightScreen label="Pipeline — sample data">
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
          {(
            [
              ["New", "Ceramic coating inquiry", "Reply drafted · your review"],
              ["Quoted", "Paint correction · $620", "Quiet 4 days · follow-up staged"],
              ["Booked", SAMPLE.customer, `${SAMPLE.service} · ${SAMPLE.slot}`],
            ] as const
          ).map(([col, card, meta]) => (
            <div key={col}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
                {col}
              </p>
              <div className="rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-paper)] px-3 py-2.5">
                <p className="text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink)]">{card}</p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{meta}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--sv-line)] px-4 py-3 sm:px-5">
          <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
            Live today: lead → pipeline → draft for approval. Instant SMS reply and Meta intake
            are Coming — not claimed live.
          </p>
        </div>
      </LightScreen>
    ),
  },
  {
    eyebrow: "Flagship 2",
    title: "Chief of Staff — see what the agent did. Ask it for work.",
    lines: [
      "One place to see what needs your yes, what the agent already prepared, and what happened overnight.",
      "Ask in plain English over your shop's own data. Writes go through the same approval path — no second door.",
    ],
    states: [
      { label: "Approvals · audit trail", state: "Live" },
      { label: "Ask Gradia over CRM data", state: "Live" },
      { label: "Chief of Staff screen (replaces Home)", state: "Coming" },
    ],
    screen: (
      <GraphiteFrame label="Chief of Staff — sample data">
        <div className="space-y-2.5">
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3.5 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Needs you
            </p>
            <p className="mt-1 font-medium text-white">
              One draft waiting — quote reply for {SAMPLE.firstName}
            </p>
          </div>
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              <Check size={13} strokeWidth={2.5} aria-hidden />
              Approved by you
            </p>
            <p className="mt-2 text-[length:var(--sv-text-sm)] text-white">
              You tapped Send it on {SAMPLE.firstName}&apos;s quote draft
            </p>
            <p className="mt-1 text-[length:var(--sv-text-xs)] text-white/50">
              Logged · undoable · nothing left without you
            </p>
          </div>
          <div className="ml-auto max-w-[90%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3">
            <p className="text-[length:var(--sv-text-xs)] text-white/40">You ask</p>
            <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">
              Show ceramic leads this month that haven&apos;t booked.
            </p>
          </div>
          <p className="px-1 text-[length:var(--sv-text-xs)] text-white/45">
            Approvals and Ask Gradia are Live. The consolidated Chief of Staff screen is Coming.
          </p>
        </div>
      </GraphiteFrame>
    ),
  },
  {
    eyebrow: "Flagship 3",
    title: "It becomes a booked appointment.",
    lines: [
      "Accepted quotes land on the calendar. Pipeline moves to Booked. The owner sees the outcome — not another form to fill.",
      "Calendar bookings always ask first. Payments and invoices are out of scope — Gradia is not a payment processor.",
    ],
    states: [
      { label: "Quotes · public accept page", state: "Live" },
      { label: "Calendar · working hours", state: "Live" },
      { label: "Book from conversation (end-to-end)", state: "Coming" },
    ],
    screen: (
      <LightScreen label="Quote → book — sample data">
        <PanelRow
          title={`${SAMPLE.service} — ${SAMPLE.price}`}
          meta={`${SAMPLE.customer} · ${SAMPLE.vehicle} · Good through Friday`}
        />
        <PanelRow title="Customer taps Book it" meta="You're in — quote accepted." />
        <PanelRow
          title={`On the calendar — ${SAMPLE.slot}`}
          meta="Pipeline → Booked · sample data"
          last
        />
        <div className="border-t border-[var(--sv-line)] px-4 py-3 sm:px-5">
          <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
            Live today: quotes and calendar. Wiring book-from-conversation end-to-end is Coming.
            Invoices and payments are out of scope — not Coming.
          </p>
        </div>
      </LightScreen>
    ),
  },
];

export function ProductFlagships() {
  return (
    <Section id="flagships" band>
      <Eyebrow>Product</Eyebrow>
      <h2 className="max-w-[22ch]">Three things Gradia is for.</h2>
      <p className="mt-5 max-w-[42rem] text-[length:var(--sv-text-lg)] leading-relaxed text-[var(--sv-ink-2)]">
        Everything else is cut. Honest Live / Coming labels — we only claim what is verified.
      </p>

      <div className="mt-14 space-y-16 sm:space-y-20">
        {flagships.map((f, i) => (
          <div key={f.title} className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
                {f.eyebrow}
              </p>
              <h3 className="mt-2">{f.title}</h3>
              {f.lines.map((line) => (
                <p key={line} className="mt-3 max-w-[36rem]">
                  {line}
                </p>
              ))}
              <ul className="mt-6 space-y-2">
                {f.states.map((s) => (
                  <li key={s.label} className="flex flex-wrap items-center gap-2.5">
                    <StateChip state={s.state} />
                    <span className="text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>{f.screen}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
