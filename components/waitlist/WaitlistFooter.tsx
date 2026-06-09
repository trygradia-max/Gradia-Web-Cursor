import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "#waitlist" },
      { label: "Waitlist", href: "#waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#why" },
      { label: "Contact", href: "mailto:trygradia@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/trygradia/" },
  { label: "X (Twitter)", href: "https://x.com/TryGradia" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gradia-undefined-4100963a9/",
  },
];

export function WaitlistFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-[var(--muted)]">
              Your shop, fully staffed.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--foreground)]">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            ©2026 Gradia. Your shop is yours.
          </p>
        </div>
      </div>
    </footer>
  );
}
