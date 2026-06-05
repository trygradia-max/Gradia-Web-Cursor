"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper that lazy-loads tsparticles (ssr:false keeps the engine out of
 * the initial bundle and off the server).
 */
const SparklesCore = dynamic(
  () => import("@/components/ui/SparklesCore").then((m) => m.SparklesCore),
  { ssr: false, loading: () => null },
);

export function SparklesBackdrop({
  particleColor = "#ffffff",
  particleDensity = 900,
}: {
  particleColor?: string;
  particleDensity?: number;
}) {
  return (
    <div className="absolute inset-0 -z-0" aria-hidden>
      <SparklesCore
        background="transparent"
        minSize={0.6}
        maxSize={1.6}
        speed={1.4}
        particleColor={particleColor}
        particleDensity={particleDensity}
        className="h-full w-full"
      />
    </div>
  );
}
