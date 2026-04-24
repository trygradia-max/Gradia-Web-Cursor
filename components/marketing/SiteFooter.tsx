import Link from "next/link";

const headingClass =
  "font-sans text-xs font-medium uppercase tracking-[0.1em] text-[#6B7280]";

const footerLinkClass =
  "font-sans text-sm font-normal text-white transition-colors hover:text-[#3B6EF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B6EF5]";

const demoHref =
  "mailto:trygradia@gmail.com?subject=Book%20a%20demo" as const;

const productLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: demoHref, label: "Book a Demo" },
] as const;

const industryLinks = [
  { href: "/contact", label: "Healthcare" },
  { href: "/contact", label: "Finance" },
  { href: "/contact", label: "Home Services" },
  { href: "/contact", label: "Real Estate" },
  { href: "/contact", label: "Legal" },
  { href: "/contact", label: "Auto Dealerships" },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A]">
      <div className="mx-auto w-full max-w-content px-4 pt-[80px] sm:px-6">
        <div className="grid grid-cols-1 gap-12 pb-[40px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 — Brand */}
          <div className="lg:max-w-xs">
            <Link
              href="/"
              className="inline-block font-sans text-lg font-bold leading-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B6EF5]"
            >
              Gradia
            </Link>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#6B7280]">
              Closing the invisible gap.
            </p>
          </div>

          {/* Column 2 — Product */}
          <nav aria-labelledby="footer-product-heading">
            <h2 id="footer-product-heading" className={headingClass}>
              Product
            </h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("mailto:") ? (
                    <a href={item.href} className={footerLinkClass}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Industries */}
          <nav aria-labelledby="footer-industries-heading">
            <h2 id="footer-industries-heading" className={headingClass}>
              Industries
            </h2>
            <ul className="mt-5 space-y-3">
              {industryLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Legal */}
          <nav aria-labelledby="footer-legal-heading">
            <h2 id="footer-legal-heading" className={headingClass}>
              Legal
            </h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-[#1F1F1F] pt-[24px] pb-10">
          <p className="text-left font-sans text-xs text-[#6B7280]">
            © 2026 Gradia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
