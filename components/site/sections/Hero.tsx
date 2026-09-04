import { ArrowRight, Check } from "lucide-react";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Container, Eyebrow, Lead, Button } from "../primitives";
import { MGroup, MItem, MPop, DUR, STAGGER } from "../motion";
import { SAMPLE } from "../sample";

/* Section 1 — Hero. Repositioned 2026-09-03 (D-067): AI-native CRM + agent
   story; contrast vs systems of record; ICP explicit. Sample frame shows
   approval vocabulary only — no SMS/voice/Meta delivery claims (D-025). */

const stages: {
  label: string;
  title: string;
  meta: string;
  approved?: boolean;
}[] = [
  {
    label: "New lead",
    title: SAMPLE.customer,
    meta: `${SAMPLE.vehicle} · inquiry landed in the pipeline`,
  },
  {
    label: "Prepared",
    title: `Quote drafted — ${SAMPLE.price}`,
    meta: `${SAMPLE.service} · Pending your review`,
  },
  {
    label: "Approved by you",
    title: "You tapped Send it",
    meta: `Draft approved · nothing left your shop without you`,
    approved: true,
  },
  {
    label: "Booked",
    title: `On the calendar — ${SAMPLE.slot}`,
    meta: `Pipeline moved · confirmed with ${SAMPLE.firstName}`,
  },
];

function HeroFrame() {
  return (
    <div className="rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
      <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
          One lead, from inquiry to booked
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
      </div>
      <MGroup tag="ol" mount delay={0.25} className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <MItem
            tag="li"
            key={s.label}
            className="relative rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
          >
            <p
              className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                s.approved ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
              }`}
            >
              {s.approved && (
                <MPop mount delay={0.25 + 4 * STAGGER + DUR}>
                  <Check size={13} strokeWidth={2.5} aria-hidden />
                </MPop>
              )}
              {s.label}
            </p>
            <p className="mt-2.5 font-medium text-white">{s.title}</p>
            <p className="mt-1.5 text-[length:var(--sv-text-xs)] leading-relaxed text-white/50">{s.meta}</p>
          </MItem>
        ))}
      </MGroup>
    </div>
  );
}

export function Hero() {
  return (
    <section className="pb-[var(--sv-section-y)] pt-12 sm:pt-16">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow chip>AI-native CRM for detailing, ceramic, PPF &amp; tint</Eyebrow>
        <h1 className="max-w-[18ch]">Gradia does the work. You approve what matters.</h1>
        <Lead className="text-center">
          Jobber and Urable are systems of record you operate. Gradia qualifies leads, drafts
          quotes, books appointments, and moves the pipeline — you read what happened and
          approve what matters. Built for established shops with staff, already spending on ads.
        </Lead>
        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <Button href={TRIAL_CTA_HREF} size="lg">
            Start your trial
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Button>
          <Button href="#how" variant="link" size="lg">
            See how it works
          </Button>
        </div>
        <p className="mt-6 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          Guided setup · You approve what goes out
        </p>
      </Container>
      <Container className="mt-12 sm:mt-16">
        <HeroFrame />
      </Container>
    </section>
  );
}
