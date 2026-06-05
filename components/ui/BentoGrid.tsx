"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Bento grid (adapted from kokonutd/bento-grid on 21st.dev). Retokenized to
 * Gradia's light palette, dark-mode classes removed, and the title enlarged so
 * it doubles as a clean metric card. Square corners to match the brand system.
 */
export interface BentoItem {
  title: string;
  meta?: string;
  description: string;
  icon: ReactNode;
  status?: string;
  colSpan?: number;
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative overflow-hidden border border-[var(--border)] bg-[var(--bg)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card",
            item.colSpan === 2 ? "sm:col-span-2" : "",
          )}
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center bg-[var(--bg-elevated)] text-[var(--brand-primary)]">
                {item.icon}
              </div>
              {item.status && (
                <span className="bg-[color:var(--dash-success)]/12 px-2 py-1 text-xs font-medium text-[var(--dash-success)]">
                  {item.status}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="flex items-baseline gap-1.5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                {item.title}
                {item.meta && (
                  <span className="text-xs font-normal text-[var(--muted)]">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm leading-snug text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
