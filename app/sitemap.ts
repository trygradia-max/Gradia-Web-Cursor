import type { MetadataRoute } from "next";

const defaultSite = "https://trygradia.com";

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return defaultSite;
  return raw.replace(/\/$/, "");
}

// Site is in waitlist-only mode: the public routes are the landing page (/) and
// the legal pages (/privacy, /terms). The old marketing pages were removed and
// any old URLs 308-redirect to / via middleware.ts. (Full history is in git.)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
