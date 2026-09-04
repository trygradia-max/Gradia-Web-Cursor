import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SHOW_PRICING } from "@/components/site/flags";
import { PricingContent } from "@/components/site/pricing/PricingContent";

/* Pass 5 Cycle 3 — /pricing (BUILT, double-gated: SHOW_PRICING + middleware).
   Direction Core $99 / Pro $149 / Operator $249 — do not publish until live
   billing is aligned (CURSOR_BRIEF 2026-09-03). */

export const metadata: Metadata = {
  title: "Pricing — Gradia for detailing shops",
  description:
    "Core, Pro and Operator — full CRM plus Gradia Agent, with predictable credits and spending caps. 14-day guided trial starts after your setup.",
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
