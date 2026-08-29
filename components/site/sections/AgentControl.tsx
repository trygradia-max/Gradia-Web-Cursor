import { Check } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";

/* Section 6 — Gradia Agent + control, ONE section (site-v2-plan §3.6,
   NEXT_TASK scope 6). The demo: ask in plain English → result list →
   "Prepare follow-ups" → Prepared → Review · Edit · Approve → activity log.
   Graphite frame (the product's chat surface — Section 5 broke the rhythm,
   per REVIEW_NOTES). Approve carries the accent. The result list is
   nameless on purpose: Sarah is already booked in this page's timeline, so
   she cannot appear in a "hasn't booked" list. Structural placeholder;
   Pass 3 swaps in real UI, Pass 4 may sequence it. */

const foundLeads: { title: string; meta: string }[] = [
  { title: "Ceramic coating inquiry", meta: "Quoted — no reply yet" },
  { title: "PPF + ceramic ask", meta: "Went quiet after the quote" },
  { title: "Ceramic maintenance question", meta: "Never quoted" },
];

function OwnerBubble({ children }: { children: string }) {
  return (
    <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
      <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
      <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">{children}</p>
    </div>
  );
}

export function AgentControl() {
  return (
    <Section band>
      <Eyebrow>Gradia Agent</Eyebrow>
      <h2 className="max-w-[24ch]">Tell Gradia what needs to get done. Approve it before it goes out.</h2>
      <Lead>
        Ask in plain English. Gradia finds it, drafts it and stages it — nothing sends until
        you approve.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            Gradia Agent
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <div className="space-y-3">
          <OwnerBubble>
            Show me every ceramic coating lead this month that hasn&apos;t booked.
          </OwnerBubble>

          {/* Result list */}
          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-white/45">
              Ceramic coating leads — not booked
            </p>
            {foundLeads.map((lead) => (
              <div key={lead.title} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{lead.title}</p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{lead.meta}</p>
              </div>
            ))}
          </div>

          <OwnerBubble>Prepare follow-ups.</OwnerBubble>

          {/* Staged, waiting for approval */}
          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Prepared — waiting for your review
            </p>
            {foundLeads.map((lead) => (
              <div key={lead.title} className="border-b border-white/10 px-4 py-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                  Follow-up for “{lead.title}”
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                  Text + email drafted — nothing sent yet
                </p>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              {["Review", "Edit"].map((a) => (
                <span
                  key={a}
                  className="rounded-[100px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                >
                  {a}
                </span>
              ))}
              <span className="rounded-[100px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                Approve
              </span>
            </div>
          </div>

          {/* Activity log */}
          <p className="flex items-center gap-2 px-1 pt-1 text-[length:var(--sv-text-xs)] text-white/50">
            <Check size={13} strokeWidth={2.5} aria-hidden className="text-[var(--sv-accent-on-dark)]" />
            Activity log — follow-ups approved by you · sent · logged
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-[44rem] text-[var(--sv-ink-2)]">
        Start with approvals. Give Gradia more responsibility when it&apos;s earned it.{" "}
        <span className="font-medium text-[var(--sv-ink)]">Money and calendar always ask.</span>
      </p>
    </Section>
  );
}
