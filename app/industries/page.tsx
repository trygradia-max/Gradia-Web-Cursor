import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IndustriesIndex } from "@/components/site/industries/IndustriesIndex";

export const metadata: Metadata = {
  title: "Industries — Gradia CRM for automotive appearance shops",
  description:
    "AI-native CRM for detailing, ceramic coating, PPF, tint and mobile shops with staff — Gradia does the work, you approve what matters.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <IndustriesIndex />
      </main>
      <SiteFooter />
    </div>
  );
}
