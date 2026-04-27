"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function useCountUp({
  from = 0,
  to,
  duration = 1500,
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

export function ResultsSection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null);
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
      { threshold: 0.2 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const heroValue = useCountUp({
    from: 1,
    to: 21,
    duration: 1500,
    active,
    reduceMotion,
  });

  const answerSeconds = useCountUp({
    from: 0,
    to: 2,
    duration: 1200,
    delay: 200,
    active,
    reduceMotion,
  });
  const alwaysOnHours = useCountUp({
    from: 0,
    to: 24,
    duration: 1200,
    delay: 400,
    active,
    reduceMotion,
  });
  const loggedPercent = useCountUp({
    from: 0,
    to: 100,
    duration: 1200,
    delay: 600,
    active,
    reduceMotion,
  });

  const supporting = [
    {
      key: "voicemail",
      value: "0",
      // min-width sized for the longest expected rendered value
      // (e.g. "100%", "< 2s", "24/7"). Keeps each centered cell stable.
      minCh: 3,
      label: "LEADS LOST TO VOICEMAIL",
      description: "Every inquiry gets an instant, intelligent response.",
    },
    {
      key: "answer-time",
      value: `< ${answerSeconds}s`,
      minCh: 4,
      label: "AVERAGE ANSWER TIME",
      description: "Faster than any human team could ever respond.",
    },
    {
      key: "always-on",
      value: `${alwaysOnHours}/7`,
      minCh: 4,
      label: "ALWAYS ON",
      description: "No days off. No sick days. No missed calls.",
    },
    {
      key: "calls-logged",
      value: `${loggedPercent}%`,
      minCh: 4,
      label: "OF CALLS LOGGED",
      description: "Every conversation captured and visible in real time.",
    },
  ];

  return (
    <section
      ref={rootRef}
      id="outcomes"
      className={cn(
        "w-full bg-[#F5F5F5] py-[60px] lg:py-[120px]",
        className,
      )}
      aria-labelledby="results-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
        <p className="text-center font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          THE RESULTS
        </p>

        <p
          className="mt-6 text-center font-sans text-[100px] font-bold leading-none text-[#0A0A0A] lg:text-[160px]"
          aria-hidden="true"
        >
          {/* Reserve width for the final "21x" so the digit growth from
              1 → 21 never shifts surrounding content horizontally. */}
          <span className="inline-block min-w-[3ch] text-center tabular-nums">
            {heroValue}x
          </span>
        </p>

        <h2
          id="results-heading"
          className="mx-auto mt-6 max-w-[640px] text-center font-sans text-xl font-normal leading-snug text-[#0A0A0A]"
        >
          Businesses that respond in under 5 minutes are 21x more likely to
          close the lead.
        </h2>

        <p className="mt-3 text-center font-sans text-xs text-[#6B7280]">
          Source: Harvard Business Review
        </p>

        <p className="mt-6 text-center font-sans text-base font-bold tracking-[0.02em] text-[#3B6EF5]">
          Gradia responds in under 2 seconds.
        </p>

        <div
          className="my-[60px] border-t border-[#E5E7EB] lg:my-20"
          aria-hidden="true"
        />

        <ul className="grid list-none grid-cols-2 lg:grid-cols-4">
          {supporting.map((stat, i) => (
            <li
              key={stat.key}
              className={cn(
                "p-8 text-center lg:px-12 lg:py-0",
                i < 2 && "border-b border-[#E5E7EB] lg:border-b-0",
                i < 3 && "lg:border-r lg:border-[#E5E7EB]",
              )}
            >
              <p className="font-sans text-[44px] font-bold leading-none text-[#0A0A0A] sm:text-[56px]">
                <span
                  className="inline-block text-center tabular-nums"
                  style={{ minWidth: `${stat.minCh}ch` }}
                >
                  {stat.value}
                </span>
              </p>
              <p className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#3B6EF5]">
                {stat.label}
              </p>
              <p className="mt-2 font-sans text-[13px] leading-snug text-[#6B7280]">
                {stat.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
