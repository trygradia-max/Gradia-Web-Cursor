import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/portal/LoginForm";

export const metadata = {
  title: "Client login",
};

function LoginFormFallback() {
  return (
    <div
      className="mx-auto h-72 w-full max-w-sm animate-pulse border border-[var(--dash-border)] bg-[var(--dash-surface)]"
      aria-hidden="true"
    />
  );
}

export default function PortalLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--dash-bg)] px-4 py-16 sm:px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--dash-accent)]">
            Client portal
          </p>
          <h1 className="mt-3 font-sans text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
            Sign in to your dashboard
          </h1>
          <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-[1.6] text-[var(--dash-secondary)]">
            Review how your digital employees performed — calls, bookings,
            and recent activity.
          </p>
        </div>

        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center font-sans text-sm text-[var(--dash-secondary)]">
          Need access?{" "}
          <Link
            href="mailto:trygradia@gmail.com?subject=Portal%20access"
            className="font-medium text-[var(--dash-accent)] no-underline transition-colors hover:text-white"
          >
            Contact Gradia
          </Link>
        </p>
      </div>
    </div>
  );
}
