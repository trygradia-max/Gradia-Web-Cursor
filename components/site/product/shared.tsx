import type { ReactNode } from "react";

/* Shared product-page UI chrome — light surface screens and graphite
   frames, matching homepage fidelity (P4-D inside frames, --sv-* outside). */

export function LightScreen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
          {label}
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">Sample data</p>
      </div>
      {children}
    </div>
  );
}

export function GraphiteFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
      <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
      </div>
      {children}
    </div>
  );
}

export function PanelRow({ title, meta, last = false }: { title: string; meta: string; last?: boolean }) {
  return (
    <div className={`px-4 py-3.5 sm:px-5 ${last ? "" : "border-b border-[var(--sv-line)]"}`}>
      <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">{title}</p>
      <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{meta}</p>
    </div>
  );
}
