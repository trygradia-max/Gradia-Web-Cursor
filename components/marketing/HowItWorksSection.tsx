import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    num: "01",
    title: "Gradia answers",
    body: (
      <>
        Every call, every inquiry, every after-hours lead.
        <br />
        Instant response, every time.
      </>
    ),
  },
  {
    num: "02",
    title: "Gradia qualifies",
    body: (
      <>
        Asks the right questions, captures the details,
        <br />
        filters out the noise.
      </>
    ),
  },
  {
    num: "03",
    title: "Your team closes",
    body: (
      <>
        Gradia books the appointment or hands off the lead
        <br />
        — warm, qualified, ready to close.
      </>
    ),
  },
] as const;

export function HowItWorksSection({ className }: { className?: string }) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "section-pad w-full border-t border-[var(--border)] bg-[var(--light)]",
        className,
      )}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="type-label text-[var(--blue)]">How it works</p>
          <h2
            id="how-it-works-heading"
            className="type-h2 mx-auto mt-6 max-w-[40rem] text-[var(--black)]"
          >
            Three steps. Zero gaps.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger
          className={cn(
            "mt-16 grid list-none grid-cols-1 gap-0 p-0 md:mt-20 md:grid-cols-3",
            "[&>li]:min-w-0",
          )}
        >
          {steps.map((step, index) => (
            <li
              key={step.num}
              className={cn(
                "px-0 py-10 md:px-8 md:py-0 lg:px-10",
                index > 0 &&
                  "border-t border-[var(--border)] md:border-l md:border-t-0",
              )}
            >
              <p className="type-hero leading-none tracking-tight text-[var(--gray)]">
                {step.num}
              </p>
              <h3 className="type-h3 mt-6 text-[var(--black)]">{step.title}</h3>
              <p className="type-body mt-4 text-[var(--gray)]">{step.body}</p>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
