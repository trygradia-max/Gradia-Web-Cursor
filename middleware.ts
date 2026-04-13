import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isLogin = pathname === "/portal/login";

  if (pathname.startsWith("/portal") && !isLogin && !isLoggedIn) {
    const login = new URL("/portal/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (isLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/portal/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal", "/portal/:path*"],
};
