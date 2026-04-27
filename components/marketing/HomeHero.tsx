import Link from "next/link";
import { LiveActivityFeed } from "@/components/marketing/LiveActivityFeed";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

export function HomeHero() {
  return (
    <section className="min-h-screen w-full bg-[#0A0A0A]">
      <div className="mx-auto flex min-h-screen max-w-content flex-col justify-center gap-12 px-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-0">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
            AI VOICE AGENT
          </p>
          <h1 className="mt-4 font-sans text-[48px] font-bold leading-[1.05] text-[#FFFFFF] lg:text-[72px]">
            <span className="block">Every lead.</span>
            <span className="block">Answered.</span>
            <span className="block">Instantly.</span>
          </h1>
          <p className="mt-6 max-w-[480px] font-sans text-lg leading-[1.6] text-[#8A8A8A]">
            The AI that sits between your leads and your team.
            <br />
            Always on. Always closing.
          </p>
          <div className="mt-10">
            <Link
              href={demoHref}
              className="inline-flex items-center justify-center rounded-none border-0 bg-[#3B6EF5] px-8 py-4 font-sans text-sm font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Book a Demo →
            </Link>
          </div>
        </div>

        <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-end">
          <LiveActivityFeed />
        </div>
      </div>
    </section>
  );
}
