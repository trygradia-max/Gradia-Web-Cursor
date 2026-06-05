"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "loading" | "fading" | "done";

const SESSION_KEY = "gradia-intro-shown";

const HOLD_MS = 800;
const FADE_MS = 400;

export function LoadingScreen() {
  // Start as null to avoid SSR/hydration mismatch — the server never renders
  // this, and the client decides on the first effect whether to show it.
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem(SESSION_KEY)) {
      // Already shown this session — skip entirely.
      return;
    }

    setPhase("loading");

    const fadeTimer = setTimeout(() => setPhase("fading"), HOLD_MS);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === null || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation:
          phase === "fading"
            ? `gradia-screen-fade-out ${FADE_MS}ms ease-in-out forwards`
            : undefined,
      }}
    >
      <div
        style={{
          animation: "gradia-logo-pulse 1.4s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={150}
          height={150}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
