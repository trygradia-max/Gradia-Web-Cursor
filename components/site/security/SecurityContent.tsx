import { TRIAL_CTA_HREF } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";

/* /security — audited truths only. No payment processor claims. D-067. */

const truths: { title: string; body: string }[] = [
  {
    title: "Your shop's data stays yours",
    body: "Every shop is isolated at the database layer — row-level security on all tables, with machine paths scoped to a single shop. The shop's data is the shop's.",
  },
  {
    title: "You're always in control",
    body: "Calendar bookings always ask first — enforced in code, not in prompts. Everything else starts suggest-first; earned autonomy is per-workflow, reversible and logged.",
  },
  {
    title: "Spending stops at the cap",
    body: "Credits use fail-closed machinery. At your ceiling, agents stop — Gradia never keeps spending. No surprise bills.",
  },
  {
    title: "Full audit trail",
    body: "Every agent run, plan and action is recorded. Approvals and changes are logged so you can see what happened and when.",
  },
  {
    title: "Consent and quiet hours",
    body: "STOP/opt-outs and quiet hours are enforced before anything is staged for your approval. Guardrails live in code.",
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
          Gradia handles customer records, quotes and approvals. Security is structural —
          approval gates, tenant isolation and fail-closed spending — not marketing adjectives.
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
          We do not claim certifications we have not earned. Customer-data export and self-serve
          deletion are on the roadmap — account removal today is a manual, founder-assisted
          process. Gradia is not a payment processor. Questions:{" "}
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
