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
        "font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
