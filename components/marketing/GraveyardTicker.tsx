"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ENTRIES = [
  { business: "Dental Clinic", time: "11:47pm" },
  { business: "Auto Dealership", time: "6:58am" },
  { business: "Law Firm", time: "8:02pm" },
  { business: "Home Services", time: "7:31am" },
  { business: "Real Estate Agency", time: "9:44pm" },
  { business: "Insurance Broker", time: "5:17pm" },
  { business: "Medspa", time: "8:29am" },
  { business: "HVAC Company", time: "11:02pm" },
] as const;

type Entry = (typeof ENTRIES)[number];

type Card = {
  id: number;
  entry: Entry;
  exiting?: boolean;
  justEntered?: boolean;
};

const MAX_CARDS = 5;
const TICK_MS = 2500;
const EXIT_MS = 350;
const COUNTER_TICK_MS = 8000;
const COUNTER_START = 847;

export function GraveyardTicker() {
  const idRef = useRef(0);
  const indexRef = useRef(MAX_CARDS);
  const [cards, setCards] = useState<Card[]>(() =>
    ENTRIES.slice(0, MAX_CARDS).map((entry) => ({
      id: idRef.current++,
      entry,
    })),
  );
  const [missedCount, setMissedCount] = useState(COUNTER_START);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setMissedCount((n) => n + 1);
    }, COUNTER_TICK_MS);
    return () => clearInterval(iv);
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
          setCards((prev) => prev.map((c) => ({ ...c, justEntered: false })));
        }, 420);
      }, EXIT_MS);
    };

    const interval = setInterval(tick, TICK_MS);
    return () => {
      clearInterval(interval);
      clearTimers();
    };
  }, []);

  return (
    <div className="flex max-h-[420px] w-full flex-col overflow-hidden rounded-none border border-[#1F1F1F] bg-[#0A0A0A] p-6">
      <p className="mb-4 shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
        MISSED — LAST 24 HOURS
      </p>

      <div
        className="min-h-0 flex-1 overflow-hidden"
        aria-live="polite"
        aria-label="Missed leads log"
      >
        <div className="flex flex-col">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "mb-1.5 rounded-none border border-[#1A1A1A] bg-[#111111] px-[14px] py-[10px] font-sans last:mb-0",
                card.exiting && "graveyard-card-exit pointer-events-none",
                card.justEntered && "animate-graveyard-card-in",
              )}
            >
              <div className="flex justify-between gap-3">
                <span className="text-xs font-medium text-[#FFFFFF]">
                  {card.entry.business}
                </span>
                <span className="shrink-0 text-xs text-[#6B7280]">
                  {card.entry.time}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-normal text-[#EF4444]">
                No answer
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 shrink-0 border-t border-[#1F1F1F] pt-4 font-sans text-[11px] text-[#6B7280]">
        {missedCount.toLocaleString()} leads missed today nationally
      </p>
    </div>
  );
}
