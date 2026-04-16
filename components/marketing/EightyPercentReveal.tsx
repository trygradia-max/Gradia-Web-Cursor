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
      <h2 className="mx-auto max-w-[22ch] font-serif text-[clamp(2.25rem,7vw,4.75rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#ffffff]">
        <span className="tabular-nums">{value}</span>
        <span className="text-[#b0b0b0]">%</span>{" "}
        <span className="text-white">less front-desk workload.</span>
      </h2>
    </div>
  );
}
