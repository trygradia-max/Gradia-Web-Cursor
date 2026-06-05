import type { MetadataRoute } from "next";

const defaultSite = "https://trygradia.com";

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return defaultSite;
  return raw.replace(/\/$/, "");
}

// Site is in waitlist-only mode: the landing page (/) is the only public route.
// All other marketing pages 307-redirect to / via middleware.ts, so the sitemap
// lists just the root. (Previous full sitemap preserved in _backup/.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteBase()}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
