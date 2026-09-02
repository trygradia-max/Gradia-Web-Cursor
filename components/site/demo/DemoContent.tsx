import { Mic, Play } from "lucide-react";
import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";
import { SAMPLE } from "../sample";
import { GraphiteFrame } from "../product/shared";

/* Pass 5 Cycle 4 — /demo. Claimable demo assets only (WHAT_GRADIA_DOES §7):
   (1) cold-lead revival → approval → send · (2) Whisper → staged work ·
   (3) campaign dry-run. Voice agent (#4) omitted — gated until acceptance run.
   Static walkthrough frames + video placeholder for a future recording. */

const demos = [
  {
    id: "revival",
    step: "1",
    title: "Revive a cold lead — then send on your OK",
    lead:
      "A quote went quiet. Gradia drafts a follow-up, shows it to you, and sends only after you approve.",
    label: "Cold-lead revival",
    frame: (
      <div className="space-y-3">
        <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
          <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Lead — quiet for 9 days
          </p>
          <div className="px-4 py-3">
            <p className="text-[length:var(--sv-text-sm)] font-medium text-white">PPF + ceramic ask</p>
            <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">$1,800 quote · no reply since last week</p>
          </div>
        </div>
        <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
          <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
            Prepared — waiting for your review
          </p>
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-[length:var(--sv-text-sm)] font-medium text-white">Follow-up — PPF + ceramic</p>
            <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">Text + email drafted — nothing sent yet</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 px-4 py-3">
            <span className="rounded-[6px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
              Send it
            </span>
            {["Tweak it", "Drop it"].map((a) => (
              <span
                key={a}
                className="rounded-[6px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <p className="px-1 text-[length:var(--sv-text-xs)] text-white/50">
          You tapped Send it · Sent ✓ · Logged in activity
        </p>
      </div>
    ),
  },
  {
    id: "whisper",
    step: "2",
    title: "Speak a note — staged work waits for you",
    lead:
      "Hands on the buffer? Say what you need. Gradia files it, quotes it and sets reminders — all staged for your review.",
    label: "Gradia Whisper",
    frame: (
      <div className="space-y-3">
        <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3">
          <p className="flex items-center gap-1.5 text-[length:var(--sv-text-xs)] text-white/40">
            <Mic size={12} strokeWidth={2} aria-hidden />
            Voice note · 0:09
          </p>
          <p className="mt-1 text-[length:var(--sv-text-sm)] text-white">
            &ldquo;Just finished the X5 — quote {SAMPLE.firstName} for a maintenance plan and remind me to order
            pads.&rdquo;
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
    ),
  },
  {
    id: "campaign",
    step: "3",
    title: "Run a campaign — dry-run first, send when ready",
    lead:
      "Ask in plain English. Gradia shows who matches, honors opt-outs and caps, drafts messages — then waits for your OK.",
    label: "Campaign dry-run",
    frame: (
      <div className="space-y-3">
        <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
          <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
          <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">
            Text my ceramic customers from last spring a fall special.
          </p>
        </div>
        <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
          <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
            Dry-run preview — before anything is staged
          </p>
          {[
            ["43 customers match", "Ceramic jobs, last spring"],
            ["3 opted out — excluded", "Honored before anything was staged"],
            ["Capped at 50 per run", "Hard limit, built in"],
          ].map(([title, meta]) => (
            <div key={title} className="border-b border-white/10 px-4 py-3">
              <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{title}</p>
              <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{meta}</p>
            </div>
          ))}
        </div>
        <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
          <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
            Drafts ready — waiting for your review
          </p>
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-[length:var(--sv-text-sm)] text-white">Fall ceramic check-in — text + email</p>
            <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">Customer 1 of 43 · staged, not sent</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 px-4 py-3">
            <span className="rounded-[6px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
              Send it
            </span>
            {["Tweak it", "Drop it"].map((a) => (
              <span
                key={a}
                className="rounded-[6px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
] as const;

export function DemoContent() {
  return (
    <>
      <Section>
        <Eyebrow>Demo</Eyebrow>
        <h1 className="max-w-[16ch]">See what Gradia actually does.</h1>
        <Lead>
          Three moments from a real shop day — revive a quiet quote, speak a note while you work,
          run a campaign with guardrails. Every outbound action waits for your approval.
        </Lead>
        <div className="mt-8">
          <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <div
          className="flex aspect-video flex-col items-center justify-center rounded-[var(--sv-radius)] border border-dashed border-[var(--sv-line-strong)] bg-[var(--sv-wash)] px-6 text-center"
          aria-label="Video walkthrough placeholder"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--sv-line-strong)] bg-[var(--sv-surface)]">
            <Play size={22} strokeWidth={1.75} className="ml-0.5 text-[var(--sv-ink-3)]" aria-hidden />
          </div>
          <p className="mt-5 text-[length:var(--sv-text-lg)] font-medium text-[var(--sv-ink)]">
            Walkthrough video — coming soon
          </p>
          <p className="mt-2 max-w-[28rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
            A recorded tour of the three demos below. For now, scroll through the static frames —
            same flows, same approval gates.
          </p>
        </div>
      </Section>

      {demos.map((demo, i) => (
        <Section key={demo.id} band={i % 2 === 1} id={demo.id}>
          <p className="mb-3 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
            Demo {demo.step}
          </p>
          <h2 className="max-w-[24ch]">{demo.title}</h2>
          <Lead>{demo.lead}</Lead>
          <div className="mt-10">
            <GraphiteFrame label={demo.label}>{demo.frame}</GraphiteFrame>
          </div>
        </Section>
      ))}

      <Section band>
        <p className="max-w-[42rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          Voice receptionist demos are not shown here — the live telephony acceptance run has not
          passed yet. When it does, this page will include an answered-call walkthrough.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
