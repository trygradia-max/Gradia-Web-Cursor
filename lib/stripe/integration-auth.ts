import { NextResponse } from "next/server";

/** When STRIPE_INTEGRATION_SECRET is set, require `Authorization: Bearer …`. */
export function assertStripeIntegrationRequest(
  request: Request,
): NextResponse | null {
  const secret = process.env.STRIPE_INTEGRATION_SECRET;
  if (!secret) return null;
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
