import { Eyebrow, Lead, Section } from "../primitives";
import { GraphiteFrame } from "./shared";

/* Campaigns — the full beat (Pass 5 Cycle 1). Audience → dry-run preview →
   drafts → Send it. Caps, opt-outs and cooldowns spelled out as guarantees
   #3/#4. NEVER auto-sent — always drafted → your OK. */

const steps = [
  {
    label: "You ask",
    body: "Text my ceramic customers from last spring a fall special.",
  },
  {
    label: "Audience preview",
    rows: [
      ["43 customers match", "Ceramic jobs, last spring"],
      ["3 opted out — excluded", "Honored before anything was staged"],
      ["Capped at 50 per run", "Hard limit, built in"],
      ["7-day cooldown", "Per customer, enforced"],
    ],
  },
  {
    label: "Drafts ready",
    body: "One text + email per customer — personalized from your shop voice. Nothing sent yet.",
  },
  {
    label: "Your OK",
    body: "Review, tweak or drop individual messages. Send it when you're ready.",
  },
];

export function ProductCampaigns() {
  return (
    <Section>
      <Eyebrow>Campaigns</Eyebrow>
      <h2 className="max-w-[22ch]">Reach your customers — on your terms.</h2>
      <Lead>
        Marketing campaigns by text and email, drafted for you and sent when you approve.
        Dry-run previews show exactly who will hear from you — with caps, cooldowns and
        opt-outs enforced before anything is staged.
      </Lead>

      <div className="mt-12">
        <GraphiteFrame label="Campaign — ceramic fall special">
          <div className="space-y-3">
            <div className="ml-auto max-w-[85%] rounded-[var(--sv-radius-sm)] bg-white/10 px-4 py-3 sm:max-w-[70%]">
              <p className="text-[length:var(--sv-text-xs)] text-white/40">You</p>
              <p className="mt-0.5 text-[length:var(--sv-text-sm)] text-white">{steps[0].body}</p>
            </div>

            <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[85%]">
              <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                Dry-run preview — before anything is staged
              </p>
              {steps[1].rows!.map(([title, meta]) => (
                <div key={title} className="border-b border-white/10 px-4 py-3">
                  <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{title}</p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">{meta}</p>
                </div>
              ))}
            </div>

            <div className="max-w-[92%] overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] sm:max-w-[85%]">
              <p className="border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                {steps[2].label} — waiting for your review
              </p>
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-[length:var(--sv-text-sm)] font-medium text-white">{steps[2].body}</p>
              </div>
              {[
                "Fall ceramic check-in — text + email",
                "Fall ceramic check-in — text + email",
                "Fall ceramic check-in — text + email",
              ].map((draft, i) => (
                <div key={draft + i} className="border-b border-white/10 px-4 py-3 last:border-b-0">
                  <p className="text-[length:var(--sv-text-sm)] text-white">{draft}</p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                    Customer {i + 1} of 43 · staged, not sent
                  </p>
                </div>
              ))}
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
              {steps[3].body} Outreach has hard caps and cooldowns — opt-outs are honored before
              staging. Nothing goes out on autopilot.
            </p>
          </div>
        </GraphiteFrame>
      </div>
    </Section>
  );
}
