import { siteBase } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteBase();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portal", "/api", "/v2"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
