"use client";

import { useEffect, useRef, useState } from "react";

export function TheGapDataMoment() {
  const rootRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setCount(21);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    let raf = 0;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        let start: number | null = null;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          if (cancelled) return;
          if (start === null) start = now;
          const t = Math.min((now - start) / 1500, 1);
          setCount(Math.round(1 + 20 * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
      aria-labelledby="the-gap-data-heading"
    >
      <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
        <p
          className="font-sans text-[100px] font-bold leading-none text-[#0A0A0A] lg:text-[160px]"
          aria-hidden="true"
        >
          {/* Reserve width for the final "21x" value (3 chars) so the
              counter never causes the surrounding section to shift. */}
          <span className="inline-block min-w-[3ch] text-center tabular-nums">
            {count}x
          </span>
        </p>
        <h2
          id="the-gap-data-heading"
          className="mx-auto mt-6 max-w-[600px] font-sans text-xl font-normal leading-[1.6] text-[#0A0A0A]"
        >
          Businesses that respond in under 5 minutes are 21x more likely to
          close the lead.
        </h2>
        <p className="mt-4 font-sans text-xs text-[#6B7280]">
          Source: Harvard Business Review
        </p>
      </div>
    </section>
  );
}
