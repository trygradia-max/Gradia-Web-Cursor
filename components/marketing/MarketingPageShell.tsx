import { cn } from "@/lib/cn";

export function MarketingPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-pad mx-auto w-full max-w-content px-4 sm:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
