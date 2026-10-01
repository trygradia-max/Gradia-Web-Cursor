import { SHOW_FLEET_INDUSTRY } from "@/components/site/flags";
import { INDUSTRY_SLUGS } from "@/components/site/industries/data";
import { ARTICLES } from "@/components/site/resources/articles";
import { siteBase } from "@/lib/site-config";
import type { MetadataRoute } from "next";

/**
 * Public marketing routes — must stay in sync with middleware allowlist and sitemap.
 * /pricing, /receptionist, and /industries/fleet are built but excluded until gates clear.
 * Do not add /api or /portal here — those stay reachable via middleware, not the marketing list.
 */

export const GATED_ROUTE_PREFIXES = ["/pricing", "/receptionist"] as const;

/** Exact paths gated even when a parent prefix is public (fleet accounts are out of scope). */
export const GATED_EXACT_PATHS = ["/industries/fleet"] as const;

/** Prefixes reachable without the takedown 308 (branch: marketing/pilot-recruitment). */
const PUBLIC_ROUTE_PREFIXES = [
  "/v2",
  "/product",
  "/industries",
  "/security",
  "/demo",
  "/resources",
  "/request-access",
  "/privacy",
  "/terms",
] as const;

const publicIndustrySlugs = INDUSTRY_SLUGS.filter(
  (slug) => slug !== "fleet" || SHOW_FLEET_INDUSTRY,
);

export const PUBLIC_MARKETING_PATHS = [
  "/",
  "/product",
  "/industries",
  ...publicIndustrySlugs.map((slug) => `/industries/${slug}`),
  "/security",
  "/demo",
  "/resources",
  ...ARTICLES.map((a) => `/resources/${a.slug}`),
  "/request-access",
  "/privacy",
  "/terms",
] as const;

export function isPublicMarketingRoute(pathname: string): boolean {
  if (pathname === "/") return true;
  if ((GATED_EXACT_PATHS as readonly string[]).includes(pathname)) {
    return SHOW_FLEET_INDUSTRY;
  }
  return PUBLIC_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/** Sitemap entries for every public marketing URL (excludes gated routes and /v2). */
export function publicSitemapEntries(): MetadataRoute.Sitemap {
  const base = siteBase();

  return PUBLIC_MARKETING_PATHS.map((path) => ({
    url: `${base}${path}`,
    changeFrequency:
      path === "/" || path === "/product" || path === "/resources"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      path === "/"
        ? 1
        : path === "/product" || path === "/request-access"
          ? 0.9
          : path.startsWith("/industries/") || path.startsWith("/resources/")
            ? 0.6
            : 0.8,
  }));
}
