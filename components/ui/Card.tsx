import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Slightly lighter fill on `--bg-band` sections */
  tone?: "default" | "band";
};

export function Card({ children, className, hover, tone = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-none border",
        tone === "band"
          ? "border-[var(--border-band)] bg-[var(--card-on-band)]"
          : "border-[var(--border-subtle)] bg-[var(--bg)]",
        hover &&
          "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-[var(--brand-primary)]/35 hover:shadow-[0_0_0_1px_rgba(59,110,245,0.08),0_12px_32px_-12px_rgba(59,110,245,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
