"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

/* Pass 4 motion vocabulary — the ONLY motion tokens on the site.
   Rules (REVIEW_NOTES Pass 4 work order, hard): LazyMotion/domAnimation
   only · one shared vocabulary · whileInView once:true, nothing loops ·
   useReducedMotion → final state, zero animation · opacity/transform
   (plus one backgroundColor fill in M4) only, space always reserved. */

export const DUR = 0.5;
export const EASE = [0.22, 1, 0.36, 1] as const;
export const STAGGER = 0.08;

const VIEW = { once: true, amount: 0.2 } as const;

/* Group that staggers its MItem children. mount=true plays on load (M1);
   otherwise plays once on scroll into view. */
export function MGroup({
  children,
  className,
  tag = "div",
  mount = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  tag?: "div" | "ol" | "ul";
  mount?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Comp = tag === "ol" ? m.ol : tag === "ul" ? m.ul : m.div;
  if (reduced) {
    const Plain = tag as keyof React.JSX.IntrinsicElements;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <LazyMotion features={domAnimation}>
      <Comp
        className={className}
        initial="hidden"
        {...(mount ? { animate: "show" } : { whileInView: "show", viewport: VIEW })}
        variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER, delayChildren: delay } } }}
      >
        {children}
      </Comp>
    </LazyMotion>
  );
}

/* Staggered child: fades up (default) or in from a small drift. Must sit
   inside an MGroup (variants propagate through plain elements). */
export function MItem({
  children,
  className,
  tag = "div",
  y = 12,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  tag?: "div" | "li" | "span" | "p";
  y?: number;
  x?: number;
}) {
  const reduced = useReducedMotion();
  const Comp = tag === "li" ? m.li : tag === "span" ? m.span : tag === "p" ? m.p : m.div;
  if (reduced) {
    const Plain = tag as keyof React.JSX.IntrinsicElements;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp
      data-motion-initial=""
      className={className}
      variants={{
        hidden: { opacity: 0, y, x },
        show: { opacity: 1, y: 0, x: 0, transition: { duration: DUR, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}

/* One-shot check pop (M1 hero "Approved by you", M3 approve stage). */
export function MPop({
  children,
  className,
  delay = 0,
  mount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mount?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;
  const target = { scale: [0, 1.3, 1] as number[], opacity: 1 };
  /* Keyframed values need a string ease — a bezier tuple here would be
     read as a per-segment easing ARRAY and stall the animation. */
  const transition = { delay, duration: 0.45, ease: "easeOut" as const, times: [0, 0.6, 1] };
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        data-motion-initial=""
        className={className}
        style={{ display: "inline-flex" }}
        initial={{ scale: 0, opacity: 0 }}
        {...(mount
          ? { animate: target, transition }
          : { whileInView: target, viewport: VIEW, transition })}
      >
        {children}
      </m.span>
    </LazyMotion>
  );
}

/* M4 only: the Send it pill "fills" to the accent after a beat. The one
   sanctioned non-transform animation (backgroundColor); layout reserved. */
export function MFill({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <span className={`${className} bg-[var(--sv-accent)] text-white`}>{children}</span>;
  }
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        className={`${className} text-white`}
        initial={{ backgroundColor: "rgba(255,255,255,0.10)" }}
        whileInView={{ backgroundColor: "#6d28d9" }}
        viewport={VIEW}
        transition={{ delay, duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </m.span>
    </LazyMotion>
  );
}

/* M4: element that slides in after a delay, once in view. */
export function MSlideIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <p className={className}>{children}</p>;
  return (
    <LazyMotion features={domAnimation}>
      <m.p
        data-motion-initial=""
        className={className}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEW}
        transition={{ delay, duration: DUR, ease: EASE }}
      >
        {children}
      </m.p>
    </LazyMotion>
  );
}
