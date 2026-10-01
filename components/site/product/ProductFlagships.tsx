import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Eyebrow, Section } from "../primitives";
import { SAMPLE } from "../sample";
import { GraphiteFrame, LightScreen } from "./shared";

type State = "Preview" | "Planned" | "Later";

function StateChip({ state }: { state: State }) {
  const styles: Record<State, string> = {
    Preview: "bg-[var(--sv-wash)] text-[var(--sv-ink-2)]",
    Planned: "bg-[var(--sv-accent-soft)] text-[var(--sv-accent)]",
    Later: "bg-[var(--sv-wash)] text-[var(--sv-ink-3)]",
  };
  const labels: Record<State, string> = {
    Preview: "Product preview",
    Planned: "Planned for pilot",
    Later: "Not in initial MVP",
  };
  return (
    <span
      className={`inline-flex rounded-[6px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${styles[state]}`}
    >
      {labels[state]}
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
    eyebrow: "CRM",
    title: "Customers, vehicles, pipeline, quotes and calendar.",
    lines: [
      "These screens are the core product. They are shown as a product preview with sample business data — not as proof that every shop workflow is already accepted.",
      "The CRM is designed to remain useful with the Agent turned off.",
    ],
    states: [
      { label: "Customers, vehicles, pipeline, quotes, calendar", state: "Preview" },
      { label: "Chief of Staff summary", state: "Preview" },
    ],
    screen: (
      <LightScreen label="Pipeline">
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
          {(
            [
              ["New", "Ceramic coating inquiry", "Needs details"],
              ["Quoted", `${SAMPLE.service}`, "Waiting on review"],
              ["Booked", SAMPLE.customer, SAMPLE.slot],
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
      </LightScreen>
    ),
  },
  {
    eyebrow: "Gradia Agent",
    title: "One Agent from inquiry through booking.",
    lines: [
      "The intended loop: capture the inquiry, get the details, prepare the quote, arrange the booking, keep the record current, then prepare an individual confirmation, reminder or check-in.",
      "This is the pilot's intended workflow, not an already running service for every shop.",
    ],
    states: [
      { label: "SMS, website forms, Meta Lead Ads", state: "Planned" },
      { label: "Email inbox and in-thread reply", state: "Later" },
      { label: "Inbound receptionist", state: "Later" },
    ],
    screen: (
      <GraphiteFrame label="Planned lead workflow">
        <div className="space-y-2.5">
          {[
            "Capture the inquiry into one customer record",
            "Qualify service, vehicle and timing",
            "Prepare a menu-based quote for review",
            "Present a proposed appointment for approval",
            "Update pipeline and prepare individual follow-up",
          ].map((line) => (
            <p
              key={line}
              className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3 text-[length:var(--sv-text-sm)] text-white"
            >
              {line}
            </p>
          ))}
        </div>
      </GraphiteFrame>
    ),
  },
  {
    eyebrow: "Chief of Staff",
    title: "See what needs you. See what happened.",
    lines: [
      "Review proposed actions, upcoming appointments and recent activity. Held and failed states stay visible — proposed quote value is not treated as revenue.",
      "Ask Gradia to find a customer, prepare a quote or draft a reply. Writes go through approval.",
    ],
    states: [
      { label: "Needs-you queue and activity", state: "Preview" },
      { label: "Per-action autonomy controls", state: "Planned" },
    ],
    screen: (
      <GraphiteFrame label="Chief of Staff">
        <div className="space-y-2.5">
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3.5 sm:px-5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              <Check size={13} strokeWidth={2.5} aria-hidden />
              Needs you
            </p>
            <p className="mt-1 font-medium text-white">
              Quote draft for {SAMPLE.firstName} — {SAMPLE.service}
            </p>
            <p className="mt-1 text-[length:var(--sv-text-xs)] text-white/50">Proposed · not sent</p>
          </div>
          <p className="px-1 text-[length:var(--sv-text-xs)] text-white/45">
            Held: website form waiting on shop verification. Failed: one exception flagged for
            review.
          </p>
        </div>
      </GraphiteFrame>
    ),
  },
];

export function ProductFlagships() {
  return (
    <Section id="workflow" band>
      <Eyebrow>Product</Eyebrow>
      <h2 className="max-w-[22ch]">What Gradia is for — and what is still being verified.</h2>
      <p className="mt-5 max-w-[42rem] text-[length:var(--sv-text-lg)] leading-relaxed text-[var(--sv-ink-2)]">
        Screens below are product previews with sample business data. Pilot channels are enabled
        only after setup and verification.
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
