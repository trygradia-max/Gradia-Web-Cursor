import { PILOT_CTA_HREF, PILOT_CTA_LABEL, PILOT_STATUS } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";

export function ProductHero() {
  return (
    <Section>
      <Eyebrow chip>For detailing &amp; automotive appearance businesses</Eyebrow>
      <h1 className="max-w-[20ch]">
        The customer, the conversation and the next step—together.
      </h1>
      <Lead>
        Gradia brings customer records, vehicles, conversations, quotes and calendar into one CRM.
        One Gradia Agent is being built to help move a lead from inquiry toward a booking—with you
        in control.
      </Lead>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
          {PILOT_CTA_LABEL}
        </Button>
        <Button href="#workflow" variant="link" size="md">
          See the planned workflow
        </Button>
      </div>
      <p className="mt-6 max-w-[40rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
        {PILOT_STATUS}
      </p>
    </Section>
  );
}
