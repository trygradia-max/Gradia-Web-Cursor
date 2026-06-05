"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Stacked, skewed "display cards" (adapted from Codehagen/display-cards on
 * 21st.dev). Retokenized to Gradia's light palette + brand blue and stripped of
 * the shadcn theme tokens (bg-muted, text-muted-foreground, etc.) the original
 * assumed. Hover lifts the stack apart.
 */
export interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between border border-[var(--border)] bg-[var(--bg)] px-4 py-3 shadow-card transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[var(--bg)] after:to-transparent after:content-['']",
        "hover:border-[var(--brand-primary)]/40 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-[var(--brand-primary)] p-1.5">
          {icon}
        </span>
        <p className="text-base font-semibold text-[var(--brand-primary)]">{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm text-[var(--foreground)]">{description}</p>
      <p className="text-xs text-[var(--muted)]">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  /** Up to three content cards; stack positioning is applied automatically. */
  cards?: DisplayCardProps[];
}

/** Stack offsets for the three layered cards (front → back). */
const STACK_POSITIONS = [
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:outline-[var(--border)] before:h-[100%] before:content-[''] before:bg-[var(--bg)]/60 before:left-0 before:top-0 hover:before:opacity-0 before:transition-opacity before:duration-700",
  "[grid-area:stack] translate-x-12 translate-y-9 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:outline-[var(--border)] before:h-[100%] before:content-[''] before:bg-[var(--bg)]/60 before:left-0 before:top-0 hover:before:opacity-0 before:transition-opacity before:duration-700",
  "[grid-area:stack] translate-x-24 translate-y-[4.5rem] hover:translate-y-10",
];

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const content = (cards ?? [{}, {}, {}]).slice(0, 3);

  return (
    <div className="grid place-items-center [grid-template-areas:'stack']">
      {content.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          className={cn(STACK_POSITIONS[index], cardProps.className)}
        />
      ))}
    </div>
  );
}
