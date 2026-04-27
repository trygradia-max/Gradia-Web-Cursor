import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Industry } from "@/lib/industries";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

const ctaButtonClass =
  "inline-flex w-fit items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-10 py-4 font-sans text-[15px] font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

const eyebrowClass =
  "font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]";

type IndustryPageLayoutProps = {
  industry: Industry;
};

export function IndustryPageLayout({ industry }: IndustryPageLayoutProps) {
  const { label, hero, pain, midCtaHeadline, solutions, finalCtaNoun } =
    industry;

  return (
    <div className="bg-white">
      {/* Section 1 — Hero (dark) */}
      <section
        className="flex min-h-[85vh] w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-20 text-center sm:px-6"
        aria-labelledby="industry-hero-heading"
      >
        <p className={eyebrowClass}>{label.toUpperCase()}</p>
        <h1
          id="industry-hero-heading"
          className="mx-auto mt-5 max-w-[800px] font-sans text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[72px]"
        >
          {hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
          {hero.sub}
        </p>
      </section>

      {/* Section 2 — The Pain (white, 2x2 grid) */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="industry-pain-heading"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12">
          <p className={eyebrowClass}>The Problem</p>
          <h2
            id="industry-pain-heading"
            className="mt-4 max-w-[820px] font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            {pain.headline}
          </h2>

          <ul
            className="mt-12 grid list-none grid-cols-1 border border-[#E5E7EB] lg:mt-16 lg:grid-cols-2"
            role="list"
          >
            {pain.points.map((point, i) => {
              const isLastMobile = i === pain.points.length - 1;
              const isLeftColLg = i % 2 === 0;
              const isBottomRowLg = i >= 2;
              return (
                <li
                  key={point.number}
                  className={cn(
                    "p-8 sm:p-10",
                    !isLastMobile && "border-b border-[#E5E7EB]",
                    isBottomRowLg && "lg:border-b-0",
                    isLeftColLg && "lg:border-r lg:border-[#E5E7EB]",
                  )}
                >
                  <p className="font-sans text-[11px] font-medium tracking-[0.05em] text-[#3B6EF5]">
                    {point.number}
                  </p>
                  <h3 className="mt-2 font-sans text-[20px] font-semibold leading-snug text-[#0A0A0A]">
                    {point.title}
                  </h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.6] text-[#6B7280]">
                    {point.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Section 3 — Mid-Page CTA (dark — the no-brainer moment) */}
      <section
        className="border-y border-[#1F1F1F] bg-[#0A0A0A] py-[60px] text-center lg:py-[80px]"
        aria-labelledby="industry-mid-cta-heading"
      >
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <h2
            id="industry-mid-cta-heading"
            className="font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]"
          >
            {midCtaHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-base leading-[1.6] text-[#8A8A8A]">
            Gradia closes the gap. Book a demo and see it work for your
            business.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={demoHref} className={ctaButtonClass}>
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 — How Gradia Fixes It (light gray, stacked rows) */}
      <section
        className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
        aria-labelledby="industry-solutions-heading"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12">
          <p className={eyebrowClass}>How Gradia Fixes It</p>
          <h2
            id="industry-solutions-heading"
            className="mt-4 max-w-[820px] font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            {solutions.headline}
          </h2>

          <ul className="mt-10 list-none lg:mt-14" role="list">
            {solutions.items.map((item, i) => {
              const isLast = i === solutions.items.length - 1;
              return (
                <li
                  key={item.number}
                  className={cn(
                    "grid grid-cols-1 gap-3 py-8 lg:grid-cols-[30%_1fr] lg:gap-12",
                    !isLast && "border-b border-[#E5E7EB]",
                  )}
                >
                  <div>
                    <p className="font-sans text-[11px] font-medium tracking-[0.05em] text-[#3B6EF5]">
                      {item.number}
                    </p>
                    <h3 className="mt-2 font-sans text-[20px] font-semibold leading-snug text-[#0A0A0A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.6] text-[#6B7280]">
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Section 5 — Final CTA (dark) */}
      <section
        className="bg-[#0A0A0A] py-[80px] text-center lg:py-[120px]"
        aria-labelledby="industry-final-cta-heading"
      >
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <h2
            id="industry-final-cta-heading"
            className="font-sans text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]"
          >
            Ready to close the gap?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Book a demo. See Gradia work for your {finalCtaNoun} in real time.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href={demoHref} className={ctaButtonClass}>
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
