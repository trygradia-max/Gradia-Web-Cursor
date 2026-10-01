/** Site-wide constants. Pilot recruitment (2026-10-01) per MVP website handoff. */

const DEFAULT_SITE_URL = "https://trygradia.com";

export function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

/** Primary conversion CTA — working /request-access form. */
export const PILOT_CTA_HREF = "/request-access";

/** Visible label for every primary conversion button. */
export const PILOT_CTA_LABEL = "Request pilot access";

/** Category line — AI-powered CRM, not an operating-system or staff-only story. */
export const SITE_CATEGORY =
  "AI-powered CRM for detailing and automotive appearance businesses";

export const SITE_HEADLINE =
  "More time on the car. Less time chasing the booking.";

export const SITE_DESCRIPTION =
  "Meet Gradia: customer records, quotes and scheduling with an AI Agent for detailing businesses. Request access to our controlled pilot.";

export const SITE_SOCIAL_SUBLINE =
  "Customers. Quotes. Scheduling. One Gradia Agent.";

export const SITE_DOCUMENT_TITLE = "Gradia | AI CRM for Detailing Businesses";

export const PILOT_STATUS =
  "We're preparing a controlled pilot. Features and channels will be enabled as they pass verification.";
