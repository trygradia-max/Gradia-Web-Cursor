"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function useCountUp({
  from = 0,
  to,
  duration = 2000,
  delay = 0,
  active,
  reduceMotion,
}: {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  active: boolean;
  reduceMotion: boolean;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      if (cancelled) return;
      if (start === null) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOut(t);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, from, to, duration, delay, reduceMotion]);

  return value;
}

const STATS = [
  {
    key: "leads",
    label: "LEADS CAPTURED",
    context: "Calls, emails, and SMS — all answered and logged.",
    delay: 0,
  },
  {
    key: "revenue",
    label: "REVENUE INFLUENCED",
    context: "Deals that started with a Gradia-answered call.",
    delay: 200,
  },
  {
    key: "booking",
    label: "BOOKING RATE",
    context: "Of answered leads converted to booked appointments.",
    delay: 400,
  },
] as const;

export function TheProofHeroStats({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);

    if (mql.matches) {
      setActive(true);
      return;
    }

    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const leads = useCountUp({
    to: 1284,
    duration: 2000,
    delay: STATS[0].delay,
    active,
    reduceMotion,
  });
  const revenue = useCountUp({
    to: 482,
    duration: 2000,
    delay: STATS[1].delay,
    active,
    reduceMotion,
  });
  const booking = useCountUp({
    to: 34,
    duration: 2000,
    delay: STATS[2].delay,
    active,
    reduceMotion,
  });

  const values: Record<(typeof STATS)[number]["key"], string> = {
    leads: leads.toLocaleString("en-US"),
    revenue: `$${revenue}K`,
    booking: `${booking}%`,
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-3",
        className,
      )}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.key}
          className={cn(
            "px-6 py-12 text-center lg:px-12 lg:py-0",
            i < STATS.length - 1 &&
              "border-b border-[#E5E7EB] lg:border-b-0 lg:border-r",
          )}
        >
          <p
            className="font-sans text-[56px] font-bold leading-none tabular-nums text-[#0A0A0A] sm:text-[68px] lg:text-[80px]"
            aria-hidden="true"
          >
            {values[stat.key]}
          </p>
          <p className="mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            {stat.label}
          </p>
          <p className="mx-auto mt-2 max-w-[200px] font-sans text-sm leading-snug text-[#6B7280]">
            {stat.context}
          </p>
        </div>
      ))}
    </div>
  );
}
