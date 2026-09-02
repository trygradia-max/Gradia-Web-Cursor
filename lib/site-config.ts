/** Site-wide constants (Pass 6 — conversion + SEO). */

const DEFAULT_SITE_URL = "https://trygradia.com";

export function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** Primary trial CTA — scrolls to FinalCta (#trial). Swap at cutover when signup ships (REVIEW_NOTES N1). */
export const TRIAL_CTA_HREF = "/#trial";

export const SITE_CATEGORY =
  "The operating system for detailing and automotive appearance shops";

export const SITE_HEADLINE = "Run your shop. Capture every lead. Recover more revenue.";

export const SITE_DESCRIPTION =
  "Gradia connects your customers, vehicles, leads, quotes, jobs, conversations, campaigns and schedule in one operating system — every outbound action staged for your approval.";
