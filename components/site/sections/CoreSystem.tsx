import type { ReactNode } from "react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

function Screen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
          {label}
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
          Product preview · sample business data
        </p>
      </div>
      {children}
    </div>
  );
}

function Row({ title, meta, last = false }: { title: string; meta: string; last?: boolean }) {
  return (
    <div className={`px-4 py-3.5 sm:px-5 ${last ? "" : "border-b border-[var(--sv-line)]"}`}>
      <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">{title}</p>
      <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{meta}</p>
    </div>
  );
}

const panels: { title: string; line: string; screen: ReactNode }[] = [
  {
    title: "Customers & vehicles",
    line: "Contact details, vehicle information, notes and history together.",
    screen: (
      <Screen label="Customer file">
        <div className="border-b border-[var(--sv-line)] px-4 py-4 sm:px-5">
          <p className="font-medium text-[var(--sv-ink)]">{SAMPLE.customer}</p>
          <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
            {SAMPLE.vehicle} · quotes and history in one file
          </p>
        </div>
        <Row title={`${SAMPLE.service}`} meta={`${SAMPLE.price} · quote on file`} />
        <Row title="Next — confirmation or reminder" meta="Draft pending your review" last />
      </Screen>
    ),
  },
  {
    title: "Pipeline",
    line: "See where each lead stands and what needs to happen next.",
    screen: (
      <Screen label="Pipeline">
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
          {(
            [
              ["New", "Ceramic coating inquiry", "Needs details"],
              ["Quoted", "Paint correction", "Waiting on customer"],
              ["Booked", SAMPLE.customer, SAMPLE.slot],
            ] as const
          ).map(([col, card, meta]) => (
            <div key={col}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
                {col}
              </p>
              <div className="rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-paper)] px-3 py-2.5">
                <p className="text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink)]">
                  {card}
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </Screen>
    ),
  },
  {
    title: "Quotes & calendar",
    line: "Connect the service request, quote and appointment.",
    screen: (
      <Screen label="Quote">
        <Row title={`${SAMPLE.service} — ${SAMPLE.price}`} meta={`${SAMPLE.customer} · ${SAMPLE.vehicle}`} />
        <Row title={`Proposed time — ${SAMPLE.slot}`} meta="Presented for approval when required" />
        <Row title="Calendar" meta="Appointment connects to the same record" last />
      </Screen>
    ),
  },
  {
    title: "Conversations",
    line: "Keep the context that explains the next action.",
    screen: (
      <Screen label="Conversation">
        <Row title="Inquiry" meta="“Do you do ceramic maintenance for a BMW X5?”" />
        <Row title="Draft reply" meta="Waiting for your review — nothing sent" last />
      </Screen>
    ),
  },
];

export function CoreSystem() {
  return (
    <Section>
      <Eyebrow>The CRM</Eyebrow>
      <h2 className="max-w-[18ch]">One place for the customer and the next step.</h2>
      <Lead>
        These are the core workflows we&apos;re preparing for the pilot. The CRM is designed to
        remain useful with AI turned off.
      </Lead>

      <div className="mt-14 space-y-16 sm:space-y-20">
        {panels.map((panel, i) => (
          <div key={panel.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h3>{panel.title}</h3>
              <p className="mt-3 max-w-[36rem]">{panel.line}</p>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>{panel.screen}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
