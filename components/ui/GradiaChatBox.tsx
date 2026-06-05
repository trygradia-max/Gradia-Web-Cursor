"use client";

import { ArrowUp, Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Clean chat input (adapted from kokonutd/v0-ai-chat on 21st.dev) — retokenized
 * to Gradia's light, minimal palette. Presentational: the parent drives `text`
 * and `state` to animate a question being typed, sent, and answered.
 */
export function GradiaChatBox({
  text,
  placeholder = "Ask Gradia anything…",
  state = "idle",
  voice = false,
  className,
}: {
  text: string;
  placeholder?: string;
  state?: "idle" | "typing" | "sending";
  voice?: boolean;
  className?: string;
}) {
  const sending = state === "sending";
  return (
    <div
      className={cn(
        "w-full border border-[var(--border)] bg-[var(--bg)] shadow-card",
        className,
      )}
    >
      <div className="min-h-[52px] px-4 py-3.5 text-[15px] leading-relaxed text-[var(--foreground)]">
        {text ? (
          <span>
            {text}
            {state === "typing" && (
              <span className="ml-0.5 animate-typing-cursor text-[var(--brand-primary)]">
                |
              </span>
            )}
          </span>
        ) : (
          <span className="text-[var(--muted)]">{placeholder}</span>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-3 py-2.5">
        <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          {voice ? (
            <>
              <Mic className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
              {state === "sending" ? "Thinking…" : "Listening"}
            </>
          ) : (
            "Gradia"
          )}
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center bg-[var(--brand-primary)] text-white">
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </span>
      </div>
    </div>
  );
}
