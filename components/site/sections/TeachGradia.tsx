import { Eyebrow, Lead, Section } from "../primitives";

const menu: { row: string; value: string }[] = [
  { row: "Full Detail", value: "from $265" },
  { row: "Ceramic Maintenance", value: "from $220" },
  { row: "Hours", value: "Mon–Sat · 8–6" },
  { row: "Policy", value: "Ceramic coating needs paint correction first" },
];

const usedIn = ["Quotes", "Replies", "Pipeline", "Scheduling"];

export function TeachGradia() {
  return (
    <Section>
      <Eyebrow>Your shop&apos;s knowledge</Eyebrow>
      <h2 className="max-w-[16ch]">Teach Gradia your shop.</h2>
      <Lead>
        Services, packages, prices, policies and hours — entered once, then used as the source for
        quotes and drafts. Gradia uses customer and shop context; it does not claim to learn
        automatically from everything.
      </Lead>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="max-w-[36rem]">
            Every quote and draft reply can draw on the same menu and the same rules — so what is
            prepared is priced from your list and ready for your review.
          </p>
          <p className="mt-5 max-w-[36rem] font-medium text-[var(--sv-ink)]">
            Gradia writes as your shop — we, us, your name signed. Never a third-party bot.
          </p>
        </div>

        <div className="overflow-hidden rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)]">
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--sv-line)] bg-[var(--sv-wash)] px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sv-ink-3)]">
              Settings — Your shop
            </p>
            <p className="shrink-0 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
              Product preview · sample business data
            </p>
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
