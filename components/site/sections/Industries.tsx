import Link from "next/link";
import { Card, Eyebrow, Lead, Section } from "../primitives";

/* Section 8 — Industries (site-v2-plan §3.8, NEXT_TASK scope 8).
   Four tiles → the five industry routes (pages come in Pass 5; the
   middleware 308s are acceptable on the branch). Tile sentences describe
   each trade's reality, not extra capabilities — the one-system claim is
   the only product claim here. Text tiles only; no imagery, no new sample
   records. Light section: with Section 7 hidden, this follows band-6
   (recompute alternation when Receptionist un-hides). */

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
    title: "Mobile & fleet",
    line: "Work that happens at the customer's place — with contacts, jobs and follow-ups in the same system.",
    links: [
      { label: "Mobile detailing", href: "/industries/mobile-detailing" },
      { label: "Fleet", href: "/industries/fleet" },
    ],
  },
];

export function Industries() {
  return (
    <Section>
      <Eyebrow>Industries</Eyebrow>
      <h2 className="max-w-[18ch]">Built to grow with your shop.</h2>
      <Lead>The same operating system, tuned to how your work actually runs.</Lead>

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
