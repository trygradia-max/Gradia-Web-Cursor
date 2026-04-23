import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { ScrollReveal, ScrollRevealStagger } from "@/components/marketing/ScrollReveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, case studies, and insights on AI-powered front-desk operations for healthcare, home services, and professional services.",
};

type Resource = {
  title: string;
  description: string;
  href: string;
  tag: string;
  external?: boolean;
};

const resources: Resource[] = [
  {
    title: "Why Every Missed Call Costs You More Than You Think",
    description:
      "A breakdown of the real revenue impact of unanswered calls — and how to fix it.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_1 ?? "#",
    tag: "Guide",
    external: true,
  },
  {
    title: "Front-Desk Automation for Healthcare Practices",
    description:
      "How AI digital employees handle scheduling, intake, and after-hours triage without replacing your team.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_2 ?? "#",
    tag: "Case study",
    external: true,
  },
  {
    title: "Getting Started with Gradia: What to Expect in Week One",
    description:
      "From discovery to go-live — a walkthrough of the onboarding process and what results look like on day one.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_3 ?? "#",
    tag: "Onboarding",
    external: true,
  },
  {
    title: "How Home-Service Businesses Capture 3× More Leads",
    description:
      "Real numbers on how answering every call changes conversion rates for HVAC, plumbing, and electrical companies.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_4 ?? "#",
    tag: "Case study",
    external: true,
  },
  {
    title: "The ROI of an Always-On Digital Front Desk",
    description:
      "A framework for calculating the cost of missed calls versus the cost of 24/7 AI coverage.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_5 ?? "#",
    tag: "Whitepaper",
    external: true,
  },
  {
    title: "HIPAA-Ready Call Handling: What It Actually Means",
    description:
      "An overview of compliance considerations when using AI to answer patient calls.",
    href: process.env.NEXT_PUBLIC_RESOURCE_LINK_6 ?? "#",
    tag: "Compliance",
    external: true,
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  const isPlaceholder = resource.href === "#";

  const inner = (
    <div className="group flex h-full flex-col rounded-[2px] border border-[var(--border-subtle)] bg-[var(--bg)] p-8 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(59,110,245,0.35)] hover:shadow-[0_0_0_1px_rgba(59,110,245,0.08),0_12px_32px_-12px_rgba(59,110,245,0.1)] motion-reduce:hover:translate-y-0 sm:p-10">
      <span className="inline-block w-fit rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--brand-primary)]">
        {resource.tag}
      </span>
      <h2 className="mt-5 font-sans text-xl font-semibold tracking-tight text-[var(--foreground)]">
        {resource.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {resource.description}
      </p>
      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)]">
        {isPlaceholder ? "Coming soon" : "Read more"}
        {!isPlaceholder && (
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        )}
      </div>
    </div>
  );

  if (isPlaceholder) {
    return <li>{inner}</li>;
  }

  return (
    <li>
      <Link
        href={resource.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline-offset-4"
      >
        {inner}
      </Link>
    </li>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-[var(--bg)]">
      <MarketingPageShell className="py-24 lg:py-36">
        <ScrollReveal>
          <SectionLabel>Resources</SectionLabel>
          <h1 className="mt-6 max-w-[24ch] font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--foreground)]">
            Insights for your front desk.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Guides, case studies, and frameworks on running a smarter
            front-desk operation — whether you&apos;re in healthcare, home
            services, or professional services.
          </p>
        </ScrollReveal>
        <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {resources.map((r) => (
            <ResourceCard key={r.title} resource={r} />
          ))}
        </ScrollRevealStagger>
      </MarketingPageShell>
    </div>
  );
}
