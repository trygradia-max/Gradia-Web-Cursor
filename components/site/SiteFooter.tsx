import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

/* v2 footer (site-v2-plan §3 + D-033 routes). Security & Demo live here
   until their pages mature. All links resolve to planned routes. */

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Receptionist", href: "/receptionist" },
      { label: "Pricing", href: "/pricing" },
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
      { label: "Contact", href: "/contact" },
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

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--sv-line)] bg-[var(--sv-wash)]">
      <div className="mx-auto w-full max-w-[var(--sv-container)] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[16rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
              The operating system for detailing and automotive appearance shops.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-[length:var(--sv-text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)] transition-colors hover:text-[var(--sv-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-[var(--sv-line)] pt-6 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
          © {new Date().getFullYear()} Gradia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
