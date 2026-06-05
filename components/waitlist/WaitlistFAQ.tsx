"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What exactly is Gradia?",
    a: "Gradia is a 7-agent AI front office built for car detailers. The agents answer your calls and DMs, quote cars from a photo, book and reschedule jobs, send and chase invoices, post your before/afters, ask for reviews, and re-engage cold leads — so you can keep your hands on the car.",
  },
  {
    q: "Do I have to change how I work?",
    a: "No. Gradia plugs into the phone number, inbox, and calendar you already use. Your agents work in the background; you approve anything you want to keep an eye on, and ignore the rest.",
  },
  {
    q: "How much will it cost?",
    a: "Less than one detail a month. Final pricing is set before launch — the founding 100 lock in 50% off for life plus early access to new features and our private beta, and the first 1,000 get 50% off their first month.",
  },
  {
    q: "When does it launch?",
    a: "We're in private beta now and opening up in waves. Join the waitlist and we'll email you the moment your spot is ready.",
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
