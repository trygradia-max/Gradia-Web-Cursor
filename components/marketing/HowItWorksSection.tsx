import Link from "next/link";
import { HandoffSequence } from "@/components/marketing/HandoffSequence";
import { cn } from "@/lib/cn";

export function HowItWorksSection({ className }: { className?: string }) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "section-pad w-full border-t border-[#E5E7EB] bg-[#F5F5F5]",
        className,
      )}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-content px-12">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          SEE IT CLOSE
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-4 font-sans text-[40px] font-bold leading-[1.1] text-[#0A0A0A] lg:text-[56px]"
        >
          Watch the gap close. Step by step.
        </h2>
        <p className="mt-4 max-w-[600px] font-sans text-base leading-normal text-[#6B7280]">
          Every lead that reaches out gets answered, qualified, and booked —
          before your team starts their day.
        </p>

        <HandoffSequence />

        <p className="mt-16 text-center">
          <Link
            href="/see-it-close"
            className="font-sans text-sm font-medium text-[#3B6EF5] no-underline transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
          >
            See the full walkthrough →
          </Link>
        </p>
      </div>
    </section>
  );
}
