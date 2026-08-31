import { Eyebrow, Lead, Section } from "../primitives";

/* Section 5b — "Teach Gradia your shop." (P4-E, founder addition
   2026-08-30; restores the original plan's knowledge section). Placed
   after Core operating system — the brain explains the panels just shown.
   Real product framing: Settings → shop profile / service menu (pilot).
   Menu math stays SAMPLE-consistent: $265 + $220 = Sarah's $485 package.
   Persona beat = guarantee #2 verbatim territory. No voice mentions while
   §7 is hidden. Wash band; alternation recomputed downstream (Agent →
   light, AsksFirst → band, Industries → light, FAQ → band). */

const menu: { row: string; value: string }[] = [
  { row: "Full Detail", value: "from $265" },
  { row: "Ceramic Maintenance", value: "from $220" },
  { row: "Hours", value: "Mon–Sat · 8–6" },
  { row: "Policy", value: "Ceramic coating needs paint correction first" },
  { row: "How we talk to customers", value: "We/us · your shop's name signed" },
];

const usedIn = ["Quotes", "Replies", "Campaigns", "Scheduling"];

export function TeachGradia() {
  return (
    <Section band>
      <Eyebrow>Your shop&apos;s knowledge</Eyebrow>
      <h2 className="max-w-[16ch]">Teach Gradia your shop. Once.</h2>
      <Lead>
        Services, packages, prices, policies, hours, and how you talk — in once, used
        everywhere.
      </Lead>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="max-w-[36rem]">
            Every quote, reply and campaign draws on the same menu and the same rules — so
            what goes out is priced right and sounds right.
          </p>
          <p className="mt-5 max-w-[36rem] font-medium text-[var(--sv-ink)]">
            Gradia writes as your shop — we, us, your name signed. Never a third-party bot.
          </p>
          <p className="mt-5 max-w-[34rem] text-[length:var(--sv-text-sm)]">
            <span className="italic text-[var(--sv-ink-3)]">
              &ldquo;Does ceramic need paint correction first?&rdquo;
            </span>{" "}
            <span className="whitespace-nowrap font-semibold text-[var(--sv-ink)]">Ask Gradia.</span>{" "}
            <span className="text-[var(--sv-ink-3)]">
              Answered from your menu, not the internet.
            </span>
          </p>
        </div>

        <div className="overflow-hidden rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)]">
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
              Settings — Your shop
            </p>
            <p className="shrink-0 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">Sample data</p>
          </div>
          {menu.map((m, i) => (
            <div
              key={m.row}
              className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-4 py-3 sm:px-5 ${
                i > 0 ? "border-t border-[var(--sv-line)]" : ""
              }`}
            >
              <p className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink)]">{m.row}</p>
              <p className="text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">{m.value}</p>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-2 border-t border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
              Used in
            </p>
            {usedIn.map((u) => (
              <span
                key={u}
                className="rounded-[6px] border border-[var(--sv-line-strong)] bg-[var(--sv-surface)] px-2 py-0.5 text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink-2)]"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
