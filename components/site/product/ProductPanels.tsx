import type { ReactNode } from "react";
import { Eyebrow, Section } from "../primitives";
import { SAMPLE } from "../sample";
import { GraphiteFrame, LightScreen, PanelRow } from "./shared";

/* Five capability areas — deeper than the homepage panels (2–3 sentences +
   fuller real-UI frames). Home + ROI receipt is the fifth panel. */

type Panel = {
  title: string;
  lines: string[];
  ask?: string;
  screen: ReactNode;
};

const panels: Panel[] = [
  {
    title: "Customers & Vehicles",
    lines: [
      "Every customer gets one file — vehicles, quotes, jobs and every conversation in one place.",
      "Pull up a name, a plate or a vehicle and the full history is there. No digging through texts, email and sticky notes.",
    ],
    ask: "“The guy with the black X5 who wanted ceramic… when was he in?”",
    screen: (
      <LightScreen label="Customer file">
        <div className="border-b border-[var(--sv-line)] px-4 py-4 sm:px-5">
          <p className="font-medium text-[var(--sv-ink)]">{SAMPLE.customer}</p>
          <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
            {SAMPLE.vehicle} · customer since spring
          </p>
        </div>
        <PanelRow title={`${SAMPLE.vehicle}`} meta="2024 BMW X5 · ceramic maintenance on file" />
        <PanelRow title={`Last job — ${SAMPLE.service}`} meta={`${SAMPLE.price} · completed · ${SAMPLE.slot}`} />
        <PanelRow title="Text thread" meta="12 messages · quote, booking and follow-up in one thread" />
        <PanelRow title="Next — maintenance reminder" meta="Draft ready · waiting for your review" last />
      </LightScreen>
    ),
  },
  {
    title: "Leads & Pipeline",
    lines: [
      "New inquiries land in a pipeline — New, Quoted, Booked — so nothing sits in a DM or voicemail without a next step.",
      "Gradia drafts replies and follow-ups; you approve before anything goes out.",
    ],
    ask: "“Who did I forget to quote this week?”",
    screen: (
      <LightScreen label="Pipeline board">
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
          {(
            [
              ["New", "Ceramic coating inquiry", "Reply drafted · waiting for your review"],
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
      </LightScreen>
    ),
  },
  {
    title: "Quotes, Jobs & Scheduling",
    lines: [
      "Build a quote from your service menu, send it on your OK, and the customer books from their phone.",
      "Accepted quotes become jobs on the calendar — money and calendar always ask first.",
    ],
    ask: "“What's still not booked?”",
    screen: (
      <LightScreen label="Quote → book → calendar">
        <div className="space-y-3 p-4 sm:p-5">
          <div className="mx-auto w-full max-w-[270px] rounded-[24px] bg-[var(--sv-graphite)] px-5 py-6">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Quote
            </p>
            <p className="mt-1 text-center font-medium text-white">{SAMPLE.shop}</p>
            <p className="mt-0.5 text-center text-[length:var(--sv-text-xs)] text-white/50">
              For {SAMPLE.customer} · {SAMPLE.vehicle}
            </p>
            <div className="mt-4 border-t border-white/10">
              {(
                [
                  ["Full Detail", "$265"],
                  ["Ceramic Maintenance", "$220"],
                ] as const
              ).map(([name, price]) => (
                <div key={name} className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2">
                  <span className="text-[length:var(--sv-text-xs)] text-white/70">{name}</span>
                  <span className="font-mono text-[length:var(--sv-text-xs)] tabular-nums text-white">{price}</span>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="text-[length:var(--sv-text-xs)] font-medium text-white">Total</span>
                <span className="font-mono text-[length:var(--sv-text-base)] font-semibold tabular-nums text-white">
                  {SAMPLE.price}
                </span>
              </div>
            </div>
            <p className="text-[length:var(--sv-text-xs)] text-white/40">Good through Friday.</p>
            <p className="mt-4 rounded-[6px] bg-[var(--sv-accent)] py-2 text-center text-[length:var(--sv-text-xs)] font-medium text-white">
              Book it
            </p>
          </div>
          <div className="mx-auto max-w-[340px] text-center">
            <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">
              {SAMPLE.firstName} taps Book it — job lands on the calendar
            </p>
            <p className="mt-1 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
              Your side: Booked, {SAMPLE.slot} · quote closed, job confirmed
            </p>
          </div>
        </div>
      </LightScreen>
    ),
  },
  {
    title: "Conversations",
    lines: [
      "Texts and email in one thread per customer — not six inboxes to check.",
      "Gradia drafts replies from your shop voice; you edit, approve or discard before anything sends.",
    ],
    ask: "“What did I promise her last month?”",
    screen: (
      <LightScreen label="Inbox — text + email">
        <div className="space-y-3 p-4 sm:p-5">
          <div className="max-w-[85%] rounded-[var(--sv-radius-sm)] bg-[var(--sv-wash)] px-3.5 py-2.5">
            <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{SAMPLE.firstName} · text</p>
            <p className="mt-1 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
              Hi — do you do ceramic maintenance for a BMW X5?
            </p>
          </div>
          <div className="max-w-[85%] rounded-[var(--sv-radius-sm)] bg-[var(--sv-wash)] px-3.5 py-2.5">
            <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{SAMPLE.firstName} · email</p>
            <p className="mt-1 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
              Following up on the quote — any questions?
            </p>
          </div>
          <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] px-3.5 py-2.5">
            <p className="inline-flex rounded-[6px] bg-[var(--sv-accent-soft)] px-2 py-0.5 text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-accent)]">
              Draft — waiting for your review
            </p>
            <p className="mt-1.5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
              We do — here&apos;s a quote for {SAMPLE.service}.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Send it", "Tweak it", "Drop it"].map((a, i) => (
                <span
                  key={a}
                  className={`rounded-[6px] px-2.5 py-1 text-[length:var(--sv-text-xs)] font-medium ${
                    i === 0
                      ? "bg-[var(--sv-accent)] text-white"
                      : "border border-[var(--sv-line)] text-[var(--sv-ink-2)]"
                  }`}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </LightScreen>
    ),
  },
  {
    title: "Home",
    lines: [
      "Open Gradia in the morning and see what needs a reply, a yes, or a nudge — in order.",
      "Operational counts, not analytics: leads waiting, open quotes, today's jobs and what needs your approval.",
    ],
    screen: (
      <GraphiteFrame label="Home — your business, prioritized">
        <div className="space-y-2.5">
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3.5 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Good morning · Tuesday, 8:12 AM
            </p>
            <p className="mt-1 font-medium text-white">
              Two jobs on the books. One yes needed before the day starts.
            </p>
          </div>
          <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">This week</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-mono text-[1.4rem] font-semibold leading-none tabular-nums text-white">
                $1,340
              </span>
              <span className="text-[length:var(--sv-text-xs)] text-white/50">in booked work this week</span>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              {(
                [
                  ["7", "leads caught"],
                  ["12", "replies sent for you"],
                  ["4", "bookings secured"],
                  ["~3 hrs", "of your time saved"],
                  ["1", "customer revived"],
                ] as const
              ).map(([value, label]) => (
                <div key={label}>
                  <p className="font-mono font-semibold tabular-nums text-white">{value}</p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {(
              [
                ["3", "leads need a reply"],
                ["5", "open quotes · $3,850"],
                ["2", "jobs today"],
                ["1", "waiting for your approval", true],
              ] as const
            ).map(([count, label, accent]) => (
              <div
                key={label}
                className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4"
              >
                <p
                  className={`font-mono text-[1.4rem] font-semibold leading-none tabular-nums ${
                    accent ? "text-[var(--sv-accent-on-dark)]" : "text-white"
                  }`}
                >
                  {count}
                </p>
                <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </GraphiteFrame>
    ),
  },
];

export function ProductPanels() {
  return (
    <Section id="capabilities" band>
      <Eyebrow>Capabilities</Eyebrow>
      <h2 className="max-w-[20ch]">One system for the whole shop.</h2>
      <p className="mt-5 max-w-[42rem] text-[length:var(--sv-text-lg)] leading-relaxed text-[var(--sv-ink-2)]">
        Customers, pipeline, quotes, conversations and your morning priorities — connected
        underneath, with your approval on every outbound action.
      </p>

      <div className="mt-14 space-y-16 sm:space-y-20">
        {panels.map((panel, i) => (
          <div key={panel.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h3>{panel.title}</h3>
              {panel.lines.map((line) => (
                <p key={line} className="mt-3 max-w-[36rem]">
                  {line}
                </p>
              ))}
              {panel.ask && (
                <p className="mt-5 max-w-[34rem] text-[length:var(--sv-text-sm)]">
                  <span className="italic text-[var(--sv-ink-3)]">{panel.ask}</span>{" "}
                  <span className="whitespace-nowrap font-semibold text-[var(--sv-ink)]">Ask Gradia.</span>
                </p>
              )}
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>{panel.screen}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
