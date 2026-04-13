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
        "mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:py-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
