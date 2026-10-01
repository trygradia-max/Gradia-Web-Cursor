import { Check, Info, PhoneMissed } from "lucide-react";
import { PILOT_CTA_HREF, PILOT_CTA_LABEL } from "@/lib/site-config";
import { Button, Card, Eyebrow, Lead, Section } from "../primitives";
import { GraphiteFrame, LightScreen } from "../product/shared";
import { FinalCta } from "../sections/FinalCta";
import { SAMPLE } from "../sample";

/* Pass 5 — /receptionist (SHOW_RECEPTIONIST + middleware double-gated until the
   telephony acceptance run passes). Copy stays inside §9.3 honest framing:
   capture / organize / prepare ONLY — no answering, quoting or booking-on-calls
   claims until capability #20 flips. Homepage §7 uses the same floor. */

const missedCallSteps: { label: string; title: string; meta: string; accent?: boolean }[] = [
  {
    label: "Missed call",
    title: "You're under a car — the phone rings out",
    meta: "New caller · asked about a ceramic coating",
  },
  {
    label: "Captured",
    title: "The opportunity is saved, not lost",
    meta: "Caller, request and vehicle noted on a new lead",
  },
  {
    label: "Prepared",
    title: "A reply is drafted for your review",
    meta: "Send it when you surface — nothing goes out on its own",
    accent: true,
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Does Gradia answer every call?",
    a: "Gradia captures missed-call opportunities — caller, request and vehicle noted on a new lead — and drafts a reply for your review. Nothing goes out on its own.",
  },
  {
    q: "Can it quote and book over the phone?",
    a: "Bookings always wait for your approval. Live call answering, quoting and booking on the phone are part of the voice receptionist — we do not claim them publicly until our telephony acceptance run passes. Payments are out of scope.",
  },
  {
    q: "How is this different from a typical AI receptionist?",
    a: "The industry default is autopilot — AI that sends, books and bills on its own. Gradia was built the other way: every message is prepared, shown to you, and sent on your OK.",
  },
  {
    q: "Does a missed call connect to the rest of Gradia?",
    a: "Yes. The lead lands in your pipeline with the same record as texts and email — one customer file, one approval flow, one place to work the opportunity.",
  },
];

const goingLiveChecks = [
  { done: true, label: "Business number connected" },
  { done: true, label: "Receptionist saved" },
  { done: false, label: "Test call completed" },
];

export function ReceptionistContent() {
  return (
    <>
      <Section>
        <Eyebrow>Receptionist</Eyebrow>
        <h1 className="max-w-[22ch]">Don&apos;t lose the customer because you&apos;re under a car.</h1>
        <Lead>
          When a call comes in and your hands are full, Gradia captures, organizes and prepares
          the opportunity so your business can respond properly.
        </Lead>
        <div className="mt-8">
          <Button href={PILOT_CTA_HREF} variant="primary" size="lg">
            {PILOT_CTA_LABEL}
          </Button>
        </div>
      </Section>

      <Section band>
        <Eyebrow>Missed calls</Eyebrow>
        <h2 className="max-w-[24ch]">The call you couldn&apos;t take — kept, not lost.</h2>
        <Lead>
          Under a hood, on a lift, mid-detail — the phone rings. Gradia saves what would have
          slipped away and prepares your reply for when you surface.
        </Lead>
        <div className="mt-10">
          <GraphiteFrame label="One missed call, kept">
            <ol className="grid gap-2.5 sm:grid-cols-3">
              {missedCallSteps.map((s) => (
                <li
                  key={s.label}
                  className="rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05] p-4 sm:p-5"
                >
                  <p
                    className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      s.accent ? "text-[var(--sv-accent-on-dark)]" : "text-white/45"
                    }`}
                  >
                    {s.accent && <Check size={13} strokeWidth={2.5} aria-hidden />}
                    {s.label}
                  </p>
                  <p className="mt-2.5 font-medium text-white">{s.title}</p>
                  <p className="mt-1.5 text-[length:var(--sv-text-xs)] leading-relaxed text-white/50">
                    {s.meta}
                  </p>
                </li>
              ))}
            </ol>
          </GraphiteFrame>
        </div>
      </Section>

      <Section>
        <Eyebrow>Setup</Eyebrow>
        <h2 className="max-w-[26ch]">Teach the receptionist how your shop works.</h2>
        <Lead>
          Greeting, hours, how booking works — you set the facts once. Gradia composes the
          receptionist from your services, policies and voice. Bookings always wait
          for your approval. Payments are out of scope.
        </Lead>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <LightScreen label="Voice receptionist">
            <div className="space-y-4 p-4 sm:p-5">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
                  Voice receptionist
                  <Info size={12} strokeWidth={2} className="text-[var(--sv-ink-3)]" aria-hidden />
                </p>
                <p className="mt-2 font-medium text-[var(--sv-ink)]">
                  Who answers when we&apos;re <em className="italic">under the hood</em>
                </p>
              </div>
              <div className="space-y-3 border-t border-[var(--sv-line)] pt-4">
                <div>
                  <p className="text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink-2)]">
                    Greeting line
                  </p>
                  <p className="mt-1 rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-wash)] px-3 py-2 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
                    Thanks for calling {SAMPLE.shop} — what can we do for you?
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink-2)]">
                      Voice
                    </p>
                    <p className="mt-1 rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-wash)] px-3 py-2 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
                      Warm — professional, unhurried
                    </p>
                  </div>
                  <div>
                    <p className="text-[length:var(--sv-text-xs)] font-medium text-[var(--sv-ink-2)]">
                      Business hours
                    </p>
                    <p className="mt-1 rounded-[var(--sv-radius-sm)] border border-[var(--sv-line)] bg-[var(--sv-wash)] px-3 py-2 text-[length:var(--sv-text-sm)] text-[var(--sv-ink)]">
                      Mon–Sat 8:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LightScreen>
          <Card>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-ink-3)]">
              Going live
              <Info size={12} strokeWidth={2} className="text-[var(--sv-ink-3)]" aria-hidden />
            </p>
            <ul className="mt-4 space-y-3">
              {goingLiveChecks.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2.5 text-[length:var(--sv-text-sm)] text-[var(--sv-ink-2)]"
                >
                  <span
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      item.done
                        ? "border-[var(--sv-accent)] bg-[var(--sv-accent-soft)] text-[var(--sv-accent)]"
                        : "border-[var(--sv-line-strong)] bg-[var(--sv-wash)]"
                    }`}
                    aria-hidden
                  >
                    {item.done && <Check size={10} strokeWidth={3} />}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[length:var(--sv-text-xs)] leading-relaxed text-[var(--sv-ink-3)]">
              Launch stays gated until your number, saved receptionist and a completed test call
              all check out — same guardrails as the product.
            </p>
          </Card>
        </div>
      </Section>

      <Section band>
        <Eyebrow>Your OK</Eyebrow>
        <h2 className="max-w-[28ch]">Prepared for you — sent only when you say so.</h2>
        <Lead>
          Whether the lead came from a missed call, a text or email, the approval moment is the
          same: review the draft, then Send it, Tweak it or Drop it.
        </Lead>
        <div className="mt-10">
          <GraphiteFrame label="Prepared reply">
            <div className="mx-auto max-w-md space-y-3">
              <div className="overflow-hidden rounded-[var(--sv-radius-sm)] border border-white/10 bg-white/[0.05]">
                <p className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sv-accent-on-dark)]">
                  <PhoneMissed size={13} strokeWidth={2} aria-hidden />
                  Missed call — ceramic coating ask
                </p>
                <div className="px-4 py-3">
                  <p className="text-[length:var(--sv-text-sm)] font-medium text-white">
                    Follow-up drafted
                  </p>
                  <p className="mt-0.5 text-[length:var(--sv-text-xs)] text-white/50">
                    Text + email ready — nothing sent yet
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
                  <span className="rounded-[6px] bg-[var(--sv-accent)] px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white">
                    Send it
                  </span>
                  {["Tweak it", "Drop it"].map((a) => (
                    <span
                      key={a}
                      className="rounded-[6px] border border-white/20 px-3.5 py-1.5 text-[length:var(--sv-text-xs)] font-medium text-white/80"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <p className="px-1 text-[length:var(--sv-text-xs)] text-white/50">
                You tapped Send it · Sent ✓ · Logged in activity
              </p>
            </div>
          </GraphiteFrame>
        </div>
      </Section>

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="max-w-[20ch]">Honest answers about voice.</h2>
        <Lead>What Gradia does today — and what we will not claim until it is verified.</Lead>
        <dl className="mt-10 divide-y divide-[var(--sv-line)] border-y border-[var(--sv-line)]">
          {faqs.map((item) => (
            <div key={item.q} className="py-5 first:pt-0 last:pb-0">
              <dt className="font-medium text-[var(--sv-ink)]">{item.q}</dt>
              <dd className="mt-2 text-[length:var(--sv-text-sm)] leading-relaxed text-[var(--sv-ink-2)]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <FinalCta />
    </>
  );
}
