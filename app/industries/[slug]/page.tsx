import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SHOW_FLEET_INDUSTRY } from "@/components/site/flags";
import { IndustryPage } from "@/components/site/industries/IndustryPage";
import {
  INDUSTRY_BY_SLUG,
  INDUSTRY_SLUGS,
  type IndustrySlug,
} from "@/components/site/industries/data";

/* Trade pages. /industries/fleet is flag-hidden (D-067 — fleet accounts out). */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRY_SLUGS.filter(
    (slug) => slug !== "fleet" || SHOW_FLEET_INDUSTRY,
  ).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "fleet" && !SHOW_FLEET_INDUSTRY) return {};
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
  if (slug === "fleet" && !SHOW_FLEET_INDUSTRY) notFound();
  const industry = INDUSTRY_BY_SLUG[slug as IndustrySlug];
  if (!industry) notFound();

  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <IndustryPage industry={industry} />
      </main>
      <SiteFooter />
    </div>
  );
}
