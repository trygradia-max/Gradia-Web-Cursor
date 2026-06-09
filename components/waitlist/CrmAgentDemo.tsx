"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Database, Users, Tag, Eye } from "lucide-react";
import { GradiaChatBox } from "@/components/ui/GradiaChatBox";
import { cn } from "@/lib/cn";

/**
 * Chat-agent demo: the owner types a plain-English ask, and Gradia opens the
 * CRM, pulls the matching leads, drafts the message, and builds a dry-run
 * preview — then waits for the owner's approval before anything sends (nothing
 * auto-sends). Loops on a fixed-height timeline (no layout shift), starting when
 * it scrolls in.
 */
const PROMPT = "Text everyone who quoted ceramic but never booked";

const STEPS = [
  { label: "Opening your CRM", icon: Database },
  { label: "Found 23 matching leads", icon: Users },
  { label: "Drafted the message", icon: Tag },
  { label: "Dry-run preview ready", icon: Eye },
];

const CUSTOMERS = [
  { n: "Marcus James", v: "Tahoe · ceramic quote" },
  { n: "Dana Ruiz", v: "Model 3 · ceramic quote" },
  { n: "Sam Park", v: "F-150 · ceramic quote" },
  { n: "Priya Shah", v: "Q5 · ceramic quote" },
];

export function CrmAgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  // phase 0: prompt sent · 1-4: steps working · 5: done, then loops
  const [phase, setPhase] = useState(0);
  const running = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !running.current) {
          running.current = true;
          const id = window.setInterval(
            () => setPhase((p) => (p + 1) % 6),
            1500,
          );
          el.dataset.intervalId = String(id);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      const id = el.dataset.intervalId;
      if (id) window.clearInterval(Number(id));
    };
  }, []);

  const pulled = phase >= 2;
  const done = phase >= 5;

  return (
    <div ref={ref} className="grid items-start gap-6 lg:grid-cols-2">
      {/* left: chat + steps */}
      <div>
        <GradiaChatBox
          text={PROMPT}
          state={phase === 0 ? "sending" : "idle"}
        />

        <ul className="mt-4 flex flex-col gap-2">
          {STEPS.map((s, i) => {
            const stepActive = phase === i + 1;
            const stepDone = phase > i + 1 || done;
            return (
              <li
                key={s.label}
                className={cn(
                  "flex items-center gap-3 border px-3 py-2.5 transition-colors",
                  stepActive
                    ? "border-[var(--brand-primary)]/40 bg-[color:var(--brand-primary)]/8"
                    : "border-[var(--border)] bg-[var(--bg)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center",
                    stepDone
                      ? "text-[var(--dash-success)]"
                      : stepActive
                        ? "text-[var(--brand-primary)]"
                        : "text-[var(--muted)]",
                  )}
                >
                  {stepDone ? (
                    <Check className="h-4 w-4" />
                  ) : stepActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    stepDone || stepActive
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)]",
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* result — fixed-height slot so it never shifts the column */}
        <div className="mt-3 h-6">
          <p
            className={cn(
              "flex items-center gap-2 text-sm font-medium text-[var(--dash-success)] transition-opacity duration-300",
              done ? "opacity-100" : "opacity-0",
            )}
          >
            <Check className="h-4 w-4" /> You approved — sent to 23 leads
          </p>
        </div>
      </div>

      {/* right: live CRM view */}
      <div className="border border-[var(--border)] bg-[var(--bg)] shadow-card">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
            <Database className="h-4 w-4 text-[var(--brand-primary)]" /> Ceramic
            leads
            <span className="text-[var(--muted)]">· 23</span>
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              pulled ? "text-[var(--dash-success)]" : "text-[var(--muted)]",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                pulled
                  ? "bg-[var(--dash-success)]"
                  : "wl-dot-pulse bg-[var(--brand-primary)]",
              )}
            />
            {pulled ? "Selected all" : "Reading…"}
          </span>
        </div>
        <ul>
          {CUSTOMERS.map((c, i) => (
            <li
              key={c.n}
              className={cn(
                "flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5 text-sm transition-colors last:border-0",
                pulled && "bg-[color:var(--brand-primary)]/[0.05]",
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span>
                <span className="font-medium text-[var(--foreground)]">{c.n}</span>
                <span className="ml-2 text-xs text-[var(--muted)]">{c.v}</span>
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 text-xs text-[var(--dash-success)] transition-opacity",
                  pulled ? "opacity-100" : "opacity-0",
                )}
              >
                <Tag className="h-3 w-3" /> ceramic
              </span>
            </li>
          ))}
          <li className="px-4 py-2 text-center text-xs text-[var(--muted)]">
            + 19 more
          </li>
        </ul>
      </div>
    </div>
  );
}
