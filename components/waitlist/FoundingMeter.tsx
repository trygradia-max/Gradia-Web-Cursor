"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scarcity meter for the Founding 100 tier — the bar fills to `claimed/100`
 * when it scrolls into view, and the "spots left" number lands the urgency.
 */
export function FoundingMeter({ claimed = 73 }: { claimed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        if (reduce) {
          setFill(claimed);
          return;
        }
        window.setTimeout(() => setFill(claimed), 80);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [claimed]);

  const left = Math.max(0, 100 - claimed);

  return (
    <div ref={ref} className="border border-[var(--border)] bg-[var(--bg)] p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">
          Founding 100
        </span>
        <span className="text-xs text-[var(--muted)]">
          <span className="font-semibold text-[var(--brand-primary)]">
            {left} spots
          </span>{" "}
          left
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-[var(--bg-elevated)]">
        <div
          className="h-full bg-[var(--brand-primary)] transition-[width] duration-[1200ms] ease-out"
          style={{ width: `${fill}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">
        Lifetime 50% off + your name on the launch wall — claimed by{" "}
        {claimed} detailers so far.
      </p>
    </div>
  );
}
