import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBackdrop } from "@/components/marketing/HeroBackdrop";
import { HeroPortalDashboard } from "@/components/marketing/HeroPortalDashboard";
import { AnalyticsDashboardPreview } from "@/components/marketing/AnalyticsDashboardPreview";
import { RoiCalculator } from "@/components/marketing/RoiCalculator";
import { EightyPercentReveal } from "@/components/marketing/EightyPercentReveal";
import { PricingSection } from "@/components/marketing/PricingSection";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { VerticalCompanyStatement } from "@/components/marketing/VerticalCompanyStatement";
import { IntegrationsStrip } from "@/components/marketing/IntegrationsStrip";
import { LogoTrustStrip } from "@/components/marketing/LogoTrustStrip";
import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    title: "Discovery",
    body: "We learn your workflows, scripts, and escalation paths.",
  },
  {
    title: "Configuration",
    body: "Your digital employee is trained on your brand and your rules.",
  },
  {
    title: "Go Live",
    body: "Calls start getting answered. You start seeing results on day one.",
  },
];

const sectionShell =
  "mx-auto w-full max-w-content px-4 sm:px-6";

const sectionPad = "py-32 lg:py-44";

const sectionPadSocial = "py-24 lg:py-28";

const bodyText = "text-[#b0b0b0]";
const bodyTextBand = "text-[var(--text-muted-band)]";

const divide = "border-t border-[var(--border-subtle)]";

const bgDeep = "bg-[var(--bg)]";
const bgBand = "bg-[var(--bg-band)]";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero + dashboard */}
      <section
        className={`relative w-full overflow-hidden border-b border-[var(--border-subtle)] ${bgDeep}`}
      >
        <HeroBackdrop />
        <div
          className={`${sectionShell} relative z-[1] flex min-h-0 flex-col pb-16 pt-28 lg:pb-20 lg:pt-36`}
        >
          <ScrollReveal>
            <div className="relative max-w-[min(100%,44rem)]">
              <div
                className="pointer-events-none absolute -left-[8%] -top-[38%] h-[150%] w-[125%] max-w-[min(100vw,760px)] bg-[radial-gradient(ellipse_70%_55%_at_40%_35%,rgba(30,64,175,0.085),transparent_72%)] sm:-left-[4%]"
                aria-hidden
              />
              <h1 className="relative font-serif text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-[#ffffff]">
                Every call answered. Every lead captured. Nothing slips through.
              </h1>
            </div>
            <p
              className={`mt-8 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyText}`}
            >
              Gradia is your always-on digital frontline — answering calls, booking
              appointments, and qualifying leads 24/7. Your team runs the business.
              We run the front end.
            </p>
            <div className="mt-14">
              <Button
                href="mailto:hello@gradia.com?subject=Book%20a%20call"
                variant="primary"
              >
                Book a Call
              </Button>
            </div>
          </ScrollReveal>
          <HeroPortalDashboard />
        </div>
      </section>

      {/* 2. Social proof */}
      <section
        className={`w-full ${divide} ${bgBand} ${sectionPadSocial}`}
        aria-labelledby="social-stats"
      >
        <div className={sectionShell}>
          <ScrollRevealStagger
            id="social-stats"
            className="grid gap-6 sm:grid-cols-3 sm:gap-8"
          >
            {[
              {
                title: "24/7 Coverage",
                body: "Nights, weekends, holidays. Always on.",
              },
              {
                title: "< 2 sec",
                body: "Average answer time.",
              },
              {
                title: "Every Call",
                body: "Answered, logged, and followed up.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8 text-center sm:p-10" hover tone="band">
                  <p className="font-serif text-xl tracking-tight text-[#ffffff] sm:text-2xl">
                    {item.title}
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed sm:text-base ${bodyTextBand}`}>
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* Integrations + Trust */}
      <section
        id="integrations"
        className={`w-full ${divide} ${bgDeep} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <IntegrationsStrip />
          <div className="mt-24">
            <LogoTrustStrip />
          </div>
        </div>
      </section>

      {/* 3. The problem */}
      <section className={`w-full ${divide} ${bgDeep} ${sectionPad}`}>
        <div className={`${sectionShell} text-center`}>
          <ScrollReveal>
            <SectionLabel>The reality</SectionLabel>
            <h2 className="mx-auto mt-6 max-w-[28ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-[#ffffff]">
              Every missed call is revenue walking out the door.
            </h2>
            <p
              className={`mx-auto mt-10 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyText}`}
            >
              Your phones ring. Your team is busy. The caller hangs up and calls
              your competitor. It happens 10, 20, 50 times a week. Hiring more
              staff is expensive. Voicemail is where leads go to die. You&apos;re
              generating demand — but losing it at the front door.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. The solution */}
      <section id="the-solution" className={`w-full ${divide} ${bgBand} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Digital employees</SectionLabel>
            <h2 className="mt-6 max-w-[30ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
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
                  <h3 className="mt-8 font-serif text-xl tracking-tight text-[#ffffff]">
                    {item.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed sm:text-base ${bodyTextBand}`}>
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* 5. Transparency / Live dashboard */}
      <section
        id="transparency"
        className={`w-full ${divide} ${bgBand} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Transparency</SectionLabel>
            <h2 className="mt-6 max-w-[32ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              A dashboard that proves what&apos;s happening.
            </h2>
            <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyTextBand}`}>
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
                  <h3 className="mt-8 font-serif text-xl tracking-tight text-[#ffffff]">
                    {item.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed sm:text-base ${bodyTextBand}`}>
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
            <h2 className="mt-6 max-w-[36ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              Your team wasn&apos;t hired to answer phones.
            </h2>
            <p className={`mt-8 max-w-3xl text-base leading-relaxed sm:text-lg ${bodyText}`}>
              Front-desk staff spend 60%+ of their day on calls. Most of those
              calls are routine — scheduling, intake, directions, hours. Gradia
              handles all of it. Your team gets their day back. Patients and
              customers still get a professional experience.
            </p>
          </ScrollReveal>
          <ScrollReveal className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-[4px] border border-red-900/35 bg-[#140808] p-8 shadow-[inset_0_0_0_1px_rgba(127,29,29,0.15)] sm:p-10">
              <h3 className="font-serif text-xl text-white">Without Gradia</h3>
              <ul className={`mt-6 space-y-3 text-sm leading-relaxed sm:text-base ${bodyText}`}>
                <li>Missed calls when lines are busy</li>
                <li>Staff overwhelmed during peaks</li>
                <li>Leads lost to voicemail</li>
                <li>Inconsistent follow-up</li>
                <li>No clear picture of front-desk performance</li>
              </ul>
            </div>
            <div className="rounded-[4px] border border-[var(--brand-primary)]/35 bg-[#0a1020] p-8 shadow-[0_0_40px_-12px_rgba(30,64,175,0.35)] sm:p-10">
              <h3 className="font-serif text-xl text-white">With Gradia</h3>
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
            <p className={`mt-6 text-xl sm:text-2xl ${bodyText}`}>
              Starting day one.
            </p>
            <p
              className={`mx-auto mt-10 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyText}`}
            >
              Your receptionist is buried. Calls stack up. Leads slip. Gradia
              takes the weight off — answering every call, handling intake, booking
              appointments, and routing urgencies. Your team focuses on what they
              were hired to do.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Industries */}
      <section id="verticals" className={`w-full ${divide} ${bgBand} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Your industry</SectionLabel>
            <h2 className="mt-6 max-w-[24ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              One platform. Built for how you operate.
            </h2>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Healthcare",
                body: "Patient scheduling, intake routing, after-hours triage, HIPAA-ready.",
              },
              {
                title: "Home Services",
                body: "Job estimates, dispatch coordination, appointment booking, follow-up.",
              },
              {
                title: "Professional Services",
                body: "Client intake, consultation scheduling, follow-up automation.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8 sm:p-10" hover tone="band">
                  <h3 className="font-serif text-xl tracking-tight text-[#ffffff]">
                    {item.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-relaxed sm:text-base ${bodyTextBand}`}>
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* 9. How it works */}
      <section id="how-it-works" className={`w-full ${divide} ${bgDeep} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-6 max-w-[26ch] font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal leading-snug tracking-[-0.02em] text-[#ffffff]">
              Straightforward. No runaround.
            </h2>
          </ScrollReveal>
          <div className="relative mt-16">
            <div
              className="pointer-events-none absolute left-[6%] right-[6%] top-[13px] hidden h-px bg-[#333333] md:block"
              aria-hidden
            />
            <ScrollRevealStagger
              as="ol"
              className="relative z-[1] grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8"
            >
              {steps.map((step, i) => (
                <li key={step.title}>
                  <Card className="h-full p-8 sm:p-10" hover>
                    <span className="font-sans text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--brand-primary)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 font-serif text-xl tracking-tight text-[#ffffff]">
                      {step.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${bodyText}`}>
                      {step.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ScrollRevealStagger>
          </div>
        </div>
      </section>

      {/* 10. Outcomes */}
      <section id="outcomes" className={`w-full ${divide} ${bgBand} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Results</SectionLabel>
            <h2 className="mt-6 max-w-[28ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              Fewer missed calls. More booked appointments. Zero burnout.
            </h2>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              { stat: "80%", label: "Reduction in front-desk workload" },
              { stat: "3×", label: "More appointments booked in 30 days" },
              { stat: "0", label: "Missed calls after going live" },
            ].map((item) => (
              <li key={item.label}>
                <Card className="h-full p-8 text-center sm:p-10" hover tone="band">
                  <p className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight text-[#ffffff]">
                    {item.stat}
                  </p>
                  <p className={`mt-6 text-sm leading-relaxed sm:text-base ${bodyTextBand}`}>
                    {item.label}
                  </p>
                </Card>
              </li>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* 11. Pricing */}
      <section id="pricing" className={`w-full ${divide} ${bgDeep} ${sectionPad}`}>
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>Plans</SectionLabel>
            <h2 className="mt-6 max-w-[20ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              Simple pricing. Real outcomes.
            </h2>
          </ScrollReveal>
          <div className="mt-12">
            <PricingSection />
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section
        id="roi-calculator"
        className={`w-full ${divide} ${bgBand} ${sectionPad}`}
      >
        <div className={sectionShell}>
          <ScrollReveal>
            <SectionLabel>See your savings</SectionLabel>
            <h2 className="mt-6 max-w-[32ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
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
            <h2 className="mt-6 max-w-[28ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
              Learn what a smarter front desk looks like.
            </h2>
          </ScrollReveal>
          <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Why Every Missed Call Costs More Than You Think",
                tag: "Guide",
              },
              {
                title: "Front-Desk Automation for Healthcare Practices",
                tag: "Case study",
              },
              {
                title: "The ROI of an Always-On Digital Front Desk",
                tag: "Whitepaper",
              },
            ].map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8 sm:p-10" hover>
                  <span className="inline-block rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                    {item.tag}
                  </span>
                  <h3 className="mt-5 font-serif text-xl tracking-tight text-[#ffffff]">
                    {item.title}
                  </h3>
                </Card>
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

      {/* Relief CTA */}
      <section
        id="relief"
        className={`w-full ${divide} ${bgDeep} py-32 lg:py-40`}
      >
        <div className={`${sectionShell} text-center`}>
          <ScrollReveal>
            <h2 className="mx-auto max-w-[30ch] font-serif text-[clamp(1.85rem,3.4vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#ffffff]">
              Every call answered. Every caller taken care of. Nothing slips
              through.
            </h2>
            <p
              className={`mx-auto mt-8 max-w-xl text-base leading-relaxed sm:text-lg ${bodyText}`}
            >
              Your team runs the business. Gradia runs the front end.
            </p>
            <div className="mt-12">
              <Button
                href="mailto:hello@gradia.com?subject=Book%20a%20call"
                variant="primary"
              >
                Book a Call
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 13. The Vertical Company */}
      <div className={divide}>
        <VerticalCompanyStatement />
      </div>
    </>
  );
}
