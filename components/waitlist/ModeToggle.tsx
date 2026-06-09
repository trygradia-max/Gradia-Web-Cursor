"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, ShieldCheck, Zap, Eye } from "lucide-react";
import { MaterialSwitch } from "@/components/ui/MaterialSwitch";
import { cn } from "@/lib/cn";

const ACTIONS = [
  { task: "Reply to Marcus — quote a full interior + ceramic", staged: "Drafted · ready to send" },
  { task: "Confirm the Saturday 10:00 AM booking", staged: "Drafted · ready to send" },
  { task: "Text 8 leads who quoted but never booked", staged: "Dry-run ready · 8 leads" },
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
              agentic ? "text-[var(--brand-primary)]" : "text-[var(--dash-warning)]",
            )}
          >
            <span
              className={cn(
                "wl-dot-pulse h-1.5 w-1.5 rounded-full",
                agentic ? "bg-[var(--brand-primary)]" : "bg-[var(--dash-warning)]",
              )}
            />
            {agentic ? "Planned · awaiting your OK" : "Waiting on you"}
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
                    key="staged"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.12 }}
                    className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--brand-primary)]"
                  >
                    <Check className="h-3.5 w-3.5" /> {a.staged}
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

        {/* In agentic mode the whole plan is staged behind ONE approval — there
            is no auto-send. The owner still OKs the batch (with a dry-run). */}
        <AnimatePresence initial={false}>
          {agentic && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center justify-between gap-3 overflow-hidden border border-[var(--brand-primary)]/40 bg-[color:var(--brand-primary)]/8 px-3 py-2.5"
            >
              <span className="flex items-center gap-1.5 text-xs text-[var(--foreground)]">
                <Eye className="h-3.5 w-3.5 text-[var(--brand-primary)]" /> Dry-run
                preview · 10 messages
              </span>
              <span className="rounded-[100px] bg-[var(--brand-primary)] px-3 py-1.5 text-[11px] font-medium text-white">
                Approve all
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-sm text-[var(--muted)]">
          {agentic
            ? "Describe a workflow and Gradia plans every step — then stages the whole batch behind one approval. Still nothing sends on its own."
            : "You approve every action before it goes out. Nothing happens without your tap."}
        </p>
      </motion.div>
    </div>
  );
}
