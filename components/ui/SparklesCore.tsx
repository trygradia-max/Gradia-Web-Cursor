"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/cn";

/**
 * Particle sparkles (adapted from aceternity/sparkles on 21st.dev). Rewritten
 * for @tsparticles/react v4, capped at 60fps, and paused whenever it scrolls
 * off-screen or the tab is hidden so it never competes for the GPU.
 */
type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 120,
}: SparklesProps) {
  const generatedId = useId();
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<Container | null>(null);
  const onScreen = useRef(false);

  // Pause/resume the engine based on visibility — saves the GPU when the CTA
  // is far below the fold.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => {
      const c = containerRef.current;
      if (!c) return;
      if (onScreen.current && !document.hidden) c.play();
      else c.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen.current = e.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("h-full w-full", className)}>
      <ParticlesProvider
        init={async (engine: Engine) => {
          await loadSlim(engine);
        }}
      >
        <Particles
          id={id || generatedId}
          className={cn(
            "h-full w-full transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          particlesLoaded={async (container?: Container) => {
            if (container) {
              containerRef.current = container;
              setReady(true);
              if (!onScreen.current) container.pause();
            }
          }}
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: false },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
              color: { value: particleColor },
              number: {
                value: particleDensity,
                density: { enable: true, width: 400, height: 400 },
              },
              shape: { type: "circle" },
              size: { value: { min: minSize, max: maxSize } },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed,
                  sync: false,
                  startValue: "random",
                },
              },
              move: {
                enable: true,
                direction: "none",
                straight: false,
                speed: { min: 0.1, max: 1 },
                outModes: { default: "out" },
              },
            },
          }}
        />
      </ParticlesProvider>
    </div>
  );
}

export default SparklesCore;
