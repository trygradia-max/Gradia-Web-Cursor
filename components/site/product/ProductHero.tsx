import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";

/* Product hero — D-067 AI-native CRM positioning. */

export function ProductHero() {
  return (
    <Section>
      <Eyebrow chip>AI-native CRM for detailing, ceramic, PPF &amp; tint</Eyebrow>
      <h1 className="max-w-[20ch]">
        Gradia does the work. You approve what matters.
      </h1>
      <Lead>
        Jobber and Urable are systems of record you operate. Gradia qualifies leads, drafts
        quotes, books appointments, and moves the pipeline — you read what happened and approve
        what matters. Built for established shops with staff, already spending on ads.
      </Lead>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
          Start your trial
        </Button>
        <Button href="#flagships" variant="link" size="md">
          See the three flagships
        </Button>
      </div>
      <p className="mt-6 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
        Guided setup · You approve what goes out
      </p>
    </Section>
  );
}
