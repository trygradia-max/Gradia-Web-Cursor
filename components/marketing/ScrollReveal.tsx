"use client";

import {
  type LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";

/** Max stagger delay + transition duration (globals.css stagger rules). */
const STAGGER_TOTAL_MS = 325 + 700 + 50;

function useInViewRevealOnce<T extends HTMLElement>(
  stagger?: boolean,
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const applyWillChange = () => {
      if (stagger) {
        Array.from(el.children).forEach((child) => {
          (child as HTMLElement).style.willChange = "transform, opacity";
        });
      } else {
        el.style.willChange = "transform, opacity";
      }
    };

    const clearWillChangeAll = () => {
      if (stagger) {
        Array.from(el.children).forEach((child) => {
          (child as HTMLElement).style.willChange = "";
        });
      } else {
        el.style.willChange = "";
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        applyWillChange();
        setVisible(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearWillChangeAll();
    };
  }, [stagger]);

  useEffect(() => {
    if (!visible || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    if (stagger) {
      const id = window.setTimeout(() => {
        Array.from(el.children).forEach((child) => {
          (child as HTMLElement).style.willChange = "";
        });
      }, STAGGER_TOTAL_MS);
      return () => window.clearTimeout(id);
    }

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
      el.style.willChange = "";
      el.removeEventListener("transitionend", onTransitionEnd);
    };
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [visible, stagger]);

  return { ref, visible };
}

export function ScrollReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useInViewRevealOnce<HTMLDivElement>(false);

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        visible && "scroll-reveal--visible",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ScrollRevealStaggerProps = {
  as?: "ul" | "ol";
  className?: string;
  children: React.ReactNode;
  id?: string;
};

export function ScrollRevealStagger({
  as = "ul",
  className,
  children,
  id,
}: ScrollRevealStaggerProps) {
  const { ref, visible } = useInViewRevealOnce<
    HTMLUListElement | HTMLOListElement
  >(true);

  const common = cn(
    "scroll-reveal-stagger",
    visible && "scroll-reveal-stagger--visible",
    className,
  );

  if (as === "ol") {
    return (
      <ol
        ref={ref as LegacyRef<HTMLOListElement>}
        id={id}
        className={common}
      >
        {children}
      </ol>
    );
  }

  return (
    <ul
      ref={ref as LegacyRef<HTMLUListElement>}
      id={id}
      className={common}
    >
      {children}
    </ul>
  );
}
