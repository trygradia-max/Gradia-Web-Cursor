"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function EightyPercentReveal() {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const duration = 1400;

        function frame(now: number) {
          const t = Math.min(1, (now - start) / duration);
          setValue(Math.round(80 * easeOutCubic(t)));
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <h2 className="mx-auto max-w-[22ch] font-sans text-[clamp(2.25rem,7vw,4.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--foreground)]">
        {/* Reserve width for the final 2-digit value so it doesn't
            shift the headline as digits grow from 0 to 80. */}
        <span className="inline-block min-w-[2ch] text-right tabular-nums">
          {value}
        </span>
        <span className="text-[var(--muted)]">%</span>{" "}
        <span className="text-[var(--foreground)]">less front-desk workload.</span>
      </h2>
    </div>
  );
}
