"use client";

import { useEffect, useRef, useState } from "react";

export function MissedLeadsCounter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const initial = 800 + Math.floor(Math.random() * 401);
    setCount(initial);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (intervalId !== null) return;
      intervalId = setInterval(() => {
        setCount((current) => (current ?? initial) + 1);
      }, 1000);
    };

    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);

    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  const display = count !== null ? count.toLocaleString() : "\u00A0";

  return (
    <div ref={rootRef} className="flex flex-col items-center text-center">
      <p className="font-sans text-xs uppercase tracking-[0.1em] text-[#6B7280]">
        While you&apos;ve been on this page
      </p>
      <p
        className="mt-2 font-sans text-[56px] font-bold leading-none tabular-nums text-[#3B6EF5] lg:text-[80px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {display}
      </p>
      <p className="mt-2 font-sans text-base text-[#6B7280]">
        businesses missed a lead.
      </p>
    </div>
  );
}
