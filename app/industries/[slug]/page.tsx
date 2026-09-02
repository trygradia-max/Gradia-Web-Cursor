import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IndustryPage } from "@/components/site/industries/IndustryPage";
import {
  INDUSTRY_BY_SLUG,
  INDUSTRY_SLUGS,
  type IndustrySlug,
} from "@/components/site/industries/data";

/* Pass 5 Cycle 2 — trade-specific industry pages (REVIEW_NOTES Pass 5). */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRY_BY_SLUG[slug as IndustrySlug];
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustrySlugPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRY_BY_SLUG[slug as IndustrySlug];
  if (!industry) notFound();

  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <IndustryPage industry={industry} />
      </main>
      <SiteFooter />
    </div>
  );
}
