import { LoginForm } from "@/components/portal/LoginForm";
import Link from "next/link";
import { Suspense } from "react";
import { SectionLabel } from "@/components/marketing/SectionLabel";

export const metadata = {
  title: "Client login",
};

function LoginFormFallback() {
  return (
    <div className="mx-auto h-64 max-w-sm animate-pulse rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]" />
  );
}

export default function PortalLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-col items-center px-4 py-16 sm:px-6 sm:py-24">
      <SectionLabel className="text-[var(--brand-primary)]">
        Client portal
      </SectionLabel>
      <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
        Sign in to your dashboard
      </h1>
      <p className="mt-3 max-w-md text-center text-sm text-[var(--muted)]">
        Review how your digital employees performed—calls, bookings, and recent
        activity.
      </p>
      <div className="mt-10 w-full">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-8 text-center text-sm text-[var(--muted)]">
        Need access?{" "}
        <Link
          href="mailto:hello@gradia.com?subject=Portal%20access"
          className="font-semibold text-[var(--brand-primary)] hover:underline"
        >
          Contact Gradia
        </Link>
      </p>
    </div>
  );
}
