import { Megaphone, Inbox, CalendarCheck, ShieldCheck } from "lucide-react";
import { PlatformDashboard } from "@/components/waitlist/PlatformDashboard";

/**
 * "Sneak peek inside Gradia" — adapted from tailark/features-6 on 21st.dev:
 * a headline + a product-screenshot preview (our live PlatformDashboard mock)
 * that fades into the page, with four feature points beneath it.
 */
const FEATURES = [
  {
    icon: Megaphone,
    title: "Campaigns, ready to send",
    body: "Your Marketer drafts the offer. Approve it and it texts + emails your whole list in one tap.",
  },
  {
    icon: Inbox,
    title: "Every lead in one inbox",
    body: "Calls, texts, and DMs answered, organized, and quoted — nothing slips through.",
  },
  {
    icon: CalendarCheck,
    title: "It books itself",
    body: "Your calendar fills, reschedules, and backfills no-shows without you lifting a finger.",
  },
  {
    icon: ShieldCheck,
    title: "Always your call",
    body: "Approve every action, or go fully autonomous. Your customers and data stay yours.",
  },
];

export function PlatformPreview() {
  return (
    <section
      id="platform"
      className="border-t border-[var(--border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-content space-y-12 px-5 sm:px-8">
        {/* headline */}
        <div className="grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--brand-primary)]">
              A sneak peek
            </span>
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              Your whole front office, one screen.
            </h2>
          </div>
          <p className="max-w-sm text-[var(--muted)] md:ml-auto">
            This is what you wake up to inside Gradia — every agent&rsquo;s work
            overnight, this week&rsquo;s numbers, live activity, and your next
            campaign drafted and ready to send.
          </p>
        </div>

        {/* dashboard preview, fading into the page */}
        <div className="relative">
          {/* purple ambient glow behind the screen */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(124,58,237,0.18), transparent 70%)",
            }}
          />
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-card">
            <PlatformDashboard />
          </div>
          {/* bottom fade into the page background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-2xl bg-gradient-to-t from-[var(--bg)] to-transparent"
          />
        </div>

        {/* feature points */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <f.icon className="size-4 text-[var(--brand-primary)]" />
                <h3 className="text-sm font-medium text-[var(--foreground)]">
                  {f.title}
                </h3>
              </div>
              <p className="text-sm text-[var(--muted)]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
