import type { Metadata } from "next";
import "./v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SHOW_RECEPTIONIST } from "@/components/site/flags";
import { HomeStructuredData } from "@/components/site/seo/structured-data";
import { Hero } from "@/components/site/sections/Hero";
import { Problem } from "@/components/site/sections/Problem";
import { ConnectedFlow } from "@/components/site/sections/ConnectedFlow";
import { Operations } from "@/components/site/sections/Operations";
import { CoreSystem } from "@/components/site/sections/CoreSystem";
import { TeachGradia } from "@/components/site/sections/TeachGradia";
import { AgentControl } from "@/components/site/sections/AgentControl";
import { AsksFirst } from "@/components/site/sections/AsksFirst";
import { Receptionist } from "@/components/site/sections/Receptionist";
import { Industries } from "@/components/site/sections/Industries";
import { Faq } from "@/components/site/sections/Faq";
import { FinalCta } from "@/components/site/sections/FinalCta";
import {
  SITE_CATEGORY,
  SITE_DESCRIPTION,
  SITE_HEADLINE,
} from "@/lib/site-config";

/* v2 homepage (Pass 2, branch site-v2 only — merge to main is the founder's
   cutover act). Sections land one commit at a time per NEXT_TASK.md; the plan
   of record is gradia-v2/marketing-site/site-v2-plan.md §3. */

// Publish gate (NEXT_TASK scope 7 / claim law §5): the Receptionist section
// stays hidden until the live telephony acceptance run passes (capability #20
// flips from internal). When flipping SHOW_RECEPTIONIST in flags.ts, recompute
// band alternation for sections 7+ (REVIEW_NOTES).

export const metadata: Metadata = {
  title: SITE_CATEGORY,
  description: `${SITE_HEADLINE} ${SITE_DESCRIPTION}`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="site-v2 min-h-screen">
      <HomeStructuredData />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <Problem />
        <ConnectedFlow />
        <Operations />
        <CoreSystem />
        <TeachGradia />
        <AgentControl />
        <AsksFirst />
        {SHOW_RECEPTIONIST && <Receptionist />}
        <Industries />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
