"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type CallStep = "incoming" | "answered";

const WAVEFORM_HEIGHTS = [
  0.45, 0.65, 0.85, 1, 0.7, 0.5, 0.35, 0.55, 0.75, 0.95, 0.7, 0.45, 0.6, 0.8,
  0.95, 0.7, 0.4, 0.55, 0.75, 0.5, 0.35,
];

const formatSeconds = (s: number) =>
  `0:${s.toString().padStart(2, "0")}`;

export function SeeItClosePhoneCall() {
  const [step, setStep] = useState<CallStep>("incoming");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setStep("answered");
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      if (cancelled) return;
      setStep("incoming");
      setSeconds(0);
      timers.push(setTimeout(() => !cancelled && setSeconds(1), 1000));
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setStep("answered");
        }, 2000),
      );
      timers.push(setTimeout(runCycle, 4000));
    };

    runCycle();

    return () => {
      cancelled = true;
      for (const t of timers) clearTimeout(t);
    };
  }, []);

  const timeDisplay = step === "answered" ? "0:01.8" : formatSeconds(seconds);

  return (
    <div className="w-full border border-[#E5E7EB] bg-[#F5F5F5] p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        {step === "incoming" ? (
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
            Incoming Call
          </p>
        ) : (
          <p
            key="answered-label"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5] animate-the-gap-step-in"
          >
            Answered by Gradia
          </p>
        )}
        <p className="font-sans text-xs tabular-nums text-[#6B7280]">
          {timeDisplay}
        </p>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#6B7280]">
            Caller
          </p>
          <p className="mt-1 truncate font-sans text-lg font-semibold text-[#0A0A0A] sm:text-xl">
            Unknown — (555) 847-2291
          </p>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center border border-[#E5E7EB] bg-white",
            step === "incoming" && "animate-phone-ring-pulse",
          )}
          aria-hidden="true"
        >
          <Phone
            className={cn(
              "h-5 w-5",
              step === "incoming" ? "text-[#3B6EF5]" : "text-[#10B981]",
            )}
            strokeWidth={1.6}
          />
        </div>
      </div>

      <div className="mt-6 min-h-[20px]">
        {step === "answered" && (
          <div className="flex items-center gap-2 animate-the-gap-step-in">
            <span
              className="h-[7px] w-[7px] rounded-full bg-[#10B981]"
              aria-hidden="true"
            />
            <p className="font-sans text-xs font-medium text-[#10B981]">
              Connected
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 min-h-[112px] border-t border-[#E5E7EB] pt-5">
        {step === "answered" ? (
          <div className="animate-the-gap-step-in">
            <div className="flex h-12 items-center justify-center gap-[3px]">
              {WAVEFORM_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="block w-[3px] animate-waveform-bar bg-[#3B6EF5]"
                  style={{
                    height: `${Math.max(h * 100, 30)}%`,
                    animationDelay: `${(i % 7) * 0.07}s`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-4 font-sans text-sm italic leading-relaxed text-[#6B7280]">
              <span className="font-semibold not-italic text-[#0A0A0A]">
                Gradia:
              </span>{" "}
              Hi, thanks for calling. How can I help you today?
            </p>
          </div>
        ) : (
          <div className="flex h-12 items-center justify-center">
            <span
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.1em] text-[#6B7280]"
              aria-hidden="true"
            >
              <span className="h-[2px] w-8 bg-[#E5E7EB]" />
              Ringing
              <span className="h-[2px] w-8 bg-[#E5E7EB]" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
