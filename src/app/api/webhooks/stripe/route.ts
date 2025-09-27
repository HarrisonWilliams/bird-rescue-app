import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { getStripe } from "@/src/lib/stripe";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Stripe client error: ${message}`, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // TODO: upsert subscription state in Supabase
      break;
  }

  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } };
