"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const DAILY_VOLUME: number[] = [
  32, 38, 41, 36, 44, 49, 45, 52, 58, 51, 60, 64, 57, 68, 72, 66, 74, 78, 71,
  82, 86, 79, 90, 94, 87, 98, 102, 95, 108, 112,
];

const DAYS = DAILY_VOLUME.length;

const VIEW_W = 800;
const VIEW_H = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

const PLOT_W = VIEW_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = VIEW_H - PAD_TOP - PAD_BOTTOM;

const Y_MAX = 120;
const Y_TICKS = [0, 40, 80, 120];

function xPos(i: number): number {
  if (DAYS <= 1) return PAD_LEFT;
  return PAD_LEFT + (PLOT_W / (DAYS - 1)) * i;
}

function yPos(value: number): number {
  return PAD_TOP + PLOT_H - (value / Y_MAX) * PLOT_H;
}

function dayLabel(i: number): string {
  const offset = DAYS - 1 - i;
  if (offset === 0) return "Today";
  return `${offset}d ago`;
}

export function PerformanceChart() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      { threshold: 0.25 },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const linePath = useMemo(
    () =>
      DAILY_VOLUME.map(
        (v, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(v)}`,
      ).join(" "),
    [],
  );

  const indexFromEvent = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>): number | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return null;
      const ratio = (e.clientX - rect.left) / rect.width;
      const xInView = ratio * VIEW_W;
      if (xInView < PAD_LEFT || xInView > VIEW_W - PAD_RIGHT) {
        return null;
      }
      const step = PLOT_W / (DAYS - 1);
      const idx = Math.round((xInView - PAD_LEFT) / step);
      return Math.max(0, Math.min(DAYS - 1, idx));
    },
    [],
  );

  const tooltip = useMemo(() => {
    if (hoverIndex == null) return null;
    const value = DAILY_VOLUME[hoverIndex];
    const cx = xPos(hoverIndex);
    const cy = yPos(value);
    const width = 130;
    const height = 36;
    const x = Math.max(
      PAD_LEFT,
      Math.min(VIEW_W - PAD_RIGHT - width, cx - width / 2),
    );
    const showAbove = cy > 60;
    const y = showAbove ? cy - height - 12 : cy + 12;
    return {
      x,
      y,
      width,
      height,
      cx,
      cy,
      label: dayLabel(hoverIndex),
      value,
    };
  }, [hoverIndex]);

  return (
    <div ref={wrapperRef} className="w-full">
      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block w-full min-w-[480px]"
          role="img"
          aria-label="Daily call volume over the last 30 days"
          preserveAspectRatio="xMidYMid meet"
          onPointerMove={(e) => setHoverIndex(indexFromEvent(e))}
          onPointerLeave={() => setHoverIndex(null)}
        >
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={VIEW_W - PAD_RIGHT}
                y1={yPos(tick)}
                y2={yPos(tick)}
                stroke="#1F1F1F"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 10}
                y={yPos(tick) + 4}
                fill="#8A8A8A"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={11}
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          ))}

          {[0, Math.floor(DAYS / 2), DAYS - 1].map((i) => (
            <text
              key={`x-${i}`}
              x={xPos(i)}
              y={VIEW_H - 10}
              fill="#8A8A8A"
              fontFamily="var(--font-inter), sans-serif"
              fontSize={11}
              textAnchor={
                i === 0 ? "start" : i === DAYS - 1 ? "end" : "middle"
              }
            >
              {i === DAYS - 1
                ? "Today"
                : i === 0
                  ? "30d ago"
                  : "15d ago"}
            </text>
          ))}

          <g
            style={{
              clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 1500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <path
              d={linePath}
              stroke="#3B6EF5"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {DAILY_VOLUME.map((v, i) => (
              <circle
                key={`dot-${i}`}
                cx={xPos(i)}
                cy={yPos(v)}
                r={4}
                fill="#3B6EF5"
              />
            ))}
          </g>

          {hoverIndex != null && tooltip && (
            <g style={{ pointerEvents: "none" }}>
              <line
                x1={tooltip.cx}
                x2={tooltip.cx}
                y1={PAD_TOP}
                y2={VIEW_H - PAD_BOTTOM}
                stroke="#2A2A2A"
                strokeWidth={1}
              />
              <circle
                cx={tooltip.cx}
                cy={tooltip.cy}
                r={5}
                fill="#3B6EF5"
                stroke="#0A0A0A"
                strokeWidth={2}
              />
              <rect
                x={tooltip.x}
                y={tooltip.y}
                width={tooltip.width}
                height={tooltip.height}
                fill="#1A1A1A"
                stroke="#2A2A2A"
                strokeWidth={1}
              />
              <text
                x={tooltip.x + 12}
                y={tooltip.y + 14}
                fill="#8A8A8A"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={10}
                letterSpacing="0.08em"
              >
                {tooltip.label.toUpperCase()}
              </text>
              <text
                x={tooltip.x + 12}
                y={tooltip.y + 30}
                fill="#FFFFFF"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={13}
                fontWeight={600}
              >
                {tooltip.value} calls
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
