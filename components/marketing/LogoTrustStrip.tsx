import { ScrollReveal } from "./ScrollReveal";

const slots = Array.from({ length: 5 }, (_, i) => i);

export function LogoTrustStrip() {
  return (
    <ScrollReveal>
      <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
        Trusted by businesses across healthcare, home services &amp;
        professional services
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {slots.map((i) => (
          <div
            key={i}
            className="flex h-9 w-24 items-center justify-center rounded-[2px] border border-dashed border-[var(--border-subtle)] text-[11px] tracking-wider text-[var(--muted)] opacity-50"
            aria-hidden
          >
            LOGO
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
