/** Site-wide constants (Pass 6 — conversion + SEO). Repositioned 2026-09-03 per D-067. */

const DEFAULT_SITE_URL = "https://trygradia.com";

export function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** Primary trial CTA — scrolls to FinalCta (#trial). Swap at cutover when signup ships (REVIEW_NOTES N1). */
export const TRIAL_CTA_HREF = "/#trial";

/** Category line — D-067. Replaces D-033 "operating system" positioning. */
export const SITE_CATEGORY =
  "An AI-native CRM for automotive appearance shops";

export const SITE_HEADLINE =
  "Gradia does the work. You approve what matters.";

export const SITE_DESCRIPTION =
  "Jobber and Urable are systems of record you operate. Gradia qualifies leads, drafts quotes, books appointments, and moves the pipeline — you read what happened and approve what matters. Built for established shops with staff, already spending on ads.";
