"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const navLinkClass =
  "text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]";

const mobileLinkClass =
  "block rounded-[2px] px-3 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--bg-band)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]";

const navItems = [
  { href: "/#the-solution", label: "Product" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

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
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg)]/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-content items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 focus-visible:outline-offset-4">
          <Logo />
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            href="mailto:hello@gradia.com?subject=Book%20a%20call"
            variant="primary"
            className="hidden px-4 py-2 text-sm sm:inline-flex"
          >
            Book a Call
          </Button>
          <Button
            href="/portal/login"
            variant="secondary"
            className="px-4 py-2 text-sm"
          >
            Client login
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[var(--border-subtle)] text-[var(--foreground)] transition-colors hover:bg-[var(--bg-band)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] md:hidden"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
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
            className={cn(
              "fixed inset-x-0 top-[4.25rem] z-50 max-h-[min(85vh,calc(100dvh-4.25rem))] overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--bg)] shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)] md:hidden",
            )}
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
              <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-8">
                <Button
                  href="mailto:hello@gradia.com?subject=Book%20a%20call"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={close}
                >
                  Book a Call
                </Button>
                <Button
                  href="/portal/login"
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={close}
                >
                  Client login
                </Button>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
