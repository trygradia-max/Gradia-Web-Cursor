import { SHOW_PRICING, SHOW_RECEPTIONIST } from "@/components/site/flags";

export type SiteLink = { label: string; href: string };

type GatedSiteLink = SiteLink & {
  /** Omit or leave unset for always-visible links. */
  gate?: "pricing" | "receptionist";
};

function isLinkVisible(link: GatedSiteLink): boolean {
  if (link.gate === "pricing") return SHOW_PRICING;
  if (link.gate === "receptionist") return SHOW_RECEPTIONIST;
  return true;
}

/** Primary nav — hides routes that 308 until their publish gates clear (Pass 7 QA). */
export const PRIMARY_NAV_LINKS: GatedSiteLink[] = [
  { label: "Product", href: "/product" },
  { label: "Receptionist", href: "/receptionist", gate: "receptionist" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing", gate: "pricing" },
  { label: "Resources", href: "/resources" },
];

export function visiblePrimaryNavLinks(): SiteLink[] {
  return PRIMARY_NAV_LINKS.filter(isLinkVisible);
}

/** Footer columns — same gating rules as nav for product links. */
export const FOOTER_COLUMNS: { title: string; links: GatedSiteLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Receptionist", href: "/receptionist", gate: "receptionist" },
      { label: "Pricing", href: "/pricing", gate: "pricing" },
      { label: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Detailing", href: "/industries/detailing" },
      { label: "Ceramic coating", href: "/industries/ceramic-coating" },
      { label: "PPF, tint & wrap", href: "/industries/ppf-tint-wrap" },
      { label: "Mobile detailing", href: "/industries/mobile-detailing" },
      { label: "Fleet", href: "/industries/fleet" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/resources" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "mailto:trygradia@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function visibleFooterColumns(): { title: string; links: SiteLink[] }[] {
  return FOOTER_COLUMNS.map((col) => ({
    title: col.title,
    links: col.links.filter(isLinkVisible),
  }));
}
