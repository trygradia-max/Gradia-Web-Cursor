import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageLayout } from "@/components/marketing/IndustryPageLayout";
import { INDUSTRIES, getIndustry } from "@/lib/industries";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) {
    return { title: "Industry" };
  }
  return {
    title: `${industry.name} — Gradia`,
    description: industry.metaDescription,
    alternates: {
      canonical: `/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.name} — Gradia`,
      description: industry.metaDescription,
      url: `/industries/${industry.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.name} — Gradia`,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) {
    notFound();
  }
  return <IndustryPageLayout industry={industry} />;
}
