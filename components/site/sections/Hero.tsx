import { ArrowRight } from "lucide-react";
import { PILOT_CTA_HREF, PILOT_CTA_LABEL, PILOT_STATUS } from "@/lib/site-config";
import { Container, Eyebrow, Lead, Button } from "../primitives";
import { MGroup, MItem } from "../motion";
import { SAMPLE } from "../sample";

const stages: { label: string; title: string; meta: string }[] = [
  {
    label: "Inquiry",
    title: SAMPLE.customer,
    meta: `${SAMPLE.vehicle} · ceramic maintenance question`,
  },
  {
    label: "Quote prepared",
    title: `${SAMPLE.service} — ${SAMPLE.price}`,
    meta: "From the shop menu · waiting for your review",
  },
  {
    label: "Needs you",
    title: "Draft reply ready",
    meta: "Nothing goes out until you approve",
  },
  {
    label: "Next step",
    title: `Proposed time — ${SAMPLE.slot}`,
    meta: "Appointment presented for approval when required",
  },
];

function HeroFrame() {
  return (
    <div className="rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
      <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
          Chief of Staff · needs you
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">
          Product preview · sample business data
        </p>
      </div>
      <MGroup tag="ol" mount delay={0.25} className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <MItem
            tag="li"
            key={s.label}
            className="relative rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
              {s.label}
            </p>
            <p className="mt-2.5 font-medium text-white">{s.title}</p>
            <p className="mt-1.5 text-[length:var(--sv-text-xs)] leading-relaxed text-white/50">
              {s.meta}
            </p>
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
        <Eyebrow chip>For detailing &amp; automotive appearance businesses</Eyebrow>
        <h1 className="max-w-[18ch]">More time on the car. Less time chasing the booking.</h1>
        <Lead className="text-center">
          Gradia brings your customers, vehicles, conversations, quotes and calendar together. One
          Gradia Agent is being built to help qualify leads, prepare quotes and move bookings
          forward—with you in control.
        </Lead>
        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <Button href={PILOT_CTA_HREF} size="lg">
            {PILOT_CTA_LABEL}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Button>
          <Button href="#how-it-works" variant="link" size="lg">
            See the planned workflow
          </Button>
        </div>
        <p className="mt-6 max-w-[36rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          {PILOT_STATUS}
        </p>
      </Container>
      <Container className="mt-12 sm:mt-16">
        <HeroFrame />
      </Container>
    </section>
  );
}
