import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* "Gradia asks first." — D-067 contrast: systems of record vs Gradia does the
   work. Jobber/Urable named per founder commercial claim (CONTEXT §1). No
   payment/charge claims (out of scope). */

const cards: { title: string; body: string; signature?: boolean }[] = [
  {
    title: "Asks first",
    body: "Every outbound draft and booking is prepared, shown to you, and released on your OK. Autopilot is something you turn on — never a default.",
    signature: true,
  },
  {
    title: "Does the work",
    body: "Systems of record wait for clicks. Gradia qualifies leads, drafts quotes, proposes times and moves the pipeline — then reports what happened.",
  },
  {
    title: "Built for this trade",
    body: "Detailing, ceramic, PPF and tint natively — vehicles, coatings, follow-up cycles — not a generic CRM with your industry pasted on. For shops with staff, already spending on ads.",
  },
];

export function AsksFirst() {
  return (
    <Section band>
      <Eyebrow>Why Gradia</Eyebrow>
      <h2 className="max-w-[18ch]">Gradia asks first.</h2>
      <Lead>
        Jobber and Urable are systems of record you operate. Gradia does the work and reports
        it — with your approval on what goes out.
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
