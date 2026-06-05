"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, ShieldCheck, Zap } from "lucide-react";
import { MaterialSwitch } from "@/components/ui/MaterialSwitch";
import { cn } from "@/lib/cn";

const ACTIONS = [
  { task: "Reply to Marcus — quote a full interior + ceramic", done: "Quote sent · $640" },
  { task: "Book the Saturday 10:00 AM slot", done: "Booked · deposit collected" },
  { task: "Send the ceramic-coating upsell offer", done: "Sent · opened in 2 min" },
];

export function ModeToggle() {
  const [agentic, setAgentic] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const demoed = useRef(false);

  // Auto-play the satisfying flip once when it first scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !demoed.current) {
          demoed.current = true;
          const t = window.setTimeout(() => setAgentic(true), 900);
          return () => window.clearTimeout(t);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mx-auto max-w-2xl">
      {/* switch row */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !agentic ? "text-[var(--foreground)]" : "text-[var(--muted)]",
          )}
        >
          Approval mode
        </span>
        {/* the switch gets a quick scale bump on each flip = tactile */}
        <motion.div
          key={agentic ? "on" : "off"}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <MaterialSwitch
            checked={agentic}
            onCheckedChange={setAgentic}
            haptic="heavy"
            aria-label="Toggle between approval and agentic mode"
            checkedIcon={<Zap className="h-3.5 w-3.5" strokeWidth={3} />}
            uncheckedIcon={<ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />}
          />
        </motion.div>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            agentic ? "text-[var(--brand-primary)]" : "text-[var(--muted)]",
          )}
        >
          Agentic mode
        </span>
      </div>

      {/* panel — zooms in with a spring on every toggle */}
      <motion.div
        key={agentic ? "agentic" : "approval"}
        initial={{ scale: 0.95, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="border border-[var(--border)] bg-[var(--bg)] p-5 shadow-card sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
            gradia · {agentic ? "agentic" : "approval"}
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              agentic ? "text-[var(--dash-success)]" : "text-[var(--dash-warning)]",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                agentic ? "bg-[var(--dash-success)]" : "wl-dot-pulse bg-[var(--dash-warning)]",
              )}
            />
            {agentic ? "Running autonomously" : "Waiting on you"}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {ACTIONS.map((a, i) => (
            <li
              key={a.task}
              className="flex items-center justify-between gap-3 border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 text-sm text-[var(--foreground)]">{a.task}</span>
              <AnimatePresence mode="wait" initial={false}>
                {agentic ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.12 }}
                    className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--dash-success)]"
                  >
                    <Check className="h-3.5 w-3.5" /> {a.done}
                  </motion.span>
                ) : (
                  <motion.span
                    key="pending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1 text-xs text-[var(--dash-warning)]">
                      <Clock className="h-3 w-3" /> Needs your OK
                    </span>
                    <span className="rounded-[100px] bg-[var(--brand-primary)] px-2.5 py-1 text-[11px] font-medium text-white">
                      Approve
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-[var(--muted)]">
          {agentic
            ? "Gradia handles it end to end — you just watch the work get done."
            : "You approve every action before it goes out. Nothing happens without your tap."}
        </p>
      </motion.div>
    </div>
  );
}
