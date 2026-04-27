"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type LeadEntry = {
  name: string;
  phone: string;
  need: string;
  urgency: string;
  source: string;
};

const LEADS: LeadEntry[] = [
  {
    name: "Sarah Mitchell",
    phone: "(555) 284-9901",
    need: "Dental cleaning + whitening consult",
    urgency: "This week",
    source: "Inbound call — 8:47pm",
  },
  {
    name: "James Torres",
    phone: "(555) 103-7742",
    need: "Roof repair quote",
    urgency: "ASAP — storm damage",
    source: "Inbound call — 11:23pm",
  },
];

const FIELDS: Array<{ key: keyof LeadEntry; label: string }> = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "need", label: "Need" },
  { key: "urgency", label: "Urgency" },
  { key: "source", label: "Source" },
];

const TYPE_INTERVAL_MS = 32;
const FIELD_GAP_MS = 220;
const BADGE_DELAY_MS = 500;
const LOOP_PAUSE_MS = 2000;

type Phase = "typing" | "badge" | "pause";

type FeedState = {
  loopIdx: number;
  fieldIdx: number;
  typedChars: number;
  phase: Phase;
};

const INITIAL_STATE: FeedState = {
  loopIdx: 0,
  fieldIdx: 0,
  typedChars: 0,
  phase: "typing",
};

export function LeadCapturePreview() {
  const [state, setState] = useState<FeedState>(INITIAL_STATE);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      const last = LEADS[0];
      setState({
        loopIdx: 0,
        fieldIdx: FIELDS.length - 1,
        typedChars: last[FIELDS[FIELDS.length - 1].key].length,
        phase: "badge",
      });
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cur: FeedState = { ...INITIAL_STATE };
    setState(cur);

    const tick = () => {
      if (cancelled) return;
      const lead = LEADS[cur.loopIdx];
      const field = FIELDS[cur.fieldIdx];
      const value = lead[field.key];

      if (cur.phase === "typing") {
        if (cur.typedChars < value.length) {
          cur = { ...cur, typedChars: cur.typedChars + 1 };
          setState(cur);
          timer = setTimeout(tick, TYPE_INTERVAL_MS);
        } else if (cur.fieldIdx < FIELDS.length - 1) {
          cur = { ...cur, fieldIdx: cur.fieldIdx + 1, typedChars: 0 };
          setState(cur);
          timer = setTimeout(tick, FIELD_GAP_MS);
        } else {
          cur = { ...cur, phase: "badge" };
          setState(cur);
          timer = setTimeout(tick, BADGE_DELAY_MS);
        }
      } else if (cur.phase === "badge") {
        cur = { ...cur, phase: "pause" };
        setState(cur);
        timer = setTimeout(tick, LOOP_PAUSE_MS);
      } else {
        cur = {
          loopIdx: (cur.loopIdx + 1) % LEADS.length,
          fieldIdx: 0,
          typedChars: 0,
          phase: "typing",
        };
        setState(cur);
        timer = setTimeout(tick, FIELD_GAP_MS);
      }
    };

    timer = setTimeout(tick, 400);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const lead = LEADS[state.loopIdx];
  const showBadge = state.phase === "badge" || state.phase === "pause";

  const valueFor = (idx: number) => {
    const field = FIELDS[idx];
    const fullValue = lead[field.key];
    if (idx < state.fieldIdx) return fullValue;
    if (idx === state.fieldIdx) {
      if (state.phase === "typing") {
        return fullValue.slice(0, state.typedChars);
      }
      return fullValue;
    }
    return "";
  };

  const isTypingField = (idx: number) =>
    state.phase === "typing" && idx === state.fieldIdx;

  const isFilledField = (idx: number) => {
    if (idx < state.fieldIdx) return true;
    if (idx === state.fieldIdx) return state.phase !== "typing";
    return false;
  };

  return (
    <div className="w-full rounded-none border border-[#E5E7EB] bg-[#F5F5F5] p-8">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
        NEW LEAD
      </p>

      <div className="mt-6 space-y-4">
        {FIELDS.map((field, idx) => {
          const value = valueFor(idx);
          const filled = isFilledField(idx);
          const typing = isTypingField(idx);
          return (
            <div
              key={field.key}
              className="flex flex-col gap-1 border-b border-[#E5E7EB] pb-3 last:border-b-0"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#6B7280]">
                {field.label}
              </span>
              <div className="flex min-h-[20px] items-center font-sans text-[14px] text-[#0A0A0A]">
                <span className={cn(filled || typing ? "" : "text-[#C7C7C7]")}>
                  {value || (filled || typing ? "" : "—")}
                </span>
                {typing && (
                  <span
                    className="ml-[1px] inline-block h-[14px] w-[1.5px] bg-[#0A0A0A] align-middle animate-typing-cursor"
                    aria-hidden
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 min-h-[28px]">
        {showBadge && (
          <span
            key={`${state.loopIdx}-badge`}
            className="inline-flex items-center gap-1.5 rounded-none bg-[#10B981]/10 px-3 py-1.5 font-sans text-[12px] font-medium text-[#10B981] animate-feature-badge-in"
          >
            <Check
              className="h-3.5 w-3.5"
              strokeWidth={2.5}
              aria-hidden
            />
            Captured &amp; logged
          </span>
        )}
      </div>
    </div>
  );
}
