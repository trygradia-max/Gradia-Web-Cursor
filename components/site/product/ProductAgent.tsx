import { Mic } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";
import { GraphiteFrame } from "./shared";

/* Gradia Agent + Whisper — two ways to hand Gradia work (depth-page treatment). */

const foundLeads = [
  { title: "Ceramic coating inquiry", meta: "$740 quote · quiet for 6 days" },
  { title: "PPF + ceramic ask", meta: "$1,800 quote · quiet for 9 days" },
  { title: "Ceramic maintenance question", meta: "Never quoted · two weeks old" },
];

export function ProductAgent() {
  return (
    <Section band>
      <Eyebrow>Gradia Agent &amp; Whisper</Eyebrow>
      <h2 className="max-w-[24ch]">Two ways to hand Gradia work.</h2>
      <Lead>
        Type a question or speak a voice note — Gradia finds it, drafts it and stages it.
        Nothing sends until you approve.
      </Lead>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-[length:var(--sv-h3)]">Ask in plain English.</h3>
          <p className="mt-3 max-w-[32rem]">
            Gradia Agent reads your CRM, prepares follow-ups and runs workflows — every step
            staged for your review.
          </p>
          <div className="mt-6">
            <GraphiteFrame label="Gradia Agent">
              <div className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3">
                  <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
                  <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">
                    Show me every ceramic coating lead this month that hasn&apos;t booked.
                  </p>
                </div>
                <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
                  <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    Ceramic coating leads — not booked
                  </p>
                  {foundLeads.map((lead) => (
                    <div key={lead.title} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                      <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{lead.title}</p>
                      <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{lead.meta}</p>
                    </div>
                  ))}
                </div>
                <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
                  <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                    Prepared — waiting for your review
                  </p>
                  <div className="flex flex-wrap gap-2 px-4 py-3">
                    <span className="rounded-[6px] bg-[var(--sv-accent)] px-3 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                      Send it
                    </span>
                    {["Tweak it", "Drop it"].map((a) => (
                      <span
                        key={a}
                        className="rounded-[6px] border border-white/20 px-3 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GraphiteFrame>
          </div>
        </div>

        <div>
          <h3 className="text-[length:var(--sv-h3)]">Say it once.</h3>
          <p className="mt-3 max-w-[32rem]">
            Hands full of buffer? Speak it — Gradia files it, quotes it and follows up, all
            staged for your review.
          </p>
          <div className="mt-6">
            <GraphiteFrame label="Gradia Whisper">
              <div className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[length:var(--sv-text-xs)] text-white/40">
                    <Mic size={12} strokeWidth={2} aria-hidden />
                    Voice note · 0:09
                  </p>
                  <p className="mt-1 text-[length:var(--sv-text-sm)] text-white">
                    &ldquo;Just finished the X5 — quote {SAMPLE.firstName} for a maintenance plan and
                    remind me to order pads.&rdquo;
                  </p>
                </div>
                <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
                  <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                    Staged — waiting for your review
                  </p>
                  {[
                    [`Quote drafted — ceramic maintenance plan`, `${SAMPLE.customer} · ${SAMPLE.vehicle}`],
                    ["Task created — order pads", "On today's list once you confirm"],
                    ["Reminder set — nudge if the quote goes quiet", "Nothing sends without your OK"],
                  ].map(([title, meta]) => (
                    <div key={title} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                      <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{title}</p>
                      <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GraphiteFrame>
          </div>
        </div>
      </div>
    </Section>
  );
}
