import Link from "next/link";
import { SignOutButton } from "@/components/portal/SignOutButton";
import { getPortalSession } from "@/lib/portal/session";

const LOGOMARK_SRC = "/images/gradia-logomark.svg";

function NotificationBell() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--dash-secondary)] transition-colors hover:text-[var(--dash-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    </button>
  );
}

function AvatarTile({ email }: { email: string | null | undefined }) {
  const initial = (email?.trim()?.[0] ?? "G").toUpperCase();
  return (
    <div
      className="inline-flex h-8 w-8 select-none items-center justify-center border border-[var(--dash-border-strong)] bg-[var(--dash-border)] font-sans text-[13px] font-medium text-[var(--dash-text)]"
      aria-label={email ? `Signed in as ${email}` : "Account"}
      title={email ?? undefined}
    >
      {initial}
    </div>
  );
}

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getPortalSession();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--dash-bg)] font-sans text-[var(--dash-text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--dash-border)] bg-[var(--dash-surface)]">
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[18px] font-bold leading-none text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dash-accent)]"
            aria-label="Gradia home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGOMARK_SRC}
              alt=""
              width={22}
              height={24}
              className="h-6 w-auto"
              aria-hidden="true"
            />
            <span>Gradia</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-3 sm:gap-5">
              <NotificationBell />
              <AvatarTile email={session.email} />
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/"
              className="font-sans text-[13px] text-[var(--dash-secondary)] no-underline transition-colors hover:text-[var(--dash-text)]"
            >
              Back to site
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
