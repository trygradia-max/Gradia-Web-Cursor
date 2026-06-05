"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const ROLES = [
  "Solo / mobile detailer",
  "Shop owner",
  "Multi-location / franchise",
  "Ceramic / PPF installer",
  "Other",
];

const TIERS = [
  {
    title: "Founding 100",
    perk: "50% off for life, early access to new features, and our private beta.",
  },
  {
    title: "First 1,000",
    perk: "50% off your first month.",
  },
];

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      role: String(data.get("role") ?? ""),
      shopName: String(data.get("shopName") ?? ""),
      currentTools: String(data.get("currentTools") ?? ""),
      company_alt: String(data.get("company_alt") ?? ""),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      {/* left: pitch + counter + tiers */}
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
          Early access
        </span>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
          Get on the list.
        </h2>
        <p className="mt-4 max-w-md text-[var(--muted)]">
          Be first in line when Gradia opens up. The founding 100 lock in 50%
          off for life.
        </p>

        <ul className="mt-8 flex flex-col gap-3">
          {TIERS.map((t) => (
            <li key={t.title} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
              <span className="text-sm">
                <span className="font-medium text-[var(--foreground)]">
                  {t.title}
                </span>{" "}
                <span className="text-[var(--muted)]">— {t.perk}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* right: form */}
      <div className="border border-[var(--border)] bg-[var(--bg)] p-6 shadow-card sm:p-8">
        {status === "done" ? (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--dash-success)] text-white">
              <Check className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              You&rsquo;re on the list.
            </h3>
            <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">
              We&rsquo;ll email you the moment Gradia opens up.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* honeypot */}
            <input
              type="text"
              name="company_alt"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <Field label="Email" required>
              <input
                type="email"
                name="email"
                required
                placeholder="you@yourshop.com"
                className="w-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand-primary)]"
              />
            </Field>

            <Field label="Phone (optional)">
              <input
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                className="w-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand-primary)]"
              />
            </Field>

            <Field label="What do you run?">
              <select
                name="role"
                defaultValue=""
                className="w-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand-primary)]"
              >
                <option value="" disabled>
                  Select one
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Shop name (optional)">
              <input
                type="text"
                name="shopName"
                placeholder="Pristine Auto Detail"
                className="w-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand-primary)]"
              />
            </Field>

            <Field label="What do you use today? (optional)">
              <input
                type="text"
                name="currentTools"
                placeholder="DMs + a paper calendar"
                className="w-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand-primary)]"
              />
            </Field>

            {status === "error" && (
              <p className="text-sm text-[var(--dash-danger)]">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="wl-cta wl-pulse-glow mt-1 inline-flex items-center justify-center rounded-[100px] bg-[var(--brand-primary)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-primary-hover)] disabled:opacity-60"
            >
              {status === "loading" ? "Saving…" : "Save my spot"}
            </button>
            <p className="text-center text-xs text-[var(--muted)]">
              No spam. We&rsquo;ll only email you about early access.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="text-[var(--brand-primary)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
