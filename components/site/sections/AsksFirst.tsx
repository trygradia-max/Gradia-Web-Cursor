import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

const cards: { title: string; body: string; signature?: boolean }[] = [
  {
    title: "Approval required first",
    body: "Customer-facing actions start with approval required. You see the draft, then you decide.",
    signature: true,
  },
  {
    title: "One Agent",
    body: "One Gradia Agent works across enabled capabilities — not a separate bot for each channel. Whisper is the shared communications experience.",
  },
  {
    title: "Your shop's rules",
    body: "The finished controls will let owners enable specific actions within defined rules. Connecting a channel does not turn everything on.",
  },
];

export function AsksFirst() {
  return (
    <Section band>
      <Eyebrow>Control</Eyebrow>
      <h2 className="max-w-[18ch]">You stay in control of what goes out.</h2>
      <Lead>
        Gradia prepares the next step from your customers, menu and calendar. You approve
        customer-facing actions. Planned autonomy is per action, not a default.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.title}>
            {c.signature && (
              <p className="mb-3 flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent)]">
                <Check size={13} strokeWidth={2.5} aria-hidden />
                Approved by you
              </p>
            )}
            <h3 className="text-[length:var(--sv-text-lg)]">{c.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{c.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
