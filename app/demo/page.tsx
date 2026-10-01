import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DemoContent } from "@/components/site/demo/DemoContent";

/* Pass 5 Cycle 4 — /demo (WHAT_GRADIA_DOES §7 claimable assets only). */

export const metadata: Metadata = {
  title: "Demo — Gradia product preview",
  description:
    "Product preview of the intended inquiry, quote and approval workflow. Sample business data — not a recording of live bookings or sent messages.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <DemoContent />
      </main>
      <SiteFooter />
    </div>
  );
}
