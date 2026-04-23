import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

const features = [
  {
    num: "01",
    title: "Always On",
    body: (
      <>
        Calls, emails, SMS — Gradia responds the moment a lead reaches out.
        <br />
        Every channel, every hour.
      </>
    ),
  },
  {
    num: "02",
    title: "Lead Capture",
    body: (
      <>
        Qualifies and records every prospect — name, need,
        <br />
        urgency — before your team touches it.
      </>
    ),
  },
  {
    num: "03",
    title: "Appointment Booking",
    body: (
      <>
        Books, reschedules, and cancels directly in your calendar. No back and
        forth. No dropped handoffs.
      </>
    ),
  },
  {
    num: "04",
    title: "Workload Relief",
    body: (
      <>
        Gradia handles the volume your team can&apos;t. Less noise, fewer
        interruptions, more time on work that matters.
      </>
    ),
  },
  {
    num: "05",
    title: "Live Dashboard",
    body: (
      <>
        Every call, email, and SMS outcome in one place.
        <br />
        Full visibility for your team in real time.
      </>
    ),
  },
  {
    num: "06",
    title: "Spam Protection",
    body: (
      <>
        Filters out time-wasters before they reach your team. Your reps focus on
        real prospects only.
      </>
    ),
  },
] as const;

export function FeaturesSection({ className }: { className?: string }) {
  return (
    <section
      id="features"
      className={cn(
        "w-full border-t border-[var(--border-subtle)] bg-[var(--bg)] py-[120px]",
        className,
      )}
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
            What gradia does
          </p>
          <h2
            id="features-heading"
            className="mx-auto mt-6 max-w-[48rem] font-sans text-[48px] font-semibold leading-[1.15] text-[var(--foreground)]"
          >
            Every lead. Every channel. Every time.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger
          className={cn(
            "mt-16 grid list-none grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] p-0 md:mt-20 md:grid-cols-2",
          )}
        >
          {features.map((item) => (
            <li key={item.num} className="min-w-0 bg-[var(--bg)]">
              <div className="px-6 py-10 sm:px-8 md:px-10 md:py-12">
                <p className="text-[12px] font-normal tabular-nums tracking-normal text-[var(--brand-primary)]">
                  {item.num}
                </p>
                <h3 className="mt-4 font-sans text-[20px] font-semibold leading-snug text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-[var(--muted)]">{item.body}</p>
              </div>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
