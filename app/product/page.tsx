import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FinalCta } from "@/components/site/sections/FinalCta";
import { ProductStructuredData } from "@/components/site/seo/structured-data";
import { ProductHero } from "@/components/site/product/ProductHero";
import { ProductFlagships } from "@/components/site/product/ProductFlagships";
import { ProductComparison } from "@/components/site/product/ProductComparison";
import { ProductApprovals } from "@/components/site/product/ProductApprovals";
import { ProductFaq } from "@/components/site/product/ProductFaq";

/* /product — D-067 three flagships + honest Live/Coming labels.
   Campaigns / jobs / payments removed from the story. Legacy panel and
   campaign components remain in tree but are not mounted. */

export const metadata: Metadata = {
  title: "Product — AI-native CRM for detailing shops",
  description:
    "Every lead lands and gets worked. Chief of Staff shows what the agent did. Accepted quotes become booked appointments. You approve what matters.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <div className="site-v2 min-h-screen">
      <ProductStructuredData />
      <SiteNav />
      <main id="main-content">
        <ProductHero />
        <ProductFlagships />
        <ProductComparison />
        <ProductApprovals />
        <ProductFaq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
