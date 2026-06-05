"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";

/**
 * Rotating "just joined" feed — light social momentum near the form. Sample
 * names/cities; swap for a real recent-signups source when available.
 */
const SIGNUPS = [
  { name: "Marcus J.", city: "Dallas, TX" },
  { name: "Priya S.", city: "Phoenix, AZ" },
  { name: "Dre W.", city: "Atlanta, GA" },
  { name: "Sam P.", city: "Tampa, FL" },
  { name: "Luis R.", city: "San Diego, CA" },
  { name: "Toyota lot", city: "Columbus, OH" },
];

export function SignupTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SIGNUPS.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const s = SIGNUPS[i];

  return (
    <div className="flex h-6 items-center gap-2 overflow-hidden text-xs text-[var(--muted)]">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--dash-success)]/15 text-[var(--dash-success)]">
        <UserPlus className="h-2.5 w-2.5" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="whitespace-nowrap"
        >
          <span className="font-medium text-[var(--foreground)]">{s.name}</span>
          <span> · {s.city} just joined</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
