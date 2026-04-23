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
        "w-full border-t border-[var(--border-subtle)] bg-[var(--bg)] py-[120px]",
        className,
      )}
      aria-labelledby="results-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <ScrollReveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
            The results
          </p>
          <h2
            id="results-heading"
            className="mx-auto mt-6 max-w-[40rem] font-sans text-[48px] font-semibold leading-[1.15] text-[var(--foreground)]"
          >
            The numbers don&apos;t lie.
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger
          className={cn(
            "mt-16 grid list-none grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3",
          )}
        >
          {stats.map((item) => (
            <li key={item.label} className="min-w-0 bg-[var(--bg)]">
              <div className="px-6 py-10 sm:px-8 md:px-10 md:py-12">
                <p className="font-sans text-[64px] font-semibold leading-none tracking-tight text-[var(--foreground)]">
                  {item.value}
                </p>
                <p className="mt-5 text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
                  {item.label}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
