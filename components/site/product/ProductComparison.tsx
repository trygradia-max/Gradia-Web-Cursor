import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* Category comparison — D-067 systems-of-record contrast. No payment claims. */

const rows: {
  pillar: string;
  industry: string;
  gradia: string;
  signature?: boolean;
}[] = [
  {
    pillar: "Does the work",
    industry: "You operate the CRM — click every step yourself",
    gradia: "The agent qualifies, drafts, proposes times and moves the pipeline — then reports it",
  },
  {
    pillar: "Asks first",
    industry: "Autopilot sends and books on its own",
    gradia: "Every outbound draft and booking is prepared and released on your OK",
    signature: true,
  },
  {
    pillar: "Built for this trade",
    industry: "Generic CRM with your industry pasted on",
    gradia: "Detailing, ceramic, PPF and tint natively — vehicles, coatings, follow-up cycles",
  },
];

export function ProductComparison() {
  return (
    <Section>
      <Eyebrow>Why Gradia</Eyebrow>
      <h2 className="max-w-[20ch]">Systems of record vs. does the work.</h2>
      <Lead>
        Jobber and Urable are systems of record you operate. Gradia does the work and reports
        it — with your approval on what goes out.
      </Lead>

      <div className="mt-10 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--sv-line-strong)]">
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]" />
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]">
                Systems of record
              </th>
              <th className="pb-4 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">
                Gradia
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.pillar} className="border-b border-[var(--sv-line)]">
                <th className="py-5 pr-6 align-top text-[length:var(--sv-text-sm)] font-semibold text-[var(--sv-ink)]">
                  {row.pillar}
                </th>
                <td className="py-5 pr-6 align-top text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
                  {row.industry}
                </td>
                <td className="py-5 align-top text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
                  {row.signature && (
                    <p className="mb-2 flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent)]">
                      <Check size={13} strokeWidth={2.5} aria-hidden />
                      Approved by you
                    </p>
                  )}
                  {row.gradia}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 lg:hidden">
        {rows.map((row) => (
          <Card key={row.pillar}>
            {row.signature && (
              <p className="mb-3 flex items-center gap-1.5 text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent)]">
                <Check size={13} strokeWidth={2.5} aria-hidden />
                Approved by you
              </p>
            )}
            <h3 className="text-[length:var(--sv-text-lg)]">{row.pillar}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">{row.gradia}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
