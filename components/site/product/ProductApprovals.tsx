import { Eyebrow, Lead, Section } from "../primitives";

const levels = [
  {
    title: "Approval required (default)",
    body: "Customer-facing actions start with approval required. Gradia prepares drafts and next steps. You review, edit or hold — nothing sends until you approve.",
  },
  {
    title: "Planned per-action controls",
    body: "The finished controls will let the owner enable specific actions within defined rules. Connecting a channel does not automatically allow every action on it. This is planned, not claimed as live across every path today.",
  },
  {
    title: "Not in the initial MVP",
    body: "Payments, deposits, invoicing, point of sale and full work orders are out of scope. Bulk win-back and review-request campaigns are also outside this release.",
  },
];

export function ProductApprovals() {
  return (
    <Section band>
      <Eyebrow>Control</Eyebrow>
      <h2 className="max-w-[22ch]">You decide what goes out.</h2>
      <Lead>
        Connecting SMS, a website form or Meta Lead Ads does not turn on every action. Each
        channel is enabled after verification.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {levels.map((level, i) => (
          <div
            key={level.title}
            className={`rounded-[var(--sv-radius)] border p-6 sm:p-8 ${
              i === 0
                ? "border-[var(--sv-accent)] bg-[var(--sv-accent-soft)]"
                : "border-[var(--sv-line)] bg-[var(--sv-surface)]"
            }`}
          >
            <h3 className="text-[length:var(--sv-text-lg)]">{level.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{level.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
