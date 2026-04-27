"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Step = "idle" | "waiting" | "still-waiting" | "lost" | "gone";

const TIMESTAMP: Record<Exclude<Step, "idle">, string> = {
  waiting: "7:02 PM",
  "still-waiting": "8:30 PM",
  lost: "9:14 AM",
  gone: "9:14 AM",
};

export function TheGapClockSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>("idle");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setStep("gone");
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;
        observer.disconnect();
        setStep("waiting");
        timeouts.push(setTimeout(() => setStep("still-waiting"), 2000));
        timeouts.push(setTimeout(() => setStep("lost"), 4000));
        timeouts.push(setTimeout(() => setStep("gone"), 5500));
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      for (const t of timeouts) clearTimeout(t);
    };
  }, []);

  const showTimestamp = step !== "idle" && step !== "gone";
  const cardOpacityClass =
    step === "gone"
      ? "opacity-0"
      : step === "lost"
      ? "opacity-30"
      : step === "idle"
      ? "opacity-0"
      : "opacity-100";

  const subtextNode =
    step === "still-waiting" || step === "lost" || step === "gone" ? (
      <span key="still" className="text-[#EF4444] animate-the-gap-step-in">
        Still waiting...
      </span>
    ) : (
      <span key="initial" className="text-[#6B7280]">
        Waiting for response...
      </span>
    );

  return (
    <section
      ref={rootRef}
      className="bg-[#FFFFFF] py-[80px] lg:py-[120px]"
      aria-labelledby="the-gap-clock-heading"
    >
      <h2 id="the-gap-clock-heading" className="sr-only">
        Inside a missed lead
      </h2>

      <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
        <div className="mx-auto h-[56px] lg:h-[68px]">
          {showTimestamp && (
            <p
              key={step}
              className="font-sans text-[40px] font-bold leading-none tabular-nums text-[#0A0A0A] animate-the-gap-step-in lg:text-[56px]"
            >
              {TIMESTAMP[step as Exclude<Step, "idle">]}
            </p>
          )}
        </div>

        <div
          className={cn(
            "mx-auto mt-8 w-full max-w-[360px] border border-[#E5E7EB] bg-[#F5F5F5] px-6 py-5 text-left transition-opacity duration-700 ease-out",
            cardOpacityClass,
          )}
          aria-hidden={step === "idle" || step === "gone"}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#3B6EF5]">
            Inbound lead
          </p>
          <p className="mt-2 font-sans text-base font-semibold text-[#0A0A0A]">
            Sarah M. — Dental inquiry
          </p>
          <p className="mt-2 font-sans text-sm">{subtextNode}</p>
        </div>

        <div className="mt-6 min-h-[28px] lg:min-h-[32px]">
          {step === "lost" && (
            <p className="font-sans text-lg font-semibold leading-snug text-[#EF4444] animate-the-gap-step-in">
              Booked with a competitor.
            </p>
          )}
        </div>

        <div className="mt-12 min-h-[64px] lg:min-h-[96px]">
          {step === "gone" && (
            <p className="font-sans text-[48px] font-bold leading-none text-[#0A0A0A] animate-the-gap-step-in lg:text-[72px]">
              Gone.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
