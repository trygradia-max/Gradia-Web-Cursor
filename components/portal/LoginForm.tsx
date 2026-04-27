"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getSafePortalCallbackUrl } from "@/lib/portal/safe-callback-url";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const inputClass =
  "block w-full bg-[var(--dash-bg)] border border-[var(--dash-border-strong)] px-4 py-3 font-sans text-sm text-white placeholder:text-[var(--dash-secondary)] outline-none transition-colors focus:border-[var(--dash-accent)]";

const labelClass =
  "block font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid email or password.");
        setPending(false);
        return;
      }

      const targetUrl = getSafePortalCallbackUrl(
        callbackUrl,
        window.location.origin,
      );

      window.location.href = targetUrl;
    } catch {
      setError("Something went wrong. Try again.");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-sm space-y-5 border border-[var(--dash-border)] bg-[var(--dash-surface)] p-8 font-sans"
    >
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputClass} mt-2`}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClass} mt-2`}
          placeholder="••••••••"
        />
      </div>

      {error ? (
        <p
          className="font-sans text-sm text-[var(--dash-danger)]"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full cursor-pointer items-center justify-center bg-[var(--dash-accent)] px-6 py-[14px] font-sans text-sm font-medium text-white transition-[background-color] duration-150 ease-in-out hover:bg-[var(--dash-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
