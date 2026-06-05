"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper that lazy-loads the Three.js shader (ssr:false keeps `three`
 * out of the initial bundle and off the server). Fills its positioned parent.
 */
const ShaderAnimation = dynamic(
  () => import("@/components/ui/ShaderAnimation").then((m) => m.ShaderAnimation),
  { ssr: false, loading: () => null },
);

export function ShaderBackdrop() {
  return (
    <div className="absolute inset-0 -z-0" aria-hidden>
      <ShaderAnimation className="h-full w-full" />
    </div>
  );
}
