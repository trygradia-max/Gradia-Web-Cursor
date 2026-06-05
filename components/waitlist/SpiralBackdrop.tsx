"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper that lazy-loads the GSAP/canvas spiral (ssr:false keeps `gsap`
 * out of the initial bundle and avoids the original's window-at-init crash).
 */
const SpiralAnimation = dynamic(
  () => import("@/components/ui/SpiralAnimation").then((m) => m.SpiralAnimation),
  { ssr: false, loading: () => null },
);

export function SpiralBackdrop({ scale = 1 }: { scale?: number }) {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 origin-center"
        style={{ transform: `scale(${scale})` }}
      >
        <SpiralAnimation className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
