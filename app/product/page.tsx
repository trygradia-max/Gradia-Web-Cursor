import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FinalCta } from "@/components/site/sections/FinalCta";
import { ProductHero } from "@/components/site/product/ProductHero";
import { ProductPanels } from "@/components/site/product/ProductPanels";
import { ProductCampaigns } from "@/components/site/product/ProductCampaigns";
import { ProductAgent } from "@/components/site/product/ProductAgent";
import { ProductComparison } from "@/components/site/product/ProductComparison";
import { ProductApprovals } from "@/components/site/product/ProductApprovals";
import { ProductFaq } from "@/components/site/product/ProductFaq";

/* Pass 5 Cycle 1 — /product depth page (site-v2-plan §2, REVIEW_NOTES Pass 5).
   Hero → five capability panels → campaigns → Agent + Whisper → comparison
   table → approvals/autonomy → FAQ subset → CTA. Receptionist mention gated
   same as homepage (hidden until telephony acceptance run). */

export const metadata: Metadata = {
  title: "Product — The operating system for detailing shops",
  description:
    "Customers, pipeline, quotes, conversations, campaigns and Home — one system for detailing and automotive appearance shops. Every outbound action staged for your approval.",
};

export default function ProductPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <ProductHero />
        <ProductPanels />
        <ProductCampaigns />
        <ProductAgent />
        <ProductComparison />
        <ProductApprovals />
        <ProductFaq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
