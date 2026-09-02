import { Eyebrow, Lead, Section } from "../primitives";

/* Approvals + earned autonomy — suggest-first default, autonomy is a choice.
   No tier names or pricing (claim law). Money + calendar always ask. */

const levels = [
  {
    title: "Suggest-first (default)",
    body: "Gradia prepares every message, follow-up and campaign draft. You review, edit or discard — nothing sends until you approve.",
  },
  {
    title: "Earned autonomy (your choice)",
    body: "When Gradia has earned your trust on a specific workflow, you can let it run with less friction — per workflow, reversible, fully logged with undo.",
  },
  {
    title: "Hard floor — never changes",
    body: "Money and calendar always ask. No setting, mode or tier bypasses this. Charges and bookings need your OK every time.",
  },
];

export function ProductApprovals() {
  return (
    <Section band>
      <Eyebrow>Control</Eyebrow>
      <h2 className="max-w-[22ch]">You decide how much Gradia does.</h2>
      <Lead>
        Everything starts suggest-first. Give Gradia more responsibility when it&apos;s earned
        it — and pull it back any time.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {levels.map((level, i) => (
          <div
            key={level.title}
            className={`rounded-[var(--sv-radius)] border p-6 sm:p-8 ${
              i === 2
                ? "border-[var(--sv-accent)] bg-[var(--sv-accent-soft)]"
                : "border-[var(--sv-line)] bg-[var(--sv-surface)]"
            }`}
          >
            <h3 className="text-[length:var(--sv-text-lg)]">{level.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{level.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-[44rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
        Every run, plan and action is recorded in a full audit trail. Gradia writes as your
        shop — &ldquo;we,&rdquo; your name, your voice — never as a third-party bot.
      </p>
    </Section>
  );
}
