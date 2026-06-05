"use client";

import dynamic from "next/dynamic";

const DottedSurface = dynamic(
  () => import("@/components/ui/DottedSurface").then((m) => m.DottedSurface),
  { ssr: false, loading: () => null },
);

export function DottedBackdrop() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden" aria-hidden>
      <DottedSurface className="absolute inset-0 h-full w-full" />
    </div>
  );
}
