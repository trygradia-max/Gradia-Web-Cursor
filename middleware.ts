import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes Supabase auth cookies on every portal request and blocks
 * /portal/* (except /portal/login) when there is no valid session.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Site takedown: only the waitlist landing (/) and functional routes (the
  // portal app + API) stay reachable. Every other (retired) marketing route
  // 308-redirects to the waitlist. 308 (permanent) — not 307 — so search
  // engines consolidate these dead URLs into / and drop their old titles/
  // descriptions from the index, instead of keeping them as "temporarily
  // moved." The old marketing pages have been removed from the repo; restore
  // from git history if ever needed. Static assets and metadata files are
  // excluded by `config.matcher` below.
  // NOTE: 308 is cached by browsers; if the marketing site is revived, expect
  // some clients to keep redirecting until their cache clears.
  const isFunctional =
    pathname === "/" ||
    pathname.startsWith("/v2") || // site-v2 foundation preview (branch: site-v2)
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/portal");
  if (!isFunctional) {
    const home = request.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home, 308);
  }

  // Only the portal needs the Supabase auth round-trip below.
  if (!pathname.startsWith("/portal")) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  /** Login page does not need a Supabase round-trip; skipping speeds dev when Auth is slow/unreachable. */
  if (pathname === "/portal/login") {
    return supabaseResponse;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[],
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(
            name,
            value,
            options as Parameters<typeof supabaseResponse.cookies.set>[2],
          ),
        );
      },
    },
  });

  let user: Awaited<
    ReturnType<typeof supabase.auth.getUser>
  >["data"]["user"] = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error) {
      user = data.user;
    }
  } catch (err) {
    // Edge fetch to Supabase can fail (bad URL, paused project, DNS/TLS, offline).
    // Treat as signed-out so the app still responds; fix env / Supabase for real auth.
    console.warn(
      "[middleware] Supabase getUser failed — portal auth unavailable:",
      err instanceof Error ? err.message : err,
    );
  }

  const needsAuth = pathname.startsWith("/portal");

  if (needsAuth && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/portal/login";
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  // Run on everything except Next internals, static assets, and metadata
  // routes, so the takedown redirect covers all marketing pages while leaving
  // favicon/sitemap/OG image and /_next untouched.
  matcher: [
    // Exclude Next internals, metadata routes, AND any path with a static-file
    // extension (e.g. /logo.png, /images/*, favicon.svg) so public assets are
    // never caught by the takedown redirect — otherwise the image optimizer
    // fetches a 307 HTML redirect instead of the file and 400s.
    "/((?!_next/static|_next/image|sitemap.xml|robots.txt|opengraph-image|.*\\.[\\w]+$).*)",
  ],
};
