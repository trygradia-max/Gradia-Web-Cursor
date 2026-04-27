"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const TIMES = ["9:00", "10:00", "11:00", "1:30", "2:30"] as const;

type Booking = {
  dayIndex: number;
  time: (typeof TIMES)[number];
  name: string;
  type: string;
  meridiem: "AM" | "PM";
};

const BOOKINGS: Booking[] = [
  {
    dayIndex: 1,
    time: "10:00",
    meridiem: "AM",
    name: "Sarah Mitchell",
    type: "Dental Consult",
  },
  {
    dayIndex: 2,
    time: "2:30",
    meridiem: "PM",
    name: "James Torres",
    type: "Roof Assessment",
  },
];

type Phase = "idle" | "pulsing" | "filling" | "confirmed" | "reset";

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 600,
  pulsing: 1600,
  filling: 1800,
  confirmed: 1900,
  reset: 400,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  idle: "pulsing",
  pulsing: "filling",
  filling: "confirmed",
  confirmed: "reset",
  reset: "idle",
};

export function BookingPreview() {
  const [bookingIdx, setBookingIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("confirmed");
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let curPhase: Phase = "idle";
    let curIdx = 0;

    const tick = () => {
      if (cancelled) return;
      const next = NEXT_PHASE[curPhase];
      if (next === "idle") {
        curIdx = (curIdx + 1) % BOOKINGS.length;
        setBookingIdx(curIdx);
      }
      curPhase = next;
      setPhase(curPhase);
      timer = setTimeout(tick, PHASE_DURATIONS[curPhase]);
    };

    timer = setTimeout(tick, PHASE_DURATIONS.idle);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const booking = BOOKINGS[bookingIdx];
  const showFilled = phase === "filling" || phase === "confirmed";
  const showPulse = phase === "pulsing";
  const showBadge = phase === "confirmed";

  return (
    <div className="w-full rounded-none border border-[#E5E7EB] bg-[#FFFFFF] p-8">
      <div className="flex items-baseline justify-between">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          THIS WEEK
        </p>
        <p className="font-sans text-[11px] text-[#6B7280]">Mon — Fri</p>
      </div>

      <div className="mt-6 grid grid-cols-[44px_repeat(5,1fr)] gap-px bg-[#E5E7EB]">
        <div className="bg-[#FFFFFF]" aria-hidden />
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-[#FFFFFF] py-2 text-center font-sans text-[11px] font-medium text-[#6B7280]"
          >
            {day}
          </div>
        ))}

        {TIMES.map((time, rowIdx) => {
          const meridiem = rowIdx <= 2 ? "AM" : "PM";
          return (
            <Row
              key={time}
              time={time}
              meridiem={meridiem}
              rowIdx={rowIdx}
              activeDay={booking.dayIndex}
              activeTime={booking.time}
              activeMeridiem={booking.meridiem}
              showFilled={showFilled}
              showPulse={showPulse}
              booking={booking}
            />
          );
        })}
      </div>

      <div className="mt-6 min-h-[28px]">
        {showBadge && (
          <span
            key={bookingIdx}
            className="inline-flex items-center gap-1.5 rounded-none bg-[#10B981]/10 px-3 py-1.5 font-sans text-[12px] font-medium text-[#10B981] animate-feature-badge-in"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            Confirmed — SMS sent to client
          </span>
        )}
      </div>
    </div>
  );
}

function Row({
  time,
  meridiem,
  rowIdx,
  activeDay,
  activeTime,
  activeMeridiem,
  showFilled,
  showPulse,
  booking,
}: {
  time: (typeof TIMES)[number];
  meridiem: "AM" | "PM";
  rowIdx: number;
  activeDay: number;
  activeTime: (typeof TIMES)[number];
  activeMeridiem: "AM" | "PM";
  showFilled: boolean;
  showPulse: boolean;
  booking: Booking;
}) {
  const matches = (dayIdx: number) =>
    dayIdx === activeDay &&
    time === activeTime &&
    meridiem === activeMeridiem;

  return (
    <>
      <div className="flex items-center justify-end bg-[#FFFFFF] pr-2 font-sans text-[10px] tabular-nums text-[#6B7280]">
        {time}
        <span className="ml-1 text-[9px] text-[#9CA3AF]">{meridiem}</span>
      </div>
      {DAYS.map((day, dayIdx) => {
        const isActive = matches(dayIdx);
        const filled = isActive && showFilled;
        const pulsing = isActive && showPulse;
        return (
          <div
            key={`${time}-${day}`}
            className={cn(
              "relative flex min-h-[44px] items-center justify-center bg-[#FFFFFF] transition-colors duration-300 ease-out",
              filled && "bg-[#3B6EF5] text-white",
            )}
          >
            {pulsing && (
              <span
                className="pointer-events-none absolute inset-0 animate-booking-slot-pulse"
                aria-hidden
              />
            )}
            {filled ? (
              <div
                key={`${booking.dayIndex}-${booking.time}-${rowIdx}`}
                className="flex flex-col items-center px-1 text-center font-sans text-[10px] leading-tight text-white animate-feature-badge-in"
              >
                <span className="font-medium">{booking.name}</span>
                <span className="text-white/80">{booking.type}</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
