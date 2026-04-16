const FALLBACK = "/portal/dashboard";

/**
 * Resolves post-login redirect: same-origin only, `/portal/*` except login.
 * Prevents open redirects from crafted `callbackUrl` query values.
 */
export function getSafePortalCallbackUrl(
  raw: string | null,
  windowOrigin: string,
): string {
  if (!raw?.trim()) return FALLBACK;

  try {
    const resolved = new URL(raw, windowOrigin);
    const origin = new URL(windowOrigin).origin;
    if (resolved.origin !== origin) return FALLBACK;
    if (!resolved.pathname.startsWith("/portal")) return FALLBACK;
    if (resolved.pathname === "/portal/login") return FALLBACK;

    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return FALLBACK;
  }
}
