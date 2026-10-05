import Link from "next/link";
import { Card, Eyebrow, Lead, Section } from "../primitives";

const tiles: { title: string; line: string; href: string }[] = [
  {
    title: "Detailing",
    line: "Full details, maintenance visits and repeat customers — organized around every vehicle.",
    href: "/industries/detailing",
  },
  {
    title: "Ceramic coating",
    line: "Package quotes and scheduled check-ins that shouldn't depend on anyone's memory.",
    href: "/industries/ceramic-coating",
  },
  {
    title: "PPF, tint & wrap",
    line: "Estimate-heavy work where a quiet quote needs a clear next step.",
    href: "/industries/ppf-tint-wrap",
  },
  {
    title: "Mobile detailing",
    line: "On-location work with contacts, quotes and follow-ups in the same CRM.",
    href: "/industries/mobile-detailing",
  },
];

export function Industries() {
  return (
    <Section id="who-its-for">
      <Eyebrow>Who it&apos;s for</Eyebrow>
      <h2 className="max-w-[18ch]">Built around the way appearance businesses work.</h2>
      <Lead>
        Detailing, ceramic coating, PPF and tint—from a solo mobile business to a shop with a team.
        The MVP is designed for one operating location or mobile service area, with clear
        responsibility for the next step.
      </Lead>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {tiles.map((tile) => (
          <Card key={tile.title}>
            <h3 className="text-[length:var(--sv-text-lg)]">{tile.title}</h3>
            <p className="mt-3 text-[length:var(--sv-text-sm)]">{tile.line}</p>
            <p className="mt-5">
              <Link
                href={tile.href}
                className="text-[length:var(--sv-text-sm)] font-medium text-[var(--sv-accent)] underline-offset-4 hover:underline"
              >
                {tile.title} →
              </Link>
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
