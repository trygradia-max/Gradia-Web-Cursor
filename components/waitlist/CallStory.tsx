"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
 * "See Gradia handle a call, start to finish" — a scroll-driven sticky reveal
 * (pattern from aceternity/sticky-scroll-reveal, rebuilt page-scroll for smooth
 * mobile). The four beats scroll on the left; the visual on the right sticks and
 * cross-fades to match. On mobile each beat carries its own visual inline.
 */
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
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = refs.current.indexOf(visible.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* left: scrolling beats */}
      <div>
        {BEATS.map((b, i) => (
          <div
            key={b.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex min-h-[60vh] flex-col justify-center py-8 lg:min-h-[80vh]"
          >
            <div
              className={cn(
                "transition-opacity duration-500",
                i === active ? "opacity-100" : "lg:opacity-35",
              )}
            >
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                {b.eyebrow}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                {b.title}
              </h3>
              <p className="mt-3 max-w-md text-[var(--muted)]">{b.desc}</p>
            </div>
            {/* mobile: visual inline under each beat */}
            <div className="mt-6 lg:hidden">
              <Visual step={i} />
            </div>
          </div>
        ))}
      </div>

      {/* right: sticky visual that cross-fades (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28 flex h-[60vh] items-center">
          <div className="relative w-full max-w-md">
            {/* progress rail */}
            <div className="absolute -left-8 top-0 flex h-full flex-col items-center justify-center gap-2">
              {BEATS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-0.5 rounded-full transition-all duration-500",
                    i === active
                      ? "h-8 bg-[var(--brand-primary)]"
                      : "h-3 bg-white/15",
                  )}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Visual step={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
