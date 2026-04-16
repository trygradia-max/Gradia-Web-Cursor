import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Light: white wordmark on dark. Dark: dark text on light surfaces. */
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "light" }: LogoProps) {
  const wordmark =
    variant === "light" ? "text-white" : "text-[var(--brand-dark)]";

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-serif text-xl font-normal tracking-tight sm:text-2xl",
        wordmark,
        className,
      )}
    >
      <span>Gradia</span>
      <span className="text-[var(--brand-primary)]" aria-hidden>
        .
      </span>
    </span>
  );
}
