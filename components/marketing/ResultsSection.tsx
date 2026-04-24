import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/cn";

const stats = [
  {
    value: "99.9%",
    label: "Faster",
    description: "Speed to lead — from hours to seconds.",
  },
  {
    value: "100+",
    label: "Hours saved",
    description: "Per week. Your team gets their time back.",
  },
  {
    value: "24/7/365",
    label: "Always on",
    description: "Every lead answered. No days off, no sick days.",
  },
  {
    value: "0",
    label: "Leads lost to voicemail",
    description: "Every inquiry gets an instant, intelligent response.",
  },
  {
    value: "3",
    label: "Channels covered",
    description: "Voice, email, and SMS — handled automatically.",
  },
  {
    value: "100%",
    label: "Of calls logged",
    description: "Every conversation captured and visible in real time.",
  },
] as const;

export function ResultsSection({ className }: { className?: string }) {
  return (
    <section
      id="outcomes"
      className={cn(
        "section-pad w-full border-t border-[var(--border)] bg-[var(--white)]",
        className,
      )}
      aria-labelledby="results-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="type-label text-[var(--blue)]">The results</p>
          <h2
            id="results-heading"
            className="type-h2 mx-auto mt-6 max-w-[40rem] text-[var(--black)]"
          >
            The numbers don&apos;t lie.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger
          className={cn(
            "mt-16 grid list-none grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3",
          )}
        >
          {stats.map((item) => (
            <li key={item.label} className="min-w-0 bg-[var(--white)]">
              <div className="px-6 py-10 sm:px-8 md:px-10 md:py-12">
                <p className="type-hero leading-none tracking-tight text-[var(--black)]">
                  {item.value}
                </p>
                <p className="type-label mt-5 text-[var(--blue)]">{item.label}</p>
                <p className="type-small mt-3 text-[var(--gray)]">{item.description}</p>
              </div>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
