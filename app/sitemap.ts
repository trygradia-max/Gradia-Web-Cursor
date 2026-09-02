import { publicSitemapEntries } from "@/lib/site-routes";
import type { MetadataRoute } from "next";

/** Pass 6 — lists every middleware-whitelisted marketing route. */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicSitemapEntries();
}
