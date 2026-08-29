import { ArrowRight } from "lucide-react";
import { Button, Container } from "../primitives";

/* Section 10 — Final CTA (site-v2-plan §3.10). Full-bleed graphite band,
   the page's closing dark moment mirroring the hero frame. Carries
   id="trial" so the nav + hero 'Start your trial' anchors resolve here
   until the founder decides the real CTA destination (REVIEW_NOTES N1).
   CTA is the inverse (white-on-graphite) pill — the ink pill inverted,
   keeping the monochrome discipline; accent stays a signal color. */

export function FinalCta() {
  return (
    <section id="trial" className="bg-[var(--sv-graphite)] py-[var(--sv-section-y)]">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-[20ch] text-white">Run the shop without the shop running you.</h2>
        <p className="mt-5 max-w-[38rem] text-[length:var(--sv-text-lg)] leading-relaxed text-white/60">
          Customers, jobs, conversations and follow-ups in one place — moving, with your
          approval.
        </p>
        <div className="mt-9">
          <Button href="/#trial" variant="inverse" size="lg">
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
