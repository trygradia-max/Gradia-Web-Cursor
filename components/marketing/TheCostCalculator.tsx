"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";

type SliderConfig = {
  id: string;
  label: string;
  sublabel?: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  format: (n: number) => string;
};

const GRADIA_COST = 299;
const WEEKS_PER_MONTH = 4.33;

const formatDollars = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

const SLIDERS = {
  leadValue: {
    id: "lead-value",
    label: "Average value of a closed lead",
    min: 500,
    max: 50000,
    step: 500,
    initial: 3000,
    format: formatDollars,
  },
  weeklyLeads: {
    id: "weekly-leads",
    label: "Inbound leads per week",
    min: 1,
    max: 200,
    step: 1,
    initial: 20,
    format: (n: number) => `${n} ${n === 1 ? "lead" : "leads"}/week`,
  },
  closeRate: {
    id: "close-rate",
    label: "Average lead close rate",
    sublabel: "What % of leads you respond to do you typically close?",
    min: 5,
    max: 80,
    step: 5,
    initial: 25,
    format: (n: number) => `${n}%`,
  },
  missRate: {
    id: "miss-rate",
    label: "Leads missed or too slow to respond",
    min: 10,
    max: 80,
    step: 5,
    initial: 35,
    format: (n: number) => `${n}%`,
  },
} satisfies Record<string, SliderConfig>;

function fillPercent(value: number, min: number, max: number) {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

type SliderProps = {
  config: SliderConfig;
  value: number;
  onChange: (value: number) => void;
};

function CalculatorSlider({ config, value, onChange }: SliderProps) {
  const fill = fillPercent(value, config.min, config.max);
  const styleVars = { "--fill": `${fill}%` } as CSSProperties;
  return (
    <div>
      <label
        htmlFor={config.id}
        className="block font-sans text-sm font-medium text-[#0A0A0A]"
      >
        {config.label}
      </label>
      {config.sublabel && (
        <p className="mt-1 font-sans text-[13px] leading-snug text-[#6B7280]">
          {config.sublabel}
        </p>
      )}
      <p
        className="mt-2 font-sans text-[32px] font-bold leading-none tabular-nums text-[#0A0A0A] sm:text-[36px]"
        aria-hidden="true"
      >
        {config.format(value)}
      </p>
      <input
        id={config.id}
        type="range"
        className="the-cost-slider mt-4"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={config.format(value)}
        style={styleVars}
      />
      <div className="mt-2 flex justify-between font-sans text-[11px] tabular-nums text-[#6B7280]">
        <span>{config.format(config.min)}</span>
        <span>{config.format(config.max)}</span>
      </div>
    </div>
  );
}

export function TheCostCalculator() {
  const headingId = useId();

  const [leadValue, setLeadValue] = useState(SLIDERS.leadValue.initial);
  const [weeklyLeads, setWeeklyLeads] = useState(SLIDERS.weeklyLeads.initial);
  const [closeRate, setCloseRate] = useState(SLIDERS.closeRate.initial);
  const [missRate, setMissRate] = useState(SLIDERS.missRate.initial);

  // Derived calculations
  const monthlyMissedLeads = weeklyLeads * WEEKS_PER_MONTH * (missRate / 100);
  const closeableMissedLeads = monthlyMissedLeads * (closeRate / 100);
  const monthlyRevenueLost = closeableMissedLeads * leadValue;
  const netReturn = monthlyRevenueLost - GRADIA_COST;
  const multiplier = netReturn / GRADIA_COST;
  const showPositiveRoi = monthlyRevenueLost >= GRADIA_COST && multiplier >= 1;

  return (
    <section
      className="bg-white py-[80px] lg:py-[120px]"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-[900px] px-4 sm:px-6">
        <div className="text-center">
          <h2
            id={headingId}
            className="font-sans text-[32px] font-bold leading-tight text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            Run the numbers.
          </h2>
          <p className="mt-3 font-sans text-base text-[#6B7280]">
            Drag the sliders to match your business.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="border border-[#E5E7EB] bg-[#F5F5F5] p-6 sm:p-10">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
              Your Inputs
            </p>
            <div className="mt-6 space-y-10">
              <CalculatorSlider
                config={SLIDERS.leadValue}
                value={leadValue}
                onChange={setLeadValue}
              />
              <CalculatorSlider
                config={SLIDERS.weeklyLeads}
                value={weeklyLeads}
                onChange={setWeeklyLeads}
              />
              <CalculatorSlider
                config={SLIDERS.closeRate}
                value={closeRate}
                onChange={setCloseRate}
              />
              <CalculatorSlider
                config={SLIDERS.missRate}
                value={missRate}
                onChange={setMissRate}
              />
            </div>
          </div>

          <div className="border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-10 lg:sticky lg:top-6">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
              Your Invisible Gap
            </p>

            <div className="mt-6">
              <p className="font-sans text-xs text-[#6B7280]">
                Estimated monthly revenue lost:
              </p>
              {/* Context line — shows closeable missed leads driving the number */}
              <p
                className="mt-2 font-sans text-[13px] leading-snug text-[#8A8A8A]"
                aria-hidden="true"
              >
                Based on{" "}
                <span className="tabular-nums">
                  {Math.round(closeableMissedLeads).toLocaleString("en-US")}
                </span>{" "}
                missed leads/month that would have closed:
              </p>
              <p
                className="mt-2 font-sans text-[40px] font-bold leading-none tabular-nums text-white sm:text-[52px]"
                aria-live="polite"
              >
                {formatDollars(monthlyRevenueLost)}
                <span className="ml-2 font-sans text-[13px] font-medium text-[#6B7280]">
                  /mo
                </span>
              </p>
            </div>

            <div className="my-6 border-t border-[#1F1F1F]" aria-hidden="true" />

            <div>
              <p className="font-sans text-xs text-[#6B7280]">Gradia costs:</p>
              <p className="mt-2 font-sans text-[24px] font-semibold leading-none tabular-nums text-[#8A8A8A] sm:text-[28px]">
                $299
                <span className="ml-1 font-sans text-[13px] font-medium text-[#6B7280]">
                  /month
                </span>
              </p>
            </div>

            <div className="my-6 border-t border-[#1F1F1F]" aria-hidden="true" />

            <div>
              <p className="font-sans text-xs text-[#6B7280]">Your return:</p>
              {showPositiveRoi ? (
                <p
                  className="mt-2 font-sans text-[32px] font-bold leading-none tabular-nums text-[#3B6EF5] sm:text-[40px]"
                  aria-live="polite"
                >
                  {Math.round(multiplier).toLocaleString("en-US")}x return
                </p>
              ) : (
                <>
                  <p className="mt-2 font-sans text-[24px] font-bold leading-tight text-[#3B6EF5] sm:text-[28px]">
                    Pays for itself
                  </p>
                  <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#8A8A8A]">
                    Based on your numbers, Gradia pays for itself when you
                    close just 1 additional lead.
                  </p>
                </>
              )}
            </div>

            <Link
              href="/pricing"
              className="mt-8 flex w-full items-center justify-center rounded-[100px] bg-[#3B6EF5] px-6 py-[14px] font-sans text-sm font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Close the gap for $299/month →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
