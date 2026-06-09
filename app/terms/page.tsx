import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Gradia website, waitlist, and the Gradia AI office for auto detailers.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 9, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
        <a href="https://trygradia.com">trygradia.com</a>, the Gradia waitlist, and the Gradia
        platform and services (together, the &ldquo;Service&rdquo;), provided by{" "}
        <strong>Gradia LLC</strong> (&ldquo;Gradia,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By
        accessing the Service or joining the waitlist, you agree to these Terms. If you do not agree,
        do not use the Service.
      </p>

      <h2>What Gradia is</h2>
      <p>
        Gradia is an AI office for auto detailers: a voice agent and a chat agent that share one
        brain across your CRM, calendar, email, voice, and SMS. <strong>You approve every outbound
        action</strong> — there is no auto-send. Gradia is currently in pre-launch and private beta;
        features, integrations, and availability may change.
      </p>

      <h2>Waitlist and early access</h2>
      <p>
        Joining the waitlist does not guarantee access to the Service, any particular price, or a
        specific launch date. Founding and early-access offers are limited and may change. Our July
        10, 2026 launch target is a goal, not a commitment.
      </p>

      <h2>Eligibility and accounts</h2>
      <p>
        You must be at least 18 years old and able to enter into a binding contract. You are
        responsible for the information you provide, for keeping your account credentials secure, and
        for all activity under your account.
      </p>

      <h2>Your responsibilities and acceptable use</h2>
      <p>
        Because Gradia stages work for your review and <strong>you approve every message, booking,
        and action before it is sent, you are the sender</strong> of that communication. You are
        responsible for ensuring your outreach is lawful, including compliance with applicable
        telemarketing, anti-spam, messaging, and call-recording laws (such as the TCPA and
        CAN-SPAM), and for honoring opt-outs and STOP requests.
      </p>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>break the law or send unlawful, deceptive, harassing, or abusive messages;</li>
        <li>contact people without a lawful basis, or ignore opt-out and do-not-contact requests;</li>
        <li>infringe others&rsquo; rights or upload data you do not have the right to use;</li>
        <li>disrupt, reverse-engineer, or attempt to gain unauthorized access to the Service.</li>
      </ul>

      <h2>Your data and content</h2>
      <p>
        Your shop&rsquo;s data is yours. You grant Gradia a limited license to process your data and
        content solely to operate the Service for you and to carry out the actions you approve. You
        can export or delete your data. Our handling of personal information is described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Third-party services</h2>
      <p>
        Gradia connects to third-party services you choose — such as your CRM, calendar, email, SMS,
        voice, and payment providers. Your use of those services is governed by their own terms, and
        we are not responsible for third-party services or their availability.
      </p>

      <h2>Fees and billing</h2>
      <p>
        At launch, Gradia is offered as a paid subscription. The planned launch price is{" "}
        <strong>$20 per month, per user</strong>; exact fees, any usage-based charges, and applicable
        taxes are disclosed at sign-up. Pre-launch pricing and promotional offers are subject to
        change. Paid subscriptions renew until canceled, and you may cancel at any time; except where
        required by law, fees already paid are non-refundable. Payments are processed by our payment
        provider (Stripe).
      </p>

      <h2>Intellectual property</h2>
      <p>
        Gradia, including its software, models, and brand, is owned by Gradia LLC We grant you a
        limited, non-exclusive, non-transferable right to use the Service. You retain ownership of
        your data and content.
      </p>

      <h2>Beta and &ldquo;as is&rdquo; service</h2>
      <p>
        The Service — particularly during pre-launch and beta — is provided <strong>&ldquo;as
        is&rdquo; and &ldquo;as available,&rdquo;</strong> without warranties of any kind, to the
        fullest extent permitted by law. AI-generated output may be inaccurate or incomplete; you are
        responsible for reviewing it before you approve any action. We do not warrant that the
        Service will be uninterrupted or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Gradia will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for any lost profits, revenue, or
        data. Our total liability for any claim relating to the Service is limited to the greater of
        the amounts you paid us in the 12 months before the claim or US $100.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold Gradia harmless from claims, damages, and expenses arising
        from your use of the Service, your data or content, or any communication you approve or send.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your access if you violate these Terms or to protect the Service
        or others. You may stop using the Service at any time. Provisions that by their nature should
        survive termination — including ownership, disclaimers, limitation of liability, and
        indemnification — will survive.
      </p>

      <h2>Changes to the Service and these Terms</h2>
      <p>
        We may modify the Service or these Terms. For material changes we will provide notice (for
        example, by updating the date above or emailing you). Your continued use of the Service after
        changes take effect means you accept the updated Terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, United States, without regard
        to its conflict-of-laws rules. You agree to the exclusive jurisdiction of the state and
        federal courts located in Delaware for any dispute not subject to other agreed dispute
        resolution.
      </p>

      <h2>Contact us</h2>
      <p>
        Gradia LLC — questions about these Terms? Email{" "}
        <a href="mailto:trygradia@gmail.com">trygradia@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
