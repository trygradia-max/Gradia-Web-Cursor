"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Pencil, Eye, ShieldCheck } from "lucide-react";
import { GradiaChatBox } from "@/components/ui/GradiaChatBox";
import { BentoGrid, type BentoItem } from "@/components/ui/BentoGrid";
import { cn } from "@/lib/cn";

const QUESTION = "Text everyone who quoted ceramic but never booked";

const METRICS: BentoItem[] = [
  {
    icon: <Users className="h-4 w-4" />,
    title: "23",
    meta: "leads",
    description: "matched in your CRM",
  },
  {
    icon: <Pencil className="h-4 w-4" />,
    title: "Draft",
    description: "text + email written",
    status: "ready",
  },
  {
    icon: <Eye className="h-4 w-4" />,
    title: "Dry-run",
    description: "preview before it sends",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Your OK",
    description: "approve to send",
    status: "staged",
  },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function WhisperDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "thinking" | "answer">("typing");
  const running = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i <= QUESTION.length; i++) {
          if (cancelled) return;
          setChars(i);
          setPhase("typing");
          await sleep(26);
        }
        await sleep(450);
        if (cancelled) return;
        setPhase("thinking");
        await sleep(950);
        if (cancelled) return;
        setPhase("answer");
        await sleep(4200);
        if (cancelled) return;
        setChars(0);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !running.current) {
          running.current = true;
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  const showAnswer = phase === "answer";

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <GradiaChatBox
        voice
        text={QUESTION.slice(0, chars)}
        state={phase === "typing" ? "typing" : phase === "thinking" ? "sending" : "idle"}
        placeholder="Tell Gradia what to do…"
      />

      {/* answer — reserved height so the section never jumps */}
      <div className="mt-6 min-h-[15rem]">
        <p
          className={cn(
            "text-center text-lg font-medium tracking-tight text-[var(--foreground)] transition-opacity duration-500 sm:text-xl",
            showAnswer ? "opacity-100" : "opacity-0",
          )}
        >
          Gradia turned that into a job:{" "}
          <span className="text-[var(--brand-primary)]">23 ceramic leads</span>{" "}
          matched, a text + email drafted, and a dry-run preview — all{" "}
          <span className="text-[var(--brand-primary)]">staged for your OK</span>.
        </p>
        <div
          className={cn(
            "mt-6 transition-all duration-500",
            showAnswer ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <BentoGrid items={METRICS} />
        </div>
      </div>
    </div>
  );
}
