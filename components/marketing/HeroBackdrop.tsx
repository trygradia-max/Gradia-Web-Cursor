"use client";

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-base-wash absolute inset-0" />
      <div className="hero-noise absolute inset-0" />
      <div className="hero-gradient-layer absolute inset-0" />
      <div className="hero-animated-line absolute bottom-0 left-0 right-0 h-px" />
    </div>
  );
}
