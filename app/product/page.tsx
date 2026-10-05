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

export const metadata: Metadata = {
  title: "Product — AI CRM for detailing businesses",
  description:
    "Customers, vehicles, conversations, quotes and calendar in one CRM, with one Gradia Agent to help move leads toward bookings. Request access to the controlled pilot.",
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
