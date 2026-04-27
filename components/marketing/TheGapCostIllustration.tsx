"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Line = {
  label: string;
  value: string;
  delay: number;
  large?: boolean;
  valueColor: string;
};

const LINES: Line[] = [
  {
    label: "Average lead value:",
    value: "$3,000",
    delay: 0,
    valueColor: "#3B6EF5",
  },
  {
    label: "Leads missed per week:",
    value: "3",
    delay: 300,
    valueColor: "#3B6EF5",
  },
  {
    label: "Revenue lost per year:",
    value: "$468,000",
    delay: 900,
    large: true,
    valueColor: "#EF4444",
  },
];

export function TheGapCostIllustration() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setActive(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[#FFFFFF] py-[80px] lg:py-[120px]"
      aria-labelledby="the-gap-cost-heading"
    >
      <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6">
        <h2
          id="the-gap-cost-heading"
          className="font-sans text-[32px] font-bold leading-tight text-[#0A0A0A] lg:text-[48px]"
        >
          The math is simple. The number is not.
        </h2>

        <ul className="mt-12 flex list-none flex-col items-center gap-6 sm:gap-8">
          {LINES.map((line) => (
            <li
              key={line.label}
              className={cn(
                "transition-[opacity,transform] duration-700 ease-out",
                active
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: active ? `${line.delay}ms` : "0ms" }}
            >
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-4">
                <span className="font-sans text-base text-[#0A0A0A] sm:text-lg">
                  {line.label}
                </span>
                <span
                  className={cn(
                    "font-sans font-bold leading-none tabular-nums",
                    line.large
                      ? "text-[40px] sm:text-[64px]"
                      : "text-[32px] sm:text-[48px]",
                  )}
                  style={{ color: line.valueColor }}
                >
                  {line.value}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div
          className="mx-auto mt-12 w-full max-w-[600px] border-t border-[#E5E7EB]"
          aria-hidden="true"
        />

        <p className="mt-12 font-sans text-xl font-semibold leading-[1.5] text-[#0A0A0A] sm:text-2xl">
          That&apos;s not a rounding error.
          <br />
          That&apos;s the invisible gap.
        </p>

        <Link
          href="/the-cost"
          className="mt-8 inline-block font-sans text-sm font-medium text-[#3B6EF5] no-underline transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
        >
          Calculate your actual number →
        </Link>
      </div>
    </section>
  );
}
