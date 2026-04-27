import type { Metadata } from "next";
import Link from "next/link";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";
import { cn } from "@/lib/cn";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with coverage. Scale to control. Cover ($299), Capture ($599), or Control ($999) — month-to-month, cancel anytime.",
};

const COVER_FEATURES = [
  "24/7 AI voice answering",
  "Lead capture + qualification",
  "SMS and email handling",
  "Appointment booking",
  "Live dashboard access",
  "Call recordings + summaries",
  "Spam filtering",
  "Up to 500 calls/month",
];

const CAPTURE_FEATURES = [
  "Everything in Cover",
  "Up to 1,500 calls/month",
  "Multi-location support",
  "CRM integration",
  "Priority response routing",
  "Advanced lead scoring",
  "Monthly performance report",
  "Dedicated onboarding",
];

const CONTROL_FEATURES = [
  "Everything in Capture",
  "Unlimited calls",
  "Custom AI voice + script",
  "White-glove onboarding",
  "Dedicated account manager",
  "Custom integrations",
  "SLA guarantee",
  "Quarterly business reviews",
];

type ComparisonValue = boolean | string;
type ComparisonRow = {
  feature: string;
  cover: ComparisonValue;
  capture: ComparisonValue;
  control: ComparisonValue;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "24/7 AI answering", cover: true, capture: true, control: true },
  { feature: "Lead capture", cover: true, capture: true, control: true },
  {
    feature: "Appointment booking",
    cover: true,
    capture: true,
    control: true,
  },
  {
    feature: "SMS + email handling",
    cover: true,
    capture: true,
    control: true,
  },
  { feature: "Live dashboard", cover: true, capture: true, control: true },
  { feature: "Call recordings", cover: true, capture: true, control: true },
  { feature: "Spam filtering", cover: true, capture: true, control: true },
  {
    feature: "Calls per month",
    cover: "500",
    capture: "1,500",
    control: "Unlimited",
  },
  {
    feature: "CRM integration",
    cover: false,
    capture: true,
    control: true,
  },
  { feature: "Multi-location", cover: false, capture: true, control: true },
  {
    feature: "Advanced lead scoring",
    cover: false,
    capture: true,
    control: true,
  },
  { feature: "Custom AI voice", cover: false, capture: false, control: true },
  {
    feature: "Dedicated account manager",
    cover: false,
    capture: false,
    control: true,
  },
  {
    feature: "Custom integrations",
    cover: false,
    capture: false,
    control: true,
  },
  { feature: "SLA guarantee", cover: false, capture: false, control: true },
];

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (typeof value === "string") {
    return (
      <span className="font-sans text-sm font-medium text-[#0A0A0A]">
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span
        aria-label="Included"
        className="font-sans text-base text-[#3B6EF5]"
      >
        ✓
      </span>
    );
  }
  return (
    <span
      aria-label="Not included"
      className="font-sans text-base text-[#E5E7EB]"
    >
      —
    </span>
  );
}

type PricingCardProps = {
  outcome: string;
  outcomeColor: string;
  name: string;
  price: string;
  features: readonly string[];
  ctaClassName: string;
  highlighted?: boolean;
  className?: string;
};

function PricingCard({
  outcome,
  outcomeColor,
  name,
  price,
  features,
  ctaClassName,
  highlighted,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col bg-white p-8 sm:p-10 lg:px-10 lg:py-12",
        className,
      )}
    >
      {highlighted && (
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[#3B6EF5] px-4 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-white"
          aria-hidden="true"
        >
          Most Chosen
        </span>
      )}
      <p
        className="font-sans text-xs font-medium"
        style={{ color: outcomeColor }}
      >
        {outcome}
      </p>
      <h3 className="mt-6 font-sans text-[28px] font-bold leading-none text-[#0A0A0A] sm:text-[32px]">
        {name}
      </h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-sans text-[44px] font-bold leading-none tabular-nums text-[#0A0A0A] sm:text-[56px]">
          {price}
        </span>
        <span className="font-sans text-base text-[#6B7280]">/month</span>
      </div>
      <p className="mt-2 font-sans text-[13px] leading-snug text-[#6B7280]">
        + 0.5% performance fee on confirmed deals
      </p>

      <div
        className="my-8 border-t border-[#E5E7EB]"
        aria-hidden="true"
      />

      <ul className="flex-1 space-y-2 font-sans text-sm leading-[1.8] text-[#6B7280]">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span
              className="shrink-0 select-none text-[#9CA3AF]"
              aria-hidden="true"
            >
              —
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={demoMailto}
        className={cn(
          "mt-10 flex w-full items-center justify-center px-6 py-[14px] font-sans text-sm font-medium text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]",
          ctaClassName,
        )}
      >
        Get Started →
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Section 1 — Opener */}
      <section
        className="bg-white pb-[80px] pt-[120px]"
        aria-labelledby="pricing-opener-heading"
      >
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Pricing
          </p>
          <h1
            id="pricing-opener-heading"
            className="mx-auto mt-4 max-w-[820px] font-sans text-[36px] font-bold leading-[1.05] text-[#0A0A0A] sm:text-[48px] lg:text-[64px]"
          >
            The right plan for where you are.
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-base leading-[1.6] text-[#6B7280] sm:text-lg">
            Start with coverage. Scale to control. No contracts. Cancel
            anytime.
          </p>
        </div>
      </section>

      {/* Section 2 — Plan Cards */}
      <section
        className="bg-white pb-[80px]"
        aria-label="Plans"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-0 lg:border lg:border-[#E5E7EB]">
            <PricingCard
              outcome="Never miss another call"
              outcomeColor="#6B7280"
              name="Cover"
              price="$299"
              features={COVER_FEATURES}
              ctaClassName="bg-[#0A0A0A] transition-[background-color] duration-150 ease-in-out hover:bg-[#1A1A1A]"
              className="border border-[#E5E7EB] lg:border-0 lg:border-r lg:border-r-[#E5E7EB]"
            />
            <PricingCard
              outcome="Turn every lead into an opportunity"
              outcomeColor="#3B6EF5"
              name="Capture"
              price="$599"
              features={CAPTURE_FEATURES}
              ctaClassName="bg-[#3B6EF5] transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8]"
              highlighted
              className="z-10 border-2 border-[#3B6EF5] lg:-m-px"
            />
            <PricingCard
              outcome="Full-stack revenue intelligence"
              outcomeColor="#6B7280"
              name="Control"
              price="$999"
              features={CONTROL_FEATURES}
              ctaClassName="bg-[#0A0A0A] transition-[background-color] duration-150 ease-in-out hover:bg-[#1A1A1A]"
              className="border border-[#E5E7EB] lg:border-0"
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Comparison Table */}
      <section
        id="pricing-comparison"
        className="scroll-mt-[88px] bg-[#F5F5F5] py-[80px]"
        aria-labelledby="pricing-comparison-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="pricing-comparison-heading"
            className="text-center font-sans text-[28px] font-bold leading-tight text-[#0A0A0A] sm:text-[32px] lg:text-[40px]"
          >
            Everything, side by side.
          </h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse border border-[#E5E7EB]">
              <thead>
                <tr className="bg-[#0A0A0A]">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left font-sans text-[13px] font-medium text-white"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-sans text-[13px] font-medium text-white"
                  >
                    Cover
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-sans text-[13px] font-medium text-white"
                  >
                    Capture
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-sans text-[13px] font-medium text-white"
                  >
                    Control
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-[#E5E7EB]",
                      i % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]",
                    )}
                  >
                    <th
                      scope="row"
                      className="px-6 py-[14px] text-left font-sans text-sm font-normal text-[#0A0A0A]"
                    >
                      {row.feature}
                    </th>
                    <td className="px-6 py-[14px] text-center align-middle">
                      <ComparisonCell value={row.cover} />
                    </td>
                    <td className="px-6 py-[14px] text-center align-middle">
                      <ComparisonCell value={row.capture} />
                    </td>
                    <td className="px-6 py-[14px] text-center align-middle">
                      <ComparisonCell value={row.control} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <section
        className="bg-white py-[80px]"
        aria-labelledby="pricing-faq-heading"
      >
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2
            id="pricing-faq-heading"
            className="text-center font-sans text-[28px] font-bold leading-tight text-[#0A0A0A] sm:text-[32px] lg:text-[40px]"
          >
            Common questions.
          </h2>
          <div className="mt-12">
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section
        className="bg-[#0A0A0A] py-[80px] text-center lg:py-[120px]"
        aria-labelledby="pricing-cta-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="pricing-cta-heading"
            className="font-sans text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[56px]"
          >
            Not sure which plan fits?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Book a demo and we&apos;ll tell you exactly what you need.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href={demoMailto}
              className="inline-flex w-fit items-center justify-center bg-[#3B6EF5] px-12 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Book a Demo →
            </Link>
            <a
              href="#pricing-comparison"
              className="font-sans text-sm text-[#6B7280] no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Or compare plans above ↑
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
