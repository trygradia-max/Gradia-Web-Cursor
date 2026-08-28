import type { ReactNode } from "react";
import Link from "next/link";

/* Gradia site v2 — layout + control primitives (Pass 1).
   Rules: one accent, hairline borders, generous space, no decoration
   that doesn't communicate. See docs: gradia-v2/marketing-site/site-v2-plan.md §5 */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[var(--sv-container)] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  band = false,
  className = "",
  id,
}: {
  children: ReactNode;
  band?: boolean; // alternate wash band with hairline top/bottom
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-[var(--sv-section-y)] ${
        band ? "border-y border-[var(--sv-line)] bg-[var(--sv-wash)]" : ""
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
      {children}
    </p>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mt-5 max-w-[42rem] text-[var(--sv-text-lg)] leading-relaxed text-[var(--sv-ink-2)] ${className}`}>
      {children}
    </p>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[100px] font-medium transition-colors duration-150 focus-visible:outline-2 select-none";
const btnSize = {
  md: "h-11 px-6 text-[var(--sv-text-sm)]",
  lg: "h-13 px-8 py-3.5 text-[var(--sv-text-base)]",
};
const btnVariant = {
  primary: "bg-[var(--sv-accent)] text-white hover:bg-[var(--sv-accent-hover)]",
  secondary:
    "border border-[var(--sv-line-strong)] bg-[var(--sv-surface)] text-[var(--sv-ink)] hover:border-[var(--sv-ink-3)]",
  ghost: "text-[var(--sv-ink)] hover:text-[var(--sv-accent)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof btnVariant;
  size?: keyof typeof btnSize;
  className?: string;
}) {
  return (
    <Link href={href} className={`${btnBase} ${btnSize[size]} ${btnVariant[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)] p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
