"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function SeeItCloseMorning() {
  const rootRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase(4);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setPhase(1);
        timers.push(setTimeout(() => setPhase(2), 600));
        timers.push(setTimeout(() => setPhase(3), 1600));
        timers.push(setTimeout(() => setPhase(4), 2600));
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      for (const t of timers) clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[#0A0A0A] py-[80px] lg:py-[120px]"
      aria-labelledby="see-it-close-morning-heading"
    >
      <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-12">
        <h2
          id="see-it-close-morning-heading"
          className={cn(
            "font-sans text-[56px] font-bold leading-none tabular-nums text-white sm:text-[72px] lg:text-[96px]",
            "transition-[opacity,transform] duration-700 ease-out",
            phase >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0",
          )}
        >
          9:14 AM.
        </h2>

        <p
          className={cn(
            "mt-4 font-sans text-base text-[#6B7280] sm:text-lg lg:text-xl",
            "transition-[opacity,transform] duration-700 ease-out",
            phase >= 2
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0",
          )}
        >
          You just started your day.
        </p>

        <div
          className={cn(
            "mx-auto mt-12 w-full max-w-[480px] border border-[#1F1F1F] bg-[#111111] px-6 py-5 text-left sm:px-8 sm:py-6",
            "transition-[opacity,transform] duration-700 ease-out",
            phase >= 3
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0",
          )}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Overnight Activity
          </p>
          <p className="mt-2 font-sans text-2xl font-bold leading-tight text-white">
            3 leads captured
          </p>
          <p className="mt-1 font-sans text-lg font-semibold leading-snug text-white">
            2 appointments booked
          </p>
          <p className="font-sans text-lg font-semibold leading-snug text-[#10B981]">
            0 leads lost to voicemail
          </p>
        </div>

        <p
          className={cn(
            "mx-auto mt-10 max-w-[640px] font-sans text-xl font-semibold leading-[1.5] text-[#6B7280] sm:text-2xl",
            "transition-[opacity,transform] duration-700 ease-out",
            phase >= 4
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0",
          )}
        >
          You woke up to a closed gap.
        </p>
      </div>
    </section>
  );
}
