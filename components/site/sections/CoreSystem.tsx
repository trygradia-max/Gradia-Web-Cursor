import type { ReactNode } from "react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 5 — Core operating system (site-v2-plan §3.5, NEXT_TASK scope 5).
   Four alternating full-width panels: Customers & Vehicles · Leads & Pipeline ·
   Quotes, Jobs & Scheduling · Conversations. One headline + one sentence + one
   screen each. Screens sit in LIGHT surface cards (REVIEW_NOTES §4 watch-item:
   no fifth graphite tunnel). P3-E (2/2): panel voice aligned to the real
   product ("Customer file" / one-file framing, pipeline statuses New →
   Quoted → Booked as in the app, "Pending your review").
   Conversations shows texts + email only (claim law). */

function Screen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
          {label}
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">Sample data</p>
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

/* P4-C: the "Ask Gradia." whoa device — one italic pain-question in the
   owner's head + the three-word answer, same treatment on every panel.
   All four questions founder-approved; §4-claimable (Agent reads the CRM). */
const panels: { title: string; line: string; ask: string; screen: ReactNode }[] = [
  {
    title: "Customers & Vehicles",
    line: "History, vehicles, quotes and conversations live on one record — not in your head.",
    ask: "“The guy with the black X5 who wanted ceramic… when was he in?”",
    screen: (
      <Screen label="Customer file">
        <div className="border-b border-[var(--sv-line)] px-4 py-4 sm:px-5">
          <p className="font-medium text-[var(--sv-ink)]">{SAMPLE.customer}</p>
          <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
            {SAMPLE.vehicle} · texts, quotes and jobs in one file
          </p>
        </div>
        <Row title={`Last job — ${SAMPLE.service}`} meta={`${SAMPLE.price} · completed`} />
        <Row title="Next — maintenance reminder" meta="Pending your review" last />
      </Screen>
    ),
  },
  {
    title: "Leads & Pipeline",
    line: "New, quoted, booked — every opportunity has a place, so none get lost.",
    ask: "“Who did I forget to quote this week?”",
    screen: (
      <Screen label="Pipeline">
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
          {(
            [
              ["New", "Ceramic coating inquiry", "Reply drafted"],
              ["Quoted", "Paint correction", "Waiting on customer"],
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
      </Screen>
    ),
  },
  {
    title: "Quotes, Jobs & Scheduling",
    line: "Quotes become jobs, jobs land on the calendar — and you approve what goes out.",
    ask: "“What's still not booked?”",
    screen: (
      <Screen label="Quote to job">
        <Row title={`Quote — ${SAMPLE.service}`} meta={`${SAMPLE.price} · accepted`} />
        <Row title={`Job — ${SAMPLE.vehicle}`} meta="Booked" />
        <Row title={`Schedule — ${SAMPLE.slot}`} meta="On the calendar" last />
      </Screen>
    ),
  },
  {
    title: "Conversations",
    line: "Texts and email in one thread per customer, with replies drafted for your review.",
    ask: "“What did I promise her last month?”",
    screen: (
      <Screen label="Inbox — text + email">
        <div className="space-y-3 p-4 sm:p-5">
          <div className="max-w-[85%] rounded-[var(--sv-radius-sm)] bg-[var(--sv-wash)] px-3.5 py-2.5">
            <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{SAMPLE.firstName} · text</p>
            <p className="mt-1 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
              Hi — do you do ceramic maintenance for a BMW X5?
            </p>
          </div>
          <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] px-3.5 py-2.5">
            <p className="inline-flex rounded-[6px] bg-[var(--sv-accent-soft)] px-2 py-0.5 text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-accent)]">
              Draft — waiting for your review
            </p>
            <p className="mt-1.5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
              We do — here&apos;s a quote for {SAMPLE.service}.
            </p>
          </div>
        </div>
      </Screen>
    ),
  },
];

export function CoreSystem() {
  return (
    <Section>
      <Eyebrow>The operating system</Eyebrow>
      <h2 className="max-w-[18ch]">Everything stays connected.</h2>
      <Lead>
        Customers, pipeline, jobs and conversations share one record underneath. Update it
        once — it&apos;s current everywhere.
      </Lead>

      <div className="mt-14 space-y-16 sm:space-y-20">
        {panels.map((panel, i) => (
          <div key={panel.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h3>{panel.title}</h3>
              <p className="mt-3 max-w-[36rem]">{panel.line}</p>
              <p className="mt-5 max-w-[34rem] text-[length:var(--sv-text-sm)]">
                <span className="italic text-[var(--sv-ink-3)]">{panel.ask}</span>{" "}
                <span className="whitespace-nowrap font-semibold text-[var(--sv-ink)]">Ask Gradia.</span>
              </p>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>{panel.screen}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
