import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* Section 6b — "Gradia asks first." (P3-F, founder decisions 2026-08-29,
   grounded in _docs/research/SYNTHESIS.md #1/#2). Directly after the Agent
   section: extends the control argument into differentiation. Category
   framing only — competitor names NEVER appear on the site (founder rule).
   The violet ✓ "Approved by you" mark is the formal brand signature —
   exact check treatment from the hero/flow/agent frames, on card 1 only.
   Excluded until the trial ships: a self-serve/"no sales call" card.
   Light section; Industries/FAQ bands recomputed downstream. */

const cards: { title: string; body: string; signature?: boolean }[] = [
  {
    title: "Asks first",
    body: "Every message, booking and charge is prepared, shown to you, and sent on your OK. Autopilot is something you turn on — never a default.",
    signature: true,
  },
  {
    title: "No surprise bills",
    body: "Spending caps and owner-set ceilings are built into the machinery. At the cap, Gradia stops — it never keeps spending.",
  },
  {
    title: "Built only for this trade",
    body: "Gradia speaks detailing natively — services, vehicles, coatings, follow-up cycles — not a generic tool with your industry pasted on.",
  },
];

export function AsksFirst() {
  return (
    <Section>
      <Eyebrow>Why Gradia</Eyebrow>
      <h2 className="max-w-[18ch]">Gradia asks first.</h2>
      <Lead>
        The industry default is autopilot — AI that sends, books, and bills on its own. Gradia
        was built the other way.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.title}>
            {c.signature && (
              <p className="mb-3 flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent)]">
                <Check size={13} strokeWidth={2.5} aria-hidden />
                Approved by you
              </p>
            )}
            <h3 className="text-[length:var(--sv-text-lg)]">{c.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{c.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
