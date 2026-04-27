import type { Metadata } from "next";
import Link from "next/link";
import { TheProofHeroStats } from "@/components/marketing/TheProofHeroStats";
import { TheProofTrendChart } from "@/components/marketing/TheProofTrendChart";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "The Proof",
  description:
    "Real outcomes from Gradia-powered businesses. Leads captured, revenue influenced, and booking rates from the last 30 days.",
};

export default function TheProofPage() {
  return (
    <div className="bg-white">
      {/* Section 1 — Opener */}
      <section
        className="flex min-h-[80vh] items-center justify-center bg-[#0A0A0A] px-4 py-24 sm:px-6 lg:px-12"
        aria-labelledby="proof-opener-heading"
      >
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            The Proof
          </p>
          <h1
            id="proof-opener-heading"
            className="mt-4 font-sans text-[40px] font-bold leading-[1.05] text-white sm:text-[56px] lg:text-[72px]"
          >
            The gap doesn&apos;t lie.
          </h1>
          <p className="font-sans text-[40px] font-bold leading-[1.05] text-[#3B6EF5] sm:text-[56px] lg:text-[72px]">
            Neither do the numbers.
          </p>
          <p className="mt-8 font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Real outcomes from Gradia-powered businesses.
          </p>
        </div>
      </section>

      {/* Section 2 — Hero Stats */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="proof-hero-stats-heading"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="proof-hero-stats-heading"
            className="text-center font-sans text-sm font-medium uppercase tracking-[0.1em] text-[#6B7280]"
          >
            Last 30 days. Across all Gradia clients.
          </h2>
          <div className="mt-12 lg:mt-20">
            <TheProofHeroStats />
          </div>
        </div>
      </section>

      {/* Section 3 — Volume Trend Chart */}
      <section
        className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
        aria-labelledby="proof-trend-heading"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Performance
          </p>
          <h2
            id="proof-trend-heading"
            className="mt-4 font-sans text-[28px] font-bold leading-tight text-[#0A0A0A] sm:text-[36px] lg:text-[48px]"
          >
            The trend line says it all.
          </h2>
          <p className="mt-3 max-w-[640px] font-sans text-base leading-[1.6] text-[#6B7280]">
            Leads captured and appointments booked — week over week.
          </p>
          <div className="mt-12 lg:mt-16">
            <TheProofTrendChart />
          </div>
        </div>
      </section>

      {/* Section 4 — Client Stories Placeholder */}
      {/*
        When client stories are ready, replace this section with:
        - One story per row, full width
        - Each story: business type, problem, result, pull quote
        - Quote: large italic, name + company + role below
      */}
      <section
        className="bg-white py-[80px]"
        aria-label="Client stories"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <div className="border-y border-[#E5E7EB] py-12 text-center">
            <p className="font-sans text-sm text-[#6B7280]">
              Client stories coming soon — currently in early access.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section
        className="bg-[#0A0A0A] py-[80px] text-center lg:py-[120px]"
        aria-labelledby="proof-cta-heading"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="proof-cta-heading"
            className="font-sans text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[56px]"
          >
            Ready to add your story?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Book a demo and see what Gradia does for your business.
          </p>
          <Link
            href={demoMailto}
            className="mt-10 inline-flex w-fit items-center justify-center bg-[#3B6EF5] px-12 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
          >
            Book a Demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
