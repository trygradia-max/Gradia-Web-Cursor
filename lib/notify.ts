/**
 * Best-effort, out-of-band alert for signups that failed to persist to the
 * primary store. Posts the full payload to WAITLIST_ALERT_WEBHOOK_URL so a
 * Supabase outage (or a missing service-role key) can't silently drop a
 * waitlist email — the founder receives the data off-platform and can recover
 * it by hand from the alert itself.
 *
 * The body is shaped to satisfy Slack ("text"), Discord ("content"), and
 * generic JSON consumers ("signup") in a single request; each side ignores the
 * keys it doesn't use. This never throws and never blocks the request for long
 * (5s cap) — alerting is a safety net, not a hard dependency of the signup.
 */
export async function alertFailedSignup(
  payload: Record<string, unknown>,
  reason: string,
): Promise<void> {
  const url = process.env.WAITLIST_ALERT_WEBHOOK_URL;
  if (!url) return;

  const summary =
    "⚠️ A Gradia waitlist signup did NOT save to the database and needs manual recovery.\n" +
    `Reason: ${reason}\n` +
    "```\n" +
    JSON.stringify(payload, null, 2) +
    "\n```";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary, content: summary, signup: payload }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error(
        "[waitlist-alert] webhook returned non-2xx:",
        res.status,
      );
    }
  } catch (err) {
    console.error(
      "[waitlist-alert] webhook post failed:",
      err instanceof Error ? err.message : err,
    );
  }
}
