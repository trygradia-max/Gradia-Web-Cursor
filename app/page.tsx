import type { Metadata } from "next";
import { ArrowRight, PhoneCall, Star, Receipt } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Logo } from "@/components/ui/Logo";
import { WaitlistHeader } from "@/components/waitlist/WaitlistHeader";
import { CaptureDemo } from "@/components/waitlist/CaptureDemo";
import { CastTabs } from "@/components/waitlist/CastTabs";
import { AgentDay } from "@/components/waitlist/AgentDay";
import { DailyBrief } from "@/components/waitlist/DailyBrief";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { WaitlistFAQ } from "@/components/waitlist/WaitlistFAQ";
import { WaitlistFooter } from "@/components/waitlist/WaitlistFooter";
import { AnimatedShaderHero } from "@/components/waitlist/AnimatedShaderHero";
import { SpiralBackdrop } from "@/components/waitlist/SpiralBackdrop";
import { DottedBackdrop } from "@/components/waitlist/DottedBackdrop";
import { SparklesBackdrop } from "@/components/waitlist/SparklesBackdrop";
import { CommandCenterMock } from "@/components/waitlist/CommandCenterMock";
import { BookingCalendar } from "@/components/waitlist/BookingCalendar";
import { IntegrationsOrbit } from "@/components/waitlist/IntegrationsOrbit";
import { ModeToggle } from "@/components/waitlist/ModeToggle";
import { CrmAgentDemo } from "@/components/waitlist/CrmAgentDemo";
import { WhisperDemo } from "@/components/waitlist/WhisperDemo";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import DisplayCards from "@/components/ui/DisplayCards";
import { getWaitlistCount } from "@/lib/waitlist";

const PROOF_CARDS = [
  {
    icon: <PhoneCall className="size-4 text-white" />,
    title: "Missed call → booked",
    description: "Receptionist replied in 4 seconds",
    date: "9:47 PM",
  },
  {
    icon: <Star className="size-4 text-white" />,
    title: "New 5-star review",
    description: "Reviewer asked at the right moment",
    date: "Today",
  },
  {
    icon: <Receipt className="size-4 text-white" />,
    title: "$640 collected",
    description: "Collector chased the invoice",
    date: "2h ago",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Gradia — Your 7-agent front office for car detailers",
  },
  description:
    "Gradia is 7 AI agents that answer your calls, quote every car, fill your calendar, and chase your invoices — so you keep your hands on the car. Join the waitlist.",
  openGraph: {
    title: "Gradia — Your 7-agent front office for car detailers",
    description:
      "7 AI agents that answer your calls, quote every car, fill your calendar, and chase your invoices. Join the waitlist.",
  },
};

const WHY_STATS = [
  { stat: "62%", label: "of detailer calls go to voicemail — and most never call back." },
  { stat: "7", label: "agents working your front office, around the clock." },
  { stat: "24/7", label: "answering, quoting, and booking — even while you detail." },
];

export default async function WaitlistPage() {
  const waitlistCount = await getWaitlistCount();

  return (
    <div id="top" className="min-h-[100svh] bg-[var(--bg)]">
      <WaitlistHeader />

      <main>
        {/* ---------------------------------------------------------------- */}
        {/* Hero — animated WebGL nebula shader                              */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedShaderHero />

        {/* ---------------------------------------------------------------- */}
        {/* Live capture demo                                                */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                Live
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                A lead comes in. It&rsquo;s handled before you wake up.
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <CaptureDemo />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Features intro + cast tabs                                       */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="cast"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Built to run the front office while you detail.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                In the bay, on a job, or off the clock — your 7 agents handle the
                calls, quotes, bookings, and follow-ups. One system. Nothing
                falls through.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <CastTabs />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section reveal — scroll-tilt command center                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="overflow-hidden border-t border-[var(--border)]">
          <ContainerScroll
            titleComponent={
              <div className="mb-2 px-5">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                  The command center
                </span>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
                  One screen. Your whole shop.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
                  Every call, quote, booking, and payment your agents handled —
                  in one place you own.
                </p>
              </div>
            }
          >
            <CommandCenterMock />
          </ContainerScroll>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* A full day — swipeable 7 agents                                  */}
        {/* ---------------------------------------------------------------- */}
        <section id="day" className="py-20 sm:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal>
              <AgentDay />
            </ScrollReveal>
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
              <p className="text-lg font-medium text-[var(--foreground)]">
                One front office. Every part of the day.
              </p>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                See pricing <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Scheduler — two weeks booked + ceramic upsells                   */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="schedule"
          className="border-t border-[var(--border)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                The Scheduler
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Two weeks, booked solid — upsells included.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Your Scheduler fills the calendar while you work, and the
                Estimator layers ceramic-coating upsells onto the right jobs.
                You just show up and detail.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <BookingCalendar />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Daily brief                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="brief"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal>
              <DailyBrief />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Waitlist form                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="waitlist"
          className="scroll-mt-16 border-t border-[var(--border)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <WaitlistForm count={waitlistCount} />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Control — approval vs agentic mode                               */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="control"
          className="border-t border-[var(--border)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                You&rsquo;re always in control
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Approve every move — or let it run.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Start in approval mode and OK each action. When you trust it,
                flip one switch and your agents go fully autonomous. Try it.
              </p>
            </ScrollReveal>
            <ModeToggle />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Why Gradia — the math                                            */}
        {/* ---------------------------------------------------------------- */}
        <section id="why" className="py-20 sm:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                Why Gradia
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Hire your whole front office for less than one detail a month.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Every missed call is a job that went to the next shop. Gradia
                catches all of them — and keeps the rest of your back office
                moving while you work.
              </p>
            </ScrollReveal>
            <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
              {WHY_STATS.map((s) => (
                <div key={s.stat} className="bg-[var(--bg)] p-8 text-center">
                  <p className="text-4xl font-bold tracking-tight text-[var(--brand-primary)]">
                    {s.stat}
                  </p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Integrations — orbit around Gradia AI                            */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden border-t border-[var(--border)] bg-[#0a0810] py-16 sm:py-20">
          <div className="relative z-10 mx-auto max-w-content px-5 text-center sm:px-8">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#a78bfa]">
              One brain, your whole stack
            </span>
            <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Gradia AI sits at the center of it all.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Your CRM, texting, email marketing, payments, reviews, and Gradia
              Whisper all run through one brain. Tap a node to see how it
              connects.
            </p>
          </div>
          <div className="relative z-10 mt-2">
            <IntegrationsOrbit />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CRM agent — chat to action                                       */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="crm"
          className="border-t border-[var(--border)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                The CRM agent
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Just ask. It works your whole customer list.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Type it like you&rsquo;d text an employee. Gradia opens your CRM,
                pulls the right customers, and sends — in seconds.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <CrmAgentDemo />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Gradia Whisper — ask your shop anything                          */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="whisper"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                Gradia Whisper
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Ask your shop anything.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Speak or type a question and get the number, instantly — no
                dashboards, no spreadsheets.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <WhisperDemo />
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Your shop / data                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="data"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                Your shop
              </span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Your clients and data — always yours.
              </h2>
              <p className="mt-4 text-[var(--muted)]">
                Every customer, vehicle, quote, and job lives in one place you
                fully own and can export anytime. Switch tools whenever you
                want — your shop comes with you. Independent, portable, yours.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Anticipation — dotted surface wave before the proof              */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-t border-[var(--border)] bg-[#0a0810]">
          <DottedBackdrop />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(10,8,16,0.4) 55%, #0a0810 88%)",
            }}
          />
          <ScrollReveal className="relative z-10 mx-auto max-w-2xl px-5 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#a78bfa]">
              While you sleep
            </span>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Your shop never stops moving.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/60">
              Calls answered. Cars quoted. Jobs booked. Invoices collected. Every
              ripple below is a job your agents handled overnight — here&rsquo;s
              the proof.
            </p>
          </ScrollReveal>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Social proof — stacked display cards                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-t border-[var(--border)] py-20 sm:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <ScrollReveal>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                  Proof
                </span>
                <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Real work, handled while you sleep.
                </h2>
                <p className="mt-4 max-w-md text-[var(--muted)]">
                  Every night your agents answer texts, quote cars, book jobs,
                  and collect deposits. You wake up to the results — not the
                  busywork.
                </p>
              </ScrollReveal>
              <div className="flex min-h-[16rem] items-center justify-center overflow-hidden sm:min-h-[20rem]">
                {/* the skewed stack is ~450px wide by design — scale it down on
                    phones so it fits instead of overflowing the viewport */}
                <div className="origin-center scale-[0.72] sm:scale-100">
                  <DisplayCards cards={PROOF_CARDS} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="faq"
          className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <ScrollReveal>
              <WaitlistFAQ />
            </ScrollReveal>
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        {/* Finale CTA — spiral backdrop                                     */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0a0810] py-28 sm:py-40">
          <SpiralBackdrop scale={1} />
          {/* vignette so the form CTA and text stay legible */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(10,8,16,0.55) 60%, #0a0810 85%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-content px-5 text-center sm:px-8">
            <div className="mb-6 flex justify-center">
              <Logo variant="light" className="text-2xl" />
            </div>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Your shop, fully staffed.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Hire your 7-agent front office and keep your hands on the car. The
              first 1,000 detailers get 50% off year one.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#waitlist"
                className="wl-cta inline-flex items-center gap-2 rounded-[100px] bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0810] transition-transform hover:scale-[1.02]"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        {/* Sparkles CTA — the last word                                     */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0a0810]">
          <SparklesBackdrop particleColor="#ffffff" particleDensity={1100} />
          {/* purple ambient glow + bottom vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(124,58,237,0.28), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-b from-transparent to-[#0a0810]"
          />

          <div className="relative z-20 mx-auto max-w-3xl px-5 text-center">
            <div className="mb-6 flex justify-center">
              <Logo variant="light" className="text-2xl" />
            </div>
            <p className="mb-4 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
              <span className="wl-dot-pulse h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
              27 founding spots left
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Join the waitlist
              <br />
              <span className="bg-gradient-to-r from-[#a78bfa] via-white to-[#a78bfa] bg-clip-text text-transparent">
                while you can.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/60 sm:text-lg">
              The first 1,000 detailers lock in 50% off year one — and the
              founding 100 keep it for life. Spots are going fast.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#waitlist"
                className="wl-cta inline-flex items-center gap-2 rounded-[100px] bg-white px-8 py-4 text-sm font-semibold text-[#0a0810] shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-transform hover:scale-[1.03]"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <WaitlistFooter />
    </div>
  );
}
