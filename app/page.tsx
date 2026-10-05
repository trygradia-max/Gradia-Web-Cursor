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
import { SITE_DESCRIPTION, SITE_DOCUMENT_TITLE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: SITE_DOCUMENT_TITLE },
  description: SITE_DESCRIPTION,
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
        <CoreSystem />
        <AgentControl />
        <AsksFirst />
        <Operations />
        <TeachGradia />
        {SHOW_RECEPTIONIST && <Receptionist />}
        <Industries />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
