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
        "w-full border-t border-[var(--border-subtle)] bg-[var(--bg-band)] py-[120px]",
        className,
      )}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mx-auto mt-6 max-w-[40rem] font-sans text-[48px] font-semibold leading-[1.15] text-[var(--foreground)]"
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
                  "border-t border-[var(--border-subtle)] md:border-l md:border-t-0",
              )}
            >
              <p className="font-sans text-[72px] font-semibold leading-none tracking-tight text-[var(--muted)]">
                {step.num}
              </p>
              <h3 className="mt-6 font-sans text-[24px] font-semibold leading-snug text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-[1.6] text-[var(--muted)]">{step.body}</p>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
