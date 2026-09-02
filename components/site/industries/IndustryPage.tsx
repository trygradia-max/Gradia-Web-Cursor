import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import type { Industry } from "./data";
import { IndustryFlow } from "./IndustryFlow";

/* Shared industry-page template (Pass 5 Cycle 2): headline + three pains →
   trade-specific connected flow → Ask-Gradia micro-moment → CTA. */

export function IndustryPage({ industry }: { industry: Industry }) {
  return (
    <>
      <Section>
        <Link
          href="/industries"
          className="mb-6 inline-flex items-center gap-1.5 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)] transition-colors hover:text-[var(--sv-ink)]"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          All industries
        </Link>
        <Eyebrow>{industry.title}</Eyebrow>
        <h1 className="max-w-[24ch]">{industry.headline}</h1>
        <Lead>{industry.lead}</Lead>
        <div className="mt-8">
          <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <Eyebrow>The challenge</Eyebrow>
        <h2 className="max-w-[22ch]">What gets in the way of running a great shop.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {industry.pains.map((pain) => (
            <Card key={pain.title}>
              <h3 className="text-[length:var(--sv-text-base)] font-semibold">{pain.title}</h3>
              <p className="mt-3 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
                {pain.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="max-w-[22ch]">One system from first message to finished job.</h2>
        <Lead>
          Watch one {industry.slug === "fleet" ? "account" : "customer"} move through Gradia.
          Same record at every stage — you approve the moments that matter.
        </Lead>
        <div className="mt-12">
          <IndustryFlow frameLabel={industry.frameLabel} stages={industry.stages} />
        </div>
      </Section>

      <Section band>
        <Eyebrow>Gradia Agent</Eyebrow>
        <h2 className="max-w-[20ch]">Your shop&apos;s memory, on demand.</h2>
        <p className="mt-5 max-w-[34rem] text-[length:var(--sv-text-sm)]">
          <span className="italic text-[var(--sv-ink-3)]">&ldquo;{industry.ask}&rdquo;</span>{" "}
          <span className="whitespace-nowrap font-semibold text-[var(--sv-ink)]">Ask Gradia.</span>
        </p>
        <p className="mt-4 max-w-[34rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
          Gradia reads your customers, quotes and schedule — then stages anything it prepares
          for your approval. Nothing sends on its own.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
