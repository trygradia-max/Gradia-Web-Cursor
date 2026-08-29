import type { Metadata } from "next";
import "./v2/site-v2.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/sections/Hero";
import { Problem } from "@/components/site/sections/Problem";
import { ConnectedFlow } from "@/components/site/sections/ConnectedFlow";
import { Operations } from "@/components/site/sections/Operations";
import { CoreSystem } from "@/components/site/sections/CoreSystem";
import { AgentControl } from "@/components/site/sections/AgentControl";
import { Receptionist } from "@/components/site/sections/Receptionist";
import { Industries } from "@/components/site/sections/Industries";
import { Faq } from "@/components/site/sections/Faq";
import { FinalCta } from "@/components/site/sections/FinalCta";

/* v2 homepage (Pass 2, branch site-v2 only — merge to main is the founder's
   cutover act). Sections land one commit at a time per NEXT_TASK.md; the plan
   of record is gradia-v2/marketing-site/site-v2-plan.md §3. */

// Publish gate (NEXT_TASK scope 7 / claim law §5): the Receptionist section
// stays hidden until the live telephony acceptance run passes (capability #20
// flips from internal). When flipping to true, recompute band alternation for
// sections 7+ (REVIEW_NOTES).
const SHOW_RECEPTIONIST = false;

export const metadata: Metadata = {
  // Minimal D-033-true override so the waitlist-era layout metadata (old
  // pricing/framing) never rides on this page. Full SEO/JSON-LD is Pass 5/6.
  title: "Gradia — The operating system for detailing and automotive appearance shops",
  description:
    "Run your shop. Capture every lead. Recover more revenue. Gradia connects your customers, vehicles, leads, quotes, jobs, conversations and schedule in one operating system.",
};

export default function HomePage() {
  return (
    <div className="site-v2 min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <ConnectedFlow />
        <Operations />
        <CoreSystem />
        <AgentControl />
        {SHOW_RECEPTIONIST && <Receptionist />}
        <Industries />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
