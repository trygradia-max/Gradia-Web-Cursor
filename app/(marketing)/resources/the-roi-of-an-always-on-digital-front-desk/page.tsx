import type { Metadata } from "next";
import Link from "next/link";

const demoMailto =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export const metadata: Metadata = {
  title: "The ROI of an Always-On Digital Front Desk",
  description:
    "A practical framework for estimating the cost of missed calls, leakage, and staff time — and comparing it to always-on digital front-desk coverage.",
};

const articleBodyClass =
  "[&_p]:mb-6 [&_p]:font-sans [&_p]:text-base [&_p]:font-normal [&_p]:leading-[1.8] [&_p]:text-[#6B7280] [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:font-sans [&_ul]:text-base [&_ul]:leading-[1.8] [&_ul]:text-[#6B7280] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[#0A0A0A] [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-[#0A0A0A]";

export default function RoiDigitalFrontDeskPage() {
  return (
    <article className="bg-[#FFFFFF] font-sans">
      <header className="bg-[#F5F5F5] py-[120px]">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            Whitepaper
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(2rem,4vw+1rem,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
            The ROI of an Always-On Digital Front Desk
          </h1>
          <p className="mt-6 max-w-[800px] text-lg font-normal leading-relaxed text-[#6B7280]">
            Most businesses measure what they earn. Almost none measure what they
            lose before it enters the system.
          </p>
        </div>
      </header>

      <div className="border-t border-[#E5E7EB] bg-[#FFFFFF]">
        <div
          className={`mx-auto max-w-[680px] px-4 py-[80px] sm:px-6 ${articleBodyClass}`}
        >
          <p>
            Revenue shows up in deposits, invoices, and CRM stages. Losses from
            missed calls, slow follow-up, and fragmented intake rarely appear as
            a single line item — which is why they are easy to ignore and
            expensive to leave unaddressed. This whitepaper outlines a simple
            way to estimate that invisible leakage and compare it to the cost of
            an always-on digital front desk.
          </p>

          <h2>Start with the calls you never see</h2>
          <p>
            Begin with volume: how many inbound calls do you get per week, and
            what percentage reach a human on the first attempt during business
            hours? Then add after-hours and peak windows — often where answer
            rates drop the fastest. Each percentage point of unanswered demand is
            a slice of intent that never makes it into your pipeline.
          </p>
          <p>
            You do not need perfect data to start. Even directional estimates
            from phone logs, carrier reports, or a two-week sample will surface
            whether the problem is noise or material.
          </p>

          <h2>Translate calls into opportunity value</h2>
          <p>
            Not every call is equal, but you can bracket outcomes. For each
            segment — new lead, existing customer, billing, scheduling — assign
            a conservative expected value: average revenue per booked job,
            lifetime value for a new account, or the cost of a preventable churn
            event. Multiply by the share of calls that fall into each bucket and
            by the share that go unanswered.
          </p>
          <p>
            The output is not a precise forecast; it is an order-of-magnitude
            truth check. If the annualized number makes leadership uncomfortable,
            you are probably measuring the right thing.
          </p>

          <h2>Include time your team spends recovering</h2>
          <p>
            ROI math often forgets the labor tax of chaos: voicemail callbacks,
            duplicate data entry, apologizing for delays, and firefighting during
            peak in-office hours. Estimate minutes per day spent on reactive
            triage that would shrink if first-touch resolution improved — then
            translate to payroll and opportunity cost.
          </p>

          <h2>Compare against always-on coverage</h2>
          <p>
            A digital front desk is priced as a service, not as headcount — which
            makes the comparison stark. Model the monthly platform cost against
            your estimated monthly loss from missed intent and recovery labor.
            Include implementation time, but keep it bounded; the point is to
            compare steady-state economics, not a one-year science project.
          </p>
          <ul>
            <li>Fixed subscription or usage-based fees</li>
            <li>Internal time for training, scripting, and QA (usually front-loaded)</li>
            <li>Savings from fewer missed bookings and faster lead capture</li>
          </ul>

          <h2>Non-financial ROI still belongs in the memo</h2>
          <p>
            Consistency, auditability, and patient or customer experience are
            harder to monetize but often decide whether a pilot becomes a standard.
            Capture qualitative signals: fewer complaints about hold times, cleaner
            handoffs to humans, and clearer reporting for managers who are tired
            of guessing what happened on the phones last Tuesday.
          </p>

          <h2>What good looks like after go-live</h2>
          <p>
            Within the first weeks, you should see answer rate climb toward 100%,
            average time-to-answer fall, and structured data appear for calls that
            used to disappear into voicemail. Over a quarter, tie those metrics
            to bookings, show rates, and pipeline creation. That is the ROI story
            your board can follow — because it connects behavior change to
            outcomes, not slogans to hope.
          </p>

          <h2>Closing the measurement gap</h2>
          <p>
            The businesses that win on the front line are not the ones that never
            lose a call by accident; they are the ones that stop treating those
            losses as unmeasurable weather. When you quantify the gap, funding an
            always-on digital front desk stops feeling like a nice-to-have and
            starts reading like insurance on the revenue you already paid to
            create.
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
