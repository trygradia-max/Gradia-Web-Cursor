import type { Metadata } from "next";
import Link from "next/link";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "Why Every Missed Call Costs More Than You Think",
  description:
    "The real price of an unanswered phone is not the ring — it is the revenue, trust, and momentum you lose after the caller hangs up.",
};

const articleBodyClass =
  "[&_p]:mb-6 [&_p]:font-sans [&_p]:text-base [&_p]:font-normal [&_p]:leading-[1.8] [&_p]:text-[#6B7280] [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:font-sans [&_ul]:text-base [&_ul]:leading-[1.8] [&_ul]:text-[#6B7280] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[#0A0A0A] [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-[#0A0A0A]";

export default function MissedCallGuidePage() {
  return (
    <article className="bg-[#FFFFFF] font-sans">
      {/* 1. Header */}
      <header className="bg-[#F5F5F5] py-[120px]">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Guide
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(2rem,4vw+1rem,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
            Why Every Missed Call Costs More Than You Think
          </h1>
          <p className="mt-6 max-w-[800px] text-lg font-normal leading-relaxed text-[#6B7280]">
            The real price of an unanswered phone isn&apos;t the call.
            It&apos;s everything that happens after.
          </p>
        </div>
      </header>

      {/* 2. Article */}
      <div className="border-t border-[#E5E7EB] bg-[#FFFFFF]">
        <div
          className={`mx-auto max-w-[680px] px-4 py-[80px] sm:px-6 ${articleBodyClass}`}
        >
          <p>
            Most businesses treat a missed call like a minor inconvenience —
            someone tried, they will call back. In reality, the majority of
            first-time callers never do. They move on to the next name on the
            list, and the revenue you thought was &quot;maybe later&quot; is
            gone for good.
          </p>

          <h2>The hidden cost is not the minute you did not answer</h2>
          <p>
            The direct cost of a missed call is easy to underestimate because
            it does not show up on a spreadsheet as a line item. There is no
            invoice labeled &quot;lost opportunity from Tuesday at 4:12
            p.m.&quot; Instead, the damage shows up as flat growth, thinner
            pipelines, and the quiet sense that marketing is &quot;working&quot;
            but the phone is not converting.
          </p>
          <p>
            When someone picks up the phone, they are usually past browsing.
            They have intent: schedule an appointment, get a quote, ask about
            insurance, or confirm you can help before they invest more time.
            Interruptions, voicemail, and endless rings train them to associate
            your brand with friction — and friction is what sends them to a
            competitor who answers on the first ring.
          </p>

          <h2>What happens in the first sixty seconds after a miss</h2>
          <p>
            Callers do not wait in a polite queue in their head. They
            reassess. They Google the next provider. They text a friend for a
            referral. They decide the problem is not urgent enough to chase —
            until it is urgent for someone else who did pick up.
          </p>
          <p>
            For high-trust industries — healthcare, legal, financial services,
            home services — that first impression is disproportionately
            valuable. A human being is trying to reduce risk. When nobody
            answers, risk goes up, and the emotional default is to move on.
          </p>

          <h2>Compounding: how one miss becomes many</h2>
          <p>
            Missed calls rarely happen in isolation. They cluster at peak times:
            lunch hours, Monday mornings, storm days, Monday holidays, marketing
            pushes, and local events. Those are exactly the moments when demand
            spikes — and when your team is most stretched. The result is a
            double penalty: you pay for the demand generation, then fail to
            convert it at the moment it arrives.
          </p>
          <p>
            Over a quarter, those moments add up to meaningful revenue leakage.
            Worse, they skew your data: campaigns look weaker than they are,
            front-desk performance looks volatile, and leaders draw the wrong
            conclusions about what to fix next.
          </p>

          <h2>Lifetime value and reputation</h2>
          <p>
            A single caller might represent more than one transaction. They might
            refer family members, leave reviews, or return for years. When the
            first touch fails, you do not only lose one job — you often lose the
            stream of jobs that would have followed from a strong first
            experience.
          </p>
          <p>
            Online reviews increasingly mention &quot;could not reach
            anyone&quot; or &quot;went to voicemail every time.&quot; That
            narrative is expensive to unwind, even if the underlying service is
            excellent. Fair or not, availability is read as competence.
          </p>

          <h2>What high-performing front desks do differently</h2>
          <p>
            The goal is not &quot;more phone time&quot; for your staff. It is
            consistent coverage at the moments that matter: predictable
            responses, clear handoffs for urgent issues, and full visibility into
            what callers asked for — whether a human or an AI digital employee
            handled the conversation.
          </p>
          <p>
            When every call is answered, you stop guessing why leads disappear.
            You see volume, outcomes, and drop-off in one place — and you can
            tune staffing, scripts, and follow-up with evidence instead of
            anecdotes.
          </p>

          <h2>Closing the gap</h2>
          <p>
            The gap between the experience you intend to deliver and what
            callers actually get is often invisible until you measure it. Missed
            calls are one of the clearest signals that the gap is widening. The
            good news: it is also one of the fastest problems to fix once you
            decide that every ring deserves a response — every time.
          </p>
        </div>
      </div>

      {/* 3. CTA */}
      <section className="border-t border-[#E5E7EB] bg-[#0A0A0A] py-[120px]">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6">
          <h2 className="font-sans text-[clamp(1.875rem,3.5vw+1rem,48px)] font-bold leading-tight tracking-[-0.02em] text-white">
            See how Gradia closes the gap.
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href={demoMailto}
              className="inline-flex items-center justify-center rounded-none bg-[#3B6EF5] px-10 py-4 font-sans text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B6EF5]"
            >
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
