import { Eyebrow, Lead, Section } from "../primitives";

/* Section 9 — FAQ, honest answers (site-v2-plan §3.9, added from the trygtm
   reference). Light since P3-F's alternation recompute (band moved to
   Industries). Native <details>/<summary> — no JS accordion. Every answer
   stays inside WHAT_GRADIA_DOES §4 + the platform guarantees; the
   unflattering answers are the point. No receptionist question while
   Section 7 is hidden (add at un-hide); no pricing/trial-length questions
   until the pricing page ships. FAQPage JSON-LD rides Pass 5/6, not now. */

const faqs: { q: string; a: string }[] = [
  {
    q: "Does Gradia send messages by itself?",
    a: "Only if you turn autonomy on. Everything starts suggest-first, and money and calendar actions always ask first — no setting changes that.",
  },
  {
    q: "What if Gradia drafts something wrong?",
    a: "You see every draft before it goes anywhere. Edit it or discard it at review — nothing sends until you approve.",
  },
  {
    q: "Do I have to start over with a new system?",
    a: "No. Importing your existing customers, vehicles and calendar is built in (currently in beta) — your history comes with you.",
  },
  {
    q: "Do I have to use the AI features?",
    a: "No. Customers, pipeline, quotes, jobs and the calendar all work with every AI feature ignored.",
  },
  {
    q: "Could Gradia spam my customers?",
    a: "No. Outreach has hard caps and cooldowns, and opt-outs are honored before anything is even staged for your approval.",
  },
  {
    q: "Who does the customer hear from?",
    a: "Your shop. Gradia writes as “we” — your name, your voice — never as a third-party bot.",
  },
];

export function Faq() {
  return (
    <Section>
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="max-w-[18ch]">Honest answers.</h2>
      <Lead>Direct answers to what shop owners actually ask.</Lead>

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
