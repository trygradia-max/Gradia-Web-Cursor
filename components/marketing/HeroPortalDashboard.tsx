"use client";

import { useEffect, useRef, useState } from "react";

const recentRows = [
  { time: "9:14 AM", caller: "Sarah M.", outcome: "Booked", dur: "4:12" },
  { time: "9:11 AM", caller: "James T.", outcome: "Intake", dur: "2:40" },
  { time: "9:08 AM", caller: "(555) 201-8841", outcome: "Triage", dur: "3:05" },
  { time: "9:02 AM", caller: "Elena R.", outcome: "Booked", dur: "5:18" },
  { time: "8:55 AM", caller: "Mike P.", outcome: "Follow-up", dur: "1:52" },
];

export function HeroPortalDashboard() {
  const [callTotal, setCallTotal] = useState(1247);
  const [scroll, setScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCallTotal((n) => n + (Math.random() > 0.65 ? 1 : 0));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.95;
      const end = vh * 0.15;
      const y = rect.top + rect.height * 0.35;
      let p = 0;
      if (y <= end) p = 1;
      else if (y >= start) p = 0;
      else p = (start - y) / (start - end);
      setScroll(Math.min(1, Math.max(0, p)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const ty = (1 - scroll) * 72;
  const rx = (1 - scroll) * 10;
  const op = 0.25 + scroll * 0.75;

  return (
    <div
      ref={containerRef}
      className="mt-14 w-full max-w-5xl lg:mt-20"
      style={{ perspective: "1400px" }}
    >
      <div
        className="origin-bottom will-change-transform"
        style={{
          transform: `translateY(${ty}px) rotateX(${rx}deg)`,
          opacity: op,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="overflow-hidden rounded-[4px] border border-[#222222] bg-[#141414] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b border-[#222222] px-4 py-3 sm:px-5">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                Client portal
              </p>
              <p className="mt-1 font-serif text-lg text-white">Today</p>
            </div>
            <div className="rounded-full border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 font-sans text-xs text-[#b0b0b0]">
              Live
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
            <div className="rounded-[2px] border border-[#222222] bg-[#0f0f0f] p-4">
              <p className="font-sans text-[11px] uppercase tracking-wider text-[#888]">
                Calls handled
              </p>
              <p className="mt-2 font-serif text-3xl tabular-nums tracking-tight text-white">
                {callTotal.toLocaleString()}
              </p>
              <p className="mt-1 font-sans text-xs text-[var(--brand-primary)]">
                +12 vs yesterday
              </p>
            </div>
            <div className="rounded-[2px] border border-[#222222] bg-[#0f0f0f] p-4">
              <p className="font-sans text-[11px] uppercase tracking-wider text-[#888]">
                Appointments
              </p>
              <p className="mt-2 font-serif text-3xl tabular-nums tracking-tight text-white">
                23
              </p>
              <p className="mt-1 font-sans text-xs text-[#b0b0b0]">
                Booked today
              </p>
            </div>
            <div className="rounded-[2px] border border-[#222222] bg-[#0f0f0f] p-4">
              <p className="font-sans text-[11px] uppercase tracking-wider text-[#888]">
                Avg. answer
              </p>
              <p className="mt-2 font-serif text-3xl tabular-nums tracking-tight text-white">
                1.8s
              </p>
              <p className="mt-1 font-sans text-xs text-[#b0b0b0]">
                Rolling 24h
              </p>
            </div>
          </div>

          <div className="border-t border-[#222222] px-4 pb-5 pt-2 sm:px-5">
            <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888]">
              Recent calls
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#222222] text-[11px] uppercase tracking-wider text-[#666]">
                    <th className="pb-2 pr-3 font-medium">Time</th>
                    <th className="pb-2 pr-3 font-medium">Caller</th>
                    <th className="pb-2 pr-3 font-medium">Outcome</th>
                    <th className="pb-2 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[#b0b0b0]">
                  {recentRows.map((row) => (
                    <tr
                      key={`${row.time}-${row.caller}`}
                      className="border-b border-[#1a1a1a] last:border-0"
                    >
                      <td className="py-2.5 pr-3 font-mono text-xs text-white/90">
                        {row.time}
                      </td>
                      <td className="py-2.5 pr-3">{row.caller}</td>
                      <td className="py-2.5 pr-3">
                        <span className="rounded-[2px] bg-[var(--brand-primary)]/15 px-2 py-0.5 text-xs text-[var(--brand-primary)]">
                          {row.outcome}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-xs">{row.dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-[#666]">
          Simplified preview — your live dashboard updates in real time.
        </p>
      </div>
    </div>
  );
}
