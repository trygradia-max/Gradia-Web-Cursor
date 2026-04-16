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
        "rounded-[2px] border",
        tone === "band"
          ? "border-[var(--border-band)] bg-[var(--card-on-band)]"
          : "border-[#222222] bg-[#141414]",
        hover &&
          "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-[rgba(30,64,175,0.45)] hover:shadow-[0_0_0_1px_rgba(30,64,175,0.12),0_0_36px_-10px_rgba(30,64,175,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
