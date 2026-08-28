import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Section, Eyebrow, Lead, Button, Card } from "@/components/site/primitives";

/* Pass 1 style guide — living reference for every later pass.
   This page demonstrates the foundation; it is NOT the homepage.
   Copy shown is the locked D-033 language so reviewers see real words. */

export default function StyleGuide() {
  return (
    <>
      <SiteNav />

      {/* Hero specimen */}
      <Section>
        <Eyebrow>Built for detailing &amp; automotive appearance shops</Eyebrow>
        <h1 className="max-w-[16ch]">Run your shop. Capture every lead. Recover more revenue.</h1>
        <Lead>
          Gradia connects your customers, vehicles, leads, quotes, jobs, conversations and
          schedule in one operating system — and helps keep the work moving.
        </Lead>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="#trial" size="lg">Start your trial</Button>
          <Button href="#how" variant="secondary" size="lg">See how it works</Button>
        </div>
        <p className="mt-5 text-[var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          Guided setup · You approve what goes out
        </p>
      </Section>

      {/* Band section + cards */}
      <Section band id="how">
        <Eyebrow>Section band</Eyebrow>
        <h2 className="max-w-[22ch]">Alternate sections sit on a warm wash with hairline borders.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <h3>Know every customer</h3>
            <p className="mt-3 text-[var(--sv-text-sm)]">
              Customers, vehicles, conversations, quotes, jobs and history — together.
            </p>
          </Card>
          <Card>
            <h3>Keep every opportunity moving</h3>
            <p className="mt-3 text-[var(--sv-text-sm)]">
              Organize leads, send quotes, follow up, and see what should happen next.
            </p>
          </Card>
          <Card>
            <h3>Stay in control</h3>
            <p className="mt-3 text-[var(--sv-text-sm)]">
              Gradia recommends the next action. You decide what happens.
            </p>
          </Card>
        </div>
      </Section>

      {/* Tokens reference */}
      <Section>
        <Eyebrow>Foundation reference</Eyebrow>
        <h2>Type, color, controls</h2>

        <div className="mt-10 space-y-4">
          <h1>Headline one — 600, tight</h1>
          <h2>Headline two for section leads</h2>
          <h3>Headline three for panels</h3>
          <p className="max-w-[46rem]">
            Body text at 17px/1.6 in ink-2. Short paragraphs, never walls. One link style:{" "}
            <a href="#how" className="font-medium text-[var(--sv-accent)] underline underline-offset-4">
              accent underline
            </a>.
          </p>
          <p className="text-[var(--sv-text-sm)] text-[var(--sv-ink-3)]">Caption / small meta text in ink-3.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {[
            ["paper", "var(--sv-paper)"],
            ["surface", "var(--sv-surface)"],
            ["wash", "var(--sv-wash)"],
            ["line", "var(--sv-line)"],
            ["ink", "var(--sv-ink)"],
            ["ink-2", "var(--sv-ink-2)"],
            ["ink-3", "var(--sv-ink-3)"],
            ["accent", "var(--sv-accent)"],
            ["accent-soft", "var(--sv-accent-soft)"],
            ["graphite", "var(--sv-graphite)"],
          ].map(([name, v]) => (
            <div key={name} className="flex items-center gap-2 rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-surface)] px-3 py-2">
              <span className="inline-block h-6 w-6 rounded-full border border-[var(--sv-line)]" style={{ background: v }} />
              <code className="text-[var(--sv-text-xs)] text-[var(--sv-ink-2)]">{name}</code>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3" id="trial">
          <Button href="#" size="lg">Primary large</Button>
          <Button href="#">Primary</Button>
          <Button href="#" variant="secondary">Secondary</Button>
          <Button href="#" variant="ghost">Ghost link</Button>
        </div>
      </Section>

      {/* Dark graphite specimen — used sparingly (product frames, final CTA) */}
      <section className="bg-[var(--sv-graphite)] py-[var(--sv-section-y)]">
        <div className="mx-auto w-full max-w-[var(--sv-container)] px-5 sm:px-8">
          <p className="mb-4 text-[var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/50">
            Graphite band
          </p>
          <h2 className="max-w-[20ch] text-white">Dark panels exist for product UI frames and the final CTA — nothing else.</h2>
          <div className="mt-8">
            <Button href="#" size="lg">Start your trial</Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
