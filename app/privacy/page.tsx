import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gradia.ai LLC collects, uses, and protects your information across the Gradia website, waitlist, and AI office for auto detailers.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 5, 2026">
      <p>
        This Privacy Policy explains how <strong>Gradia.ai LLC</strong> (&ldquo;Gradia,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, and protects information when you
        visit <a href="https://trygradia.com">trygradia.com</a>, join our waitlist, or use the
        Gradia platform — an AI office for auto detailers. By using our website or services, you
        agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Waitlist details:</strong> your email address (required), and optionally your
          mobile phone number, whether you consented to receive text messages, the kind of
          business you run, your shop name, and the tools you use today.
        </li>
        <li>
          <strong>Messages you send us:</strong> if you email or contact us, we keep that
          correspondence.
        </li>
        <li>
          <strong>Customer account details (at launch):</strong> if you become a paying customer,
          we collect account and business information and billing details needed to provide the
          service.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Limited technical data:</strong> we log basic request information such as your IP
          address for security and abuse prevention.
        </li>
        <li>
          <strong>Essential cookies only:</strong> the client portal uses sign-in cookies to keep
          you logged in. We do not run third-party advertising or cross-site tracking on our
          website.
        </li>
      </ul>

      <h3>Business data you connect (customers)</h3>
      <p>
        When you connect your CRM, calendar, email, phone, and SMS, Gradia processes your business
        data — such as customers, vehicles, quotes, jobs, messages, and call details — to operate
        the voice and chat agents on your behalf. <strong>This data is yours.</strong> You control
        it, you can export it, and Gradia acts only on the actions you approve.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To operate the waitlist and let you know about early access and our launch.</li>
        <li>To provide, maintain, secure, and improve Gradia.</li>
        <li>
          To communicate with you. For waitlist members, we will only email you about early access
          and launch — not unrelated marketing.
        </li>
        <li>To prevent fraud and abuse and to comply with our legal obligations.</li>
      </ul>
      <p>
        <strong>We do not sell your personal information</strong>, and we do not use your customers&rsquo;
        data to train public AI models or for third-party advertising.
      </p>

      <h2>SMS and mobile information</h2>
      <p>
        If you provide your mobile number and consent to receive text messages from{" "}
        <strong>Gradia.ai LLC</strong>, we may send conversational responses, service-related
        communications, appointment confirmations, appointment reminders, appointment updates, and
        other messages related to your interaction with Gradia.
      </p>
      <p>
        <strong>Message frequency varies</strong> depending on your interactions with Gradia.{" "}
        <strong>Message and data rates may apply.</strong> Consent to receive SMS messages is not a
        condition of purchasing any goods or services.
      </p>
      <p>
        <strong>
          Mobile information, including phone numbers and SMS consent records, will not be shared
          with third parties or affiliates for their marketing or promotional purposes.
        </strong>{" "}
        We may share this information with service providers that help us deliver communications or
        operate our services, but only as necessary to provide those services and subject to
        appropriate safeguards.
      </p>
      <p>
        You may opt out of SMS messages at any time by replying <strong>STOP</strong>. For
        assistance, reply <strong>HELP</strong> or email{" "}
        <a href="mailto:trygradia@gmail.com">trygradia@gmail.com</a>. We keep a record of your SMS
        consent — including the date and the disclosure you agreed to — so we can honor and
        evidence your choice.
      </p>

      <h2>How the agents use your data</h2>
      <p>
        Gradia speaks and acts as your shop, and <strong>every outbound message, booking, or action
        requires your approval</strong> — there is no auto-send. We process your connected data only
        to draft and stage that work for you, and to keep your single source of truth in sync.
      </p>

      <h2>How we share information</h2>
      <p>We share information only in these limited ways:</p>
      <ul>
        <li>
          <strong>Service providers</strong> who help us run Gradia under contract — including
          hosting and infrastructure (Vercel), database and authentication (Supabase), payment
          processing (Stripe), and the email, SMS, voice, calendar, and CRM providers used to
          deliver the service.
        </li>
        <li>
          <strong>Legal reasons:</strong> to comply with the law or a valid legal request, or to
          protect the rights, safety, and property of Gradia, our users, or the public.
        </li>
        <li>
          <strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of
          assets, with notice to you.
        </li>
      </ul>
      <p>We never sell your data or share it for third-party advertising.</p>

      <h2>Data retention</h2>
      <p>
        We keep waitlist information until our launch or until you ask us to remove it, whichever
        comes first. Customer data is retained while your account is active and according to your
        settings; you can export or delete it. We may retain limited records as required by law.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>You can unsubscribe from our emails at any time.</li>
        <li>
          You can request access to, correction of, or deletion of your personal information by
          emailing{" "}
          <a href="mailto:trygradia@gmail.com">trygradia@gmail.com</a>.
        </li>
        <li>
          Depending on where you live (for example, the EU/UK or California), you may have
          additional rights over your personal information. We honor verified requests.
        </li>
        <li>Your shop&rsquo;s data is yours — portable and exportable at any time.</li>
      </ul>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect your information,
        including encryption in transit, access controls, and database row-level security. No method
        of transmission or storage is 100% secure, so we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        Gradia is a business tool intended for adults. It is not directed to anyone under 18, and we
        do not knowingly collect personal information from children.
      </p>

      <h2>International users</h2>
      <p>
        Gradia is operated from the United States. If you access our services from outside the U.S.,
        your information may be processed in the United States, where data-protection laws may differ
        from those in your country.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the updated date at the top
        of this page, and for material changes we will provide additional notice where appropriate.
      </p>

      <h2>Contact us</h2>
      <p>
        Gradia.ai LLC — questions about privacy? Email{" "}
        <a href="mailto:trygradia@gmail.com">trygradia@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
