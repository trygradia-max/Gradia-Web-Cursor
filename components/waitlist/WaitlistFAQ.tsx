"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { HOME_FAQS } from "@/components/site/faqs/home";

/** Leftover waitlist FAQ chrome. Public homepage FAQs live in components/site/faqs. */
export function WaitlistFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Questions, answered.
      </h2>
      <ul className="mt-10 flex flex-col">
        {HOME_FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-[var(--border)]">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-[var(--foreground)]">{item.q}</span>
                {isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </button>
              {isOpen && (
                <p className="pb-5 text-sm text-[var(--muted)]">{item.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
