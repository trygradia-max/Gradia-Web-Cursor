"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type CalStep = "empty" | "pulse" | "filled" | "confirmed";

type Booking = {
  name: string;
  title: string;
  /** 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri */
  day: number;
  /** Full hour bucket the slot lands in (24h). */
  hour: number;
  /** Optional human-readable time used in the confirmation copy. */
  timeLabel: string;
};

const BOOKINGS: Booking[] = [
  {
    name: "Sarah M.",
    title: "Dental Consult",
    day: 1,
    hour: 10,
    timeLabel: "Tue 10:00am",
  },
  {
    name: "James T.",
    title: "Roof Assessment",
    day: 2,
    hour: 14,
    timeLabel: "Wed 2:30pm",
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const formatHour = (h: number) => {
  const period = h >= 12 ? "pm" : "am";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}${period}`;
};

export function SeeItCloseCalendar() {
  const [bookingIdx, setBookingIdx] = useState(0);
  const [step, setStep] = useState<CalStep>("empty");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setStep("confirmed");
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      if (cancelled) return;
      setStep("empty");
      timers.push(setTimeout(() => !cancelled && setStep("pulse"), 800));
      timers.push(setTimeout(() => !cancelled && setStep("filled"), 2000));
      timers.push(setTimeout(() => !cancelled && setStep("confirmed"), 2800));
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setBookingIdx((idx) => (idx + 1) % BOOKINGS.length);
          runCycle();
        }, 5500),
      );
    };

    runCycle();

    return () => {
      cancelled = true;
      for (const t of timers) clearTimeout(t);
    };
  }, []);

  const booking = BOOKINGS[bookingIdx];

  return (
    <div className="w-full border border-[#E5E7EB] bg-[#F5F5F5] p-5 sm:p-8">
      <div className="overflow-hidden border border-[#E5E7EB] bg-white">
        <div
          className="grid"
          style={{ gridTemplateColumns: "48px repeat(5, minmax(0, 1fr))" }}
        >
          <div className="border-b border-[#E5E7EB] bg-white" />
          {DAYS.map((d) => (
            <div
              key={d}
              className="border-b border-l border-[#E5E7EB] py-2 text-center font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-[#6B7280] sm:text-[11px]"
            >
              {d}
            </div>
          ))}

          {HOURS.map((h) => (
            <Fragment key={h}>
              <div
                className="border-t border-[#E5E7EB] px-2 py-2 text-right font-sans text-[10px] tabular-nums text-[#6B7280]"
                style={{ height: "40px" }}
              >
                {formatHour(h)}
              </div>
              {DAYS.map((d, dayIdx) => {
                const isTarget =
                  booking.day === dayIdx && booking.hour === h;
                const showPulse = isTarget && step === "pulse";
                const showFilled =
                  isTarget &&
                  (step === "filled" || step === "confirmed");
                return (
                  <div
                    key={d}
                    className={cn(
                      "relative border-l border-t border-[#E5E7EB] transition-colors duration-300",
                      showPulse && "animate-booking-slot-pulse",
                      showFilled && "bg-[#3B6EF5]",
                    )}
                    style={{ height: "40px" }}
                    aria-hidden={!showFilled}
                  >
                    {showFilled && (
                      <p className="truncate px-2 py-[6px] font-sans text-[10px] font-medium leading-tight text-white sm:text-[11px]">
                        <span className="hidden sm:inline">
                          {booking.name} — {booking.title}
                        </span>
                        <span className="sm:hidden">{booking.name}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-5 min-h-[44px]">
        {step === "confirmed" && (
          <div className="border border-[#10B981] bg-[#F0FFF4] px-4 py-[10px] animate-the-gap-step-in">
            <p className="font-sans text-[13px] font-medium leading-snug text-[#10B981]">
              ✓ Booked · SMS confirmation sent to client
            </p>
            <p className="mt-1 font-sans text-[11px] tabular-nums text-[#10B981]/80">
              {booking.timeLabel} · {booking.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
