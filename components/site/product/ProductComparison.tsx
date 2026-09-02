import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* Category comparison — three pillars vs "the industry default" (unnamed).
   Same frame as the homepage AsksFirst section (P3-F / Pass 5 note). */

const rows: {
  pillar: string;
  industry: string;
  gradia: string;
  signature?: boolean;
}[] = [
  {
    pillar: "Asks first",
    industry: "Autopilot sends, books and bills on its own",
    gradia: "Every message, booking and charge is prepared and sent on your OK",
    signature: true,
  },
  {
    pillar: "Predictable cost",
    industry: "Usage runs up with no ceiling",
    gradia: "Spending caps and owner-set ceilings — at the cap, Gradia stops",
  },
  {
    pillar: "Built for this trade",
    industry: "Generic CRM with your industry pasted on",
    gradia: "Detailing natively — services, vehicles, coatings, follow-up cycles",
  },
];

export function ProductComparison() {
  return (
    <Section>
      <Eyebrow>Why Gradia</Eyebrow>
      <h2 className="max-w-[18ch]">Gradia asks first.</h2>
      <Lead>
        The industry default is autopilot — AI that acts on its own. Gradia was built the
        other way.
      </Lead>

      <div className="mt-10 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--sv-line-strong)]">
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]" />
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]">
                The industry default
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
