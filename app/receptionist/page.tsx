import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SHOW_RECEPTIONIST } from "@/components/site/flags";
import { ReceptionistContent } from "@/components/site/receptionist/ReceptionistContent";

/* Pass 5 — /receptionist (BUILT, double-gated: SHOW_RECEPTIONIST + middleware until
   the telephony acceptance run passes). §9.3 honest framing only. */

export const metadata: Metadata = {
  title: "Receptionist — Gradia for detailing shops",
  description:
    "Inbound phone reception follows real-call and forwarding checks. Keeping your existing number is a requirement. This page stays unpublished until those checks pass.",
  robots: { index: false, follow: false },
};

export default function ReceptionistPage() {
  if (!SHOW_RECEPTIONIST) notFound();

  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <ReceptionistContent />
      </main>
      <SiteFooter />
    </div>
  );
}
