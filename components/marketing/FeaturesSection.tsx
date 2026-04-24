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
        "section-pad w-full border-t border-[var(--border)] bg-[var(--white)]",
        className,
      )}
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="type-label text-[var(--blue)]">What gradia does</p>
          <h2
            id="features-heading"
            className="type-h2 mx-auto mt-6 max-w-[48rem] text-[var(--black)]"
          >
            Every lead. Every channel. Every time.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger
          className={cn(
            "mt-16 grid list-none grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] p-0 md:mt-20 md:grid-cols-2",
          )}
        >
          {features.map((item) => (
            <li key={item.num} className="min-w-0 bg-[var(--white)]">
              <div className="px-6 py-10 sm:px-8 md:px-10 md:py-12">
                <p className="type-label normal-case tabular-nums tracking-normal text-[var(--blue)]">
                  {item.num}
                </p>
                <h3 className="type-h3 mt-4 text-[var(--black)]">{item.title}</h3>
                <p className="type-body mt-3 text-[var(--gray)]">{item.body}</p>
              </div>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
