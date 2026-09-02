import Link from "next/link";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { ARTICLES } from "./articles";

/* /resources index — minimal shell + article stub cards (Pass 5 Cycle 4). */

export function ResourcesIndex() {
  return (
    <>
      <Section>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="max-w-[18ch]">Guides for shop owners.</h1>
        <Lead>
          Practical reads on running the business side of a detailing or automotive appearance
          shop — leads, follow-ups, scheduling and staying in control.
        </Lead>
        <div className="mt-8">
          <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <div className="grid gap-5 md:grid-cols-1 lg:max-w-[48rem]">
          {ARTICLES.map((article) => (
            <Card key={article.slug}>
              <h2 className="text-[length:var(--sv-text-lg)]">{article.title}</h2>
              <p className="mt-3 text-[length:var(--sv-text-sm)] leading-relaxed text-[var(--sv-ink-2)]">
                {article.excerpt}
              </p>
              <Link
                href={`/resources/${article.slug}`}
                className="mt-5 inline-block text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-accent)] underline-offset-4 hover:underline"
              >
                Read more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
