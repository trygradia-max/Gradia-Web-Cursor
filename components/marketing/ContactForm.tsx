"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Contact from ${name || "Gradia site"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:trygradia@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-card"
    >
      <h2
        id="contact-form-heading"
        className="font-sans text-2xl font-semibold text-[var(--foreground)]"
      >
        Send a message
      </h2>
      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[var(--brand-dark)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[var(--brand-light)] px-4 py-3 text-[var(--brand-dark)] placeholder:text-[var(--brand-slate)]/60 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[var(--brand-dark)]"
          >
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[var(--brand-light)] px-4 py-3 text-[var(--brand-dark)] placeholder:text-[var(--brand-slate)]/60 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-[var(--brand-dark)]"
          >
            How can we help?
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-[#e2e8f0] bg-[var(--brand-light)] px-4 py-3 text-[var(--brand-dark)] placeholder:text-[var(--brand-slate)]/60 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
            placeholder="Tell us about your workflows, volume, and goals."
          />
        </div>
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          Email Gradia
        </Button>
        {status === "sent" ? (
          <p className="text-sm text-[var(--brand-slate)]" role="status">
            Your email client should open with this message. If nothing opens,
            copy your note and send it to trygradia@gmail.com.
          </p>
        ) : null}
      </form>
    </section>
  );
}
