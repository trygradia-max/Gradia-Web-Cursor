import { BookingPreview } from "@/components/marketing/BookingPreview";
import { LeadCapturePreview } from "@/components/marketing/LeadCapturePreview";
import { cn } from "@/lib/cn";

type SupportingFeature = {
  num: string;
  title: string;
  body: string;
};

const SUPPORTING_FEATURES: SupportingFeature[] = [
  {
    num: "03",
    title: "Always On",
    body: "Calls, emails, SMS — answered the moment a lead reaches out. Every channel, every hour.",
  },
  {
    num: "04",
    title: "Workload Relief",
    body: "Gradia handles the volume your team can't. Less noise, more time on the work that matters.",
  },
  {
    num: "05",
    title: "Live Dashboard",
    body: "Every call, email, and SMS outcome in one place. Full visibility in real time.",
  },
  {
    num: "06",
    title: "Spam Protection",
    body: "Time-wasters filtered before they reach your team. Your reps focus on real prospects only.",
  },
];

export function FeaturesSection({ className }: { className?: string }) {
  return (
    <section
      id="features"
      className={cn(
        "w-full bg-[#FFFFFF] py-[60px] lg:py-[120px]",
        className,
      )}
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          WHAT GRADIA DOES
        </p>
        <h2
          id="features-heading"
          className="mt-4 font-sans text-[40px] font-bold leading-[1.1] text-[#0A0A0A] lg:text-[56px]"
        >
          Every lead. Every channel. Every time.
        </h2>
      </div>

      <div className="mt-[60px] border-t border-[#E5E7EB] bg-[#FFFFFF] py-[60px] lg:mt-20 lg:py-20">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <HeroFeatureRow
            visualSide="right"
            number="01"
            title="Lead Capture"
            body="Every prospect qualified and recorded before your team touches it. Name, need, urgency — captured the moment they reach out."
            stat="100% of leads logged. Zero slipping through."
            visual={<LeadCapturePreview />}
          />
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] bg-[#F5F5F5] py-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <HeroFeatureRow
            visualSide="left"
            number="02"
            title="Appointment Booking"
            body="Gradia books directly into your calendar. No back and forth. No dropped handoffs. Your next appointment is already set before you finish your morning coffee."
            stat="Booked, confirmed, and logged. Automatically."
            visual={<BookingPreview />}
          />
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-12">
          <ul className="grid list-none grid-cols-1 gap-px bg-[#E5E7EB] lg:grid-cols-2">
            {SUPPORTING_FEATURES.map((item) => (
              <li
                key={item.num}
                className="bg-[#FFFFFF] p-8 sm:p-10 lg:p-12"
              >
                <p className="font-sans text-[11px] font-medium tabular-nums text-[#3B6EF5]">
                  {item.num}
                </p>
                <h3 className="mt-2 font-sans text-[22px] font-semibold leading-tight text-[#0A0A0A]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.6] text-[#6B7280]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HeroFeatureRow({
  visualSide,
  number,
  title,
  body,
  stat,
  visual,
}: {
  visualSide: "left" | "right";
  number: string;
  title: string;
  body: string;
  stat: string;
  visual: React.ReactNode;
}) {
  const copyOrderClass =
    visualSide === "left" ? "lg:order-2" : "lg:order-1";
  const visualOrderClass =
    visualSide === "left" ? "lg:order-1" : "lg:order-2";

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div className={cn("min-w-0", copyOrderClass)}>
        <p className="font-sans text-[11px] font-medium tabular-nums text-[#3B6EF5]">
          {number}
        </p>
        <h3 className="mt-3 font-sans text-[32px] font-bold leading-[1.1] text-[#0A0A0A] lg:text-[40px]">
          {title}
        </h3>
        <p className="mt-5 max-w-[440px] font-sans text-base leading-[1.7] text-[#6B7280]">
          {body}
        </p>
        <p className="mt-6 border-l-[3px] border-[#3B6EF5] pl-4 font-sans text-sm font-semibold leading-snug text-[#0A0A0A]">
          {stat}
        </p>
      </div>
      <div className={cn("min-w-0", visualOrderClass)}>{visual}</div>
    </div>
  );
}
