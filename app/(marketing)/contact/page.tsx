import type { Metadata } from "next";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call or reach the Gradia team.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <MarketingPageShell>
        <SectionLabel>Contact</SectionLabel>
        <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--brand-slate)]">
          Share a few details and we&apos;ll follow up by email. Prefer to
          schedule directly? Use the calendar block below once your Calendly
          link is connected.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <ContactForm />

          <section
            aria-label="Schedule a call"
            className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-card"
          >
            <h2 className="font-serif text-2xl text-[var(--brand-dark)]">
              Schedule a call
            </h2>
            <p className="mt-2 text-sm text-[var(--brand-slate)]">
              Replace this block with your Calendly inline embed (iframe) or
              Calendly React component.
            </p>
            <div
              className="mt-6 flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] bg-[var(--brand-light)] px-4 text-center text-sm text-[var(--brand-slate)]"
              role="status"
            >
              Calendly embed placeholder — paste your scheduling URL here.
            </div>
          </section>
        </div>

        <p className="mt-12 text-sm text-[var(--brand-slate)]">
          Or email us directly at{" "}
          <a
            href="mailto:hello@gradia.com"
            className="font-semibold text-[var(--brand-dark)] underline decoration-[var(--brand-primary)] underline-offset-2 hover:text-[var(--brand-slate)]"
          >
            hello@gradia.com
          </a>
          .
        </p>
      </MarketingPageShell>
    </div>
  );
}
