import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/lib/industries";

const defaultSite = "https://trygradia.com";

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return defaultSite;
  return raw.replace(/\/$/, "");
}

function u(path: string): string {
  const base = siteBase();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: u("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: u("/the-gap"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: u("/see-it-close"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: u("/the-cost"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: u("/the-proof"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: u("/partners"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: u("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: u("/pricing"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: u("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: u("/resources"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: u("/resources/why-every-missed-call-costs-more-than-you-think"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: u("/resources/front-desk-automation-for-healthcare-practices"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: u("/resources/the-roi-of-an-always-on-digital-front-desk"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...INDUSTRIES.map((industry) => ({
      url: u(`/industries/${industry.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: u("/privacy"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: u("/terms"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
