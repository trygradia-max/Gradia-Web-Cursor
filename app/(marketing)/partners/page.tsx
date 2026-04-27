import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { PartnerApplicationForm } from "@/components/marketing/PartnerApplicationForm";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Gradia%20Partnership%20Question" as const;

const eyebrowClass =
  "font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]";

const ctaButtonClass =
  "inline-flex w-fit items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-10 py-4 font-sans text-[15px] font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Become a Gradia partner. Zero setup cost — pay only a 0.5% performance fee on closed deals. Apply to the partnership program.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners — Gradia",
    description:
      "Grow with Gradia. Zero setup cost. 0.5% performance fee on closed deals only.",
    url: "/partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners — Gradia",
    description:
      "Grow with Gradia. Zero setup cost. 0.5% performance fee on closed deals only.",
  },
};

type Item = { number: string; title: string; body: string };

const BENEFITS: Item[] = [
  {
    number: "01",
    title: "Zero setup cost",
    body: "Your onboarding and platform setup is completely waived. You get full access from day one with no upfront investment.",
  },
  {
    number: "02",
    title: "Performance-only pricing",
    body: "You pay a 0.5% performance fee on confirmed closed deals only. No base monthly cost. No risk. Just results.",
  },
  {
    number: "03",
    title: "Full platform access",
    body: "AI voice answering, lead capture, appointment booking, live dashboard — everything Gradia offers, fully active for your business.",
  },
  {
    number: "04",
    title: "Dedicated partner support",
    body: "Priority access to the Gradia team. Your questions get answered fast. Your setup is handled with care.",
  },
  {
    number: "05",
    title: "Partner dashboard",
    body: "Track your leads, calls, bookings, and performance fees in real time. Full visibility, always.",
  },
  {
    number: "06",
    title: "Early access to new features",
    body: "Partners get first access to new Gradia capabilities as they roll out. You grow with the product.",
  },
];

const STEPS: Item[] = [
  {
    number: "01",
    title: "Apply",
    body: "Fill out the partnership application below. Tell us about your business and why you want to partner with Gradia.",
  },
  {
    number: "02",
    title: "Get approved",
    body: "We review every application personally. If it's a fit, we'll reach out within 48 hours to get you set up.",
  },
  {
    number: "03",
    title: "Start closing",
    body: "Your account goes live. Gradia starts answering. You only pay when deals close.",
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-white">
      {/* Section 1 — Hero (dark) */}
      <section
        className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-20 text-center sm:px-6"
        aria-labelledby="partners-hero-heading"
      >
        <p className={eyebrowClass}>Partnership Program</p>
        <h1
          id="partners-hero-heading"
          className="mx-auto mt-4 max-w-[800px] font-sans text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[72px]"
        >
          Grow with Gradia. Pay only when you win.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
          Gradia partners get full platform access with zero setup cost. You
          only pay a 0.5% performance fee on deals you close.
        </p>
        <div className="mt-12">
          <ChevronDown
            className="h-6 w-6 animate-the-gap-arrow-pulse text-[#6B7280]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Section 2 — Partnership Benefits (white, 3x2 grid) */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="partners-benefits-heading"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12">
          <p className={eyebrowClass}>What You Get</p>
          <h2
            id="partners-benefits-heading"
            className="mt-4 max-w-[700px] font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            Everything Gradia offers. None of the setup cost.
          </h2>

          <ul
            className="mt-12 grid list-none grid-cols-1 border border-[#E5E7EB] lg:mt-16 lg:grid-cols-2"
            role="list"
          >
            {BENEFITS.map((b, i) => {
              const isLastMobile = i === BENEFITS.length - 1;
              const isLeftColLg = i % 2 === 0;
              const isLastRowLg = i >= BENEFITS.length - 2;
              return (
                <li
                  key={b.number}
                  className={cn(
                    "p-8 sm:p-10",
                    !isLastMobile && "border-b border-[#E5E7EB]",
                    isLastRowLg && "lg:border-b-0",
                    isLeftColLg && "lg:border-r lg:border-[#E5E7EB]",
                  )}
                >
                  <p className="font-sans text-[11px] font-medium tracking-[0.05em] text-[#3B6EF5]">
                    {b.number}
                  </p>
                  <h3 className="mt-2 font-sans text-[20px] font-semibold leading-snug text-[#0A0A0A]">
                    {b.title}
                  </h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.6] text-[#6B7280]">
                    {b.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Section 3 — How It Works (light gray, 3-step row) */}
      <section
        className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
        aria-labelledby="partners-how-heading"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-12">
          <p className={eyebrowClass}>How It Works</p>
          <h2
            id="partners-how-heading"
            className="mt-4 font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            Three steps to getting started.
          </h2>

          <ol
            className="mt-12 grid list-none grid-cols-1 lg:mt-16 lg:grid-cols-3"
            role="list"
          >
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <li
                  key={step.number}
                  className={cn(
                    "px-0 py-10 text-center lg:px-10 lg:py-0",
                    !isLast && "lg:border-r lg:border-[#E5E7EB]",
                  )}
                >
                  <p className="font-sans text-[44px] font-bold leading-none text-[#3B6EF5] sm:text-[48px]">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-sans text-[20px] font-semibold leading-snug text-[#0A0A0A]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[240px] font-sans text-[15px] leading-[1.6] text-[#6B7280]">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Section 4 — Application Form (white) */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="partners-form-heading"
      >
        <div className="mx-auto w-full max-w-[700px] px-4 sm:px-6">
          <p className={eyebrowClass}>Apply Now</p>
          <h2
            id="partners-form-heading"
            className="mt-4 font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px]"
          >
            Tell us about your business.
          </h2>
          <p className="mt-3 font-sans text-base leading-[1.6] text-[#6B7280]">
            We review every application personally. No automated rejections.
          </p>

          <PartnerApplicationForm />
        </div>
      </section>

      {/* Section 5 — Final CTA (dark) */}
      <section
        className="bg-[#0A0A0A] py-[80px] text-center lg:py-[120px]"
        aria-labelledby="partners-final-cta-heading"
      >
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <h2
            id="partners-final-cta-heading"
            className="font-sans text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]"
          >
            Questions before applying?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Reach out directly and we&apos;ll walk you through the program.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={demoHref} className={ctaButtonClass}>
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
