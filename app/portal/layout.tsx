import Link from "next/link";
import { SignOutButton } from "@/components/portal/SignOutButton";
import { Logo } from "@/components/ui/Logo";
import { auth } from "@/auth";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--brand-dark)]">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--brand-dark)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-content items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="shrink-0 focus-visible:outline-offset-4">
              <Logo variant="light" />
            </Link>
            {session ? (
              <nav className="flex items-center gap-4 text-sm">
                <Link
                  href="/portal/dashboard"
                  className="font-medium text-[var(--muted)] transition hover:text-white"
                >
                  Dashboard
                </Link>
              </nav>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            {session?.user ? (
              <>
                <span className="hidden text-sm text-[var(--muted)] sm:inline">
                  {session.user.email}
                </span>
                <SignOutButton />
              </>
            ) : (
              <Link
                href="/"
                className="text-sm font-medium text-[var(--muted)] hover:text-white"
              >
                Back to site
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-[var(--border-subtle)] py-6 text-center">
        <p className="text-xs text-[var(--muted)]">
          Powered by{" "}
          <Link href="/" className="text-white hover:underline">
            Gradia
          </Link>
        </p>
      </footer>
    </div>
  );
}
