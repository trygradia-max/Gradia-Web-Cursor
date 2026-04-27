import Link from "next/link";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

const headingClass =
  "font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#6B7280]";

const linkClass =
  "block font-sans text-sm text-[#8A8A8A] no-underline transition-colors duration-150 ease-out hover:text-[#FFFFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

const pages = [
  { href: "/the-gap", label: "The Gap" },
  { href: "/see-it-close", label: "See It Close" },
  { href: "/the-cost", label: "The Cost" },
  { href: "/pricing", label: "Pricing" },
  { href: "/the-proof", label: "The Proof" },
] as const;

const industries = [
  "Healthcare",
  "Finance",
  "Home Services",
  "Real Estate",
  "Legal",
  "Auto Dealerships",
] as const;

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A]">
      <div className="mx-auto w-full max-w-content px-4 pb-10 pt-20 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-20">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B6EF5]"
              aria-label="Gradia home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 28"
                aria-hidden="true"
                className="h-6 w-auto shrink-0"
              >
                <path fill="#FFFFFF" d="M0 0h26v28H0z" />
              </svg>
              <span className="font-sans text-[18px] font-bold leading-none text-[#FFFFFF]">
                Gradia
              </span>
            </Link>

            <p className="mt-3 font-sans text-sm text-[#6B7280]">
              Closing the invisible gap.
            </p>

            <div className="mt-8">
              <p className="font-sans text-sm text-[#6B7280]">
                Ready to close the gap?
              </p>
              <a
                href={demoHref}
                className="mt-1 inline-block font-sans text-sm font-medium text-[#3B6EF5] no-underline transition-colors duration-150 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]"
              >
                Book a Demo →
              </a>
            </div>
          </div>

          {/* Column 2 — Pages */}
          <nav aria-labelledby="footer-pages-heading">
            <h2 id="footer-pages-heading" className={headingClass}>
              PAGES
            </h2>
            <ul className="mt-4 list-none space-y-3">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Industries */}
          <nav aria-labelledby="footer-industries-heading">
            <h2 id="footer-industries-heading" className={headingClass}>
              INDUSTRIES
            </h2>
            <ul className="mt-4 list-none space-y-3">
              {industries.map((label) => (
                <li key={label}>
                  <span className={`${linkClass} cursor-default`}>{label}</span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Legal */}
          <nav aria-labelledby="footer-legal-heading">
            <h2 id="footer-legal-heading" className={headingClass}>
              LEGAL
            </h2>
            <ul className="mt-4 list-none space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 border-t border-[#1F1F1F] pt-8 sm:flex-row sm:justify-between sm:gap-0">
          <p className="font-sans text-xs text-[#6B7280]">
            © 2026 Gradia. All rights reserved.
          </p>
          <p className="font-sans text-xs italic text-[#6B7280]">
            Built to close the gap.
          </p>
        </div>
      </div>
    </footer>
  );
}
