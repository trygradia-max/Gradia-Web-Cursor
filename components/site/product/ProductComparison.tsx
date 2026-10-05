import { Check } from "lucide-react";
import { Card, Eyebrow, Lead, Section } from "../primitives";

const rows: {
  pillar: string;
  other: string;
  gradia: string;
  signature?: boolean;
}[] = [
  {
    pillar: "The record",
    other: "Customer, quote and next step live in different tools",
    gradia: "One CRM for the customer, conversation, quote and calendar",
  },
  {
    pillar: "The Agent",
    other: "You operate every click, or a bot sends on its own",
    gradia: "Gradia prepares the next step. Customer-facing actions start with approval required",
    signature: true,
  },
  {
    pillar: "The shop",
    other: "Generic CRM, or a tool built only for large teams",
    gradia: "Detailing, coating, PPF and tint — solo or team, one location or mobile area",
  },
];

export function ProductComparison() {
  return (
    <Section>
      <Eyebrow>Why Gradia</Eyebrow>
      <h2 className="max-w-[20ch]">The customer and the next step, in one place.</h2>
      <Lead>
        Gradia is an AI-powered CRM for appearance businesses — not a payment processor, and not a
        complete shop-management suite.
      </Lead>

      <div className="mt-10 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--sv-line-strong)]">
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]" />
              <th className="pb-4 pr-6 text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-3)]">
                Typical tools
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
                  {row.other}
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
