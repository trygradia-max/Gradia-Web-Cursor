"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { SMS_CONSENT_DISCLOSURE } from "@/lib/sms-consent";

const SERVICE_TYPES = [
  { value: "detailing", label: "Detailing" },
  { value: "ceramic-coating", label: "Ceramic coating" },
  { value: "ppf-tint", label: "PPF, tint or wrap" },
  { value: "mobile", label: "Mobile detailing" },
  { value: "other", label: "Other appearance work" },
];

const inputClass =
  "w-full rounded-[var(--sv-radius-sm)] border border-[var(--sv-line-strong)] bg-[var(--sv-surface)] px-3 py-2.5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]";

export function PilotRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [smsConsent, setSmsConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();

    if (smsConsent && !phone) {
      setStatus("error");
      setError("Add a mobile number to receive text messages, or uncheck the SMS box.");
      return;
    }

    setStatus("loading");
    setError(null);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone,
      shopName: String(data.get("shopName") ?? ""),
      serviceType: String(data.get("serviceType") ?? ""),
      teamSize: String(data.get("teamSize") ?? ""),
      currentTools: String(data.get("currentTools") ?? ""),
      handleRequest: String(data.get("handleRequest") ?? ""),
      smsConsent,
      company_alt: String(data.get("company_alt") ?? ""),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; retryAfterSec?: number }
        | null;
      if (!res.ok) {
        throw new Error(body?.error ?? "We couldn't save your request. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "We couldn't save your request. Please try again.",
      );
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)] px-6 py-12 text-center sm:px-8">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sv-accent)] text-white">
          <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="text-[length:var(--sv-text-xl)] font-semibold text-[var(--sv-ink)]">
          Your request is saved.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]">
          We&apos;ll follow up about fit and availability. This does not create an account or start
          a subscription.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[var(--sv-radius)] border border-[var(--sv-line)] bg-[var(--sv-surface)] p-6 sm:p-8"
      noValidate
    >
      <input
        type="text"
        name="company_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field label="Name" htmlFor="name" required>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </Field>

      <Field label="Business email" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@yourshop.com"
          className={inputClass}
        />
      </Field>

      <Field label="Business name" htmlFor="shopName" required>
        <input id="shopName" name="shopName" type="text" required className={inputClass} />
      </Field>

      <Field label="Service type" htmlFor="serviceType" required>
        <select id="serviceType" name="serviceType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select one
          </option>
          {SERVICE_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="mt-4">
        <legend className="mb-1.5 text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink)]">
          Solo or team <span className="text-[var(--sv-accent)]">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
            <input type="radio" name="teamSize" value="solo" required className="accent-[var(--sv-accent)]" />
            Solo
          </label>
          <label className="flex items-center gap-2 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
            <input type="radio" name="teamSize" value="team" className="accent-[var(--sv-accent)]" />
            Team
          </label>
        </div>
      </fieldset>

      <Field label="What tools do you use today? (optional)" htmlFor="currentTools">
        <input
          id="currentTools"
          name="currentTools"
          type="text"
          placeholder="Texts, a paper calendar, another CRM…"
          className={inputClass}
        />
      </Field>

      <Field label="What would you like Gradia to handle?" htmlFor="handleRequest" required>
        <textarea
          id="handleRequest"
          name="handleRequest"
          required
          rows={4}
          className={inputClass}
        />
      </Field>

      <Field label="Mobile phone (optional)" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          className={inputClass}
        />
      </Field>

      <div className="mt-4 flex items-start gap-3 rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-wash)] p-3.5">
        <input
          type="checkbox"
          id="smsConsent"
          name="smsConsent"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--sv-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)]"
        />
        <label htmlFor="smsConsent" className="text-[13px] leading-relaxed text-[var(--sv-ink)]">
          {SMS_CONSENT_DISCLOSURE.replace(
            "See our Terms of Service and Privacy Policy.",
            "",
          )}
          See our{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sv-accent)] underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sv-accent)] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      <p className="mt-2 text-[length:var(--sv-text-xs)] text-[var(--sv-ink-3)]">
        SMS opt-in is optional and separate from this request. Requesting pilot access is not
        consent for automated marketing texts.
      </p>

      {status === "error" && error && (
        <p role="alert" className="mt-4 text-[length:var(--sv-text-sm)] text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex h-[3.25rem] w-full items-center justify-center rounded-[100px] bg-[var(--sv-ink)] px-8 text-[length:var(--sv-text-base)] font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sv-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Saving…" : "Request pilot access"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink)]">
        {label}
        {required && <span className="text-[var(--sv-accent)]"> *</span>}
      </label>
      {children}
    </div>
  );
}
