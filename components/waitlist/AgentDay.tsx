"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { AGENTS } from "@/components/waitlist/agents";

export function AgentDay() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
            On the job
          </span>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            Two agents, one brain — your whole day.
          </h2>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            From the first missed call to tonight&rsquo;s follow-ups — every
            step staged for your approval while you detail.
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-[100px] border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--bg-elevated)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-[100px] border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--bg-elevated)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-hscroll
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {AGENTS.map((a) => (
          <article
            key={a.step}
            data-card
            className="flex w-[280px] shrink-0 snap-start flex-col border border-[var(--border)] bg-[var(--bg)] p-5 sm:w-[320px]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center bg-[var(--bg-elevated)] text-[var(--brand-primary)]">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs tracking-[0.15em] text-[var(--muted)]">
                {a.step}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {a.verb}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
              {a.name}
            </p>
            <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{a.demo}</p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-1.5 self-start rounded-[100px] border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground)] transition-colors hover:bg-[var(--bg-elevated)]"
            >
              <Play className="h-3 w-3 fill-current" /> Play demo
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
