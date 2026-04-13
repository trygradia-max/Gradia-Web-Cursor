import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const footerLink =
  "text-sm text-[var(--muted)] transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--brand-dark)]">
      <div className="mx-auto w-full max-w-content px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="inline-block focus-visible:outline-offset-4">
              <Logo variant="light" />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-[var(--muted)]">
              AI digital employees for healthcare, finance, and service
              businesses—your front end, handled.
            </p>
            <p className="mt-4 text-sm text-[var(--muted)]">
              <a
                href="mailto:hello@gradia.com"
                className="font-medium text-white hover:underline"
              >
                hello@gradia.com
              </a>
            </p>
            <div className="mt-6">
              <Button
                href="mailto:hello@gradia.com?subject=Book%20a%20call"
                variant="primary"
                className="text-sm"
              >
                Book a Call
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Product
              </span>
              <Link href="/#product" className={footerLink}>
                Overview
              </Link>
              <Link href="/contact" className={footerLink}>
                Contact
              </Link>
              <Link href="/portal/login" className={footerLink}>
                Client portal
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Legal
              </span>
              <Link href="/privacy" className={footerLink}>
                Privacy
              </Link>
              <Link href="/terms" className={footerLink}>
                Terms
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Gradia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
