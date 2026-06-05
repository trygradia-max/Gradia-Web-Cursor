"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Material Design 3 switch (adapted from easemize/material-design-3-switch on
 * 21st.dev). Changes: dropped class-variance-authority, retokenized to Gradia's
 * palette, and uses the `.u-pill` round override (the brand theme zeroes every
 * radius). Keeps the M3 spring handle, expanding halo, swappable icons, and the
 * optional Web-Audio "haptic" click — which makes the flip feel satisfying.
 */
const SPRING = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";

function playHaptic(type: "heavy" | "light" | "none") {
  if (type === "none" || typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {
    /* audio not available — ignore */
  }
}

export interface MaterialSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  haptic?: "heavy" | "light" | "none";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function MaterialSwitch({
  checked,
  defaultChecked,
  onCheckedChange,
  checkedIcon,
  uncheckedIcon,
  haptic = "light",
  disabled,
  className,
  "aria-label": ariaLabel,
}: MaterialSwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const isChecked = checked ?? internal;

  const toggle = () => {
    if (disabled) return;
    playHaptic(haptic);
    const next = !isChecked;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerEnter={() => !disabled && setHovered(true)}
      onPointerLeave={() => {
        setPressed(false);
        setHovered(false);
      }}
      style={{ ["--ease-spring" as string]: SPRING }}
      className={cn(
        "u-pill group relative inline-flex h-8 w-[52px] shrink-0 items-center border-2 transition-colors duration-300",
        isChecked
          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]"
          : "border-[var(--border)] bg-[var(--bg-elevated)]",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {/* handle container — slides on the M3 spring */}
      <div
        className={cn(
          "pointer-events-none block h-full w-full transition-transform duration-300 ease-[var(--ease-spring)]",
          isChecked ? "translate-x-[20px]" : "translate-x-0",
        )}
      >
        {/* expanding halo */}
        <div
          className={cn(
            "u-pill pointer-events-none absolute top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
            isChecked ? "left-[14px] bg-[var(--brand-primary)]" : "left-[10px] bg-[var(--foreground)]",
            pressed ? "scale-100 opacity-15" : hovered ? "scale-100 opacity-[0.07]" : "scale-50 opacity-0",
          )}
        />
        {/* handle */}
        <div
          className={cn(
            "u-pill absolute left-[2px] top-1/2 flex -translate-y-1/2 items-center justify-center shadow-sm transition-all duration-300",
            isChecked ? "bg-white text-[var(--brand-primary)]" : "bg-[var(--foreground)] text-[var(--bg-elevated)]",
            pressed ? "h-7 w-7 -ml-[2px]" : isChecked ? "h-6 w-6" : "h-4 w-4 ml-[2px]",
          )}
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                isChecked ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-50 opacity-0",
              )}
            >
              {checkedIcon}
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center text-[var(--muted)] transition-all duration-300",
                !isChecked ? "rotate-0 scale-100 opacity-100" : "rotate-45 scale-50 opacity-0",
              )}
            >
              {uncheckedIcon}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default MaterialSwitch;
