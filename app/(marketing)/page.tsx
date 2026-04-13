import { Clock, Phone, Target } from "lucide-react";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    title: "Always on",
    body: "Your digital employee answers and qualifies inbound volume 24/7—without burning out your front line.",
  },
  {
    title: "On brand",
    body: "Scripts, tone, and escalation paths match how you already train humans—consistency at scale.",
  },
  {
    title: "Measurable",
    body: "See calls handled, bookings created, and resolution trends in one client dashboard.",
  },
];

const proofPoints = [
  {
    title: "24/7 Coverage",
    body: "Consistent availability when your team is off the clock.",
    icon: Clock,
  },
  {
    title: "Every Call Answered",
    body: "No voicemail dead-ends—every ring gets a professional response.",
    icon: Phone,
  },
  {
    title: "Zero Missed Leads",
    body: "Capture and qualify intent before it cools off.",
    icon: Target,
  },
];

const steps = [
  {
    title: "Discovery",
    body: "We map your workflows, scripts, and escalation paths.",
  },
  {
    title: "Configuration",
    body: "Your digital employee is trained on your brand and policies.",
  },
  {
    title: "Go live",
    body: "Launch with monitoring, tuning, and a clear performance dashboard.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed dark */}
      <section className="relative w-full overflow-hidden bg-[var(--brand-dark)]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 20% 0%, rgba(245, 158, 11, 0.05), transparent 55%),
              radial-gradient(ellipse 70% 50% at 100% 30%, rgba(245, 158, 11, 0.04), transparent 50%),
              radial-gradient(ellipse 80% 40% at 50% 100%, rgba(148, 163, 184, 0.06), transparent 55%)
            `,
          }}
        />
        <div className="relative mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:py-24">
          <SectionLabel className="text-[var(--brand-amber)]">
            Digital employees
          </SectionLabel>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your front end, handled.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            AI Digital Employees that answer calls, capture leads, and run your
            operations — built for healthcare, finance, and service businesses.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              href="mailto:hello@gradia.com?subject=Book%20a%20call"
              variant="primary"
            >
              Book a Call
            </Button>
            <Button href="/#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Social proof — light */}
      <section
        className="w-full border-b border-[var(--border-card)] bg-white py-16 lg:py-24"
        aria-labelledby="social-proof-heading"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6">
          <h2
            id="social-proof-heading"
            className="max-w-2xl font-serif text-3xl font-normal tracking-tight text-[var(--brand-dark)] sm:text-4xl"
          >
            Trusted by teams in healthcare, finance, and services
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {proofPoints.map(({ title, body, icon: Icon }) => (
              <li key={title}>
                <Card className="h-full p-8" hover>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-card)] bg-[var(--brand-light)] text-[var(--brand-slate)]"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-[var(--brand-dark)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brand-slate)]">
                    {body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="product"
        className="w-full border-b border-[var(--border-card)] bg-[var(--brand-light)] py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6">
          <SectionLabel>Why Gradia</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal tracking-tight text-[var(--brand-dark)] sm:text-4xl">
            Built for operators who need reliability, not novelty.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--brand-slate)]">
            Whether you run a clinic, a service business, or a high-volume
            contact center, Gradia focuses on outcomes you can audit: fewer
            missed calls, faster bookings, cleaner handoffs.
          </p>
          <ul className="mt-14 grid gap-8 sm:grid-cols-3">
            {pillars.map((item) => (
              <li key={item.title}>
                <Card className="h-full p-8" hover>
                  <div
                    className="h-12 w-12 rounded-xl border border-[var(--border-card)] bg-white shadow-card"
                    aria-hidden
                  />
                  <h3 className="mt-6 font-serif text-xl text-[var(--brand-dark)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brand-slate)]">
                    {item.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="how-it-works"
        className="w-full border-b border-[var(--border-card)] bg-white py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-content px-4 sm:px-6">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal tracking-tight text-[var(--brand-dark)] sm:text-4xl">
            A disciplined rollout—no black box.
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full p-8" hover>
                  <span className="font-sans text-sm font-semibold text-[var(--brand-amber)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-[var(--brand-dark)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brand-slate)]">
                    {step.body}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="w-full bg-[var(--brand-dark)] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-content px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
            Ready for a conversation?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-300">
            Existing clients can sign in to review performance. New to Gradia?
            Book a call with our team.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="mailto:hello@gradia.com?subject=Book%20a%20call"
              variant="primary"
            >
              Book a Call
            </Button>
            <Button href="/portal/login" variant="secondary">
              Client login
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
