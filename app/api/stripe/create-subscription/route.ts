import { NextResponse } from "next/server";
import { assertStripeIntegrationRequest } from "@/lib/stripe/integration-auth";
import { getStripe } from "@/lib/stripe/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  clientId?: string;
  email?: string;
  name?: string;
  priceId?: string;
};

export async function POST(request: Request) {
  const authError = assertStripeIntegrationRequest(request);
  if (authError) return authError;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { clientId, email, name, priceId } = body;
  if (
    !clientId?.trim() ||
    !email?.trim() ||
    !name?.trim() ||
    !priceId?.trim()
  ) {
    return NextResponse.json(
      { error: "clientId, email, name, and priceId are required" },
      { status: 400 },
    );
  }

  const supabase = createAdminSupabaseClient();
  const { data: clientRow, error: clientErr } = await supabase
    .from("clients")
    .select("id")
    .eq("id", clientId.trim())
    .maybeSingle<{ id: string }>();

  if (clientErr || !clientRow) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const stripe = getStripe();

  try {
    const customer = await stripe.customers.create({
      email: email.trim(),
      name: name.trim(),
      metadata: { client_id: clientId.trim() },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId.trim() }],
      metadata: { client_id: clientId.trim() },
    });

    const { error: updateError } = await supabase
      .from("clients")
      .update({
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        account_status: "active",
      })
      .eq("id", clientId.trim());

    if (updateError) {
      return NextResponse.json(
        { error: `Supabase update failed: ${updateError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { subscription },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
