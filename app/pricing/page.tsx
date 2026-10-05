import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SHOW_PRICING } from "@/components/site/flags";
import { PricingContent } from "@/components/site/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Gradia",
  description:
    "Pilot pricing and terms are confirmed before onboarding. No free trial. Request access to the controlled pilot.",
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  if (!SHOW_PRICING) notFound();

  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <PricingContent />
      </main>
      <SiteFooter />
    </div>
  );
}
