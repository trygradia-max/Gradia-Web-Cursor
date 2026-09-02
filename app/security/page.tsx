import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SecurityContent } from "@/components/site/security/SecurityContent";

/* Pass 5 Cycle 3 — /security (audited truths only, platform doc 08). */

export const metadata: Metadata = {
  title: "Security — Gradia",
  description:
    "Tenant isolation, approval gates, fail-closed spending, audit trails and outreach guardrails — how Gradia protects your shop's data and your customers.",
};

export default function SecurityPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <SecurityContent />
      </main>
      <SiteFooter />
    </div>
  );
}
