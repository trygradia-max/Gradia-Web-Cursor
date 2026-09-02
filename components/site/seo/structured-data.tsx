import { siteBase, SITE_CATEGORY, SITE_DESCRIPTION, TRIAL_CTA_HREF } from "@/lib/site-config";
import { HOME_FAQS, type FaqItem } from "../faqs/home";
import { PRODUCT_FAQS } from "../faqs/product";

function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function baseSchemas() {
  const siteUrl = siteBase();

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Gradia",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description: `${SITE_CATEGORY} ${SITE_DESCRIPTION}`,
      offers: {
        "@type": "Offer",
        url: `${siteUrl}${TRIAL_CTA_HREF}`,
        availability: "https://schema.org/PreOrder",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Gradia",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      email: "trygradia@gmail.com",
      sameAs: ["https://www.instagram.com/trygradia/", "https://x.com/TryGradia"],
    },
  ];
}

function JsonLdScript({ data }: { data: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Homepage — SoftwareApplication + Organization + FAQPage (mirrors visible FAQ). */
export function HomeStructuredData() {
  return <JsonLdScript data={[...baseSchemas(), faqPageSchema(HOME_FAQS)]} />;
}

/** Product page — base schemas + product FAQ subset. */
export function ProductStructuredData() {
  return <JsonLdScript data={[...baseSchemas(), faqPageSchema(PRODUCT_FAQS)]} />;
}
