import type { Metadata } from "next";
import Link from "next/link";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "Front-Desk Automation for Healthcare Practices",
  description:
    "How leading practices use automation to handle scheduling, intake, and after-hours calls — without replacing their front-desk team.",
};

const articleBodyClass =
  "[&_p]:mb-6 [&_p]:font-sans [&_p]:text-base [&_p]:font-normal [&_p]:leading-[1.8] [&_p]:text-[#6B7280] [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:font-sans [&_ul]:text-base [&_ul]:leading-[1.8] [&_ul]:text-[#6B7280] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[#0A0A0A] [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-[#0A0A0A]";

export default function HealthcareFrontDeskGuidePage() {
  return (
    <article className="bg-[#FFFFFF] font-sans">
      <header className="bg-[#F5F5F5] py-[120px]">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Industry guide
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(2rem,4vw+1rem,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
            Front-Desk Automation for Healthcare Practices
          </h1>
          <p className="mt-6 max-w-[800px] text-lg font-normal leading-relaxed text-[#6B7280]">
            Your front desk is the first impression of your practice. Right now,
            it&apos;s overwhelmed.
          </p>
        </div>
      </header>

      <div className="border-t border-[#E5E7EB] bg-[#FFFFFF]">
        <div
          className={`mx-auto max-w-[680px] px-4 py-[80px] sm:px-6 ${articleBodyClass}`}
        >
          <p>
            Between phone trees, insurance questions, scheduling back-and-forth,
            and the steady stream of &quot;quick&quot; requests, your front desk
            is asked to do impossible work in finite hours. Patients still expect
            empathy, accuracy, and speed — often all at once. Automation is not
            about removing people; it is about giving them room to focus on what
            only a human should handle.
          </p>

          <h2>What &quot;automation&quot; should mean in a practice</h2>
          <p>
            In healthcare, automation is not a generic chatbot that guesses at
            clinical advice. It is a controlled layer that handles repeatable
            workflows: confirming demographics, booking within your rules,
            routing urgent symptoms to the right escalation path, and capturing
            structured intake so the clinical team starts with context instead
            of a blank form.
          </p>
          <p>
            Done well, it extends your standards — the same greeting, the same
            compliance checks, the same documentation — across every hour of the
            week, including nights and weekends when staffing is thinnest.
          </p>

          <h2>The calls that pile up (and the cost of delay)</h2>
          <p>
            Most practices see recurring patterns: new patient scheduling,
            prescription refill requests, billing questions, referral coordination,
            and &quot;I am not sure if I need to be seen&quot; triage-style calls.
            When those calls roll to voicemail or sit in a queue, two things
            happen: patients feel unsupported, and your team plays catch-up during
            the busiest in-office moments — exactly when errors and burnout spike.
          </p>
          <p>
            Automation can answer immediately, collect the right details, and
            either complete the task (within policy) or hand off cleanly to a
            human with a transcript and summary. That handoff is where time is
            won back for your staff.
          </p>

          <h2>After-hours and compliance in the same sentence</h2>
          <p>
            After-hours coverage is where many practices feel stuck between risk
            and cost. Hiring overnight staff is expensive; leaving phones
            unanswered creates leakage and liability concerns. A digital front
            desk can follow scripts approved by your practice, document every
            interaction, and escalate true emergencies per your protocol — while
            still sounding like your brand, not a generic call center.
          </p>
          <p>
            HIPAA and related obligations still apply. The right approach is to
            use vendors and workflows that treat PHI as non-negotiable: least
            privilege access, encryption, audit trails, and clear data processing
            agreements. Automation should reduce ambiguity, not create new gray
            areas.
          </p>

          <h2>Scheduling without the ping-pong</h2>
          <p>
            Scheduling is one of the highest-volume workflows and one of the
            easiest to get wrong when rushed. Automation can check provider
            availability against your rules, offer a short list of viable slots,
            confirm insurance basics where appropriate, and send confirmations
            and reminders — reducing no-shows and freeing coordinators for
            exceptions instead of repetitive slot matching.
          </p>

          <h2>What stays with your people</h2>
          <p>
            The goal is not zero human touch. It is fewer interruptions for work
            that does not require a license or a nuanced clinical judgment call.
            Your team should spend more time on patients in the building, complex
            coordination, and relationship moments — and less time reading
            credit card numbers aloud or re-typing the same insurance question
            into three systems.
          </p>
          <ul>
            <li>Empathy-first conversations when a caller is upset or confused</li>
            <li>Exceptions, overrides, and anything that falls outside policy</li>
            <li>Care navigation that depends on local relationships and nuance</li>
          </ul>

          <h2>Rollout: start narrow, measure, expand</h2>
          <p>
            The practices that see the fastest wins usually start with one
            high-volume workflow — often scheduling or after-hours answering — then
            measure answer rate, booking conversion, and staff time saved before
            layering on intake or billing FAQs. That discipline keeps change
            manageable for staff and transparent for leadership.
          </p>

          <h2>Closing the gap for callers and clinicians alike</h2>
          <p>
            Your front desk is the front line of trust. When it is overwhelmed,
            callers feel it first — but clinicians feel it too, in incomplete
            charts, delayed follow-ups, and reactive days. Front-desk automation,
            implemented with healthcare-specific rigor, closes the gap between the
            experience you want every patient to have and what your staffing model
            can sustainably deliver.
          </p>
        </div>
      </div>

      <section className="border-t border-[#E5E7EB] bg-[#0A0A0A] py-[120px]">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6">
          <h2 className="font-sans text-[clamp(1.875rem,3.5vw+1rem,48px)] font-bold leading-tight tracking-[-0.02em] text-white">
            See how Gradia closes the gap.
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href={demoMailto}
              className="inline-flex items-center justify-center rounded-none border-0 bg-[var(--blue)] px-8 py-3.5 font-sans text-sm font-medium text-[var(--white)] transition-[background-color] duration-150 ease-in-out hover:bg-[var(--blue-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
            >
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
