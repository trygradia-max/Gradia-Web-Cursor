import Link from "next/link";
import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { PUBLIC_INDUSTRIES } from "./data";

export function IndustriesIndex() {
  return (
    <>
      <Section>
        <Eyebrow>Industries</Eyebrow>
        <h1 className="max-w-[18ch]">Built around the way appearance businesses work.</h1>
        <Lead>
          Detailing, ceramic coating, PPF, tint and mobile — from a solo business to a shop with a
          team. The same CRM and the same intended lead workflow, at one location or within one
          mobile service area.
        </Lead>
        <div className="mt-8">
          <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
            {PILOT_CTA_LABEL}
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
