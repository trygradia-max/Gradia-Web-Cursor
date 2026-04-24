import type { Metadata } from "next";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gradia is the vertical company — AI digital employees built for healthcare, home services, and professional services.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg)]">
      <MarketingPageShell className="py-24 lg:py-36">
        <ScrollReveal>
          <SectionLabel>About Gradia</SectionLabel>
          <h1 className="mt-6 max-w-[22ch] font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--foreground)]">
            The Vertical Company.
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              Every day, businesses lose revenue to ringing phones that nobody
              picks up. Front-desk staff are stretched thin. Callers hang up.
              Leads vanish. We started Gradia because we believed that problem
              was solvable — not with more headcount, but with a digital employee
              that actually understands how your business works.
            </p>
            <p>
              Gradia sits at the intersection of AI and operations. We build
              digital employees trained on your brand voice, your scripts, your
              escalation paths. They answer calls, book appointments, handle
              intake, and report everything back — 24 hours a day, 7 days a week.
            </p>
            <p>
              We call ourselves the vertical company because we go deep, not
              wide. Healthcare practices, home-service businesses, professional
              services firms — each vertical has its own workflows, its own
              compliance requirements, its own definition of a great caller
              experience. We build for that specificity.
            </p>
            <p>
              Our goal is simple: your team should spend their day on the work
              they were hired to do. We handle the front door.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-20 rounded-[2px] border border-[var(--border-subtle)] bg-[var(--bg-band)] p-8 sm:p-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Our principles
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Transparency first",
                body: "Every call recorded, every outcome logged. No black boxes.",
              },
              {
                title: "Your brand, your rules",
                body: "We follow your scripts and escalation paths, not ours.",
              },
              {
                title: "Built for verticals",
                body: "Deep industry knowledge beats generic solutions every time.",
              },
            ].map((item) => (
              <li key={item.title}>
                <div className="h-px w-10 bg-[var(--brand-primary)]" aria-hidden />
                <h3 className="mt-6 font-sans text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-20 text-center">
          <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Ready to see what Gradia can do for your business?
          </p>
          <div className="mt-8">
            <Button
              href="mailto:trygradia@gmail.com?subject=Book%20a%20call"
              variant="primary"
            >
              Book a Call
            </Button>
          </div>
        </ScrollReveal>
      </MarketingPageShell>
    </div>
  );
}
