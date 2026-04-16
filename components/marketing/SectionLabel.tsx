import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-primary)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
