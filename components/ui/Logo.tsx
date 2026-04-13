import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Light wordmark on dark backgrounds (default). */
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "light" }: LogoProps) {
  const text =
    variant === "light" ? "text-white" : "text-[var(--brand-dark)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-serif text-xl font-normal tracking-tight sm:text-2xl",
        text,
        className,
      )}
    >
      <span>Gradia</span>
      <span
        className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--brand-amber)]"
        aria-hidden
      />
    </span>
  );
}
