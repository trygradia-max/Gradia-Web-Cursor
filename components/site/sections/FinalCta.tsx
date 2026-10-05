import { ArrowRight } from "lucide-react";
import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Container } from "../primitives";

export function FinalCta() {
  return (
    <section className="bg-[var(--sv-graphite)] py-[var(--sv-section-y)]">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-[20ch]">Help shape Gradia in a real shop.</h2>
        <p className="mt-5 max-w-[38rem] text-[length:var(--sv-text-lg)] leading-relaxed text-white/60">
          Tell us how your business handles inquiries today. Request access to the controlled
          pilot, and we&apos;ll follow up about fit and availability.
        </p>
        <div className="mt-9">
          <Button href={PILOT_CTA_HREF} variant="inverse" size="lg">
            {PILOT_CTA_LABEL}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Button>
        </div>
        <p className="mt-6 text-[length:var(--sv-text-sm)] text-white/50">
          Requesting access does not create an account or start a subscription.
        </p>
      </Container>
    </section>
  );
}
