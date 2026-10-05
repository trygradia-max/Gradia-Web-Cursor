import { PRODUCT_FAQS } from "../faqs/product";
import { Eyebrow, Lead, Section } from "../primitives";

/* Product-page FAQ subset — shared with FAQPage JSON-LD on /product (Pass 6). */

export function ProductFaq() {
  return (
    <Section>
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="max-w-[18ch]">Honest answers.</h2>
      <Lead>What owners ask before they start.</Lead>

      <div className="mt-10 max-w-[46rem] border-t border-[var(--sv-line-strong)]">
        {PRODUCT_FAQS.map((f) => (
          <details key={f.q} className="group border-b border-[var(--sv-line-strong)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-medium text-[var(--sv-ink)]">{f.q}</span>
              <span
                aria-hidden
                className="shrink-0 text-[var(--sv-ink-3)] transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[40rem] pb-5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
