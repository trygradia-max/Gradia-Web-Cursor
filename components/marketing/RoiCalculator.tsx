"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function RoiCalculator() {
  const [monthlyCalls, setMonthlyCalls] = useState(1200);
  const [missPercent, setMissPercent] = useState(30);
  const [avgValue, setAvgValue] = useState(250);

  const missedCalls = useMemo(
    () => Math.round(monthlyCalls * (missPercent / 100)),
    [monthlyCalls, missPercent],
  );

  const monthlyLost = missedCalls * avgValue;
  const yearlyLost = monthlyLost * 12;

  return (
    <div className="mt-14 rounded-[4px] border border-[#222222] bg-[#141414] p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-8">
          <div>
            <label
              htmlFor="roi-calls"
              className="block font-sans text-sm font-medium text-[#b0b0b0]"
            >
              How many calls does your business get per month?
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <input
                id="roi-calls"
                type="range"
                min={100}
                max={5000}
                step={50}
                value={monthlyCalls}
                onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                className="h-2 w-full max-w-md cursor-pointer accent-[var(--brand-primary)]"
              />
              <input
                type="number"
                min={100}
                max={5000}
                value={monthlyCalls}
                onChange={(e) =>
                  setMonthlyCalls(
                    Math.min(5000, Math.max(100, Number(e.target.value) || 100)),
                  )
                }
                className="w-24 rounded-[4px] border border-[#222222] bg-[#0a0a0a] px-3 py-2 text-center font-mono text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="roi-miss"
              className="block font-sans text-sm font-medium text-[#b0b0b0]"
            >
              How many do you miss? ({missPercent}%)
            </label>
            <input
              id="roi-miss"
              type="range"
              min={10}
              max={60}
              value={missPercent}
              onChange={(e) => setMissPercent(Number(e.target.value))}
              className="mt-3 h-2 w-full max-w-md cursor-pointer accent-[var(--brand-primary)]"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#666]">
              <span>10%</span>
              <span>60%</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="roi-value"
              className="block font-sans text-sm font-medium text-[#b0b0b0]"
            >
              What&apos;s your average job/appointment value?
            </label>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[#888]">$</span>
              <input
                id="roi-value"
                type="number"
                min={1}
                max={100000}
                value={avgValue}
                onChange={(e) =>
                  setAvgValue(Math.max(1, Number(e.target.value) || 0))
                }
                className="w-32 rounded-[4px] border border-[#222222] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-white focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 rounded-[4px] border border-[#222222] bg-[#0a0a0a] p-6 sm:p-8">
          <OutputRow
            label="Missed calls per month:"
            value={String(missedCalls.toLocaleString())}
          />
          <OutputRow
            label="Revenue lost monthly:"
            value={formatMoney(monthlyLost)}
            emphasize
          />
          <OutputRow
            label="Revenue lost yearly:"
            value={formatMoney(yearlyLost)}
            emphasize
          />
          <div className="rounded-[4px] border border-[var(--brand-primary)]/45 bg-[var(--brand-primary)]/12 px-4 py-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)]">
              With Gradia
            </p>
            <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-[var(--brand-primary)] sm:text-4xl">
              {formatMoney(0)}
            </p>
            <p className="mt-1 font-sans text-sm text-[#b0b0b0]">
              missed revenue from abandoned calls
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center border-t border-[#222222] pt-10">
        <Button
          href="mailto:hello@gradia.com?subject=Book%20a%20call"
          variant="primary"
        >
          Stop losing revenue. Book a Call.
        </Button>
      </div>
    </div>
  );
}

function OutputRow({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <p className="font-sans text-sm text-[#888]">{label}</p>
      <p
        className={`mt-1 font-serif tabular-nums tracking-tight text-white ${
          emphasize ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
