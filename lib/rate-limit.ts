/**
 * Best-effort in-memory rate limit (per server instance / isolate).
 * For production scale, prefer edge/WAF or Redis-backed limits.
 */

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120;

export function checkRateLimit(key: string): {
  ok: boolean;
  retryAfterSec?: number;
} {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((b.reset - now) / 1000)),
    };
  }
  b.count += 1;
  return { ok: true };
}
