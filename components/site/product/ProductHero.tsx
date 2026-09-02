import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";

/* Product page hero — D-033 category line + depth-page positioning. */

export function ProductHero() {
  return (
    <Section>
      <Eyebrow chip>Built for detailing &amp; automotive appearance shops</Eyebrow>
      <h1 className="max-w-[22ch]">
        The operating system for detailing and automotive appearance shops.
      </h1>
      <Lead>
        Run your shop. Capture every lead. Recover more revenue. Gradia connects customers,
        vehicles, leads, quotes, jobs, conversations, campaigns and schedule in one system —
        with every important action staged for your approval.
      </Lead>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
          Start your trial
        </Button>
        <Button href="#capabilities" variant="link" size="md">
          See what&apos;s inside
        </Button>
      </div>
      <p className="mt-6 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
        Guided setup · You approve what goes out
      </p>
    </Section>
  );
}
