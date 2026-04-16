"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function useInViewRevealOnce<T extends HTMLElement>() {
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
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export function ScrollReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useInViewRevealOnce<HTMLDivElement>();

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
  const { ref, visible } =
    useInViewRevealOnce<HTMLUListElement | HTMLOListElement>();

  const common = cn(
    "scroll-reveal-stagger",
    visible && "scroll-reveal-stagger--visible",
    className,
  );

  if (as === "ol") {
    return (
      <ol
        ref={ref as React.LegacyRef<HTMLOListElement>}
        id={id}
        className={common}
      >
        {children}
      </ol>
    );
  }

  return (
    <ul
      ref={ref as React.LegacyRef<HTMLUListElement>}
      id={id}
      className={common}
    >
      {children}
    </ul>
  );
}
