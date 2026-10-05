import { ArrowRight } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";
import { MGroup, MItem } from "../motion";
import { SAMPLE } from "../sample";

const scattered: { text: string; className: string }[] = [
  { text: `Text about a ${SAMPLE.vehicle}`, className: "rotate-1 translate-x-3" },
  { text: "Quote in another tool", className: "-rotate-1" },
  { text: `Sticky note: “call ${SAMPLE.firstName} back”`, className: "rotate-2 -translate-x-2" },
  { text: "Vehicle details in a thread", className: "rotate-1" },
  { text: "Next step easy to lose", className: "-rotate-2 translate-x-2" },
];

const surface: { label: string; detail: string }[] = [
  { label: "Customers & vehicles", detail: `${SAMPLE.customer} · ${SAMPLE.vehicle}` },
  { label: "Conversation", detail: "Ceramic maintenance inquiry" },
  { label: "Quote", detail: `${SAMPLE.service} · ${SAMPLE.price}` },
  { label: "Next action", detail: "Draft waiting for your review" },
];

export function Problem() {
  return (
    <Section band>
      <Eyebrow>The problem</Eyebrow>
      <h2 className="max-w-[24ch]">A good lead shouldn&apos;t depend on what you remember.</h2>
      <Lead>
        A customer asks about ceramic coating. Their vehicle details sit in a text, their quote is
        in another tool, and the next step is easy to lose. Gradia is designed to keep the
        customer, conversation and next action together.
      </Lead>

      <MGroup className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
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
                <MItem tag="span" className="block" y={-10}>
                  {s.text}
                </MItem>
              </li>
            ))}
          </ul>
        </div>

        <MItem tag="span" className="mx-auto" x={-6} y={0}>
          <ArrowRight
            size={22}
            strokeWidth={2}
            aria-hidden
            className="rotate-90 text-[var(--sv-ink-3)] lg:rotate-0"
          />
        </MItem>

        <MItem y={18} className="rounded-[var(--sv-radius)] bg-[var(--sv-graphite)] p-3 sm:p-4">
          <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              One Gradia record
            </p>
            <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
              Product preview · sample business data
            </p>
          </div>
          <ul className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
            {surface.map((row, i) => (
              <li
                key={row.label}
                className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 bg-white/[0.05] px-4 py-3 ${
                  i > 0 ? "border-t border-white/10" : ""
                }`}
              >
                <span className="text-[length:var(--sv-text-sm)] font-medium text-white">
                  {row.label}
                </span>
                <span className="text-[length:var(--sv-text-xs)] text-white/50">{row.detail}</span>
              </li>
            ))}
          </ul>
        </MItem>
      </MGroup>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Card>
          <h3 className="text-[length:var(--sv-text-lg)]">The details scatter</h3>
          <p className="mt-3 text-[length:var(--sv-text-sm)]">
            Vehicle notes, quotes and the next step live in different places — so a good lead
            depends on memory.
          </p>
        </Card>
        <Card>
          <h3 className="text-[length:var(--sv-text-lg)]">Follow-up is easy to miss</h3>
          <p className="mt-3 text-[length:var(--sv-text-sm)]">
            Confirmation, reminder or check-in only happens if someone remembers that customer.
          </p>
        </Card>
        <Card>
          <h3 className="text-[length:var(--sv-text-lg)]">You still do every click</h3>
          <p className="mt-3 text-[length:var(--sv-text-sm)]">
            Typical tools wait for you to operate them. Gradia is being built to prepare the next
            step and wait for your approval.
          </p>
        </Card>
      </div>
    </Section>
  );
}
