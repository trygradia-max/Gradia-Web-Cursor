"use client";

import { useEffect, useRef, useState } from "react";

export function VerticalCompanyStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.78;
      const end = vh * 0.28;
      const center = rect.top + rect.height / 2;
      let p = 0;
      if (center <= end) {
        p = 1;
      } else if (center >= start) {
        p = 0;
      } else {
        p = (start - center) / (start - end);
      }
      setProgress(Math.min(1, Math.max(0, p)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scale = 0.96 + progress * 0.04;
  const opacity = 0.1 + progress * 0.9;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[var(--bg-band)] px-4 pb-6 pt-28 sm:px-6 lg:pb-8 lg:pt-36"
      aria-label="Company positioning"
    >
      <h2
        className="mx-auto max-w-[min(96vw,1400px)] text-center font-sans font-semibold leading-[0.92] tracking-[-0.02em] text-[var(--foreground)]"
        style={{
          fontSize: "clamp(2.75rem, 9.5vw, 10rem)",
          transform: `scale(${scale})`,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        The Vertical Company.
      </h2>
      <div
        className="mx-auto mt-14 h-px w-full max-w-content bg-[var(--brand-primary)]"
        aria-hidden
      />
    </section>
  );
}
