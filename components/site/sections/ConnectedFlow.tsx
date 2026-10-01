import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { MGroup, MItem, MPop, DUR, STAGGER } from "../motion";
import { SAMPLE } from "../sample";

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

function Vignette({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.07] p-3.5 sm:p-4">
      <p className="float-right ml-3 font-mono text-[length:var(--sv-text-xs)] font-medium tabular-nums text-white/60">
        {time}
      </p>
      {children}
    </div>
  );
}

const stages: {
  name: string;
  title: string;
  line: string;
  approve?: boolean;
  vignette: ReactNode;
}[] = [
  {
    name: "01",
    title: "Capture the inquiry",
    line: "Bring leads from enabled sources into one customer record.",
    vignette: (
      <Vignette time="7:58 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>New inquiry</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.customer}
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          &ldquo;Hi — do you do ceramic maintenance for a BMW X5?&rdquo;
        </p>
      </Vignette>
    ),
  },
  {
    name: "02",
    title: "Get the details",
    line: "Gather the service, vehicle, timing and questions that matter.",
    vignette: (
      <Vignette time="7:59 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Customer file</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.customer}
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          {SAMPLE.vehicle} · ceramic maintenance · timing still open
        </p>
      </Vignette>
    ),
  },
  {
    name: "03",
    title: "Prepare the quote",
    line: "Use the shop's service menu and pricing; flag exceptions for review.",
    vignette: (
      <Vignette time="8:01 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Draft quote</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.service} — {SAMPLE.price}
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          Prepared from the menu — nothing sent yet
        </p>
      </Vignette>
    ),
  },
  {
    name: "04",
    title: "Arrange the booking",
    line: "Check availability and present the proposed appointment for approval when required.",
    approve: true,
    vignette: (
      <Vignette time="8:04 AM">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Proposed time</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            {SAMPLE.slot}
          </span>
          <Chip accent>Needs you</Chip>
        </div>
        <p className="mt-2 rounded-[calc(var(--sv-radius-sm)-4px)] bg-white/[0.06] px-3 py-2 text-[length:var(--sv-text-xs)] text-white/70">
          Draft: Hi {SAMPLE.firstName} — we could take the X5 Tuesday at 9:00 AM.
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-[6px] bg-[var(--sv-accent)] px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white">
            Approve
          </span>
          {["Edit", "Hold"].map((a) => (
            <span
              key={a}
              className="rounded-[6px] border border-white/20 px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white/70"
            >
              {a}
            </span>
          ))}
        </div>
      </Vignette>
    ),
  },
  {
    name: "05",
    title: "Keep the record current",
    line: "Connect the appointment, pipeline stage and conversation, then prepare the appropriate individual follow-up.",
    vignette: (
      <Vignette time="After approval">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Record</Chip>
          <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
            Pipeline · calendar · conversation
          </span>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">
          Confirmation, reminder or check-in for this customer — drafted for review
        </p>
      </Vignette>
    ),
  },
];

export function ConnectedFlow() {
  return (
    <Section id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="max-w-[22ch]">From first inquiry to a clear next step.</h2>
      <Lead>The workflow we&apos;re building for the pilot:</Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            {SAMPLE.customer} · {SAMPLE.vehicle}
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
            Product preview · sample business data
          </p>
        </div>

        <MGroup tag="ol" className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
          {stages.map((s, i) => (
            <MItem
              tag="li"
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
                  {s.name}
                </span>
                <div className="min-w-0">
                  <p
                    className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                    }`}
                  >
                    {s.approve && (
                      <MPop delay={3 * STAGGER + DUR}>
                        <Check size={13} strokeWidth={2.5} aria-hidden />
                      </MPop>
                    )}
                    {s.title}
                  </p>
                  <p className="mt-1 font-medium text-white">{s.line}</p>
                </div>
              </div>
              <div className="pl-10 lg:pl-0">{s.vignette}</div>
            </MItem>
          ))}
        </MGroup>
      </div>

      <p className="mt-8 max-w-[46rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
        Initial pilot channels are SMS, website forms and Meta Lead Ads, activated individually
        after verification. Email and inbound calls follow their own readiness checks.
      </p>
    </Section>
  );
}
