"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Gem,
  CalendarCheck,
  Star,
  Check,
  Sparkles,
  MessageSquareText,
} from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * "See Gradia handle a call, start to finish" — an auto-playing product-demo
 * (pattern adapted from aceternity/sticky-scroll-reveal). The four beats
 * advance on their own (call → quote+upsell → book → follow-up) with the visual
 * cross-fading to match. Starts when scrolled into view, pauses off-screen,
 * click any beat to jump, and holds still under prefers-reduced-motion.
 */
const DWELL = 4500; // ms each beat stays before auto-advancing
const BEATS = [
  {
    eyebrow: "01 · The Receptionist",
    title: "The call comes in.",
    desc: "A new lead calls, texts, or DMs after hours. Gradia answers in seconds — 24/7 — so it never goes to voicemail or the next shop.",
  },
  {
    eyebrow: "02 · The Estimator",
    title: "Quoted — and upsold.",
    desc: "It reads the job, sends an accurate quote in seconds, and offers the right add-on automatically. Bigger tickets, zero pressure.",
  },
  {
    eyebrow: "03 · The Scheduler",
    title: "Booked, deposit and all.",
    desc: "The moment they say yes, it drops the job into your calendar, collects the deposit, and confirms — no back-and-forth.",
  },
  {
    eyebrow: "04 · The Reviewer & Closer",
    title: "Followed up automatically.",
    desc: "After the detail, it asks for the 5-star review at the perfect moment and sets the re-book reminder. Your pipeline refills itself.",
  },
] as const;

/* ---- the four visuals ---- */
function Visual({ step }: { step: number }) {
  const common = "w-full border border-white/10 bg-[#0b0913] p-4 shadow-card";
  if (step === 0) {
    return (
      <div className={common}>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#a78bfa]">
            <PhoneCall className="h-3.5 w-3.5" /> Incoming call
          </span>
          <span className="text-[11px] text-white/45">9:47 PM</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7c3aed]/20 text-sm font-semibold text-[#a78bfa]">
            MJ
          </span>
          <div>
            <p className="text-sm font-medium text-white">Marcus James</p>
            <p className="text-[11px] text-white/45">(480) 555-0199</p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-[#10b981]">
            <Check className="h-3 w-3" /> Answered
          </span>
        </div>
        <div className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3">
          <MessageSquareText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
          <p className="text-[13px] text-white/70">
            &ldquo;Can I get a quote for a full interior + ceramic on my
            Tahoe?&rdquo;
          </p>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className={common}>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
          The Estimator
        </span>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Tahoe · full-size SUV", "Interior detail · $640"].map((c) => (
            <span key={c} className="bg-white/[0.05] px-2 py-1 text-[12px] text-white">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border border-[#7c3aed]/40 bg-[#7c3aed]/[0.1] px-2.5 py-2">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-white">
            <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" /> Add ceramic coating
          </span>
          <span className="text-[13px] font-semibold text-[#a78bfa]">+$300</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-3 text-[12px] text-[#10b981]">
          <Check className="h-3.5 w-3.5" /> Quote + offer sent · accepted in 6 min
        </p>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className={common}>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
          The Scheduler
        </span>
        <div className="mt-3 flex items-center gap-3 bg-white/[0.04] p-3">
          <span className="flex h-10 w-10 flex-col items-center justify-center bg-[#7c3aed] text-white">
            <span className="text-[9px] uppercase leading-none">Sat</span>
            <span className="text-base font-bold leading-none">14</span>
          </span>
          <div>
            <p className="text-sm font-medium text-white">Saturday · 10:00 AM</p>
            <p className="text-[11px] text-white/45">Full interior + ceramic · 3.5 hrs</p>
          </div>
          <CalendarCheck className="ml-auto h-5 w-5 text-[#10b981]" />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[12px]">
          <span className="flex items-center gap-1.5 text-[#10b981]">
            <Check className="h-3.5 w-3.5" /> Deposit collected
          </span>
          <span className="font-semibold text-white">$120</span>
        </div>
      </div>
    );
  }
  return (
    <div className={common}>
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
        The Reviewer
      </span>
      <div className="mt-3 bg-white/[0.04] p-3 text-[13px] text-white/80">
        &ldquo;Thanks for choosing Pristine, Marcus! Mind leaving a quick review?&rdquo;
      </div>
      <div className="mt-2 flex items-center justify-between bg-white/[0.04] px-3 py-2">
        <span className="flex items-center gap-1 text-[#f59e0b]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-[#10b981]">
          <Check className="h-3.5 w-3.5" /> Posted
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-3 text-[12px] text-white/55">
        <Gem className="h-3.5 w-3.5 text-[#a78bfa]" /> Re-book reminder set · 6 weeks
      </p>
    </div>
  );
}

export function CallStory() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const reduce = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Only play while the demo is on-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance: re-arm after each beat (a click also resets the dwell).
  useEffect(() => {
    if (!inView || reduce.current) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % BEATS.length),
      DWELL,
    );
    return () => window.clearTimeout(t);
  }, [active, inView]);

  return (
    <div
      ref={containerRef}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* left: the four beats — active highlights, others dim, click to jump */}
      <ol className="flex flex-col gap-1">
        {BEATS.map((b, i) => {
          const on = i === active;
          return (
            <li key={b.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on}
                className={cn(
                  "flex w-full cursor-pointer border-l-2 py-3 pl-5 text-left transition-colors",
                  on
                    ? "border-[var(--brand-primary)]"
                    : "border-[var(--border)] hover:border-white/25",
                )}
              >
                <div
                  className={cn(
                    "transition-opacity duration-300",
                    on ? "opacity-100" : "opacity-45",
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                      on ? "text-[var(--brand-primary)]" : "text-[var(--muted)]",
                    )}
                  >
                    {b.eyebrow}
                  </span>
                  <h3
                    className={cn(
                      "mt-1 text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
                      on ? "text-[var(--foreground)]" : "text-[var(--muted)]",
                    )}
                  >
                    {b.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm text-[var(--muted)]">
                    {b.desc}
                  </p>
                  {/* timing bar — fills over the dwell on the active beat */}
                  <div className="mt-2.5 h-0.5 w-full max-w-md overflow-hidden bg-white/10">
                    {on && !reduce.current && inView && (
                      <motion.div
                        key={active}
                        className="h-full bg-[var(--brand-primary)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: DWELL / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* right: visual cross-fades to the active beat */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Visual step={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
