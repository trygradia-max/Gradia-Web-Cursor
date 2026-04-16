import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const body = "text-[#b0b0b0]";

type Tier = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  meta: string;
  intro?: string;
  features: string[];
  popular?: boolean;
  mailSubject: string;
};

const tiers: Tier[] = [
  {
    id: "cover",
    name: "Cover",
    price: "$747/mo",
    tagline: "Your front door, handled.",
    meta: "Up to 500 calls · $1,247 setup",
    features: [
      "AI Digital Employee trained to your business",
      "Calls answered 24/7 — nights, weekends, holidays",
      "Lead capture on every call",
      "Intake forms handled automatically",
      "Call summaries after every call",
      "Spam and robocall screening",
      "Urgent calls flagged and routed",
    ],
    mailSubject: "Gradia Cover plan",
  },
  {
    id: "capture",
    name: "Capture",
    price: "$1,647/mo",
    tagline: "Your full front end, wired in.",
    meta: "Up to 1,200 calls · $2,447 setup",
    popular: true,
    intro: "Everything in Cover, plus:",
    features: [
      "CRM integration — leads pushed in real time",
      "Patient/customer follow-up after calls",
      "Multi-location support (2 locations)",
      "Dedicated onboarding and buildout",
      "24-hour support",
    ],
    mailSubject: "Gradia Capture plan",
  },
  {
    id: "control",
    name: "Control",
    price: "$2,447/mo",
    tagline: "Total operational coverage.",
    meta: "Up to 5,000 calls · $3,047 setup",
    intro: "Everything in Capture, plus:",
    features: [
      "Outbound calling",
      "Multi-system integration (up to 3)",
      "Support across all locations",
      "24/7 priority support",
      "Fully custom AI Digital Employee build",
    ],
    mailSubject: "Gradia Control plan",
  },
];

export function PricingSection() {
  return (
    <ul className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
      {tiers.map((tier) => (
        <li key={tier.id} className="relative flex">
          {tier.popular ? (
            <span className="absolute -top-3 left-1/2 z-[2] -translate-x-1/2 rounded-[2px] border border-[var(--brand-primary)] bg-[#0a0a0a] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
              Popular
            </span>
          ) : null}
          <div
            className={cn(
              "flex w-full flex-col rounded-[2px] border bg-[#141414] p-8 pt-10 sm:p-10",
              tier.popular
                ? "border-[var(--brand-primary)]/50 shadow-[0_0_0_1px_rgba(30,64,175,0.15)]"
                : "border-[#222222]",
            )}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
              {tier.name}
            </p>
            <p className="mt-4 font-serif text-3xl tracking-tight text-white">
              {tier.price}
            </p>
            <p className="mt-3 font-serif text-lg leading-snug text-white">
              {tier.tagline}
            </p>
            <p className={`mt-4 font-sans text-sm ${body}`}>{tier.meta}</p>
            <div className={`mt-8 space-y-3 border-t border-[#222222] pt-8 text-sm leading-relaxed ${body}`}>
              {tier.intro ? (
                <p className="mb-4 font-medium text-[#b0b0b0]">{tier.intro}</p>
              ) : null}
              <ul className="space-y-3">
                {tier.features.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-[1px] bg-[var(--brand-primary)]/80"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <Button
                href={`mailto:hello@gradia.com?subject=${encodeURIComponent(tier.mailSubject)}`}
                variant="primary"
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
