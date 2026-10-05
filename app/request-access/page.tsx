import type { Metadata } from "next";
import "../v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Eyebrow, Lead, Section } from "@/components/site/primitives";
import { PilotRequestForm } from "@/components/site/request-access/PilotRequestForm";
import { PILOT_STATUS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request pilot access",
  description:
    "Request access to the Gradia controlled pilot. We'll follow up about fit and availability. Requesting access does not create an account or start a subscription.",
  alternates: { canonical: "/request-access" },
};

export default function RequestAccessPage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main id="main-content">
        <Section>
          <Eyebrow>Controlled pilot</Eyebrow>
          <h1 className="max-w-[16ch]">Request pilot access.</h1>
          <Lead>
            Tell us how your business handles inquiries today. We&apos;ll follow up about fit and
            availability. Requesting access does not create an account or start a subscription.
          </Lead>
          <p className="mt-5 max-w-[42rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
            {PILOT_STATUS}
          </p>
          <div className="mt-10 max-w-[36rem]">
            <PilotRequestForm />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
