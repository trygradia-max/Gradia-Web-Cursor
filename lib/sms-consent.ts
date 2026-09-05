/**
 * SMS opt-in disclosure shown on the public waitlist form.
 *
 * A2P 10DLC / CTIA: the checkbox is unchecked by default, optional, and kept
 * separate from acceptance of the Terms. If DISCLOSURE changes, bump VERSION —
 * the stored version is the record of exactly which text a subscriber agreed to.
 */
export const SMS_CONSENT_VERSION = "2026-09-05";

export const SMS_CONSENT_DISCLOSURE =
  "I agree to receive conversational and appointment-related text messages from " +
  "Gradia.ai LLC at the mobile number provided. Message frequency varies. Message " +
  "and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not " +
  "a condition of purchase. See our Terms of Service and Privacy Policy.";
