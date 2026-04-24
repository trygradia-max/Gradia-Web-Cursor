import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing access to and use of Gradia Inc. services, platform, and website.",
};

const body =
  "font-sans text-base font-normal leading-[1.8] text-[#6B7280]";
const h2 =
  "mt-12 border-b border-[#E5E7EB] pb-3 font-sans text-[22px] font-bold leading-snug text-[#0A0A0A]";
const list = `${body} ml-6 list-disc space-y-2 [&_li]:pl-1`;

export default function TermsPage() {
  return (
    <div className="bg-[#FFFFFF] font-sans">
      <article className="mx-auto max-w-[680px] px-4 py-[80px] sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
          Legal
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4vw+1rem,48px)] font-bold leading-tight tracking-[-0.02em] text-[#0A0A0A]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[#6B7280]">Last updated: April 23, 2026</p>

        <p className={`${body} mt-10`}>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the services, platform, and website provided by Gradia Inc.
          (&quot;Gradia,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). By accessing or using our services, you agree to be
          bound by these Terms. If you do not agree, do not use our services.
        </p>

        <h2 className={h2}>1. Acceptance of Terms</h2>
        <p className={`${body} mt-6`}>
          By creating an account, booking a demo, or using any part of the
          Gradia platform, you confirm that you are at least 18 years old, have
          the authority to enter into this agreement on behalf of yourself or
          your organisation, and agree to these Terms and our{" "}
          <Link
            href="/privacy"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <h2 className={h2}>2. Description of Services</h2>
        <p className={`${body} mt-6`}>
          Gradia provides an AI voice agent platform that handles inbound calls,
          emails, and SMS communications on behalf of businesses. Services
          include lead capture, appointment booking, call routing, spam filtering,
          live dashboards, and related features as described on our website and
          updated from time to time.
        </p>
        <p className={`${body} mt-6`}>
          We reserve the right to modify, suspend, or discontinue any part of
          our services at any time with reasonable notice.
        </p>

        <h2 className={h2}>3. Accounts and Registration</h2>
        <p className={`${body} mt-6`}>
          To use the Gradia platform, you must create an account and provide
          accurate, complete information. You are responsible for maintaining the
          confidentiality of your account credentials and for all activity that
          occurs under your account.
        </p>
        <p className={`${body} mt-6`}>
          You must notify us immediately at{" "}
          <a
            href="mailto:support@trygradia.com"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            support@trygradia.com
          </a>{" "}
          if you suspect unauthorised access to your account. We are not liable
          for any loss resulting from unauthorised use of your account.
        </p>

        <h2 className={h2}>4. Acceptable Use</h2>
        <p className={`${body} mt-6`}>
          You agree to use Gradia only for lawful purposes and in accordance with
          these Terms. You must not:
        </p>
        <ul className={`${list} mt-3`}>
          <li>
            Use the platform to transmit unlawful, harmful, abusive, or
            fraudulent content
          </li>
          <li>
            Impersonate any person or entity or misrepresent your affiliation
            with any person or entity
          </li>
          <li>
            Attempt to gain unauthorised access to any part of our platform or
            systems
          </li>
          <li>
            Use the platform in any way that could damage, disable, or impair our
            services
          </li>
          <li>
            Collect or harvest any personally identifiable information without
            consent
          </li>
          <li>
            Use the platform to send unsolicited communications or spam
          </li>
          <li>
            Violate any applicable law or regulation, including those governing
            telemarketing, recording consent, and data privacy
          </li>
        </ul>
        <p className={`${body} mt-6`}>
          You are solely responsible for ensuring your use of Gradia complies with
          all applicable laws in your jurisdiction, including laws governing call
          recording consent and customer communications.
        </p>

        <h2 className={h2}>5. Recording and Communications Consent</h2>
        <p className={`${body} mt-6`}>
          Gradia&apos;s platform records and transcribes calls handled by the AI
          voice agent. It is your sole responsibility as the business deploying
          Gradia to ensure that all applicable consent requirements for call
          recording are met in your jurisdiction. Gradia does not assume
          liability for your failure to obtain required consents from callers.
        </p>

        <h2 className={h2}>6. Payment and Billing</h2>
        <p className={`${body} mt-6`}>
          Access to paid features of Gradia requires a paid subscription. By
          subscribing, you authorise us to charge your payment method on a
          recurring basis in accordance with your selected plan.
        </p>
        <ul className={`${list} mt-3`}>
          <li>Subscription fees are billed in advance on a monthly or annual basis</li>
          <li>All fees are non-refundable except where required by law</li>
          <li>
            We reserve the right to change pricing with 30 days&apos; written
            notice
          </li>
          <li>
            If payment fails, we may suspend your account until payment is resolved
          </li>
          <li>Setup fees, where applicable, are non-refundable</li>
        </ul>

        <h2 className={h2}>7. Intellectual Property</h2>
        <p className={`${body} mt-6`}>
          Gradia and its licensors own all rights, title, and interest in the
          platform, including all software, designs, text, graphics, and other
          content. Nothing in these Terms transfers any intellectual property
          rights to you.
        </p>
        <p className={`${body} mt-6`}>
          You retain ownership of all content and data you provide to the
          platform. By using Gradia, you grant us a limited licence to use your
          content solely to provide and improve the services.
        </p>

        <h2 className={h2}>8. Confidentiality</h2>
        <p className={`${body} mt-6`}>
          Both parties agree to keep confidential any non-public information shared
          in connection with these Terms and not to disclose such information to
          third parties without prior written consent, except as required by law.
        </p>

        <h2 className={h2}>9. Data and Privacy</h2>
        <p className={`${body} mt-6`}>
          Our collection and use of personal information is governed by our{" "}
          <Link
            href="/privacy"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            Privacy Policy
          </Link>
          , which is incorporated into these Terms by reference. You are
          responsible for ensuring that your use of the platform complies with
          applicable data protection laws, including obtaining any necessary
          consents from your customers.
        </p>

        <h2 className={h2}>10. Disclaimers</h2>
        <p className={`${body} mt-6`}>
          The Gradia platform is provided &quot;as is&quot; and &quot;as
          available&quot; without warranties of any kind, either express or
          implied. We do not warrant that the services will be uninterrupted,
          error-free, or free of harmful components. We do not guarantee any
          specific results from use of the platform, including conversion rates,
          lead volumes, or revenue outcomes.
        </p>

        <h2 className={h2}>11. Limitation of Liability</h2>
        <p className={`${body} mt-6`}>
          To the maximum extent permitted by law, Gradia shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages,
          including loss of profits, data, or goodwill, arising from your use of
          or inability to use the services.
        </p>
        <p className={`${body} mt-6`}>
          Our total liability to you for any claim arising from these Terms or
          your use of the platform shall not exceed the total fees paid by you to
          Gradia in the three months preceding the claim.
        </p>

        <h2 className={h2}>12. Indemnification</h2>
        <p className={`${body} mt-6`}>
          You agree to indemnify, defend, and hold harmless Gradia and its
          officers, directors, employees, and agents from any claims, damages,
          losses, or expenses arising from your use of the platform, your
          violation of these Terms, or your violation of any third-party rights.
        </p>

        <h2 className={h2}>13. Termination</h2>
        <p className={`${body} mt-6`}>
          Either party may terminate these Terms at any time. You may cancel your
          account at any time through your account settings or by contacting{" "}
          <a
            href="mailto:support@trygradia.com"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            support@trygradia.com
          </a>
          . We may suspend or terminate your access immediately if you breach
          these Terms or if we determine your use poses a risk to our platform or
          other users.
        </p>
        <p className={`${body} mt-6`}>
          Upon termination, your right to use the platform ceases immediately. We
          will retain your data for 90 days following termination before deletion,
          during which time you may request an export.
        </p>

        <h2 className={h2}>14. Governing Law</h2>
        <p className={`${body} mt-6`}>
          These Terms are governed by and construed in accordance with the laws of
          the State of Delaware, United States, without regard to its conflict of
          law provisions. Any disputes arising from these Terms shall be resolved
          exclusively in the courts located in Delaware.
        </p>

        <h2 className={h2}>15. Changes to These Terms</h2>
        <p className={`${body} mt-6`}>
          We may update these Terms from time to time. We will notify you of
          material changes by email or by posting a notice on our website at least
          14 days before the changes take effect. Your continued use of the
          platform after the effective date constitutes acceptance of the updated
          Terms.
        </p>

        <h2 className={h2}>16. Contact Us</h2>
        <p className={`${body} mt-6`}>
          If you have questions about these Terms, please contact us:
        </p>
        <p className={`${body} mt-6`}>
          Gradia Inc.
          <br />
          Email:{" "}
          <a
            href="mailto:trygradia@gmail.com"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            trygradia@gmail.com
          </a>
          <br />
          Website:{" "}
          <Link
            href="https://trygradia.com"
            className="text-[#3B6EF5] underline underline-offset-2 hover:opacity-90"
          >
            trygradia.com
          </Link>
        </p>
      </article>
    </div>
  );
}
