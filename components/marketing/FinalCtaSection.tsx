import Link from "next/link";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

export function FinalCtaSection({ className }: { className?: string }) {
  return (
    <section
      id="relief"
      className={cn(
        "w-full border-t border-[var(--border-subtle)] bg-[var(--bg-band)] py-[160px]",
        className,
      )}
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 text-center sm:px-6">
        <ScrollReveal className="flex w-full flex-col items-center gap-8">
          <h2
            id="final-cta-heading"
            className="max-w-[min(100%,40rem)] font-sans text-[64px] font-semibold leading-[1.1] text-[var(--foreground)]"
          >
            The gap is open right now.
          </h2>
          <p className="max-w-[560px] text-lg leading-relaxed text-[var(--muted)]">
            Every hour without Gradia is an hour your
            <br />
            leads are going unanswered. Book a demo. See it live.
          </p>
          <Link
            href="mailto:hello@gradia.com?subject=Book%20a%20demo"
            className="inline-flex items-center justify-center rounded-none bg-[var(--brand-primary)] px-[40px] py-[18px] text-base font-normal text-white transition-colors hover:bg-[var(--brand-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
          >
            Book a Demo →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
