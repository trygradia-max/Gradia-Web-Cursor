"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ENTRIES = [
  {
    industry: "AUTO DEALERSHIP",
    detail: "Responded in 1.4s · Appointment booked",
  },
  {
    industry: "DENTAL PRACTICE",
    detail: "Responded in 2.1s · Follow-up scheduled",
  },
  {
    industry: "LAW FIRM",
    detail: "Responded in 1.7s · Intake form completed",
  },
  {
    industry: "HOME SERVICES",
    detail: "Responded in 1.9s · Quote request captured",
  },
  {
    industry: "REAL ESTATE",
    detail: "Responded in 1.6s · Viewing booked",
  },
  {
    industry: "MEDSPA",
    detail: "Responded in 2.3s · Consultation scheduled",
  },
] as const;

type Entry = (typeof ENTRIES)[number];

type Card = {
  id: number;
  entry: Entry;
  exiting?: boolean;
  justEntered?: boolean;
};

const DEMO_INTERVAL_MS = 3000;
const EXIT_MS = 400;

export function LiveActivityFeed() {
  const idRef = useRef(0);
  const indexRef = useRef(4);
  const [cards, setCards] = useState<Card[]>(() =>
    ENTRIES.slice(0, 4).map((entry) => ({
      id: idRef.current++,
      entry,
    })),
  );
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
    };

    const tick = () => {
      const entryIndex = indexRef.current % ENTRIES.length;
      indexRef.current += 1;
      const newId = idRef.current++;
      const entry = ENTRIES[entryIndex];

      if (reduceMotionRef.current) {
        setCards((prev) => [
          { id: newId, entry },
          ...prev.slice(0, -1),
        ]);
        return;
      }

      clearTimers();

      setCards((prev) =>
        prev.map((c, idx) =>
          idx === prev.length - 1
            ? { ...c, exiting: true }
            : { ...c, exiting: false },
        ),
      );

      exitTimeoutRef.current = setTimeout(() => {
        exitTimeoutRef.current = null;
        setCards((prev) => [
          { id: newId, entry, justEntered: true },
          ...prev.slice(0, -1).map((c) => ({ ...c, exiting: false })),
        ]);
        enterTimeoutRef.current = setTimeout(() => {
          enterTimeoutRef.current = null;
          setCards((prev) =>
            prev.map((c) => ({ ...c, justEntered: false })),
          );
        }, 450);
      }, EXIT_MS);
    };

    const interval = setInterval(tick, DEMO_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      clearTimers();
    };
  }, []);

  return (
    <div className="flex max-h-[480px] w-full max-w-[420px] flex-col overflow-hidden rounded-none border border-[#1F1F1F] bg-[#111111] p-6">
      <div className="mb-4 flex shrink-0 items-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="absolute inline-flex h-full w-full animate-ping bg-[#22C55E] opacity-40 motion-reduce:animate-none"
            aria-hidden
          />
          <span
            className="relative inline-flex h-2 w-2 bg-[#22C55E]"
            aria-hidden
          />
        </span>
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          GRADIA LIVE
        </span>
      </div>

      <div
        className="min-h-0 flex-1 overflow-hidden"
        aria-live="polite"
        aria-label="Live activity"
      >
        <div className="flex flex-col">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "mb-2 rounded-none border border-[#252525] bg-[#1A1A1A] px-4 py-3 font-sans last:mb-0",
                card.exiting && "hero-live-feed-exit pointer-events-none",
                card.justEntered && "animate-hero-feed-card-in",
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#3B6EF5]">
                {card.entry.industry}
              </p>
              <p className="mt-1 text-[13px] font-medium text-[#FFFFFF]">
                Lead answered
              </p>
              <p className="mt-1 text-xs leading-snug text-[#6B7280]">
                {card.entry.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
