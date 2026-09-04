import Link from "next/link";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* Homepage industries tiles — D-067. Fleet accounts out of scope; mobile only. */

const tiles: { title: string; line: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Detailing",
    line: "Full details, maintenance visits and repeat customers — organized around every vehicle.",
    links: [{ label: "Detailing", href: "/industries/detailing" }],
  },
  {
    title: "Ceramic coating",
    line: "Big quotes and annual check-ins that shouldn't depend on anyone's memory.",
    links: [{ label: "Ceramic coating", href: "/industries/ceramic-coating" }],
  },
  {
    title: "PPF, tint & wrap",
    line: "Estimate-heavy work where an expensive quote going quiet costs the most.",
    links: [{ label: "PPF, tint & wrap", href: "/industries/ppf-tint-wrap" }],
  },
  {
    title: "Mobile detailing",
    line: "On-location work with contacts, quotes and follow-ups in the same CRM.",
    links: [{ label: "Mobile detailing", href: "/industries/mobile-detailing" }],
  },
];

export function Industries() {
  return (
    <Section>
      <Eyebrow>Industries</Eyebrow>
      <h2 className="max-w-[18ch]">Built for shops with staff.</h2>
      <Lead>
        The same AI-native CRM, tuned to how your trade actually runs — for established shops
        already spending on ads.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {tiles.map((tile) => (
          <Card key={tile.title}>
            <h3 className="text-[length:var(--sv-text-lg)]">{tile.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{tile.line}</p>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
              {tile.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-accent)] underline-offset-4 hover:underline"
                >
                  {l.label} →
                </Link>
              ))}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
