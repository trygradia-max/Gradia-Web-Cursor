"use client";

import { useEffect, useState } from "react";
import { Check, PhoneCall } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Looping demo: an after-hours call gets answered, quoted, and booked over the
 * phone by Gradia — the "missed call in, booked job out" moment.
 *
 * Every block below stays mounted for the whole loop and only fades/slides via
 * opacity + transform — never via mount/unmount or height. That keeps the
 * card's height perfectly stable so the page beneath it doesn't jump each cycle.
 */
const STAGES = [
  { agent: "Gradia", state: "Answering…" },
  { agent: "Gradia", state: "Quoting…" },
  { agent: "Gradia", state: "Booking…" },
  { agent: "Done", state: "Booked" },
] as const;

/** opacity + a small translate (transform never reflows, so no page jump). */
function reveal(active: boolean) {
  return cn(
    "transition-all duration-500 ease-out",
    active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5",
  );
}

export function CaptureDemo() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStage((s) => (s + 1) % (STAGES.length + 1));
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  const current = STAGES[Math.min(stage, STAGES.length - 1)];
  const showQuote = stage >= 1;
  const showBooking = stage >= 2;
  const done = stage >= 3;

  return (
    <div className="mx-auto w-full max-w-md border border-[var(--border)] bg-[var(--bg)] p-5 shadow-card">
      {/* status bar */}
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
          gradia · live
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              done
                ? "bg-[var(--dash-success)]"
                : "wl-dot-pulse bg-[var(--brand-primary)]",
            )}
          />
          {done ? "All set" : current.state}
        </span>
      </div>

      {/* incoming message */}
      <div className="mb-3 flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--bg-elevated)] text-[var(--muted)]">
          <PhoneCall className="h-4 w-4" />
        </div>
        <div>
          <p className="mb-1 text-[11px] text-[var(--muted)]">
            Missed call · 9:47 PM
          </p>
          <p className="bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--foreground)]">
            &ldquo;Can I get a quote for a full interior + ceramic on my
            Tahoe?&rdquo;
          </p>
        </div>
      </div>

      {/* working line — fixed-height slot so it never adds/removes space */}
      <div className="mb-3 h-4 pl-10">
        <p
          className={cn(
            "text-xs text-[var(--brand-primary)] transition-opacity duration-300",
            done ? "opacity-0" : "opacity-100",
          )}
        >
          {current.agent} is {current.state.toLowerCase().replace("…", "")}
          <span className="ml-0.5 animate-typing-cursor">…</span>
        </p>
      </div>

      {/* quote — always mounted, fades in */}
      <div className={cn("mb-2 border border-[var(--border)] p-3", reveal(showQuote))}>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          On the call · quote
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Tahoe · full-size SUV", "Interior + ceramic", "$640"].map((chip) => (
            <span
              key={chip}
              className="bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--foreground)]"
            >
              {chip}
            </span>
          ))}
          <span className="flex items-center gap-1 bg-[color:var(--dash-success)]/10 px-2 py-1 text-xs text-[var(--dash-success)]">
            <Check className="h-3 w-3" /> Quoted on the call
          </span>
        </div>
      </div>

      {/* booking — always mounted, fades in */}
      <div className={cn("mb-2 border border-[var(--border)] p-3", reveal(showBooking))}>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          On the call · booking
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--foreground)]">Saturday · 10:00 AM</span>
          <span className="flex items-center gap-1 text-xs text-[var(--dash-success)]">
            <Check className="h-3 w-3" /> Added to your calendar
          </span>
        </div>
      </div>

      {/* result — always mounted, fades in */}
      <div
        className={cn(
          "mt-3 flex items-center gap-2 border-t border-[var(--border)] pt-3",
          reveal(done),
        )}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--dash-success)] text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
        <p className="text-sm font-medium text-[var(--foreground)]">
          New job booked while you slept.
        </p>
      </div>
    </div>
  );
}
