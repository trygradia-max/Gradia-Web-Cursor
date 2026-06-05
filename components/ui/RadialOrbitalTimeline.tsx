"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link2, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Radial orbital visualization (adapted from jatin-yadav05/radial-orbital-timeline
 * on 21st.dev). Changes: removed the shadcn Badge/Button/Card dependencies
 * (inlined with Gradia tokens), recolored the core + connections to brand blue,
 * sized to fit a section rather than the full viewport, and added a labelled
 * center core ("Gradia AI" by default).
 */
export interface OrbitItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerLabel = "Gradia AI",
}: {
  timelineData: OrbitItem[];
  centerLabel?: string;
}) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] =>
    timelineData.find((i) => i.id === itemId)?.relatedIds ?? [];

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const total = timelineData.length;
    const targetAngle = (nodeIndex / total) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const pulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((relId) => (pulse[relId] = true));
        setPulseEffect(pulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  // Only spin while the orbit is on-screen — otherwise it re-renders 20×/sec
  // in the background for nothing.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!autoRotate || !inView) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate, inView]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean =>
    activeNodeId ? getRelatedItems(activeNodeId).includes(itemId) : false;

  return (
    <div
      className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden sm:h-[36rem]"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* center core */}
          <div className="absolute z-10 flex h-20 w-20 items-center justify-center orbit-round bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#6d28d9] shadow-[0_0_40px_rgba(124,58,237,0.6)]">
            <div className="absolute h-24 w-24 animate-ping orbit-round border border-[#7c3aed]/40 opacity-70" />
            <div
              className="absolute h-28 w-28 animate-ping orbit-round border border-[#7c3aed]/20 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <span className="z-10 px-1 text-center text-[11px] font-semibold leading-tight text-white">
              {centerLabel}
            </span>
          </div>

          {/* orbit ring */}
          <div className="absolute h-[25rem] w-[25rem] orbit-round border border-white/10" />

          {/* Nodes render client-only: their float-precision transforms would
              otherwise serialize differently on the server and mismatch on
              hydration. The static core + ring above are enough for SSR. */}
          {mounted && timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={cn(
                    "absolute -inset-1 orbit-round",
                    isPulsing && "animate-pulse",
                  )}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top: `-${(item.energy * 0.5) / 2}px`,
                  }}
                />

                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center orbit-round border-2 transition-all duration-300",
                    isExpanded
                      ? "scale-125 border-white bg-white text-[#0a0810] shadow-lg shadow-[#7c3aed]/40"
                      : isRelated
                        ? "animate-pulse border-[#7c3aed] bg-[#7c3aed]/30 text-white"
                        : "border-white/30 bg-[#130b22] text-white",
                  )}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={cn(
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300",
                    isExpanded ? "scale-110 text-white" : "text-white/70",
                  )}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute top-24 left-1/2 w-64 -translate-x-1/2 border border-white/20 bg-[#0c0916]/95 p-4 shadow-xl shadow-[#7c3aed]/10 backdrop-blur-lg">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/40" />
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                          item.status === "completed"
                            ? "bg-[#10b981]/15 text-[#10b981]"
                            : item.status === "in-progress"
                              ? "bg-[#7c3aed]/15 text-[#a78bfa]"
                              : "bg-white/10 text-white/60",
                        )}
                      >
                        {item.status === "completed"
                          ? "Live"
                          : item.status === "in-progress"
                            ? "Syncing"
                            : "Available"}
                      </span>
                      <span className="font-mono text-[10px] text-white/40">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/70">{item.content}</p>

                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="mb-1 flex items-center justify-between text-[11px] text-white/70">
                        <span className="flex items-center gap-1">
                          <Zap size={10} /> Automation
                        </span>
                        <span className="font-mono">{item.energy}%</span>
                      </div>
                      <div className="h-1 w-full overflow-hidden orbit-round bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa]"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-2 flex items-center gap-1 text-[11px] uppercase tracking-wide text-white/60">
                          <Link2 size={10} /> Connected
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const related = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                type="button"
                                className="flex items-center gap-1 border border-white/20 bg-transparent px-2 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {related?.title}
                                <ArrowRight size={8} className="text-white/50" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
