"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Speaker = "gradia" | "caller";
type Message = {
  speaker: Speaker;
  text: string;
};

const MESSAGES: Message[] = [
  {
    speaker: "gradia",
    text: "Hi, thanks for calling Bright Smile Dental. What brings you in today?",
  },
  {
    speaker: "caller",
    text: "Hi, I need a cleaning and maybe whitening. Do you have anything this week?",
  },
  {
    speaker: "gradia",
    text: "Absolutely. Can I get your name and a good number to reach you?",
  },
  {
    speaker: "caller",
    text: "Sure, it's Sarah Mitchell, (555) 284-9901",
  },
  {
    speaker: "gradia",
    text: "Perfect Sarah, let me check availability for you right now.",
  },
];

const MESSAGE_GAP_MS = 2000;
const SUMMARY_DELAY_MS = 1500;
const LOOP_PAUSE_MS = 3000;

export function SeeItCloseTranscript() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVisibleCount(MESSAGES.length);
      setShowSummary(true);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      if (cancelled) return;
      setVisibleCount(0);
      setShowSummary(false);

      MESSAGES.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            if (!cancelled) setVisibleCount(i + 1);
          }, i * MESSAGE_GAP_MS),
        );
      });

      const summaryAt =
        (MESSAGES.length - 1) * MESSAGE_GAP_MS + SUMMARY_DELAY_MS;
      timers.push(
        setTimeout(() => {
          if (!cancelled) setShowSummary(true);
        }, summaryAt),
      );

      timers.push(setTimeout(runCycle, summaryAt + LOOP_PAUSE_MS));
    };

    runCycle();

    return () => {
      cancelled = true;
      for (const t of timers) clearTimeout(t);
    };
  }, []);

  return (
    <div className="w-full border border-[#E5E7EB] bg-white p-6 sm:p-8">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
        Live Transcript
      </p>

      <div className="mt-6 flex min-h-[280px] flex-col gap-3">
        {MESSAGES.map((msg, i) => {
          if (i >= visibleCount) return null;
          const isGradia = msg.speaker === "gradia";
          return (
            <div
              key={i}
              className={cn(
                "flex animate-the-gap-step-in",
                isGradia ? "justify-end" : "justify-start",
              )}
            >
              <p
                className={cn(
                  "max-w-[85%] px-4 py-3 font-sans text-sm leading-snug",
                  isGradia
                    ? "bg-[#3B6EF5] text-white"
                    : "border border-[#E5E7EB] bg-[#F5F5F5] text-[#0A0A0A]",
                )}
              >
                {msg.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 min-h-[56px]">
        {showSummary && (
          <div className="border border-[#3B6EF5] bg-[#F0F7FF] px-4 py-3 animate-the-gap-step-in">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#3B6EF5]">
              Lead captured
            </p>
            <p className="mt-1 font-sans text-[13px] leading-snug text-[#0A0A0A]">
              Sarah Mitchell · Dental cleaning + whitening · This week ·
              (555) 284-9901
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
