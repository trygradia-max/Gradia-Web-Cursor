import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ResourcesIndex } from "@/components/site/resources/ResourcesIndex";

/* Pass 5 Cycle 4 — /resources index (SEO plan article stubs). */

export const metadata: Metadata = {
  title: "Resources — Guides for detailing shop owners",
  description:
    "Practical guides on missed calls, follow-ups and filling your calendar — written for detailing and automotive appearance shop owners.",
};

export default function ResourcesPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <ResourcesIndex />
      </main>
      <SiteFooter />
    </div>
  );
}
