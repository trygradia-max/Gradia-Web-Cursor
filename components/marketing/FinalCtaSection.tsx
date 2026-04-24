import Link from "next/link";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

export function FinalCtaSection({ className }: { className?: string }) {
  return (
    <section
      id="relief"
      className={cn(
        "section-pad w-full border-t border-[var(--border)] bg-[var(--light)]",
        className,
      )}
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 text-center sm:px-6">
        <ScrollReveal className="flex w-full flex-col items-center gap-layout">
          <h2
            id="final-cta-heading"
            className="type-h2 max-w-[min(100%,40rem)] text-[var(--black)]"
          >
            The gap is open right now.
          </h2>
          <p className="type-body max-w-[560px] text-center text-[var(--gray)]">
            Every hour without Gradia is an hour your
            <br />
            leads are going unanswered. Book a demo. See it live.
          </p>
          <Link
            href="mailto:trygradia@gmail.com?subject=Book%20a%20demo"
            className="inline-flex items-center justify-center rounded-none bg-[var(--blue)] px-[40px] py-[18px] type-body font-medium text-[var(--white)] transition-colors hover:bg-[var(--brand-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
          >
            Book a Demo →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
