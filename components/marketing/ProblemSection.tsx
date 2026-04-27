import Link from "next/link";
import { GraveyardTicker } from "@/components/marketing/GraveyardTicker";
import { cn } from "@/lib/cn";

export function ProblemSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "section-pad w-full border-t border-[#E5E7EB] bg-[#FFFFFF]",
        className,
      )}
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto flex max-w-content flex-col gap-12 px-12 lg:flex-row lg:gap-20">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            THE REALITY
          </p>
          <h2
            id="problem-heading"
            className="mt-4 font-sans text-[40px] font-bold leading-[1.1] text-[#0A0A0A] lg:text-[56px]"
          >
            The Invisible Gap
          </h2>
          <div className="mt-6 max-w-[480px] space-y-5 font-sans text-base leading-[1.7] text-[#6B7280]">
            <p>
              A lead comes in at 7pm. Your team sees it at 9am. By then,
              they&apos;ve already booked with someone else.
            </p>
            <p>
              Your team works hard. But they can&apos;t be everywhere. The ones
              that don&apos;t get answered fast don&apos;t come back.
            </p>
            <p>
              Nobody noticed. Nothing was tracked. That&apos;s the invisible
              gap.
            </p>
          </div>
          <Link
            href="/the-cost"
            className="mt-8 inline-block font-sans text-sm font-medium text-[#3B6EF5] no-underline transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
          >
            See what it&apos;s costing you →
          </Link>
        </div>

        <div className="min-w-0 w-full shrink-0 lg:flex-1">
          <GraveyardTicker />
        </div>
      </div>
    </section>
  );
}
