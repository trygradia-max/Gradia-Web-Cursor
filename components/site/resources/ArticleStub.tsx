import Link from "next/link";
import { Button, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import type { ArticleStub as Article } from "./articles";

/* Individual resource article stub — full content post-cutover. */

export function ArticleStubPage({ article }: { article: Article }) {
  return (
    <>
      <Section>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="max-w-[28ch]">{article.title}</h1>
        <Lead>{article.excerpt}</Lead>
        <p className="mt-8 max-w-[42rem] text-[length:var(--sv-text-sm)] leading-relaxed text-[var(--sv-ink-2)]">
          Full article coming soon. We&apos;re building out guides for shop owners who want
          practical advice on leads, follow-ups and running the business — not generic AI hype.
          In the meantime, see how Gradia handles the same problems in product.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/demo" variant="primary">
            Watch the demo
          </Button>
          <Link
            href="/resources"
            className="inline-flex h-11 items-center text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-accent)] underline-offset-4 hover:underline"
          >
            ← All guides
          </Link>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
