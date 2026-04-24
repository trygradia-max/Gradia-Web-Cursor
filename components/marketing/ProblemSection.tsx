import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

const bodyClass =
  "type-body text-[var(--gray)] [&_p+p]:mt-6";

export function ProblemSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "section-pad w-full border-t border-[var(--border)] bg-[var(--light)]",
        className,
      )}
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto w-full max-w-[680px] px-4 text-center sm:px-6">
        <ScrollReveal>
          <p className="type-label text-[var(--blue)]">The reality</p>
          <h2
            id="problem-heading"
            className="type-h2 mt-6 text-[var(--black)]"
          >
            The Invisible Gap
          </h2>
          <div className={cn("mt-10 text-center", bodyClass)}>
            <p>
              A lead comes in at 7pm. Your team sees it at 9am.
              <br />
              By then, they&apos;ve already booked with someone else.
            </p>
            <p>
              Your team works hard — but they can&apos;t be everywhere.
              <br />
              Leads arrive after hours, between meetings, during the chaos of the
              day. The ones that don&apos;t get answered fast don&apos;t come back.
            </p>
            <p>
              Nobody noticed. Nothing was tracked. It just disappeared.
              <br />
              That&apos;s the invisible gap.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
