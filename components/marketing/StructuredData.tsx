import { HOME_FAQS } from "@/components/site/faqs/home";
import { SITE_CATEGORY, SITE_DESCRIPTION, siteBase } from "@/lib/site-config";

/**
 * Legacy JSON-LD helper. Live homepage/product schemas live in
 * components/site/seo/structured-data.tsx and omit Offer data.
 */
const siteUrl = siteBase();

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gradia",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description: `${SITE_CATEGORY}. ${SITE_DESCRIPTION}`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gradia",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    email: "trygradia@gmail.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
