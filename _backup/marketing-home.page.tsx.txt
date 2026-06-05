import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/marketing/HomeHero";
import { AnalyticsDashboardPreview } from "@/components/marketing/AnalyticsDashboardPreview";
import { RoiCalculator } from "@/components/marketing/RoiCalculator";
import { EightyPercentReveal } from "@/components/marketing/EightyPercentReveal";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { ResultsSection } from "@/components/marketing/ResultsSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { VerticalCompanyStatement } from "@/components/marketing/VerticalCompanyStatement";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { IntegrationsStrip } from "@/components/marketing/IntegrationsStrip";
import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";
import { Card } from "@/components/ui/Card";

const sectionShell =
  "mx-auto w-full max-w-content px-4 sm:px-6";

const sectionPad = "section-pad";

const bodyText = "text-[var(--muted)]";
const bodyTextBand = "text-[var(--text-muted-band)]";

const divide = "border-t border-[var(--border)]";

const bgDeep = "bg-[var(--bg)]";
const bgBand = "bg-[var(--bg-band)]";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Social proof — minimal & honest while in early access */}
      {/* When client logos are ready: replace this section with a logo bar
          (grayscale logos, single row) + 1-2 pull quotes below. One quote
          per row, full width, with name, company, and role. */}
      <section
        aria-label="Social proof"
        className="w-full bg-[#F5F5F5] py-[48px] lg:py-[64px]"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <div
            className="mb-8 border-t border-[#E5E7EB]"
            aria-hidden="true"
          />
          <p className="text-center font-sans text-sm text-[#6B7280]">
            Client stories coming soon — currently in early access.
          </p>
          <div
            className="mt-8 border-t border-[#E5E7EB]"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Integrations */}
      <section
        id="integrations"
        className={`w-full ${divide} ${bgDeep} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <IntegrationsStrip />
        </div>
      </section>

      {/* 3. The problem */}
      <ProblemSection />

      {/* 4. The solution */}
      <section id="the-solution" className={`w-full ${divide} ${bgBand} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Digital employees</SectionLabel>
            <h2 className="type-h2 mt-6 max-w-[30ch] text-[var(--black)]">
              An AI employee trained on your business. Not a chatbot.
            </h2>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Answers on your terms",
                body: "Follows your scripts, your tone, your escalation paths. Callers think they're talking to your team.",
              },
              {
                title: "Books without friction",
                body: "Appointments scheduled directly into your calendar. Intake forms completed. Confirmations sent.",
              },
              {
                title: "Reports everything",
                body: "Call summaries after every call. Recordings. Lead data. A live dashboard your team can actually use.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8 sm:p-10" hover tone="band">
                  <div className="h-px w-10 bg-[var(--brand-primary)]" aria-hidden />
                  <h3 className="type-h3 mt-8 text-[var(--black)]">{item.title}</h3>
                  <p className={`type-small mt-3 sm:text-base ${bodyTextBand}`}>
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      <FeaturesSection />

      {/* 5. Transparency / Live dashboard */}
      <section
        id="transparency"
        className={`w-full ${divide} ${bgBand} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Transparency</SectionLabel>
            <h2 className="type-h2 mt-6 max-w-[32ch] text-[var(--black)]">
              A dashboard that proves what&apos;s happening.
            </h2>
            <p className={`type-body mt-6 max-w-2xl sm:text-lg ${bodyTextBand}`}>
              No black box. No guessing. See every call, every outcome, every
              dollar captured.
            </p>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Live call feed",
                body: "Watch calls come in real-time. See who called, how long, what happened.",
              },
              {
                title: "ROI you can measure",
                body: "Track leads captured, appointments booked, and revenue influenced. Show your team exactly what Gradia is doing.",
              },
              {
                title: "Recordings + summaries",
                body: "Every call recorded. Every conversation summarized. Full accountability, zero micromanaging.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8 sm:p-10" hover tone="band">
                  <div className="h-px w-10 bg-[var(--brand-primary)]" aria-hidden />
                  <h3 className="type-h3 mt-8 text-[var(--black)]">{item.title}</h3>
                  <p className={`type-small mt-3 sm:text-base ${bodyTextBand}`}>
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
          <ScrollReveal className="mt-12 flex justify-center">
            <AnalyticsDashboardPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Workload relief — comparison */}
      <section
        id="workload-relief"
        className={`w-full ${divide} ${bgDeep} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Relief</SectionLabel>
            <h2 className="type-h2 mt-6 max-w-[36ch] text-[var(--black)]">
              Your team wasn&apos;t hired to answer phones.
            </h2>
            <p className={`type-body mt-8 max-w-3xl sm:text-lg ${bodyText}`}>
              Front-desk staff spend 60%+ of their day on calls. Most of those
              calls are routine — scheduling, intake, directions, hours. Gradia
              handles all of it. Your team gets their day back. Patients and
              customers still get a professional experience.
            </p>
          </ScrollReveal>
          <ScrollReveal className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-none border border-red-200 bg-[#fef2f2] p-8 sm:p-10">
              <h3 className="type-h3 text-[var(--black)]">Without Gradia</h3>
              <ul className={`mt-6 space-y-3 text-sm leading-relaxed sm:text-base ${bodyText}`}>
                <li>Missed calls when lines are busy</li>
                <li>Staff overwhelmed during peaks</li>
                <li>Leads lost to voicemail</li>
                <li>Inconsistent follow-up</li>
                <li>No clear picture of front-desk performance</li>
              </ul>
            </div>
            <div className="rounded-none border border-[var(--brand-primary)]/35 bg-[#eff6ff] p-8 sm:p-10">
              <h3 className="type-h3 text-[var(--black)]">With Gradia</h3>
              <ul className={`mt-6 space-y-3 text-sm leading-relaxed sm:text-base ${bodyText}`}>
                <li>Every call answered, every time</li>
                <li>Appointments booked automatically</li>
                <li>Leads captured and logged</li>
                <li>Full dashboard — calls, outcomes, recordings</li>
                <li>Your team focused on high-value work</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. 80% result */}
      <section className={`w-full ${divide} ${bgDeep} ${sectionPad}`}>
        <div className={`${sectionShell} text-center`}>
          <ScrollReveal>
            <SectionLabel>The result</SectionLabel>
            <div className="mt-10">
              <EightyPercentReveal />
            </div>
            <p className={`type-h3 mt-6 font-semibold text-[var(--gray)] sm:text-2xl`}>
              Starting day one.
            </p>
            <p className={`type-body mx-auto mt-10 max-w-2xl sm:text-lg ${bodyText}`}>
              Your receptionist is buried. Calls stack up. Leads slip. Gradia
              takes the weight off — answering every call, handling intake, booking
              appointments, and routing urgencies. Your team focuses on what they
              were hired to do.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. How it works */}
      <HowItWorksSection />

      {/* 9. Results / outcomes */}
      <ResultsSection />

      {/* Industries — who we work with */}
      <IndustriesSection />

      {/* ROI calculator */}
      <section
        id="roi-calculator"
        className={`w-full ${divide} ${bgBand} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>See your savings</SectionLabel>
            <h2 className="type-h2 mt-6 max-w-[32ch] text-[var(--black)]">
              Calculate what missed calls cost you.
            </h2>
          </ScrollReveal>
          <ScrollReveal className="mt-10">
            <RoiCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* Resources teaser */}
      <section className={`w-full ${divide} ${bgDeep} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Resources</SectionLabel>
            <h2 className="type-h2 mt-6 max-w-[28ch] text-[var(--black)]">
              Learn what a smarter front desk looks like.
            </h2>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Why Every Missed Call Costs More Than You Think",
                tag: "Guide",
                href: "/resources/why-every-missed-call-costs-more-than-you-think",
              },
              {
                title: "Front-Desk Automation for Healthcare Practices",
                tag: "Case study",
                href: "/resources/front-desk-automation-for-healthcare-practices",
              },
              {
                title: "The ROI of an Always-On Digital Front Desk",
                tag: "Whitepaper",
                href: "/resources/the-roi-of-an-always-on-digital-front-desk",
              },
            ].map((item) => (
              <li key={item.title}>
                {"href" in item && item.href ? (
                  <Link
                    href={item.href}
                    className="block h-full rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
                  >
                    <Card className="h-full p-8 sm:p-10" hover>
                      <span className="type-label inline-block rounded-none border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--blue)]">
                        {item.tag}
                      </span>
                      <h3 className="type-h3 mt-5 text-[var(--black)]">{item.title}</h3>
                    </Card>
                  </Link>
                ) : (
                  <Card className="h-full p-8 sm:p-10" hover>
                    <span className="type-label inline-block rounded-none border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--blue)]">
                      {item.tag}
                    </span>
                    <h3 className="type-h3 mt-5 text-[var(--black)]">{item.title}</h3>
                  </Card>
                )}
              </li>
            ))}
          </ScrollRevealStagger>
          <ScrollReveal className="mt-12 flex justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-primary-hover)]"
            >
              View all resources
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCtaSection />

      {/* 12. The Vertical Company */}
      <div className={divide}>
        <VerticalCompanyStatement />
      </div>
    </>
  );
}
