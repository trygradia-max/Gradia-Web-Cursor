import { MissedLeadsCounter } from "@/components/marketing/MissedLeadsCounter";
import { cn } from "@/lib/cn";
import { BookDemoButton } from "@/components/marketing/BookDemoButton";

export function FinalCtaSection({ className }: { className?: string }) {
  return (
    <section
      id="final-cta"
      className={cn(
        "w-full bg-[#0A0A0A] py-[100px] lg:py-[160px]",
        className,
      )}
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 text-center sm:px-6 lg:px-12">
        <MissedLeadsCounter />

        <h2
          id="final-cta-heading"
          className="mx-auto mt-16 max-w-[14ch] font-sans text-[48px] font-bold leading-[1.05] text-[#FFFFFF] lg:text-[72px]"
        >
          The gap is open right now.
        </h2>

        <p className="mx-auto mt-6 max-w-[560px] font-sans text-lg leading-[1.6] text-[#8A8A8A]">
          Every hour without Gradia is an hour your leads are going
          unanswered.
        </p>

        <div className="mt-10 flex justify-center">
          <BookDemoButton className="inline-flex w-fit items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-10 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]" />
        </div>
      </div>
    </section>
  );
}
