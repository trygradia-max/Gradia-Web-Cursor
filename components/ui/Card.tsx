import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#e2e8f0] bg-white shadow-card",
        hover && "transition hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
