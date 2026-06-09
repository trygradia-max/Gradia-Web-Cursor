import type { MetadataRoute } from "next";

const defaultSite = "https://trygradia.com";

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return defaultSite;
  return raw.replace(/\/$/, "");
}

// Site is in waitlist-only mode: the landing page (/) is the only public route.
// The old marketing pages were removed and any old URLs 308-redirect to / via
// middleware.ts, so the sitemap lists just the root. (Full history is in git.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteBase()}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
