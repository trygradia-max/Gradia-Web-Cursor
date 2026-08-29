import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 4 — Operations dashboard (site-v2-plan §3.4, NEXT_TASK scope 4).
   Calm, prioritized morning view: needs attention · today's jobs · open
   quotes · recommended actions. Operational cards ONLY — capability #17
   (reporting) is 'building', so no analytics, charts, counts or metrics
   (D-025). Structural placeholder; Pass 3 swaps in the real Home dashboard.
   Sarah's states here stay consistent with the Section 3 flow (quote
   accepted → job booked). */

const panels: {
  label: string;
  accent?: boolean;
  rows: { title: string; meta: string }[];
}[] = [
  {
    label: "Needs attention",
    rows: [
      { title: "New inquiry — reply drafted", meta: "Waiting for your review" },
      { title: "Yesterday's quote went quiet", meta: "Follow-up ready for your OK" },
    ],
  },
  {
    label: "Today's jobs",
    rows: [
      {
        title: `${SAMPLE.slot} — ${SAMPLE.service}`,
        meta: `${SAMPLE.customer} · ${SAMPLE.vehicle}`,
      },
      { title: "2:00 PM — Interior detail", meta: "Walk-in · booked by you" },
    ],
  },
  {
    label: "Open quotes",
    rows: [
      { title: `${SAMPLE.service} — ${SAMPLE.price}`, meta: "Accepted · job booked" },
      { title: "Paint correction — quote drafted", meta: "Waiting for your review" },
    ],
  },
  {
    label: "Recommended actions",
    accent: true,
    rows: [
      { title: "Send a maintenance reminder", meta: "Draft ready — you approve before it goes out" },
      { title: "Revive a lead that never booked", meta: "Follow-up drafted for review" },
    ],
  },
];

export function Operations() {
  return (
    <Section band>
      <Eyebrow>Operations</Eyebrow>
      <h2 className="max-w-[24ch]">Know what needs attention before it becomes a problem.</h2>
      <Lead>
        Open Gradia in the morning and see what matters, in order. Your business, prioritized
        for you.
      </Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            Tuesday, 7:58 AM · Home
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <div className="grid gap-2.5 md:grid-cols-2">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
            >
              <p
                className={`text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] ${
                  panel.accent ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                }`}
              >
                {panel.label}
              </p>
              <ul className="mt-3 space-y-3">
                {panel.rows.map((row) => (
                  <li key={row.title}>
                    <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{row.title}</p>
                    <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{row.meta}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
