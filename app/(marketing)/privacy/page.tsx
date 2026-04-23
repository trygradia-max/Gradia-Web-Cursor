import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Gradia privacy policy (placeholder).",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <MarketingPageShell>
        <div className="rounded-xl border border-[#e2e8f0] bg-white px-6 py-4 text-sm text-[var(--brand-slate)] shadow-card">
          <strong className="font-semibold text-[var(--brand-dark)]">
            Last updated: April 12, 2026
          </strong>
          — This policy will be updated before launch.
        </div>
        <h1 className="mt-10 font-sans text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Privacy policy
        </h1>
        <div className="mt-10 max-w-3xl space-y-4 text-[var(--muted)]">
          <p>
            This is a placeholder privacy page for the Gradia marketing site.
            Final copy should describe what data you collect, how you use it,
            retention, subprocessors, and contact information for privacy
            requests.
          </p>
          <p>
            Replace this stub before launch with language reviewed by counsel
            and aligned with your actual product, hosting, and analytics stack.
          </p>
        </div>
      </MarketingPageShell>
    </div>
  );
}
