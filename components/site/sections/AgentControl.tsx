import { Check, Mic } from "lucide-react";
import { Eyebrow, Lead, Section } from "../primitives";
import { SAMPLE } from "../sample";

/* Section 6 — Gradia Agent + control, ONE section (site-v2-plan §3.6,
   NEXT_TASK scope 6; Whisper beat added in Pass 3 per P3-B). Two demos,
   one control story: typed (Agent: ask → list → staged → approve → logged)
   and spoken (Whisper: voice note → transcript → staged, all waiting for
   review — §4 'say it once → filed, quoted, followed up'). Graphite frames
   (the product's chat surface). Approve carries the accent. The agent
   result list is nameless on purpose: Sarah is already booked in this
   page's timeline, so she cannot appear in a "hasn't booked" list; the
   Whisper note happens later the same day ("just finished the X5").
   Structural placeholder; Pass 3-E swaps real UI, Pass 4 may sequence. */

/* P3-D: the list is meant to hurt — sample-data dollar values on stalled
   quotes are work items, not performance stats. $740 + $1,800 sit inside
   the Home frame's "5 open quotes · $3,850". */
const foundLeads: { title: string; meta: string }[] = [
  { title: "Ceramic coating inquiry", meta: "$740 quote · quiet for 6 days" },
  { title: "PPF + ceramic ask", meta: "$1,800 quote · quiet for 9 days" },
  { title: "Ceramic maintenance question", meta: "Never quoted · two weeks old" },
];

function OwnerBubble({ children }: { children: string }) {
  return (
    <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
      <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
      <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">{children}</p>
    </div>
  );
}

export function AgentControl() {
  return (
    <Section band>
      <Eyebrow>Gradia Agent</Eyebrow>
      <h2 className="max-w-[24ch]">Tell Gradia what needs to get done. Approve it before it goes out.</h2>
      {/* P4-C founder option (built in to evaluate on the next read; revert
          to "Ask in plain English. Gradia finds it, drafts it and stages
          it — nothing sends until you approve." if it doesn't land). */}
      <Lead>Ask Gradia anything. It asks you before anything sends.</Lead>

      <div className="mt-12 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            Gradia Agent
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <div className="space-y-3">
          <OwnerBubble>
            Show me every ceramic coating lead this month that hasn&apos;t booked.
          </OwnerBubble>

          {/* Result list */}
          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-white/45">
              Ceramic coating leads — not booked
            </p>
            {foundLeads.map((lead) => (
              <div key={lead.title} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{lead.title}</p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{lead.meta}</p>
              </div>
            ))}
          </div>

          <OwnerBubble>Prepare follow-ups.</OwnerBubble>

          {/* Staged, waiting for approval */}
          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Prepared — waiting for your review
            </p>
            {foundLeads.map((lead) => (
              <div key={lead.title} className="border-b border-white/10 px-4 py-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                  Follow-up for “{lead.title}”
                </p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                  Text + email drafted — nothing sent yet
                </p>
              </div>
            ))}
            {/* Canonical approval CTA set (approvals-list.tsx / P3-E review) */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <span className="rounded-[100px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                Send it
              </span>
              {["Tweak it", "Drop it"].map((a) => (
                <span
                  key={a}
                  className="rounded-[100px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Third ask — campaigns, shown not told (P4-A). Dry-run preview,
              caps and opt-outs are guarantees #3/#4 — show them. */}
          <OwnerBubble>Text my ceramic customers from last spring a fall special.</OwnerBubble>

          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Campaign — dry-run preview
            </p>
            {[
              ["43 customers match", "Ceramic jobs, last spring"],
              ["3 opted out — excluded", "Before anything was staged"],
              ["Capped at 50 per run", "Hard limit, built in"],
            ].map(([title, meta]) => (
              <div key={title} className="border-b border-white/10 px-4 py-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{title}</p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{meta}</p>
              </div>
            ))}
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-[length:var(--sv-text-sm)] font-medium text-white">Drafts ready</p>
              <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                One text + email per customer — sends on your OK
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <span className="rounded-[100px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                Send it
              </span>
              {["Tweak it", "Drop it"].map((a) => (
                <span
                  key={a}
                  className="rounded-[100px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <p className="flex items-center gap-2 px-1 pt-1 text-[length:var(--sv-text-xs)] text-white/50">
            <Check size={13} strokeWidth={2.5} aria-hidden className="text-[var(--sv-accent-on-dark)]" />
            Activity log — follow-ups approved by you · sent · logged
          </p>
        </div>
      </div>

      {/* Whisper — the second way to hand Gradia work (P3-B) */}
      <div className="mt-14">
        <h3>Say it once. It&apos;s handled.</h3>
        <p className="mt-3 max-w-[36rem]">
          Hands full of buffer? Speak it — Gradia files it, quotes it and follows up, staged
          for your review.
        </p>
      </div>

      <div className="mt-8 rounded-[calc(var(--sv-radius)+10px)] bg-[var(--sv-graphite)] p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
          <p className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-white/40">
            Gradia Whisper
          </p>
          <p className="shrink-0 text-[length:var(--sv-text-xs)] text-white/30">Sample data</p>
        </div>

        <div className="space-y-3">
          <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
            <p className="flex items-center gap-1.5 text-[length:var(--sv-text-xs)] text-white/40">
              <Mic size={12} strokeWidth={2} aria-hidden />
              Voice note · 0:09
            </p>
            <p className="mt-1 text-[length:var(--sv-text-sm)] text-white">
              &ldquo;Just finished the X5 — quote {SAMPLE.firstName} for a maintenance plan and
              remind me to order pads.&rdquo;
            </p>
          </div>

          <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[80%]">
            <p className="border-b border-white/10 px-4 py-2.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
              Staged — waiting for your review
            </p>
            {[
              [`Quote drafted — ceramic maintenance plan`, `${SAMPLE.customer} · ${SAMPLE.vehicle}`],
              ["Task created — order pads", "On today's list once you confirm"],
              ["Reminder set — nudge you if the quote goes quiet", "Nothing sends without your OK"],
            ].map(([title, meta]) => (
              <div key={title} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{title}</p>
                <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-[44rem] text-[var(--sv-ink-2)]">
        Start with approvals. Give Gradia more responsibility when it&apos;s earned it.{" "}
        <span className="font-medium text-[var(--sv-ink)]">Money and calendar always ask.</span>
      </p>
    </Section>
  );
}
