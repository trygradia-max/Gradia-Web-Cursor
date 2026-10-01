import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { FinalCta } from "../sections/FinalCta";

const truths: { title: string; body: string }[] = [
  {
    title: "Your shop's data stays yours",
    body: "Every shop is isolated at the database layer — row-level security on all tables, with machine paths scoped to a single shop.",
  },
  {
    title: "You're always in control",
    body: "Customer-facing actions start with approval required. Connecting a channel does not automatically allow every action on it.",
  },
  {
    title: "Full audit trail",
    body: "Agent runs, plans and actions are recorded so you can see what was proposed, held, executed or failed.",
  },
  {
    title: "Consent and opt-out",
    body: "STOP, do-not-contact and destination-bound permissions are treated as hard constraints. A pilot request is not blanket consent for marketing texts.",
  },
  {
    title: "Credentials encrypted at rest",
    body: "Per-shop credentials are stored with AES-256-GCM encryption. Provider webhooks are signature-verified and fail closed when secrets are unset.",
  },
];

export function SecurityContent() {
  return (
    <>
      <Section>
        <Eyebrow>Security</Eyebrow>
        <h1 className="max-w-[18ch]">Built to ask first — in product and in posture.</h1>
        <Lead>
          Gradia handles customer records, quotes and approvals. The practices below are specific
          and verified. We do not claim certifications, recovery targets or blanket guarantees.
        </Lead>
        <div className="mt-8">
          <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
            {PILOT_CTA_LABEL}
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
          We do not claim certifications we have not earned. Customer-data export is part of the
          intended product; self-serve deletion is not claimed as complete. Account removal today
          is a manual, founder-assisted process. Gradia is not a payment processor. Questions:{" "}
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
