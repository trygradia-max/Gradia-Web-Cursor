import { Fragment } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const INDUSTRIES = [
  "Healthcare",
  "Finance",
  "Home Services",
  "Real Estate",
  "Legal",
  "Auto Dealerships",
  "Dental",
  "Medspa",
  "Insurance",
  "Staffing",
  "Veterinary",
  "Mortgage",
] as const;

export function IndustriesSection({ className }: { className?: string }) {
  return (
    <section
      id="industries"
      className={cn("w-full bg-[#FFFFFF] py-[60px] lg:py-[120px]", className)}
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          WHO WE WORK WITH
        </p>
        <h2
          id="industries-heading"
          className="mt-4 font-sans text-[40px] font-bold leading-[1.1] text-[#0A0A0A] lg:text-[56px]"
        >
          Any team. Any industry. One gap closed.
        </h2>
        <p className="mt-4 max-w-[560px] font-sans text-base leading-relaxed text-[#6B7280]">
          Gradia works for any business where leads matter and speed is
          everything.
        </p>
      </div>

      <div
        className="industries-marquee-row mt-16 w-full overflow-hidden border-y border-[#E5E7EB] bg-[#FFFFFF] py-7"
        aria-label="Industries Gradia works with"
      >
        <div className="industries-marquee-track flex w-max items-center">
          <MarqueeSet />
          <MarqueeSet ariaHidden />
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-content px-4 sm:px-6 lg:px-12">
        <Link
          href="/the-gap"
          className="inline-block font-sans text-sm text-[#6B7280] no-underline transition-colors duration-150 ease-out hover:text-[#0A0A0A] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
        >
          Not your industry? It doesn&apos;t matter. →
        </Link>
      </div>
    </section>
  );
}

function MarqueeSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="m-0 flex list-none items-center p-0"
      aria-hidden={ariaHidden || undefined}
    >
      {INDUSTRIES.map((name, i) => (
        <Fragment key={`${name}-${i}`}>
          <li className="shrink-0">
            <span className="block cursor-default font-sans text-[22px] font-semibold leading-none text-[#0A0A0A] transition-colors duration-150 ease-out hover:text-[#3B6EF5] lg:text-[32px]">
              {name}
            </span>
          </li>
          <li
            className="mx-5 shrink-0 lg:mx-8"
            aria-hidden="true"
          >
            <span className="block font-sans text-[22px] font-semibold leading-none text-[#3B6EF5] lg:text-[32px]">
              ·
            </span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
