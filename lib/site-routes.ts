import { INDUSTRY_SLUGS } from "@/components/site/industries/data";
import { ARTICLES } from "@/components/site/resources/articles";
import { siteBase } from "@/lib/site-config";
import type { MetadataRoute } from "next";

/**
 * Public marketing routes — must stay in sync with middleware allowlist and sitemap.
 * /pricing and /receptionist are built but excluded until their gates clear.
 */

export const GATED_ROUTE_PREFIXES = ["/pricing", "/receptionist"] as const;

/** Prefixes reachable without the takedown 308 (branch: site-v2). */
const PUBLIC_ROUTE_PREFIXES = [
  "/v2",
  "/product",
  "/industries",
  "/security",
  "/demo",
  "/resources",
  "/privacy",
  "/terms",
] as const;

export const PUBLIC_MARKETING_PATHS = [
  "/",
  "/product",
  "/industries",
  ...INDUSTRY_SLUGS.map((slug) => `/industries/${slug}`),
  "/security",
  "/demo",
  "/resources",
  ...ARTICLES.map((a) => `/resources/${a.slug}`),
  "/privacy",
  "/terms",
] as const;

export function isPublicMarketingRoute(pathname: string): boolean {
  if (pathname === "/") return true;
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
        : path === "/product"
          ? 0.9
          : path.startsWith("/industries/") || path.startsWith("/resources/")
            ? 0.6
            : 0.8,
  }));
}
