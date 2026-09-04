import { ArrowRight } from "lucide-react";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Container } from "../primitives";

/* Final CTA — D-067 CRM positioning. Trust line keeps import claim (beta) +
   approval moat. No OS / jobs / payments language. */

export function FinalCta() {
  return (
    <section id="trial" className="bg-[var(--sv-graphite)] py-[var(--sv-section-y)]">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-[20ch]">Run the shop without the shop running you.</h2>
        <p className="mt-5 max-w-[38rem] text-[length:var(--sv-text-lg)] leading-relaxed text-white/60">
          An AI-native CRM that works your leads and reports what happened — with your
          approval on what goes out.
        </p>
        <div className="mt-9">
          <Button href={TRIAL_CTA_HREF} variant="inverse" size="lg">
            Start your trial
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Button>
        </div>
        <p className="mt-6 text-[length:var(--sv-text-sm)] text-white/50">
          Guided setup · You approve what goes out · Import your existing customers — no
          starting over
        </p>
      </Container>
    </section>
  );
}
