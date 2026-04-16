import {
  CalendarDays,
  Phone,
  Users,
  BarChart3,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
import { ScrollReveal, ScrollRevealStagger } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const integrations = [
  { icon: Phone, label: "Telephony" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Users, label: "CRM" },
  { icon: ClipboardList, label: "Intake forms" },
  { icon: MessageSquare, label: "Messaging" },
  { icon: BarChart3, label: "Reporting" },
];

export function IntegrationsStrip() {
  return (
    <div>
      <ScrollReveal>
        <SectionLabel>Integrations</SectionLabel>
        <h2 className="mt-6 max-w-[30ch] font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#ffffff]">
          Connects to the tools you already use.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted-band)] sm:text-lg">
          Gradia slots into your existing stack — your calendar, your phone
          system, your CRM. No rip-and-replace.
        </p>
      </ScrollReveal>
      <ScrollRevealStagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 sm:gap-6">
        {integrations.map(({ icon: Icon, label }) => (
          <li key={label}>
            <div className="flex flex-col items-center gap-4 rounded-[2px] border border-[var(--border-band)] bg-[var(--card-on-band)] p-6 text-center transition-colors duration-300 hover:border-[rgba(30,64,175,0.45)]">
              <Icon
                className="h-7 w-7 text-[var(--brand-primary)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="text-sm font-medium text-[var(--text-muted-band)]">
                {label}
              </span>
            </div>
          </li>
        ))}
      </ScrollRevealStagger>
    </div>
  );
}
