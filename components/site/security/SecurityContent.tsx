import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";

/* Pass 5 Cycle 3 — /security. Only audited truths from platform/docs/gradia-v2/08 —
   no certification claims, no audit scores, no "bank-level" fluff. */

const truths: { title: string; body: string }[] = [
  {
    title: "Your shop's data stays yours",
    body: "Every shop is isolated at the database layer — row-level security on all tables, with machine paths scoped to a single shop. The shop's data is the shop's.",
  },
  {
    title: "You're always in control",
    body: "Money and calendar actions always ask first — enforced in code, not in prompts. Everything else starts suggest-first; earned autonomy is per-workflow, reversible and logged.",
  },
  {
    title: "Spending stops at the cap",
    body: "Credits and voice minutes use fail-closed machinery. At your ceiling, agents stop and voice degrades gracefully — Gradia never keeps spending. No surprise bills.",
  },
  {
    title: "Full audit trail",
    body: "Every agent run, plan and action is recorded. Approvals, sends and changes are logged so you can see what happened and when.",
  },
  {
    title: "Outreach guardrails built in",
    body: "Recipient caps per run, cooldowns between touches, and STOP/opt-outs honored before anything is staged for your approval. Dry-run previews before workflows go live.",
  },
  {
    title: "Credentials encrypted at rest",
    body: "Per-shop credentials are stored with AES-256-GCM encryption. Provider webhooks are signature-verified with constant-time comparison and fail closed when secrets are unset.",
  },
];

export function SecurityContent() {
  return (
    <>
      <Section>
        <Eyebrow>Security</Eyebrow>
        <h1 className="max-w-[18ch]">Built to ask first — in product and in posture.</h1>
        <Lead>
          Gradia handles customer conversations, quotes and money-adjacent work. Security is
          structural — approval gates, tenant isolation and fail-closed spending — not
          marketing adjectives.
        </Lead>
        <div className="mt-8">
          <Button href={TRIAL_CTA_HREF} variant="primary" size="lg">
            Start your trial
          </Button>
        </div>
      </Section>

      <Section band>
        <div className="grid gap-5 md:grid-cols-2">
          {truths.map((item) => (
            <Card key={item.title}>
              <h2 className="text-[length:var(--sv-text-lg)]">{item.title}</h2>
              <p className="mt-3 text-[length:var(--sv-text-sm)] leading-relaxed text-[var(--sv-ink-2)]">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-10 max-w-[42rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
          We do not claim certifications we have not earned. Customer-data export and
          self-serve deletion are on the roadmap — account removal today is a manual,
          founder-assisted process. Questions:{" "}
          <a
            href="mailto:trygradia@gmail.com"
            className="text-[var(--sv-accent)] underline-offset-4 hover:underline"
          >
            trygradia@gmail.com
          </a>
          .
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
