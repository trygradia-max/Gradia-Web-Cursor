import Link from "next/link";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { PUBLIC_INDUSTRIES } from "./data";

/* /industries index — D-067. Fleet gated out of PUBLIC_INDUSTRIES. */

export function IndustriesIndex() {
  return (
    <>
      <Section>
        <Eyebrow>Industries</Eyebrow>
        <h1 className="max-w-[18ch]">Built for shops with staff.</h1>
        <Lead>
          The same AI-native CRM, tuned to how your trade actually runs — detailing, ceramic,
          PPF, tint and mobile. For established shops already spending on ads.
        </Lead>
        <div className="mt-8">
          <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <div className="grid gap-5 md:grid-cols-2">
          {PUBLIC_INDUSTRIES.map((industry) => (
            <Card key={industry.slug}>
              <h2 className="text-[length:var(--sv-text-lg)]">{industry.title}</h2>
              <p className="mt-3 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
                {industry.headline}
              </p>
              <Link
                href={`/industries/${industry.slug}`}
                className="mt-5 inline-block text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-accent)] underline-offset-4 hover:underline"
              >
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
