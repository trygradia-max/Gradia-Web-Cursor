"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const WEEKS = [
  { label: "Week 1", value: 180 },
  { label: "Week 2", value: 260 },
  { label: "Week 3", value: 310 },
  { label: "Week 4", value: 420 },
];

const VIEW_W = 400;
const VIEW_H = 150;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 36;
const CHART_W = VIEW_W - PAD_L - PAD_R;
const CHART_H = VIEW_H - PAD_T - PAD_B;
const V_MIN = 150;
const V_MAX = 450;

function xForWeek(i: number) {
  return PAD_L + (i / (WEEKS.length - 1)) * CHART_W;
}

function yForValue(v: number) {
  const t = (v - V_MIN) / (V_MAX - V_MIN);
  return PAD_T + CHART_H * (1 - t);
}

function buildPathD(): string {
  return WEEKS.map((w, i) => {
    const x = xForWeek(i);
    const y = yForValue(w.value);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

export function AnalyticsDashboardPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [draw, setDraw] = useState(false);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (p) setPathLen(p.getTotalLength());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setDraw(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const d = buildPathD();

  return (
    <div ref={rootRef} className="mt-14 w-full max-w-4xl" aria-hidden>
      <div className="overflow-hidden rounded-[4px] border border-[#222222] bg-[#141414] shadow-[0_32px_90px_-36px_rgba(0,0,0,0.8)]">
        <div className="border-b border-[#222222] px-5 py-4">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            Performance
          </p>
          <p className="mt-1 font-serif text-lg text-white">
            Leads &amp; bookings — last 30 days
          </p>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[1fr_200px] sm:p-6">
          <div>
            <p className="mb-3 font-sans text-xs uppercase tracking-wider text-[#666]">
              Volume trend
            </p>
            <div className="relative rounded-[2px] border border-[#222222] bg-[#0a0a0a] p-2">
              <svg
                className="h-[180px] w-full sm:h-[200px]"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="volFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#1e40af" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <line
                    key={t}
                    x1={PAD_L}
                    x2={VIEW_W - PAD_R}
                    y1={PAD_T + CHART_H * t}
                    y2={PAD_T + CHART_H * t}
                    stroke="#222222"
                    strokeWidth="1"
                  />
                ))}
                {/* Area under curve */}
                <path
                  d={`${d} L ${xForWeek(WEEKS.length - 1).toFixed(1)} ${PAD_T + CHART_H} L ${PAD_L} ${PAD_T + CHART_H} Z`}
                  fill="url(#volFill)"
                  className="transition-opacity duration-700"
                  style={{ opacity: draw ? 1 : 0 }}
                />
                {/* Line */}
                <path
                  ref={pathRef}
                  d={d}
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: pathLen || 1,
                    strokeDashoffset: draw ? 0 : pathLen || 1,
                    transition:
                      "stroke-dashoffset 1.35s cubic-bezier(0.33, 1, 0.68, 1)",
                  }}
                />
                {/* Points */}
                {WEEKS.map((w, i) => {
                  const cx = xForWeek(i);
                  const cy = yForValue(w.value);
                  return (
                    <circle
                      key={w.label}
                      cx={cx}
                      cy={cy}
                      r="5"
                      fill="#0a0a0a"
                      stroke="#1e40af"
                      strokeWidth="2"
                      style={{
                        opacity: draw ? 1 : 0,
                        transition: `opacity 0.35s ease ${0.85 + i * 0.07}s`,
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-2 flex justify-between gap-1 font-mono text-[10px] text-[#666]">
              {WEEKS.map((w) => (
                <span key={w.label}>{w.label}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-[2px] border border-[#222222] bg-[#0f0f0f] p-4">
            <div>
              <p className="font-sans text-[11px] text-[#888]">Leads captured</p>
              <p className="font-serif text-2xl text-white">1,284</p>
            </div>
            <div>
              <p className="font-sans text-[11px] text-[#888]">
                Revenue influenced
              </p>
              <p className="font-serif text-2xl text-[var(--brand-primary)]">
                $482K
              </p>
            </div>
            <div>
              <p className="font-sans text-[11px] text-[#888]">Booking rate</p>
              <p className="font-serif text-2xl text-white">34%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
