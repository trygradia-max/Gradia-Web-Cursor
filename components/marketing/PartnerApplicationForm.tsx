"use client";

import { useId, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

const INDUSTRY_OPTIONS = [
  "Healthcare",
  "Auto Dealerships",
  "Real Estate",
  "Home Services",
  "Legal",
  "Finance",
  "Insurance",
  "Dental",
  "Medspa",
  "Mortgage",
  "Staffing",
  "Other",
] as const;

const VOLUME_OPTIONS = [
  "Under 50",
  "50–100",
  "100–250",
  "250–500",
  "500+",
] as const;

const REFERRAL_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral",
  "Word of mouth",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const labelClass =
  "block font-sans text-[13px] font-medium text-[#0A0A0A]";
const inputClass =
  "mt-1.5 block w-full rounded-none border border-[#E5E7EB] bg-white px-4 py-[14px] font-sans text-[15px] leading-[1.4] text-[#0A0A0A] placeholder:text-[#6B7280] transition-colors duration-150 ease-in-out focus:border-[#3B6EF5] focus:outline-none";
const selectClass = `${inputClass} appearance-none pr-10`;

export function PartnerApplicationForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      businessName: String(data.get("businessName") ?? ""),
      industry: String(data.get("industry") ?? ""),
      location: String(data.get("location") ?? ""),
      website: String(data.get("website") ?? ""),
      monthlyLeads: String(data.get("monthlyLeads") ?? ""),
      reason: String(data.get("reason") ?? ""),
      heardFrom: String(data.get("heardFrom") ?? ""),
      company_alt: String(data.get("company_alt") ?? ""),
    };

    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="mt-10 space-y-6"
      aria-describedby={isSuccess ? `${formId}-success` : undefined}
    >
      {/* Honeypot — visually hidden, off-screen so screen readers + tab focus
          skip it. Real users never see or interact with it; bots routinely
          auto-fill every field, which is how we catch them. */}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={`${formId}-honey`}>
          If you are a human, leave this field empty
        </label>
        <input
          id={`${formId}-honey`}
          type="text"
          name="company_alt"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div>
        <label htmlFor={`${formId}-fullName`} className={labelClass}>
          Full Name
        </label>
        <input
          id={`${formId}-fullName`}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-businessName`} className={labelClass}>
          Business Name
        </label>
        <input
          id={`${formId}-businessName`}
          name="businessName"
          type="text"
          autoComplete="organization"
          required
          maxLength={160}
          placeholder="Your business or company name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-industry`} className={labelClass}>
          Industry
        </label>
        <div className="relative mt-1.5">
          <select
            id={`${formId}-industry`}
            name="industry"
            required
            defaultValue=""
            className={`${selectClass} mt-0`}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-location`} className={labelClass}>
          Location
        </label>
        <input
          id={`${formId}-location`}
          name="location"
          type="text"
          autoComplete="address-level2"
          required
          maxLength={120}
          placeholder="City, State"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-website`} className={labelClass}>
          Website (optional)
        </label>
        <input
          id={`${formId}-website`}
          name="website"
          type="url"
          autoComplete="url"
          maxLength={300}
          placeholder="https://yourwebsite.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-monthlyLeads`} className={labelClass}>
          Estimated monthly inbound leads
        </label>
        <div className="relative mt-1.5">
          <select
            id={`${formId}-monthlyLeads`}
            name="monthlyLeads"
            required
            defaultValue=""
            className={`${selectClass} mt-0`}
          >
            <option value="" disabled>
              Select a range
            </option>
            {VOLUME_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-reason`} className={labelClass}>
          Why do you want to partner with Gradia?
        </label>
        <textarea
          id={`${formId}-reason`}
          name="reason"
          required
          rows={5}
          maxLength={2000}
          placeholder="Tell us about your business and what you're looking to achieve..."
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-heardFrom`} className={labelClass}>
          How did you hear about Gradia? (optional)
        </label>
        <div className="relative mt-1.5">
          <select
            id={`${formId}-heardFrom`}
            name="heardFrom"
            defaultValue=""
            className={`${selectClass} mt-0`}
          >
            <option value="">— Select one</option>
            {REFERRAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex w-full items-center justify-center rounded-[100px] border-0 bg-[#3B6EF5] px-10 py-4 font-sans text-[15px] font-medium text-white no-underline transition-[background-color,opacity] duration-150 ease-in-out hover:bg-[#2D5CE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Submit Application →"}
      </button>

      <div className="min-h-[24px]" aria-live="polite">
        {isSuccess ? (
          <p
            id={`${formId}-success`}
            className="mt-6 text-center font-sans text-base font-medium text-[#10B981]"
            role="status"
          >
            Application received. We&apos;ll be in touch within 48 hours.
          </p>
        ) : null}
        {status === "error" ? (
          <p
            className="mt-6 text-center font-sans text-base font-medium text-[#DC2626]"
            role="alert"
          >
            Something went wrong. Please try again or email us directly at{" "}
            <a
              href="mailto:trygradia@gmail.com?subject=New%20Gradia%20Partnership%20Application"
              className="underline underline-offset-2"
            >
              trygradia@gmail.com
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
