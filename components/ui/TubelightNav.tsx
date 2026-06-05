"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Tubelight navbar (adapted from ayushmxxn/tubelight-navbar on 21st.dev).
 * Changes: retokenized to Gradia's palette, rendered inline (the original was
 * viewport-fixed), labels on desktop / icons on small screens, and the active
 * "lamp" now follows the section in view via a scroll-spy IntersectionObserver.
 */
export interface TubelightItem {
  name: string;
  url: string; // in-page hash, e.g. "#why"
  icon: LucideIcon;
}

export function TubelightNav({
  items,
  className,
}: {
  items: TubelightItem[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.name ?? "");
  const [mounted, setMounted] = useState(false);

  // The animated lamp (framer-motion layoutId) only renders after mount so its
  // transform styles never differ between SSR and the first client paint.
  useEffect(() => setMounted(true), []);

  // Scroll-spy: light up whichever section is centered in the viewport.
  useEffect(() => {
    const byId = new Map(items.map((i) => [i.url.replace("#", ""), i.name]));
    const sections = [...byId.keys()]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const name = visible[0] && byId.get(visible[0].target.id);
        if (name) setActive(name);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg)]/70 px-1 py-1 backdrop-blur-md",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.name;
        return (
          <a
            key={item.name}
            href={item.url}
            onClick={() => setActive(item.name)}
            className={cn(
              "relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors lg:px-4",
              isActive
                ? "text-[var(--brand-primary)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            <span className="hidden lg:inline">{item.name}</span>
            <span className="lg:hidden">
              <Icon size={16} strokeWidth={2.4} />
            </span>
            {isActive && mounted && (
              <motion.div
                layoutId="tubelight"
                className="absolute inset-0 -z-10 rounded-full bg-[color:var(--brand-primary)]/10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute -top-[7px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[var(--brand-primary)]">
                  <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-[color:var(--brand-primary)]/25 blur-md" />
                  <div className="absolute -top-1 h-6 w-8 rounded-full bg-[color:var(--brand-primary)]/20 blur-md" />
                  <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-[color:var(--brand-primary)]/20 blur-sm" />
                </div>
              </motion.div>
            )}
          </a>
        );
      })}
    </div>
  );
}
