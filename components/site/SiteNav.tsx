"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "./primitives";

/* v2 nav: starts blended into the hero, becomes a solid bar with a hairline
   border after scroll (site-v2-plan §3.1). Primary CTA always visible. */

const links = [
  { label: "Product", href: "/product" },
  { label: "Receptionist", href: "/receptionist" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[var(--sv-line)] bg-[color-mix(in_srgb,var(--sv-surface)_92%,transparent)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[var(--sv-container)] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Gradia home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[var(--sv-text-sm)] font-medium text-[var(--sv-ink-2)] transition-colors hover:text-[var(--sv-ink)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/portal/login" variant="ghost">Sign in</Button>
          <Button href="/#trial" variant="primary">Start your trial</Button>
        </div>

        <button
          className="md:hidden text-[var(--sv-ink)] px-2 py-1 text-sm font-medium"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      {open && (
        <div className="border-b border-[var(--sv-line)] bg-[var(--sv-surface)] px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[var(--sv-text-base)] font-medium text-[var(--sv-ink)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/#trial" variant="primary" className="w-full">Start your trial</Button>
            <Button href="/portal/login" variant="secondary" className="w-full">Sign in</Button>
          </div>
        </div>
      )}
    </header>
  );
}
