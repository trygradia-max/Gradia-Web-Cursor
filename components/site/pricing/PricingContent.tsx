import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";

/* /pricing stays flag-hidden and middleware-gated. This copy is the holding
   page if the route is ever opened internally — no checkout prices, trial
   language, seat guesses or entitlements. */

export function PricingContent() {
  return (
    <>
      <Section>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="max-w-[18ch]">Pilot pricing and terms are confirmed before onboarding.</h1>
        <Lead>
          Public checkout prices, plan entitlements and seat counts are not published here. There
          is no free trial. Request access and we&apos;ll share terms if there is a fit.
        </Lead>
        <div className="mt-8">
          <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
            {PILOT_CTA_LABEL}
          </Button>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
