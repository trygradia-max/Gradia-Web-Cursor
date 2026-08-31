import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow, Lead, Button } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 1 — Hero (site-v2-plan §3.1 + reference-trygtm ADOPT-1).
   Centered: chip eyebrow → D-033 headline → support line → ink pill +
   underlined-text secondary → trust line → dark graphite product frame.
   P3-E (2/2): frame cards speak the real product's voice — the canonical
   approval vocabulary from approvals-list.tsx ("Send it" · Pending ·
   "Sent ✓" · booked/on the calendar), consistent with the Section 3
   vignettes. Stage labels stay: they tell the story at a glance. */

const stages: {
  label: string;
  title: string;
  meta: string;
  approved?: boolean;
}[] = [
  {
    label: "New lead",
    title: SAMPLE.customer,
    meta: `${SAMPLE.vehicle} · “Do you do ceramic maintenance?”`,
  },
  {
    label: "Prepared",
    title: `Quote drafted — ${SAMPLE.price}`,
    meta: `${SAMPLE.service} · Pending your review`,
  },
  {
    label: "Approved by you",
    title: "You tapped Send it",
    meta: `Text + email to ${SAMPLE.firstName} · Sent ✓`,
    approved: true,
  },
  {
    label: "Scheduled",
    title: `Booked — ${SAMPLE.slot}`,
    meta: `On the calendar · confirmed with ${SAMPLE.firstName}`,
  },
];

function HeroFrame() {
  return (
    <div className="rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
      <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
        <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
          One lead, from first message to booked
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
      </div>
      <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <li
            key={s.label}
            className="relative rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
          >
            <p
              className={`flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] ${
                s.approved ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
              }`}
            >
              {s.approved && <Check size={13} strokeWidth={2.5} aria-hidden />}
              {s.label}
            </p>
            <p className="mt-2.5 font-medium text-white">{s.title}</p>
            <p className="mt-1.5 text-[length:var(--sv-text-xs)] leading-relaxed text-white/50">{s.meta}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Hero() {
  return (
    <section className="pb-[var(--sv-section-y)] pt-12 sm:pt-16">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow chip>Engineered for detailing &amp; automotive appearance shops</Eyebrow>
        <h1 className="max-w-[17ch]">Run your shop. Capture every lead. Recover more revenue.</h1>
        <Lead className="text-center">
          Gradia connects your customers, vehicles, leads, quotes, jobs, conversations,
          campaigns and schedule in one operating system — and helps keep the work moving.
        </Lead>
        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <Button href="/#trial" size="lg">
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
