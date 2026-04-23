import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Gradia terms of service (placeholder).",
};

export default function TermsPage() {
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
          Terms of service
        </h1>
        <div className="mt-10 max-w-3xl space-y-4 text-[var(--muted)]">
          <p>
            This is a placeholder terms page for the Gradia marketing site.
            Final terms should cover acceptable use, service descriptions,
            fees, warranties, limitation of liability, and governing law.
          </p>
          <p>
            Replace this content with a version approved by legal before
            inviting customers or processing production data.
          </p>
        </div>
      </MarketingPageShell>
    </div>
  );
}
