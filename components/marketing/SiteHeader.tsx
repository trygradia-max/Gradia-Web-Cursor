"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

const navItems = [
  { href: "/the-gap", label: "The Gap" },
  { href: "/see-it-close", label: "See It Close" },
  { href: "/the-cost", label: "The Cost" },
  { href: "/pricing", label: "Pricing" },
  { href: "/the-proof", label: "The Proof" },
  { href: "/partners", label: "Partners" },
] as const;

const navLinkClass =
  "font-sans text-sm font-medium text-[#6B7280] no-underline transition-colors duration-150 ease-in-out hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

const mobileNavLinkClass =
  "block border-0 bg-transparent px-0 py-3 text-left font-sans text-sm font-medium text-[#6B7280] no-underline transition-colors duration-150 ease-in-out hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

function NavSeparator() {
  return (
    <div
      className="hidden h-4 w-px shrink-0 bg-[#E5E7EB] md:block"
      aria-hidden="true"
    />
  );
}

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="3" y="11" width="18" height="11" rx="0" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BookDemoButton({
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
        "inline-flex items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-6 py-2.5 font-sans text-sm font-medium text-white no-underline transition-[background-color] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]",
        className,
      )}
    >
      Book a Demo →
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#FFFFFF]">
      <div className="relative mx-auto flex h-[72px] w-full max-w-content items-center px-4 sm:px-6">
        <Link
          href="/"
          className="relative z-[1] flex shrink-0 items-center gap-2 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B6EF5]"
        >
          <Image
            src="/images/gradia-logomark.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-auto shrink-0"
            priority
          />
          <span className="font-sans text-xl font-bold leading-none text-[#0A0A0A]">
            Gradia
          </span>
        </Link>

        <nav
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-[72px] items-center justify-center md:flex"
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
          {/* Desktop: Client Portal link with separators on both sides */}
          <NavSeparator />
          <Link
            href="/portal/login"
            className="hidden items-center gap-1.5 font-sans text-sm font-medium text-[#6B7280] no-underline transition-colors duration-150 ease-in-out hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5] md:inline-flex"
          >
            <LockIcon />
            Client Portal
          </Link>
          <NavSeparator />
          <BookDemoButton className="hidden md:inline-flex" />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[100px] border-0 bg-transparent text-[#0A0A0A] transition-colors hover:bg-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5] md:hidden"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="site-mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="border-b border-[#E5E7EB] bg-[#FFFFFF] md:hidden"
        >
          <nav
            className="mx-auto w-full max-w-content px-4 pb-6 pt-0 sm:px-6"
            aria-label="Primary mobile"
          >
            <ul className="divide-y divide-[#E5E7EB] border-t border-[#E5E7EB]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={mobileNavLinkClass}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portal/login"
                  className={cn(mobileNavLinkClass, "inline-flex items-center gap-2")}
                  onClick={close}
                >
                  <LockIcon />
                  Client Portal
                </Link>
              </li>
            </ul>
            <div className="pt-6">
              <BookDemoButton
                className="w-full justify-center"
                onClick={close}
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
