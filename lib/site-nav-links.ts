import { SHOW_PRICING, SHOW_RECEPTIONIST, SHOW_FLEET_INDUSTRY } from "@/components/site/flags";

export type SiteLink = { label: string; href: string };

type GatedSiteLink = SiteLink & {
  /** Omit or leave unset for always-visible links. */
  gate?: "pricing" | "receptionist" | "fleet";
};

function isLinkVisible(link: GatedSiteLink): boolean {
  if (link.gate === "pricing") return SHOW_PRICING;
  if (link.gate === "receptionist") return SHOW_RECEPTIONIST;
  if (link.gate === "fleet") return SHOW_FLEET_INDUSTRY;
  return true;
}

/** Primary nav — Product · How it works · Who it's for · FAQ. */
export const PRIMARY_NAV_LINKS: GatedSiteLink[] = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Who it's for", href: "/#who-its-for" },
  { label: "FAQ", href: "/#faq" },
  { label: "Receptionist", href: "/receptionist", gate: "receptionist" },
  { label: "Pricing", href: "/pricing", gate: "pricing" },
];

export function visiblePrimaryNavLinks(): SiteLink[] {
  return PRIMARY_NAV_LINKS.filter(isLinkVisible);
}

/** Footer columns — Product · Pilot access · Privacy · Terms · Security. */
export const FOOTER_COLUMNS: { title: string; links: GatedSiteLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Who it's for", href: "/#who-its-for" },
      { label: "Demo", href: "/demo" },
      { label: "Receptionist", href: "/receptionist", gate: "receptionist" },
      { label: "Pricing", href: "/pricing", gate: "pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Detailing", href: "/industries/detailing" },
      { label: "Ceramic coating", href: "/industries/ceramic-coating" },
      { label: "PPF, tint & wrap", href: "/industries/ppf-tint-wrap" },
      { label: "Mobile detailing", href: "/industries/mobile-detailing" },
      { label: "Fleet", href: "/industries/fleet", gate: "fleet" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pilot access", href: "/request-access" },
      { label: "Security", href: "/security" },
      { label: "Guides", href: "/resources" },
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
