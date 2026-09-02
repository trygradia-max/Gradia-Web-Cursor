import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { PRICING_FAQS, PRICING_TIERS, TRIAL_LINE } from "./data";

/* Pass 5 Cycle 3 — /pricing (SHOW_PRICING + middleware double-gated until P0-013).
   Three tiers per D-034, trial line per D-035, caps/no-surprise-bills FAQ. */

export function PricingContent() {
  return (
    <>
      <Section>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="max-w-[16ch]">One system. Three ways to run it.</h1>
        <Lead>
          Every tier includes the full CRM, Gradia Agent, Whisper and approvals. The split is
          how much Gradia does and through which channels — never by walling off your data.
        </Lead>
        <p className="mt-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-2)]">
          {TRIAL_LINE}
        </p>
        <div className="mt-8">
          <Button href="/#trial" variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <div className="grid gap-5 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.highlighted
                  ? "border-[var(--sv-line-strong)] ring-1 ring-[var(--sv-ink)]/10"
                  : undefined
              }
            >
              {tier.highlighted && (
                <p className="mb-3 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent)]">
                  Most shops start here
                </p>
              )}
              <h2 className="text-[length:var(--sv-text-xl)]">{tier.name}</h2>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-[length:var(--sv-text-3xl)] font-semibold tabular-nums text-[var(--sv-ink)]">
                  ${tier.price}
                </span>
                <span className="text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
                  /month
                </span>
              </p>
              <p className="mt-3 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
                {tier.tagline}
              </p>
              <ul className="mt-6 space-y-3 border-t border-[var(--sv-line)] pt-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)] before:mr-2 before:text-[var(--sv-ink-3)] before:content-['·']"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-[42rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          Credit pack $10 / 950 credits · minute pack $10 / 40 minutes. Offered at 80% usage;
          optional auto-top-up with your ceiling. No founding pricing, lifetime discounts or
          crossed-out prices.
        </p>
      </Section>

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="max-w-[20ch]">Predictable cost, honest limits.</h2>
        <Lead>Caps, credits and the trial — straight answers.</Lead>

        <div className="mt-10 max-w-[46rem] border-t border-[var(--sv-line-strong)]">
          {PRICING_FAQS.map((f) => (
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

      <FinalCta />
    </>
  );
}
