"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinkClass =
  "font-sans text-sm font-medium text-[var(--gray)] transition-colors hover:text-[var(--black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]";

const clientLoginClass =
  "font-sans text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]";

const mobileLinkClass =
  "block px-3 py-3 font-sans text-sm font-medium text-[var(--gray)] transition-colors hover:bg-[var(--light)] hover:text-[var(--black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

const navItems = [
  { href: "/#the-solution", label: "Product" },
  { href: "/about", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
] as const;

function BookDemoLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={demoHref}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-none border-0 bg-[var(--blue)] px-6 py-2.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]",
        className,
      )}
    >
      Book a Demo
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const root = panelRef.current;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const list = [...focusables];
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      menuButtonRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]">
      <div className="relative mx-auto flex h-16 w-full max-w-content items-center px-4 sm:px-6">
        <Link
          href="/"
          className="relative z-[1] shrink-0 font-sans text-xl font-bold leading-none text-[var(--black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)]"
        >
          Gradia
        </Link>

        <nav
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 items-center justify-center gap-10 md:flex"
          aria-label="Primary"
        >
          <ul className="pointer-events-auto flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-[1] ml-auto flex items-center gap-4">
          <Link
            href="/portal/login"
            className={cn(clientLoginClass, "hidden md:inline-block")}
          >
            Client Login
          </Link>
          <BookDemoLink className="hidden md:inline-flex" />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-[var(--border)] text-[var(--black)] transition-colors hover:bg-[var(--light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] md:hidden"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={close}
          />
          <div
            id="site-mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 top-16 z-50 max-h-[min(85vh,calc(100dvh-4rem))] overflow-y-auto border-b border-[var(--border)] bg-[var(--white)] shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)] md:hidden"
          >
            <nav className="mx-auto max-w-content px-4 py-6" aria-label="Primary mobile">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={mobileLinkClass} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-[var(--border)] pt-8">
                <Link
                  href="/portal/login"
                  className={cn(
                    mobileLinkClass,
                    "text-[#6B7280] hover:text-[#0A0A0A]",
                  )}
                  onClick={close}
                >
                  Client Login
                </Link>
                <BookDemoLink
                  className="mt-4 w-full justify-center"
                  onClick={close}
                />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
