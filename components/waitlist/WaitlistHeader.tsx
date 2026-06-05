"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Workflow,
  Sparkles,
  Database,
  Tag,
  HelpCircle,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { TubelightNav, type TubelightItem } from "@/components/ui/TubelightNav";

const NAV_ITEMS: TubelightItem[] = [
  { name: "Agents", url: "#cast", icon: Users },
  { name: "How it works", url: "#day", icon: Workflow },
  { name: "Why Gradia", url: "#why", icon: Sparkles },
  { name: "Your shop", url: "#data", icon: Database },
  { name: "Pricing", url: "#waitlist", icon: Tag },
  { name: "FAQ", url: "#faq", icon: HelpCircle },
];

export function WaitlistHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="Gradia home">
          <Logo />
        </a>

        {/* tubelight nav — desktop */}
        <div className="hidden md:block">
          <TubelightNav items={NAV_ITEMS} />
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="wl-cta hidden rounded-[100px] bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-primary-hover)] sm:inline-flex"
          >
            Join waitlist
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-[var(--foreground)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 md:hidden">
          <div className="flex flex-col">
            {NAV_ITEMS.map((l) => (
              <a
                key={l.name}
                href={l.url}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-[var(--border)] py-3 text-sm text-[var(--foreground)] last:border-0"
              >
                <l.icon className="h-4 w-4 text-[var(--muted)]" />
                {l.name}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center rounded-[100px] bg-[var(--brand-primary)] px-5 py-3 text-sm font-medium text-white"
            >
              Join waitlist
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
