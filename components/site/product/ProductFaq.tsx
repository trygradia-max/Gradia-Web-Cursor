import { Eyebrow, Lead, Section } from "../primitives";

/* Product-page FAQ subset — claim-law clean, no receptionist or pricing questions
   while those gates are closed. FAQPage JSON-LD rides Pass 6. */

const faqs: { q: string; a: string }[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on for a specific workflow. Everything starts suggest-first, and money and calendar actions always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it, tweak it or drop it — nothing sends until you approve.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes, jobs and the calendar all work with every AI feature turned off.",
  },
  {
    q: "Could Gradia spam my customers?",
    a: "No. Outreach has hard caps and cooldowns per run and per customer. Opt-outs are honored before anything is even staged for your approval.",
  },
  {
    q: "Do I have to start over with a new system?",
    a: "No. Importing your existing customers, vehicles and calendar is built in (currently in beta) — your history comes with you.",
  },
];

export function ProductFaq() {
  return (
    <Section>
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="max-w-[18ch]">Honest answers.</h2>
      <Lead>What owners ask before they start.</Lead>

      <div className="mt-10 max-w-[46rem] border-t border-[var(--sv-line-strong)]">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-[var(--sv-line-strong)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-medium text-[var(--sv-ink)]">{f.q}</span>
              <span
                aria-hidden
                className="shrink-0 text-[var(--sv-ink-3)] transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[40rem] pb-5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
