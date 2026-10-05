import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { SAMPLE } from "../sample";
import { GraphiteFrame, LightScreen } from "../product/shared";

export function DemoContent() {
  return (
    <>
      <Section>
        <Eyebrow>Demo</Eyebrow>
        <h1 className="max-w-[16ch]">Product preview — not a playable recording.</h1>
        <Lead>
          We do not have an accepted recording of the live loop yet. The frames below are product
          previews with sample business data. They show the intended inquiry → quote → approval
          workflow, not sent messages or completed bookings.
        </Lead>
        <div className="mt-8">
          <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
            {PILOT_CTA_LABEL}
          </Button>
        </div>
      </Section>

      <Section band id="chief-of-staff">
        <p className="mb-3 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
          Preview 1
        </p>
        <h2 className="max-w-[24ch]">Chief of Staff — what needs you</h2>
        <Lead>
          Proposed actions wait for approval. Held and failed states stay visible. Quote value is
          not treated as revenue.
        </Lead>
        <div className="mt-10">
          <GraphiteFrame label="Chief of Staff">
            <div className="space-y-3">
              <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                  Waiting for approval
                </p>
                <p className="mt-1 text-[length:var(--sv-text-sm)] font-medium text-white">
                  Quote reply for {SAMPLE.firstName} — {SAMPLE.service}
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">Proposed · not sent</p>
              </div>
              <p className="px-1 text-[length:var(--sv-text-xs)] text-white/50">
                Held: website form waiting on shop verification. Failed: one exception flagged for
                review.
              </p>
            </div>
          </GraphiteFrame>
        </div>
      </Section>

      <Section id="quote">
        <p className="mb-3 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
          Preview 2
        </p>
        <h2 className="max-w-[24ch]">Menu-based quote, waiting for review</h2>
        <Lead>
          The quote is prepared from the shop menu. Nothing is claimed as sent or booked in this
          preview.
        </Lead>
        <div className="mt-10">
          <LightScreen label="Quote">
            <div className="space-y-0">
              <div className="border-b border-[var(--sv-line)] px-4 py-3.5 sm:px-5">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">
                  {SAMPLE.customer} · {SAMPLE.vehicle}
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
                  {SAMPLE.service} — {SAMPLE.price}
                </p>
              </div>
              <div className="px-4 py-3.5 sm:px-5">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">
                  Draft reply
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
                  Asking which day works — waiting for your review
                </p>
              </div>
            </div>
          </LightScreen>
        </div>
      </Section>

      <Section band>
        <p className="max-w-[42rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          Initial pilot channels are SMS, website forms and Meta Lead Ads, each enabled after
          verification. Email and inbound calls follow their own readiness checks. Voice
          receptionist sales content stays gated. Bulk win-back and review campaigns are outside
          the initial MVP.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
