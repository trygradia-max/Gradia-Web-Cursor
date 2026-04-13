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
        "font-sans text-sm font-semibold uppercase tracking-widest text-[var(--brand-amber)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
