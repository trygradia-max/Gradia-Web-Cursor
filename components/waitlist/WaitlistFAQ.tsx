"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What exactly is Gradia?",
    a: "Gradia is the AI front office for auto detailers. Connect your CRM, calls, texts, email, and calendar in one place — then just tell Gradia what to do. Ask Gradia Whisper to quote a customer, book a job, follow up with a lead, or run a campaign, and Gradia Agent stages every step for your approval. Answering calls 24/7 and following up by text and email are the channels it works through. You approve everything before it sends, and it all lives in one CRM and calendar you own.",
  },
  {
    q: "Do I have to change how I work?",
    a: "No. Gradia plugs into the phone number, inbox, CRM, and calendar you already use. You just tell it what to do in plain English — Gradia drafts and stages the work in the background, but nothing gets sent or booked until you approve it. AI does the work; you stay in control.",
  },
  {
    q: "How much will it cost?",
    a: "$20/month — less than one detail. The founding 100 lock in 50% off for life ($10/month), plus early access to new features and our private beta, and the next 900 get 50% off their first month.",
  },
  {
    q: "When does it launch?",
    a: "Gradia launches July 10, 2026. We're in private beta now, and founding members get early access ahead of launch. Join the waitlist and we'll email you the moment your spot opens.",
  },
  {
    q: "Who owns my customer data?",
    a: "You do. Every customer, vehicle, quote, and job lives in one place you fully own and can export anytime. Always portable, always yours.",
  },
];

export function WaitlistFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Questions, answered.
      </h2>
      <ul className="mt-10 flex flex-col">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-[var(--border)]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-[var(--foreground)]">
                  {item.q}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-[var(--muted)]" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-[var(--muted)]" />
                )}
              </button>
              {isOpen && (
                <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--muted)]">
                  {item.a}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
