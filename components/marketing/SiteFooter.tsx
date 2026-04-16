import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const linkClass =
  "text-sm text-[var(--muted)] transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-content px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-block shrink-0 focus-visible:outline-offset-4">
            <Logo />
          </Link>
          <nav
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
            aria-label="Footer"
          >
            <Link href="/#the-solution" className={linkClass}>
              Product
            </Link>
            <Link href="/#integrations" className={linkClass}>
              Integrations
            </Link>
            <Link href="/resources" className={linkClass}>
              Resources
            </Link>
            <Link href="/contact" className={linkClass}>
              Contact
            </Link>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            <Link href="/portal/login" className={linkClass}>
              Client portal
            </Link>
          </nav>
          <a
            href="mailto:hello@gradia.com"
            className="text-sm font-medium text-white transition hover:text-[var(--brand-primary)] md:text-right"
          >
            hello@gradia.com
          </a>
        </div>
        <p className="mt-12 text-xs tracking-wide text-[var(--muted)]">
          © 2026 Gradia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
