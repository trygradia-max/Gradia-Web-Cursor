import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Bespoke Gradia booking calendar: the Scheduler agent has filled a full two
 * weeks of detailing work, and the Closer/Estimator have layered ceramic-coating
 * upsells on top. Ceramic jobs are highlighted in brand blue with the upsell
 * value. Static (no animation) so it never shifts the page.
 */
type Job = { time: string; service: string; vehicle: string; upsell?: number };
type Day = { label: string; date: string; jobs: Job[] };

const WEEK_ONE: Day[] = [
  { label: "Mon", date: "8", jobs: [
    { time: "9:00", service: "Full detail", vehicle: "Tahoe" },
    { time: "1:00", service: "Interior", vehicle: "Civic" },
  ] },
  { label: "Tue", date: "9", jobs: [
    { time: "10:00", service: "Ceramic coating", vehicle: "Model 3", upsell: 899 },
    { time: "2:30", service: "Wash & wax", vehicle: "Camry" },
  ] },
  { label: "Wed", date: "10", jobs: [
    { time: "8:30", service: "Paint correction", vehicle: "Mustang" },
  ] },
  { label: "Thu", date: "11", jobs: [
    { time: "9:30", service: "Full detail", vehicle: "4Runner" },
    { time: "1:30", service: "Ceramic coating", vehicle: "F-150", upsell: 1200 },
  ] },
  { label: "Fri", date: "12", jobs: [
    { time: "11:00", service: "Engine bay", vehicle: "Silverado" },
  ] },
  { label: "Sat", date: "13", jobs: [
    { time: "9:00", service: "Full detail", vehicle: "Tahoe" },
    { time: "12:30", service: "Ceramic top-up", vehicle: "Bronco", upsell: 350 },
  ] },
];

const WEEK_TWO: Day[] = [
  { label: "Mon", date: "15", jobs: [
    { time: "10:00", service: "Interior", vehicle: "Accord" },
    { time: "2:00", service: "Full detail", vehicle: "Q5" },
  ] },
  { label: "Tue", date: "16", jobs: [
    { time: "9:00", service: "Ceramic coating", vehicle: "Bronco", upsell: 1050 },
  ] },
  { label: "Wed", date: "17", jobs: [
    { time: "8:30", service: "Wash & wax", vehicle: "Civic" },
    { time: "1:00", service: "Paint correction", vehicle: "GTI" },
  ] },
  { label: "Thu", date: "18", jobs: [
    { time: "10:30", service: "Full detail", vehicle: "Wrangler" },
  ] },
  { label: "Fri", date: "19", jobs: [
    { time: "9:00", service: "Interior", vehicle: "Highlander" },
    { time: "2:30", service: "Ceramic coating", vehicle: "Model Y", upsell: 950 },
  ] },
  { label: "Sat", date: "20", jobs: [
    { time: "11:00", service: "Full detail", vehicle: "Tacoma" },
  ] },
];

const ALL_DAYS = [...WEEK_ONE, ...WEEK_TWO];
const totalJobs = ALL_DAYS.reduce((n, d) => n + d.jobs.length, 0);
const ceramicJobs = ALL_DAYS.flatMap((d) => d.jobs).filter((j) => j.upsell);
const upsellTotal = ceramicJobs.reduce((s, j) => s + (j.upsell ?? 0), 0);

function JobChip({ job }: { job: Job }) {
  const isCeramic = Boolean(job.upsell);
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 border px-2 py-1.5 text-left",
        isCeramic
          ? "border-[var(--brand-primary)]/40 bg-[color:var(--brand-primary)]/8"
          : "border-[var(--border)] bg-[var(--bg-elevated)]",
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-[10px] text-[var(--muted)]">{job.time}</span>
        {isCeramic && (
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[var(--brand-primary)]">
            <Sparkles className="h-2.5 w-2.5" />+${job.upsell?.toLocaleString("en-US")}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-[11px] font-medium leading-tight",
          isCeramic ? "text-[var(--brand-primary)]" : "text-[var(--foreground)]",
        )}
      >
        {job.service}
      </span>
      <span className="text-[10px] text-[var(--muted)]">{job.vehicle}</span>
    </div>
  );
}

function WeekRow({ days, label }: { days: Day[]; label: string }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {days.map((d) => (
          <div
            key={d.label + d.date}
            className="flex flex-col gap-1.5 border border-[var(--border)] bg-[var(--bg)] p-2"
          >
            <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-1.5">
              <span className="text-[11px] font-semibold text-[var(--foreground)]">
                {d.label}
              </span>
              <span className="text-[11px] text-[var(--muted)]">{d.date}</span>
            </div>
            {d.jobs.map((j) => (
              <JobChip key={j.time + j.vehicle} job={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BookingCalendar() {
  return (
    <div className="border border-[var(--border)] bg-[var(--bg)] shadow-card">
      {/* header */}
      <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--dash-success)]">
              <Check className="h-3.5 w-3.5" /> Scheduler · booked solid
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            June 8 – 20 · two weeks filled while you detailed
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { v: `${totalJobs}`, l: "jobs booked" },
            { v: `${ceramicJobs.length}`, l: "ceramic upsells" },
            { v: `+$${upsellTotal.toLocaleString("en-US")}`, l: "in upsells", accent: true },
          ].map((s) => (
            <div
              key={s.l}
              className={cn(
                "border px-3 py-2 text-center",
                s.accent
                  ? "border-[var(--brand-primary)]/40 bg-[color:var(--brand-primary)]/8"
                  : "border-[var(--border)] bg-[var(--bg-elevated)]",
              )}
            >
              <p
                className={cn(
                  "text-base font-bold tracking-tight",
                  s.accent ? "text-[var(--brand-primary)]" : "text-[var(--foreground)]",
                )}
              >
                {s.v}
              </p>
              <p className="text-[10px] text-[var(--muted)]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="flex items-center gap-4 border-b border-[var(--border)] px-5 py-2.5 sm:px-6">
        <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <span className="h-2.5 w-2.5 border border-[var(--border)] bg-[var(--bg-elevated)]" />
          Detail job
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <span className="h-2.5 w-2.5 border border-[var(--brand-primary)]/40 bg-[color:var(--brand-primary)]/15" />
          Ceramic upsell
        </span>
      </div>

      {/* weeks */}
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <WeekRow days={WEEK_ONE} label="Week 1" />
        <WeekRow days={WEEK_TWO} label="Week 2" />
      </div>
    </div>
  );
}
