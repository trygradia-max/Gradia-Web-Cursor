import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { TheCostCalculator } from "@/components/marketing/TheCostCalculator";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "The Cost",
  description:
    "The Invisible Gap has a number — here's yours. Run the math on the leads you're losing today.",
};

const STATS = [
  {
    number: "78%",
    fact: "of customers go with the first business that responds.",
    context: "Being second isn't close. It's losing.",
  },
  {
    number: "35%",
    fact: "of inbound calls go unanswered at the average business.",
    context: "1 in 3 people calling you right now aren't getting through.",
  },
  {
    number: "80%",
    fact: "less likely to close a lead contacted after 5 minutes.",
    context: "Every minute of delay is a percentage point off your close rate.",
  },
  {
    number: "85%",
    fact: "of callers who reach voicemail won't call back.",
    context: "That's not a missed call. That's a closed door.",
  },
] as const;

export default function TheCostPage() {
  return (
    <div className="bg-white">
      {/* Section 1 — Opener */}
      <section
        className="flex h-[80vh] min-h-[640px] w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16 text-center"
        aria-labelledby="the-cost-opener-heading"
      >
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          The Cost of Waiting
        </p>
        <h1
          id="the-cost-opener-heading"
          className="mt-4 max-w-[800px] font-sans text-[40px] font-bold leading-[1.05] text-white sm:text-[56px] lg:text-[72px]"
        >
          The Invisible Gap has a number.
        </h1>
        <p className="font-sans text-[40px] font-bold leading-[1.05] text-[#3B6EF5] sm:text-[56px] lg:text-[72px]">
          Here&apos;s yours.
        </p>
        <p className="mx-auto mt-6 max-w-[520px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
          Most businesses don&apos;t know what they&apos;re losing. This
          calculator shows you exactly.
        </p>
        <div className="mt-12">
          <ChevronDown
            className="h-6 w-6 animate-the-gap-arrow-pulse text-[#6B7280]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Section 2 — ROI Calculator */}
      <TheCostCalculator />

      {/* Section 3 — The Truth */}
      <section
        className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
        aria-labelledby="the-cost-truth-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="the-cost-truth-heading"
            className="text-center font-sans text-[32px] font-bold leading-tight text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            The data doesn&apos;t lie either.
          </h2>

          <ul className="mt-12 grid grid-cols-1 gap-px border border-[#E5E7EB] bg-[#E5E7EB] sm:grid-cols-2 sm:mt-16">
            {STATS.map((stat) => (
              <li
                key={stat.number + stat.fact}
                className="flex flex-col bg-[#F5F5F5] p-8 sm:p-12 lg:p-14"
              >
                <p className="font-sans text-[56px] font-bold leading-none text-[#3B6EF5] sm:text-[64px] lg:text-[72px]">
                  {stat.number}
                </p>
                <p className="mt-4 font-sans text-base font-medium leading-snug text-[#0A0A0A]">
                  {stat.fact}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B7280]">
                  {stat.context}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section
        className="bg-[#0A0A0A] py-[80px] text-center lg:py-[120px]"
        aria-labelledby="the-cost-cta-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="the-cost-cta-heading"
            className="font-sans text-[40px] font-bold leading-[1.1] text-white sm:text-[56px] lg:text-[72px]"
          >
            Close the gap.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Start for $299/month. No contract. Cancel anytime.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={demoHref}
              className="inline-flex w-fit items-center justify-center rounded-none border-0 bg-[#3B6EF5] px-12 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
