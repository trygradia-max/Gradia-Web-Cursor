"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { visiblePrimaryNavLinks } from "@/lib/site-nav-links";
import { Button } from "./primitives";

/* v2 nav: starts blended into the hero, becomes a solid bar with a hairline
   border after scroll. Primary CTA always visible. Sign in is omitted until
   the customer login destination is verified for invited users. */

const navLinkClass =
  "text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-ink-2)] transition-colors hover:text-[var(--sv-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = visiblePrimaryNavLinks();

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[var(--sv-line)] bg-[color-mix(in_srgb,var(--sv-surface)_92%,transparent)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-[60] focus:rounded-[100px] focus:bg-[var(--sv-ink)] focus:px-4 focus:py-2 focus:text-[length:var(--sv-text-sm)] focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[var(--sv-accent)]"
      >
        Skip to main content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[var(--sv-container)] items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" aria-label="Gradia home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={navLinkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={PILOT_CTA_HREF} variant="primary">
            {PILOT_CTA_LABEL}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            href={PILOT_CTA_HREF}
            variant="primary"
            className="h-9 px-4 text-[length:var(--sv-text-sm)]"
          >
            {PILOT_CTA_LABEL}
          </Button>
          <button
            type="button"
            className="px-2 py-1 text-sm font-medium text-[var(--sv-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="site-mobile-nav"
          className="border-b border-[var(--sv-line)] bg-[var(--sv-surface)] px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[length:var(--sv-text-base)] font-medium text-[var(--sv-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Button href={PILOT_CTA_HREF} variant="primary" className="w-full">
              {PILOT_CTA_LABEL}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
