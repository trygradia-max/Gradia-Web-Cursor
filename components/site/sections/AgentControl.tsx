import { Check, Mic } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

const plannedPrompts = [
  "Show me ceramic coating inquiries waiting for a quote.",
  "Prepare a quote for this customer's SUV using our service menu.",
  "Draft a reply asking which day works for them.",
];

export function AgentControl() {
  return (
    <Section>
      <Eyebrow>Gradia Agent</Eyebrow>
      <h2 className="max-w-[24ch]">Gradia prepares the work. You decide what goes out.</h2>
      <Lead>
        Ask Gradia to find a customer, prepare a quote or draft the next reply. Customer-facing
        actions start with approval required. The finished controls will let owners enable specific
        actions within their shop&apos;s rules.
      </Lead>

      <ul className="mt-8 space-y-2">
        {plannedPrompts.map((prompt) => (
          <li
            key={prompt}
            className="max-w-[42rem] rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-surface)] px-4 py-3 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]"
          >
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
              Planned example
            </span>
            {prompt}
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Gradia Agent
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
            Product preview · sample business data
          </p>
        </div>

        <div className="space-y-3">
          <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
            <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
            <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">
              Prepare a quote for this customer&apos;s SUV using our service menu.
            </p>
          </div>

          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Prepared — waiting for your review
            </p>
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                {SAMPLE.service} — {SAMPLE.price}
              </p>
              <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                {SAMPLE.customer} · {SAMPLE.vehicle} · from your menu
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <span className="rounded-[6px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                Approve
              </span>
              {["Edit", "Hold"].map((a) => (
                <span
                  key={a}
                  className="rounded-[6px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3>Gradia Whisper</h3>
        <p className="mt-3 max-w-[36rem]">
          Whisper is the communications experience across enabled channels — not a second bot or a
          second brain. A voice note is an input to the same Gradia Agent.
        </p>
      </div>

      <div className="mt-8 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Voice note · same Agent
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
            Product preview · sample business data
          </p>
        </div>
        <div className="space-y-3">
          <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
            <p className="flex items-center gap-1.5 text-[length:var(--sv-text-xs)] text-white/40">
              <Mic size={12} strokeWidth={2} aria-hidden />
              Voice note
            </p>
            <p className="mt-1 text-[length:var(--sv-text-sm)] text-white">
              &ldquo;Quote {SAMPLE.firstName} for ceramic maintenance on the X5.&rdquo;
            </p>
          </div>
          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Staged — waiting for your review
            </p>
            <div className="px-4 py-3">
              <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                Quote drafted — ceramic maintenance
              </p>
              <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                Same Agent · nothing sends without your OK
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 flex max-w-[44rem] items-start gap-2 text-[var(--sv-ink-2)]">
        <Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-[var(--sv-accent)]" aria-hidden />
        Connecting a channel does not automatically allow every action on it. Per-action autonomy
        is planned; it is not claimed as live across every path today.
      </p>
    </Section>
  );
}
