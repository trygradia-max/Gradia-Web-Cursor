"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Accessible "play demo" lightbox. Renders one of the existing product demos
 * (CaptureDemo / CrmAgentDemo / WhisperDemo / ModeToggle) on top of the page.
 *
 * The demo `children` are only mounted while `open` is true, so each open plays
 * the animation fresh from the start and closing resets it (the demos auto-play
 * on mount via their own interval / IntersectionObserver).
 *
 * A11y: role="dialog" + aria-modal, Esc to close, click-backdrop to close,
 * body scroll lock, focus moves to the close button on open and returns to the
 * trigger on close, and Tab is trapped inside the panel.
 */
export function DemoModal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Portals need the DOM — only render after mount to stay SSR-safe.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusT = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusT);
      // Return focus to whatever opened the modal.
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
      };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close demo"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            {...panelMotion}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg)] shadow-card"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-6">
              <div>
                <h3
                  id="demo-modal-title"
                  className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
                >
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{subtitle}</p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close demo"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[100px] border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* demo body */}
            <div className="overflow-y-auto p-5 sm:p-6">{children}</div>

            {/* footer micro-label — keeps the "live demo" framing */}
            <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-3 sm:px-6">
              <span className="wl-dot-pulse h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                gradia · live demo
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
