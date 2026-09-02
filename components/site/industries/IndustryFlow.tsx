import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { FlowStage } from "./data";

/* Trade-specific connected flow — static retelling per industry page.
   Simplified from homepage ConnectedFlow; no motion (subpage discipline). */

function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-[6px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
        accent ? "bg-[var(--sv-accent)]/25 text-[var(--sv-accent-on-dark)]" : "bg-white/10 text-white/60"
      }`}
    >
      {children}
    </span>
  );
}

function Vignette({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.07] p-3.5 sm:p-4">
      <p className="float-right ml-3 font-mono text-[length:var(--sv-text-xs)] font-medium tabular-nums text-white/60">
        {time}
      </p>
      {children}
    </div>
  );
}

function stageVignette(stage: FlowStage): ReactNode {
  if (stage.approve) {
    return (
      <Vignette time={stage.time}>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>SMS</Chip>
          <Chip accent>Pending</Chip>
        </div>
        <p className="mt-2 rounded-[calc(var(--sv-radius-sm)-4px)] bg-white/[0.06] px-3 py-2 text-[length:var(--sv-text-xs)] text-white/70">
          {stage.detail}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-[6px] bg-[var(--sv-accent)] px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white">
            Send it
          </span>
          {["Tweak it", "Drop it"].map((a) => (
            <span
              key={a}
              className="rounded-[6px] border border-white/20 px-3 py-1 text-[length:var(--sv-text-xs)] font-medium text-white/70"
            >
              {a}
            </span>
          ))}
        </div>
      </Vignette>
    );
  }

  if (stage.name === "Retain") {
    return (
      <Vignette time={stage.time}>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>SMS</Chip>
          <Chip accent>Pending</Chip>
        </div>
        <p className="mt-2 text-[length:var(--sv-text-xs)] text-white/60">{stage.detail}</p>
      </Vignette>
    );
  }

  return (
    <Vignette time={stage.time}>
      <p className="text-[length:var(--sv-text-xs)] text-white/60">{stage.detail}</p>
    </Vignette>
  );
}

export function IndustryFlow({
  frameLabel,
  stages,
}: {
  frameLabel: string;
  stages: FlowStage[];
}) {
  return (
    <div className="rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
      <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
          {frameLabel}
        </p>
        <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
      </div>

      <ol className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10">
        {stages.map((s, i) => (
          <li
            key={s.name}
            className={`grid gap-3 px-4 py-4 lg:grid-cols-2 lg:items-center lg:gap-8 sm:px-5 ${
              i > 0 ? "border-t border-white/10" : ""
            } ${s.approve ? "bg-white/[0.09]" : "bg-white/[0.04]"}`}
          >
            <div className="flex min-w-0 items-baseline gap-4">
              <span
                className={`w-6 shrink-0 text-[length:var(--sv-text-xs)] font-semibold ${
                  s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/35"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    s.approve ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                  }`}
                >
                  {s.approve && <Check size={13} strokeWidth={2.5} aria-hidden />}
                  {s.name}
                </p>
                <p className="mt-1 font-medium text-white">{s.line}</p>
              </div>
            </div>
            <div className="pl-10 lg:pl-0">{stageVignette(s)}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
