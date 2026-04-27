"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const STAGES = [
  {
    id: "01",
    title: "Lead Arrives",
    description:
      "A call, email, or SMS comes in.\nAny hour. Any day.",
    Icon: IconPhone,
  },
  {
    id: "02",
    title: "Gradia Answers",
    description:
      "Instant response. Under 2 seconds.\nEvery time.",
    Icon: IconWaveform,
  },
  {
    id: "03",
    title: "Lead Qualified",
    description:
      "Name, need, urgency captured.\nNoise filtered out.",
    Icon: IconFilter,
  },
  {
    id: "04",
    title: "Appointment Booked",
    description:
      "Booked directly into your calendar.\nNo back and forth.",
    Icon: IconCalendar,
  },
  {
    id: "05",
    title: "Team Closes",
    description:
      "Your team receives a warm,\nqualified lead. Ready to close.",
    Icon: IconHandshake,
  },
] as const;

const LINE_DURATION_MS = 400;
const STAGGER_MS = 300;

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function IconWaveform({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" d="M4 12v-1M8 8v8M12 5v14M16 9v6M20 11v2" />
    </svg>
  );
}

function IconFilter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16M7 5v3l5 6v6l4-2v-4l-5-6V5"
      />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16" />
      <rect x="4" y="5" width="16" height="14" rx={0} />
    </svg>
  );
}

function IconHandshake({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 14l-2.5 2.5a2 2 0 01-2.8 0h0a2 2 0 010-2.8l3-3M16 10l3-3a2 2 0 000-2.8h0a2 2 0 00-2.8 0L12.5 7M8 14l8-8M8 14l2 2M16 10l-2 2"
      />
    </svg>
  );
}

function ConnectorVertical({
  segmentIndex,
  active,
}: {
  segmentIndex: number;
  active: boolean;
}) {
  const delay = segmentIndex * STAGGER_MS;
  return (
    <div
      className="flex h-10 w-full shrink-0 justify-center lg:hidden"
      aria-hidden
    >
      <div className="relative h-full w-px overflow-hidden bg-[#E5E7EB]">
        <div
          className={cn(
            "absolute inset-x-0 top-0 origin-top bg-[#3B6EF5] transition-transform ease-out motion-reduce:transition-none",
            active ? "scale-y-100" : "scale-y-0",
          )}
          style={{
            height: "100%",
            transitionDuration: `${LINE_DURATION_MS}ms`,
            transitionDelay: active ? `${delay}ms` : "0ms",
          }}
        />
      </div>
    </div>
  );
}

function StageBlock({
  stage,
  index,
  active,
  iconDelay,
  desktop,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  active: boolean;
  iconDelay: number;
  desktop: boolean;
}) {
  const isLast = index === STAGES.length - 1;
  const Icon = stage.Icon;

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col items-center text-center",
        desktop ? "flex-1" : "w-full max-w-sm",
      )}
    >
      {!isLast && desktop && (
        <div
          className="pointer-events-none absolute left-1/2 right-0 top-7 z-0 h-px overflow-hidden bg-[#E5E7EB]"
          aria-hidden
        >
          <div
            className={cn(
              "h-full w-full origin-left bg-[#3B6EF5] transition-transform ease-out motion-reduce:transition-none",
              active ? "scale-x-100" : "scale-x-0",
            )}
            style={{
              transitionDuration: `${LINE_DURATION_MS}ms`,
              transitionDelay: active ? `${index * STAGGER_MS}ms` : "0ms",
            }}
          />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#FFFFFF] text-[#0A0A0A] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
          active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
        style={{
          transitionDelay: active ? `${iconDelay}ms` : "0ms",
        }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p
        className={cn(
          "mt-4 font-sans text-[11px] font-medium text-[#3B6EF5] transition-opacity duration-500 motion-reduce:transition-none",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          transitionDelay: active ? `${iconDelay}ms` : "0ms",
        }}
      >
        Stage {stage.id}
      </p>
      <h3
        className={cn(
          "mt-2 font-sans text-base font-semibold text-[#0A0A0A] transition-opacity duration-500 motion-reduce:transition-none",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          transitionDelay: active ? `${iconDelay}ms` : "0ms",
        }}
      >
        {stage.title}
      </h3>
      <p
        className={cn(
          "mt-2 max-w-[160px] whitespace-pre-line font-sans text-sm leading-[1.5] text-[#6B7280] transition-opacity duration-500 motion-reduce:transition-none",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          transitionDelay: active ? `${iconDelay}ms` : "0ms",
        }}
      >
        {stage.description}
      </p>
    </div>
  );
}

export function HandoffSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotionRef.current) {
      setActive(true);
      return;
    }

    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const iconDelay = (index: number) => {
    if (!active) return 0;
    if (reduceMotionRef.current) return 0;
    if (index === 0) return 0;
    return (index - 1) * STAGGER_MS + LINE_DURATION_MS;
  };

  return (
    <div ref={rootRef} className="mt-20 w-full overflow-visible">
      <div className="hidden w-full items-start lg:flex">
        {STAGES.map((stage, i) => (
          <StageBlock
            key={stage.id}
            stage={stage}
            index={i}
            active={active}
            iconDelay={iconDelay(i)}
            desktop
          />
        ))}
      </div>

      <div className="flex w-full flex-col items-center lg:hidden">
        {STAGES.map((stage, i) => (
          <Fragment key={stage.id}>
            {i > 0 && (
              <ConnectorVertical segmentIndex={i - 1} active={active} />
            )}
            <StageBlock
              stage={stage}
              index={i}
              active={active}
              iconDelay={iconDelay(i)}
              desktop={false}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
