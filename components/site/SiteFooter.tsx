import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { visibleFooterColumns } from "@/lib/site-nav-links";

/* v2 footer (site-v2-plan §3 + D-033 routes). Security & Demo live here
   until their pages mature. Gated product links hide until their flags flip. */

const footerLinkClass =
  "text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)] transition-colors hover:text-[var(--sv-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={footerLinkClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={footerLinkClass}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const cols = visibleFooterColumns();

  return (
    <footer className="border-t border-[var(--sv-line)] bg-[var(--sv-wash)]">
      <div className="mx-auto w-full max-w-[var(--sv-container)] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[16rem] text-[length:var(--sv-text-sm)] text-[var(--sv-ink-3)]">
              An AI-native CRM for automotive appearance shops.
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
                    <FooterLink href={l.href}>{l.label}</FooterLink>
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
