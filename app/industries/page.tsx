import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IndustriesIndex } from "@/components/site/industries/IndustriesIndex";

/* Pass 5 Cycle 2 — /industries index (REVIEW_NOTES Pass 5). */

export const metadata: Metadata = {
  title: "Industries — Gradia for detailing and automotive appearance shops",
  description:
    "Gradia for detailing, ceramic coating, PPF, tint, wrap, mobile detailing and shops serving fleet accounts — one operating system, tuned to your trade.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <IndustriesIndex />
      </main>
      <SiteFooter />
    </div>
  );
}
