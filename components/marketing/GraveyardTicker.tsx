"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const VISIBLE = 5;
const GAP_PX = 6;
const ESTIMATED_CARD_PX = 56;
const TICK_MS = 2500;
const EXIT_MS = 350;
const ENTER_MS = 420;
const COUNTER_TICK_MS = 8000;
const COUNTER_START = 847;

export function GraveyardTicker() {
  const idRef = useRef(0);
  const indexRef = useRef(VISIBLE);
  const [cards, setCards] = useState<Card[]>(() =>
    ENTRIES.slice(0, VISIBLE).map((entry) => ({
      id: idRef.current++,
      entry,
    })),
  );
  const [missedCount, setMissedCount] = useState(COUNTER_START);
  const [cardH, setCardH] = useState(ESTIMATED_CARD_PX);
  const sizerRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const node = sizerRef.current;
    if (!node) return;

    const update = () => {
      const h = node.offsetHeight;
      if (h > 0) {
        setCardH((prev) => (Math.abs(prev - h) > 0.5 ? h : prev));
      }
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
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
        setCards((prev) => [{ id: newId, entry }, ...prev.slice(0, -1)]);
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
        }, ENTER_MS);
      }, EXIT_MS);
    };

    const interval = setInterval(tick, TICK_MS);
    return () => {
      clearInterval(interval);
      clearTimers();
    };
  }, []);

  const slotH = cardH + GAP_PX;
  const stackHeight = VISIBLE * slotH - GAP_PX;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-none border border-[#1F1F1F] bg-[#0A0A0A] p-6">
      <p className="mb-4 shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
        MISSED — LAST 24 HOURS
      </p>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: stackHeight }}
        aria-live="polite"
        aria-label="Missed leads log"
      >
        {/* Hidden sizer — used to measure card height once without depending
            on the moving stack of real cards. */}
        <div
          ref={sizerRef}
          aria-hidden
          className="invisible pointer-events-none absolute left-0 right-0 top-0 rounded-none border border-[#1A1A1A] bg-[#111111] px-[14px] py-[10px] font-sans"
          style={{ contain: "layout style paint" }}
        >
          <div className="flex justify-between gap-3">
            <span className="text-xs font-medium text-[#FFFFFF]">
              Placeholder Business
            </span>
            <span className="shrink-0 text-xs text-[#6B7280]">12:00am</span>
          </div>
          <p className="mt-1 text-[11px] font-normal text-[#EF4444]">
            No answer
          </p>
        </div>

        {cards.map((card, i) => {
          const isEntering = !!card.justEntered;
          const isExiting = !!card.exiting;
          const slotY = i * slotH;
          return (
            <div
              key={card.id}
              className={cn(
                "feed-card-slot rounded-none border border-[#1A1A1A] bg-[#111111] px-[14px] py-[10px] font-sans",
                isEntering && "animate-graveyard-card-in",
                isExiting && "pointer-events-none",
              )}
              style={{
                transform: `translate3d(0, ${slotY}px, 0)`,
                opacity: isExiting ? 0 : 1,
              }}
            >
              <div className="flex justify-between gap-3">
                <span className="text-xs font-medium text-[#FFFFFF]">
                  {card.entry.business}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-[#6B7280]">
                  {card.entry.time}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-normal text-[#EF4444]">
                No answer
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 shrink-0 border-t border-[#1F1F1F] pt-4 font-sans text-[11px] text-[#6B7280]">
        <span className="inline-block min-w-[3.5ch] text-left tabular-nums">
          {missedCount.toLocaleString()}
        </span>{" "}
        leads missed today nationally
      </p>
    </div>
  );
}
