import { ArrowRight } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 2 — Problem (site-v2-plan §3.2, NEXT_TASK scope 2).
   Scattered tools consolidating into one Gradia surface; three pains max.
   The scattered side shows where the SAME lead (Sarah) is hiding today;
   the graphite frame shows her as one clean record. Structural placeholder —
   Pass 3/4 may add the consolidation motion. */

const scattered: { text: string; className: string }[] = [
  { text: `Missed call — ${SAMPLE.firstName} M.`, className: "-rotate-2" },
  { text: `Text about a ${SAMPLE.vehicle}`, className: "rotate-1 translate-x-3" },
  { text: "Instagram DM, unread", className: "-rotate-1" },
  { text: `Sticky note: “call ${SAMPLE.firstName} back”`, className: "rotate-2 -translate-x-2" },
  { text: "Customer spreadsheet, row 214", className: "rotate-1" },
  { text: "Calendar app, double-booked", className: "-rotate-2 translate-x-2" },
];

const surface: { label: string; detail: string }[] = [
  { label: "Customers & vehicles", detail: `${SAMPLE.customer} · ${SAMPLE.vehicle}` },
  { label: "Leads & pipeline", detail: "New → Quoted → Booked" },
  { label: "Quotes & jobs", detail: `${SAMPLE.service} · ${SAMPLE.price}` },
  { label: "Conversations", detail: "Texts + email, one thread" },
  { label: "Schedule", detail: SAMPLE.slot },
];

const pains: { title: string; body: string }[] = [
  {
    title: "Leads get lost",
    body: "A missed call or an unanswered text is a job that quietly goes to another shop.",
  },
  {
    title: "Follow-up depends on memory",
    body: "Quotes go quiet unless somebody remembers to chase them — and somebody is always you.",
  },
  {
    title: "The owner is the system",
    body: "Every detail lives in your head, so nothing moves unless you touch it.",
  },
];

export function Problem() {
  return (
    <Section band>
      <Eyebrow>The problem</Eyebrow>
      <h2 className="max-w-[24ch]">Running a shop shouldn&apos;t take six disconnected systems.</h2>
      <Lead>
        Quotes live in texts, jobs on a whiteboard, follow-ups in your head. The busier the
        shop gets, the more slips through.
      </Lead>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        {/* Today: the same lead scattered across six places */}
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
            Today
          </p>
          <ul className="flex flex-wrap gap-3">
            {scattered.map((s) => (
              <li
                key={s.text}
                className={`rounded-[var(--sv-radius-sm)] border border-[var(--sv-line-strong)] bg-[var(--sv-surface)] px-3.5 py-2.5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)] ${s.className}`}
              >
                {s.text}
              </li>
            ))}
          </ul>
        </div>

        <ArrowRight
          size={22}
          strokeWidth={2}
          aria-hidden
          className="mx-auto rotate-90 text-[var(--sv-ink-3)] lg:rotate-0"
        />

        {/* With Gradia: one surface, one clean record */}
        <div className="rounded-[var(--sv-radius)] bg-[var(--sv-graphite)] p-3 sm:p-4">
          <p className="px-2 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            One Gradia surface
          </p>
          <ul className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
            {surface.map((row, i) => (
              <li
                key={row.label}
                className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 bg-white/[0.05] px-4 py-3 ${
                  i > 0 ? "border-t border-white/10" : ""
                }`}
              >
                <span className="text-[length:var(--sv-text-sm)] font-medium text-white">{row.label}</span>
                <span className="text-[length:var(--sv-text-xs)] text-white/50">{row.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {pains.map((p) => (
          <Card key={p.title}>
            <h3 className="text-[length:var(--sv-text-lg)]">{p.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{p.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
