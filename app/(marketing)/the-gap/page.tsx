import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { TheGapClockSequence } from "@/components/marketing/TheGapClockSequence";
import { TheGapCostIllustration } from "@/components/marketing/TheGapCostIllustration";
import { TheGapDataMoment } from "@/components/marketing/TheGapDataMoment";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "The Gap",
  description:
    "Every business has one. Most never see it. The story of the invisible gap — and how Gradia closes it.",
};

export default function TheGapPage() {
  return (
    <div className="bg-[#FFFFFF]">
      {/* Section 1 — Opening */}
      <section
        className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16 text-center"
        aria-labelledby="the-gap-opening-heading"
      >
        <h1
          id="the-gap-opening-heading"
          className="max-w-[800px] font-sans text-[40px] font-bold leading-[1.05] text-[#FFFFFF] sm:text-[56px] lg:text-[80px]"
        >
          Every business has one. Most never see it.
        </h1>
        <div className="mt-16 flex flex-col items-center">
          <ChevronDown
            className="h-6 w-6 animate-the-gap-arrow-pulse text-[#6B7280]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.1em] text-[#6B7280]">
            Scroll to see yours
          </p>
        </div>
      </section>

      {/* Section 2 — The Clock */}
      <TheGapClockSequence />

      {/* Section 3 — The Data Moment */}
      <TheGapDataMoment />

      {/* Section 4 — The Cost in Real Numbers */}
      <TheGapCostIllustration />

      {/* Section 5 — The Turn */}
      <section
        className="bg-[#0A0A0A] py-[80px] lg:py-[120px]"
        aria-labelledby="the-gap-turn-heading"
      >
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-12">
          <h2
            id="the-gap-turn-heading"
            className="font-sans text-[40px] font-bold leading-[1.05] text-[#FFFFFF] sm:text-[56px] lg:text-[72px]"
          >
            Gradia sits in the gap.
          </h2>
          <p className="mt-2 font-sans text-[40px] font-bold leading-[1.05] text-[#3B6EF5] sm:text-[56px] lg:text-[72px]">
            So nothing disappears.
          </p>
        </div>
      </section>

      {/* Section 6 — CTA (continuous from section 5) */}
      <section
        className="border-t border-[#1F1F1F] bg-[#0A0A0A] pb-[100px] pt-[60px] text-center lg:pb-[160px] lg:pt-[80px]"
        aria-labelledby="the-gap-cta-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="the-gap-cta-heading"
            className="font-sans text-[32px] font-bold leading-tight text-[#FFFFFF] sm:text-[40px] lg:text-[48px]"
          >
            Ready to close it?
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href={demoHref}
              className="inline-flex w-fit items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-10 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
