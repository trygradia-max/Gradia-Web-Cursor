import type { Metadata } from "next";
import Link from "next/link";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Gradia Cover, Capture, and Control plans: a base fee that covers everything, plus a 0.5% performance fee only when we help you close.",
};

const planLabelBase =
  "text-xs font-medium uppercase tracking-[0.1em]";
const featureList =
  "mt-8 space-y-3 font-sans text-base leading-relaxed text-[#6B7280]";

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 text-[#3B6EF5]" aria-hidden>
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-[#FFFFFF] font-sans">
      {/* 1. Header */}
      <header className="bg-[#F5F5F5] py-[120px]">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Plans
          </p>
          <h1 className="mt-4 max-w-[700px] text-[clamp(2rem,4vw+1rem,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
            Simple pricing. We win when you win.
          </h1>
          <p className="mt-6 max-w-[700px] text-lg font-normal leading-relaxed text-[#6B7280]">
            A base fee that covers everything. A performance fee only when
            Gradia closes a deal.
          </p>
        </div>
      </header>

      {/* 2. Pricing cards */}
      <section className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-[80px]">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="grid gap-8 [grid-template-columns:1fr] min-[1024px]:[grid-template-columns:repeat(3,1fr)]">
            {/* Cover */}
            <div className="flex min-w-0 flex-col border border-[#E5E7EB] bg-[#FFFFFF] p-10">
              <p className={`${planLabelBase} text-[#6B7280]`}>Cover</p>
              <div className="mt-6 flex flex-wrap items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-[#0A0A0A]">
                  $597
                </span>
                <span className="text-xl font-normal text-[#6B7280]">/mo</span>
              </div>
              <p className="mt-2 text-sm text-[#6B7280]">+ $1,497 setup</p>
              <div className="my-8 border-t border-[#E5E7EB]" />
              <ul className={`${featureList} flex-1`}>
                <FeatureItem>Up to 500 calls/mo</FeatureItem>
                <FeatureItem>Voice channel</FeatureItem>
                <FeatureItem>Lead capture + appointment booking</FeatureItem>
                <FeatureItem>Live dashboard</FeatureItem>
                <FeatureItem>Spam protection</FeatureItem>
                <FeatureItem>Onboarding + support</FeatureItem>
                <FeatureItem>0.5% performance fee on confirmed sales</FeatureItem>
              </ul>
              <Link
                href={demoMailto}
                className="mt-10 block w-full rounded-none bg-[#0A0A0A] py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
              >
                Book a Demo
              </Link>
            </div>

            {/* Capture — most popular */}
            <div className="flex min-w-0 flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#3B6EF5]">
                Most popular
              </p>
              <div className="flex min-w-0 flex-1 flex-col border-2 border-[#3B6EF5] bg-[#FFFFFF] p-10">
                <p className={`${planLabelBase} text-[#3B6EF5]`}>Capture</p>
                <div className="mt-6 flex flex-wrap items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-[#0A0A0A]">
                    $1,197
                  </span>
                  <span className="text-xl font-normal text-[#6B7280]">/mo</span>
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">+ $2,997 setup</p>
                <div className="my-8 border-t border-[#E5E7EB]" />
                <ul className={`${featureList} flex-1`}>
                  <FeatureItem>Up to 1,200 calls/mo</FeatureItem>
                  <FeatureItem>Voice + SMS channels</FeatureItem>
                  <FeatureItem>Everything in Cover</FeatureItem>
                  <FeatureItem>CRM integration</FeatureItem>
                  <FeatureItem>Multi-location support (2 locations)</FeatureItem>
                  <FeatureItem>Priority support</FeatureItem>
                  <FeatureItem>0.5% performance fee on confirmed sales</FeatureItem>
                </ul>
                <Link
                  href={demoMailto}
                  className="mt-10 block w-full rounded-none bg-[#3B6EF5] py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Control */}
            <div className="flex min-w-0 flex-col border border-[#E5E7EB] bg-[#FFFFFF] p-10">
              <p className={`${planLabelBase} text-[#6B7280]`}>Control</p>
              <div className="mt-6 flex flex-wrap items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-[#0A0A0A]">
                  $3,497
                </span>
                <span className="text-xl font-normal text-[#6B7280]">/mo</span>
              </div>
              <p className="mt-2 text-sm text-[#6B7280]">+ $5,997 setup</p>
              <div className="my-8 border-t border-[#E5E7EB]" />
              <ul className={`${featureList} flex-1`}>
                <FeatureItem>Unlimited calls</FeatureItem>
                <FeatureItem>Voice + SMS + Email channels</FeatureItem>
                <FeatureItem>Everything in Capture</FeatureItem>
                <FeatureItem>Up to 5 locations</FeatureItem>
                <FeatureItem>Outbound calling</FeatureItem>
                <FeatureItem>Dedicated account manager</FeatureItem>
                <FeatureItem>HIPAA &amp; BAA compliance</FeatureItem>
                <FeatureItem>Custom integrations</FeatureItem>
                <FeatureItem>0.5% performance fee on confirmed sales</FeatureItem>
              </ul>
              <Link
                href={demoMailto}
                className="mt-10 block w-full rounded-none bg-[#0A0A0A] py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Performance fee explainer */}
      <section className="border-t border-[#E5E7EB] bg-[#F5F5F5] py-[80px]">
        <div className="mx-auto max-w-[680px] px-4 text-center sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            How the performance fee works
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw+1rem,40px)] font-bold leading-tight tracking-[-0.02em] text-[#0A0A0A]">
            We only win when you win.
          </h2>
          <div className="mt-8 space-y-6 text-left font-sans text-base leading-[1.8] text-[#6B7280]">
            <p>
              Every time Gradia books an appointment and your team confirms a
              closed deal, we take 0.5% of the confirmed deal value. That&apos;s
              it.
            </p>
            <p>
              No hidden fees. No inflated call counts. You confirm every sale
              directly in your dashboard. We invoice monthly based only on what
              you&apos;ve confirmed as sold.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
