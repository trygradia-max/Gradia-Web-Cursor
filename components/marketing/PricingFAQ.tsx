"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "Is there a contract?",
    answer:
      "No. Gradia is month-to-month. You can cancel at any time with no penalties and no questions asked. We keep clients by being worth it, not by locking them in.",
  },
  {
    question: "What happens if I want to cancel?",
    answer:
      "Just let us know before your next billing date and you won't be charged again. Your data stays accessible for 30 days after cancellation so you can export anything you need.",
  },
  {
    question: "How does the performance fee work?",
    answer:
      "When your team marks a deal as sold in the Gradia dashboard, a 0.5% performance fee is calculated on the confirmed deal value. This is invoiced monthly alongside your base plan. It only applies to deals Gradia helped close — you control what gets marked.",
  },
];

export function PricingFAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="border-t border-[#E5E7EB]">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <li key={faq.question} className="border-b border-[#E5E7EB]">
            <button
              type="button"
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() =>
                setOpenIndex((current) => (current === i ? null : i))
              }
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
            >
              <span className="font-sans text-lg font-semibold text-[#0A0A0A]">
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center text-[#0A0A0A] transition-transform duration-200 ease-out",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                <Plus className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 font-sans text-[15px] leading-[1.7] text-[#6B7280]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
