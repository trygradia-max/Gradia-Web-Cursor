"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type Point = {
  week: string;
  leads: number;
  bookings: number;
};

const DATA: Point[] = [
  { week: "Week 1", leads: 210, bookings: 68 },
  { week: "Week 2", leads: 287, bookings: 94 },
  { week: "Week 3", leads: 389, bookings: 128 },
  { week: "Week 4", leads: 398, bookings: 142 },
];

const VIEW_W = 800;
const VIEW_H = 300;
const PAD_LEFT = 56;
const PAD_RIGHT = 24;
const PAD_TOP = 24;
const PAD_BOTTOM = 40;

const PLOT_W = VIEW_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = VIEW_H - PAD_TOP - PAD_BOTTOM;

const Y_MAX = 450;
const Y_TICKS = [0, 100, 200, 300, 400];

function xPos(i: number): number {
  if (DATA.length <= 1) return PAD_LEFT;
  return PAD_LEFT + (PLOT_W / (DATA.length - 1)) * i;
}

function yPos(value: number): number {
  return PAD_TOP + PLOT_H - (value / Y_MAX) * PLOT_H;
}

function makePath(values: number[]): string {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(v)}`)
    .join(" ");
}

type HoverState = {
  i: number;
  series: "leads" | "bookings";
} | null;

export function TheProofTrendChart() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [hovered, setHovered] = useState<HoverState>(null);
  const clipId = useId();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setDrawn(true);
      return;
    }

    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const leadsPath = useMemo(
    () => makePath(DATA.map((d) => d.leads)),
    [],
  );
  const bookingsPath = useMemo(
    () => makePath(DATA.map((d) => d.bookings)),
    [],
  );

  const tooltip = useMemo(() => {
    if (!hovered) return null;
    const point = DATA[hovered.i];
    const value =
      hovered.series === "leads" ? point.leads : point.bookings;
    const cx = xPos(hovered.i);
    const cy = yPos(value);
    const label =
      hovered.series === "leads" ? "leads" : "appts";
    const showAbove = cy > 60;
    const ty = showAbove ? cy - 16 : cy + 16;
    const rectY = showAbove ? ty - 32 : ty;
    const textY = showAbove ? ty - 12 : ty + 20;
    const text = `${point.week} — ${value} ${label}`;
    const width = 150;
    const x = Math.max(
      PAD_LEFT,
      Math.min(VIEW_W - PAD_RIGHT - width, cx - width / 2),
    );
    return {
      x,
      rectY,
      width,
      text,
      textX: x + width / 2,
      textY,
    };
  }, [hovered]);

  return (
    <div
      ref={wrapperRef}
      className="w-full bg-white border border-[#E5E7EB] p-6 sm:p-8"
    >
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block w-full min-w-[560px]"
          role="img"
          aria-label="Weekly leads captured and appointments booked over four weeks"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id={clipId}>
              <rect
                x={0}
                y={0}
                width={drawn ? VIEW_W : 0}
                height={VIEW_H}
                style={{
                  transition:
                    "width 1500ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </clipPath>
          </defs>

          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={VIEW_W - PAD_RIGHT}
                y1={yPos(tick)}
                y2={yPos(tick)}
                stroke="#F1F2F4"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 12}
                y={yPos(tick) + 4}
                fill="#6B7280"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={12}
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          ))}

          {DATA.map((d, i) => (
            <text
              key={d.week}
              x={xPos(i)}
              y={VIEW_H - 14}
              fill="#6B7280"
              fontFamily="var(--font-inter), sans-serif"
              fontSize={12}
              textAnchor="middle"
            >
              {d.week}
            </text>
          ))}

          <g clipPath={`url(#${clipId})`}>
            <path
              d={leadsPath}
              stroke="#3B6EF5"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={bookingsPath}
              stroke="#0A0A0A"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {DATA.map((d, i) => (
              <circle
                key={`leads-dot-${d.week}`}
                cx={xPos(i)}
                cy={yPos(d.leads)}
                r={5}
                fill="#3B6EF5"
              />
            ))}
            {DATA.map((d, i) => (
              <circle
                key={`book-dot-${d.week}`}
                cx={xPos(i)}
                cy={yPos(d.bookings)}
                r={5}
                fill="#0A0A0A"
              />
            ))}
          </g>

          {DATA.map((d, i) => (
            <g key={`leads-hit-${d.week}`}>
              <circle
                cx={xPos(i)}
                cy={yPos(d.leads)}
                r={16}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() =>
                  setHovered({ i, series: "leads" })
                }
                onMouseLeave={() => setHovered(null)}
                onFocus={() =>
                  setHovered({ i, series: "leads" })
                }
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${d.week}: ${d.leads} leads captured`}
              />
            </g>
          ))}
          {DATA.map((d, i) => (
            <g key={`book-hit-${d.week}`}>
              <circle
                cx={xPos(i)}
                cy={yPos(d.bookings)}
                r={16}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() =>
                  setHovered({ i, series: "bookings" })
                }
                onMouseLeave={() => setHovered(null)}
                onFocus={() =>
                  setHovered({ i, series: "bookings" })
                }
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${d.week}: ${d.bookings} appointments booked`}
              />
            </g>
          ))}

          {tooltip && (
            <g style={{ pointerEvents: "none" }}>
              <rect
                x={tooltip.x}
                y={tooltip.rectY}
                width={tooltip.width}
                height={28}
                fill="#0A0A0A"
              />
              <text
                x={tooltip.textX}
                y={tooltip.textY}
                fill="#FFFFFF"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={12}
                textAnchor="middle"
              >
                {tooltip.text}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2 font-sans text-[13px] text-[#6B7280]">
          <span
            className="inline-block h-[10px] w-[10px] rounded-full bg-[#3B6EF5]"
            aria-hidden="true"
          />
          Leads captured
        </div>
        <div className="flex items-center gap-2 font-sans text-[13px] text-[#6B7280]">
          <svg
            width="22"
            height="4"
            viewBox="0 0 22 4"
            aria-hidden="true"
            className="shrink-0"
          >
            <line
              x1={0}
              y1={2}
              x2={22}
              y2={2}
              stroke="#0A0A0A"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          </svg>
          Appointments booked
        </div>
      </div>
    </div>
  );
}
