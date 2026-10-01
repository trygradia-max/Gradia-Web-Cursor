/**
 * Best-effort, out-of-band alert for pilot requests that failed to persist.
 * Posts the payload to WAITLIST_ALERT_WEBHOOK_URL so a Supabase outage cannot
 * silently drop a request — the founder can recover it from the alert.
 *
 * Alert delivery is a safety net, not a substitute for durable storage. The
 * API still returns a failure to the visitor when persist does not succeed.
 * This never throws and never blocks the request for long (5s cap).
 */
export async function alertFailedSignup(
  payload: Record<string, unknown>,
  reason: string,
): Promise<void> {
  const url = process.env.WAITLIST_ALERT_WEBHOOK_URL;
  if (!url) return;

  const summary =
    "A Gradia pilot request did NOT save to the database and needs manual recovery.\n" +
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
      console.error("[waitlist-alert] webhook returned non-2xx:", res.status);
    }
  } catch (err) {
    console.error(
      "[waitlist-alert] webhook post failed:",
      err instanceof Error ? err.message : err,
    );
  }
}
