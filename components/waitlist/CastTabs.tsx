"use client";

import { useState } from "react";
import { Check, Download } from "lucide-react";
import { AGENTS } from "@/components/waitlist/agents";
import { cn } from "@/lib/cn";

const TABS = [
  {
    key: "cast",
    label: "The cast",
    index: "01",
    headline: "Seven specialists. One shop.",
    copy: "Each agent owns one job and does it relentlessly — the Receptionist never misses a call, the Estimator never gives a slow quote, the Collector never forgets an invoice. Together they run your entire front office.",
  },
  {
    key: "day",
    label: "A day",
    index: "02",
    headline: "First call to last invoice, hands-free.",
    copy: "Calls answered, cars quoted, slots filled, payments collected — every step happens without you touching your phone.",
  },
  {
    key: "brief",
    label: "Daily brief",
    index: "03",
    headline: "Wake up to a shop that already ran itself.",
    copy: "Every morning, see what your agents handled overnight and the two or three moves only you can make.",
  },
  {
    key: "data",
    label: "Your shop",
    index: "04",
    headline: "Your clients, your data — always yours.",
    copy: "Every customer, vehicle, quote, and job lives in one place you fully own and can export anytime. Independent, portable, yours.",
  },
] as const;

export function CastTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div>
      {/* tab bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-[100px] border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* copy */}
        <div key={tab.key} className="wl-step-in">
          <span className="font-mono text-xs tracking-[0.15em] text-[var(--muted)]">
            {tab.index} / 04
          </span>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl">
            {tab.headline}
          </h3>
          <p className="mt-4 max-w-md text-[var(--muted)]">{tab.copy}</p>
        </div>

        {/* visual */}
        <div key={`${tab.key}-vis`} className="wl-step-in">
          <TabVisual tab={tab.key} />
        </div>
      </div>
    </div>
  );
}

function TabVisual({ tab }: { tab: (typeof TABS)[number]["key"] }) {
  if (tab === "cast") {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {AGENTS.map((a) => (
          <div
            key={a.step}
            className="flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] p-3"
          >
            <a.icon className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
            <span className="text-xs font-medium text-[var(--foreground)]">
              {a.name.replace("The ", "")}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-center border border-dashed border-[var(--border)] p-3 text-xs text-[var(--muted)]">
          + all working together
        </div>
      </div>
    );
  }

  if (tab === "day") {
    const events = [
      { t: "8:12 AM", a: "The Receptionist", e: "Answered a missed call → new lead" },
      { t: "8:40 AM", a: "The Estimator", e: "Quoted a Model 3 — $320 sent" },
      { t: "11:05 AM", a: "The Scheduler", e: "Filled a 2 PM cancellation" },
      { t: "4:30 PM", a: "The Collector", e: "Collected $640 invoice" },
      { t: "6:00 PM", a: "The Reviewer", e: "Asked 3 clients for reviews" },
    ];
    return (
      <div className="border border-[var(--border)] bg-[var(--bg)] p-4">
        <ul className="flex flex-col gap-3">
          {events.map((ev) => (
            <li key={ev.t} className="flex gap-3 text-sm">
              <span className="w-16 shrink-0 font-mono text-xs text-[var(--muted)]">
                {ev.t}
              </span>
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
              <span>
                <span className="font-medium text-[var(--foreground)]">
                  {ev.a}.{" "}
                </span>
                <span className="text-[var(--muted)]">{ev.e}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (tab === "brief") {
    const items = [
      "4 jobs booked",
      "7 calls answered",
      "3 quotes sent",
      "2 invoices collected",
    ];
    return (
      <div className="border border-[var(--border)] bg-[var(--bg)] p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          Handled overnight
        </p>
        <div className="grid grid-cols-2 gap-2">
          {items.map((it) => (
            <div
              key={it}
              className="flex items-center gap-2 bg-[var(--bg-elevated)] px-3 py-2.5 text-sm text-[var(--foreground)]"
            >
              <Check className="h-3.5 w-3.5 text-[var(--dash-success)]" />
              {it}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // data
  const rows = [
    { n: "Marcus James", v: "Tahoe · ceramic", s: "Confirmed" },
    { n: "Dana Ruiz", v: "Model 3 · full detail", s: "Paid" },
    { n: "Sam Park", v: "F-150 · interior", s: "Lead" },
  ];
  return (
    <div className="border border-[var(--border)] bg-[var(--bg)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          Your customers
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--brand-primary)]">
          <Download className="h-3.5 w-3.5" /> Export
        </span>
      </div>
      <ul className="flex flex-col">
        {rows.map((r) => (
          <li
            key={r.n}
            className="flex items-center justify-between border-b border-[var(--border)] py-2.5 text-sm last:border-0"
          >
            <span>
              <span className="font-medium text-[var(--foreground)]">{r.n}</span>
              <span className="ml-2 text-xs text-[var(--muted)]">{r.v}</span>
            </span>
            <span className="text-xs text-[var(--muted)]">{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
