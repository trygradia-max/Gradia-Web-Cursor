import { NextResponse } from "next/server";
import { assertStripeIntegrationRequest } from "@/lib/stripe/integration-auth";
import { getStripe } from "@/lib/stripe/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  clientId?: string;
  totalDeals?: number;
  totalDealValue?: number;
  performanceFee?: number;
  month?: string;
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

  const { clientId, totalDeals, totalDealValue, performanceFee, month } = body;

  if (!clientId?.trim()) {
    return NextResponse.json({ error: "clientId is required" }, { status: 400 });
  }
  if (
    typeof totalDeals !== "number" ||
    !Number.isFinite(totalDeals) ||
    totalDeals < 0
  ) {
    return NextResponse.json({ error: "totalDeals must be a number >= 0" }, { status: 400 });
  }
  if (
    typeof totalDealValue !== "number" ||
    !Number.isFinite(totalDealValue) ||
    totalDealValue < 0
  ) {
    return NextResponse.json(
      { error: "totalDealValue must be a number >= 0" },
      { status: 400 },
    );
  }
  if (
    typeof performanceFee !== "number" ||
    !Number.isFinite(performanceFee) ||
    performanceFee < 0
  ) {
    return NextResponse.json(
      { error: "performanceFee must be a number >= 0" },
      { status: 400 },
    );
  }
  if (!month?.trim()) {
    return NextResponse.json({ error: "month is required" }, { status: 400 });
  }

  const amountCents = Math.round(performanceFee * 100);
  if (amountCents <= 0) {
    return NextResponse.json(
      { error: "performanceFee must be greater than zero after conversion to cents" },
      { status: 400 },
    );
  }

  const supabase = createAdminSupabaseClient();
  const { data: client, error: fetchError } = await supabase
    .from("clients")
    .select("id, stripe_customer_id")
    .eq("id", clientId.trim())
    .maybeSingle<{ id: string; stripe_customer_id: string | null }>();

  if (fetchError || !client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }
  if (!client.stripe_customer_id) {
    return NextResponse.json(
      { error: "Client has no stripe_customer_id" },
      { status: 400 },
    );
  }

  const description = `Gradia performance fee — ${totalDeals} confirmed deals — ${month.trim()}`;

  const stripe = getStripe();

  try {
    await stripe.invoiceItems.create({
      customer: client.stripe_customer_id,
      amount: amountCents,
      currency: "usd",
      description,
      metadata: {
        client_id: client.id,
        total_deals: String(totalDeals),
        total_deal_value: String(totalDealValue),
        month: month.trim(),
      },
    });

    const invoice = await stripe.invoices.create({
      customer: client.stripe_customer_id,
      collection_method: "send_invoice",
      days_until_due: 14,
      auto_advance: false,
      description: `Gradia performance fee — ${month.trim()}`,
      pending_invoice_items_behavior: "include",
    });

    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(finalized.id);

    return NextResponse.json(
      { invoice: finalized },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
