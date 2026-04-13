import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const navLinkClass =
  "text-sm font-medium text-[var(--muted)] transition-colors hover:text-white";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--brand-dark)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 focus-visible:outline-offset-4">
          <Logo variant="light" />
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <Link href="/#product" className={navLinkClass}>
            Product
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
          <Link href="/privacy" className={navLinkClass}>
            Privacy
          </Link>
          <Link href="/terms" className={navLinkClass}>
            Terms
          </Link>
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
        </div>
      </div>
    </header>
  );
}
