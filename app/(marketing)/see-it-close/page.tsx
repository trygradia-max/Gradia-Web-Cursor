import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SeeItCloseCalendar } from "@/components/marketing/SeeItCloseCalendar";
import { SeeItCloseMorning } from "@/components/marketing/SeeItCloseMorning";
import { SeeItClosePhoneCall } from "@/components/marketing/SeeItClosePhoneCall";
import { SeeItCloseTranscript } from "@/components/marketing/SeeItCloseTranscript";

const showcaseHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20live%20showcase" as const;

export const metadata: Metadata = {
  title: "See It Close",
  description:
    "Watch Gradia work, scene by scene. A cinematic walkthrough of how Gradia closes the invisible gap.",
};

export default function SeeItClosePage() {
  return (
    <div className="bg-white">
      {/* Scene 1 — Set the Scene */}
      <section
        className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16 text-center"
        aria-labelledby="see-it-close-opening-heading"
      >
        <div className="max-w-[1100px]">
          <h1
            id="see-it-close-opening-heading"
            className="font-sans text-[56px] font-bold leading-none tabular-nums text-white animate-see-it-close-fade-up sm:text-[72px] lg:text-[96px]"
          >
            7:02pm.
          </h1>
          <p
            className="mt-2 font-sans text-[56px] font-bold leading-none text-[#3B6EF5] animate-see-it-close-fade-up sm:mt-3 sm:text-[72px] lg:text-[96px]"
            style={{ animationDelay: "800ms" }}
          >
            A lead just called.
          </p>
        </div>
        <div
          className="mt-12 flex flex-col items-center animate-see-it-close-fade-up"
          style={{ animationDelay: "1600ms" }}
        >
          <ChevronDown
            className="h-6 w-6 animate-the-gap-arrow-pulse text-[#6B7280]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Scene 2 — Gradia Answers */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="see-it-close-scene-2-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
                01 — Gradia Answers
              </p>
              <h2
                id="see-it-close-scene-2-heading"
                className="mt-4 font-sans text-[36px] font-bold leading-[1.1] text-[#0A0A0A] sm:text-[44px] lg:text-[56px]"
              >
                Your team left at 5.
              </h2>
              <p className="mt-2 font-sans text-[36px] font-bold leading-[1.1] text-[#3B6EF5] sm:text-[44px] lg:text-[56px]">
                Gradia didn&apos;t.
              </p>
              <p className="mt-6 max-w-[420px] font-sans text-base leading-[1.7] text-[#6B7280]">
                The moment a lead calls, Gradia picks up. No voicemail. No
                wait. No lost opportunity. Under 2 seconds. Every time.
              </p>
            </div>
            <div>
              <SeeItClosePhoneCall />
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3 — The Conversation */}
      <section
        className="bg-[#F5F5F5] py-[80px] lg:py-[120px]"
        aria-labelledby="see-it-close-scene-3-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
                02 — Lead Qualified
              </p>
              <h2
                id="see-it-close-scene-3-heading"
                className="mt-4 font-sans text-[36px] font-bold leading-[1.1] text-[#0A0A0A] sm:text-[44px] lg:text-[56px]"
              >
                Every question.
              </h2>
              <p className="mt-2 font-sans text-[36px] font-bold leading-[1.1] text-[#3B6EF5] sm:text-[44px] lg:text-[56px]">
                Every detail.
              </p>
              <p className="mt-6 max-w-[420px] font-sans text-base leading-[1.7] text-[#6B7280]">
                Gradia captures name, need, and urgency before your team is
                even aware the call happened. Professional. Natural.
                On-brand.
              </p>
            </div>
            <div className="lg:order-1">
              <SeeItCloseTranscript />
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4 — The Booking */}
      <section
        className="bg-white py-[80px] lg:py-[120px]"
        aria-labelledby="see-it-close-scene-4-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
                03 — Appointment Booked
              </p>
              <h2
                id="see-it-close-scene-4-heading"
                className="mt-4 font-sans text-[36px] font-bold leading-[1.1] text-[#0A0A0A] sm:text-[44px] lg:text-[56px]"
              >
                In the calendar.
              </h2>
              <p className="mt-2 font-sans text-[28px] font-bold leading-[1.1] text-[#3B6EF5] sm:text-[32px] lg:text-[40px]">
                Before you knew it happened.
              </p>
              <p className="mt-6 max-w-[420px] font-sans text-base leading-[1.7] text-[#6B7280]">
                No back and forth. No manual entry. Gradia books directly into
                your calendar, sends confirmation to the client, and logs
                everything to your dashboard.
              </p>
              <p className="mt-6 border-l-[3px] border-[#3B6EF5] pl-4 font-sans text-base font-bold text-[#0A0A0A]">
                All in under 3 minutes.
              </p>
            </div>
            <div>
              <SeeItCloseCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* Scene 5 — The Morning */}
      <SeeItCloseMorning />

      {/* Scene 6 — Live Showcase CTA (continuous from Scene 5) */}
      <section
        className="border-t border-[#1F1F1F] bg-[#0A0A0A] pb-[100px] pt-[80px] text-center lg:pb-[160px] lg:pt-[120px]"
        aria-labelledby="see-it-close-cta-heading"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-12">
          <h2
            id="see-it-close-cta-heading"
            className="mx-auto max-w-[700px] font-sans text-[36px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[56px]"
          >
            Ready to see it with your own business?
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] font-sans text-base leading-[1.6] text-[#8A8A8A] sm:text-lg">
            Book a live showcase and watch Gradia handle a real call for your
            business — live.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={showcaseHref}
              className="inline-flex w-fit items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-12 py-[18px] font-sans text-base font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              Book a Live Showcase →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
