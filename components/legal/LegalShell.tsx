import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/**
 * Shared wrapper for the legal pages (privacy / terms): sticky header with the
 * logo + a back link, a readable max-width document body (.legal-prose), and a
 * minimal footer. Server component — no interactivity needed.
 */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-[var(--bg)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Gradia home" className="shrink-0">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">Last updated: {updated}</p>

        <div className="legal-prose mt-10">{children}</div>

        <div className="mt-14 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
          Questions about this policy? Email{" "}
          <a
            href="mailto:trygradia@gmail.com"
            className="text-[var(--brand-primary)] underline underline-offset-2"
          >
            trygradia@gmail.com
          </a>
          .
        </div>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo />
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              Home
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Terms
            </Link>
            <a
              href="mailto:trygradia@gmail.com"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-[var(--muted)]">©2026 Gradia LLC</p>
        </div>
      </footer>
    </div>
  );
}
