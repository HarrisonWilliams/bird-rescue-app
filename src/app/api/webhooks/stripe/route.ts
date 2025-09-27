import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  return NextResponse.json(
    {
      error: "Stripe webhook not configured",
      message: "Supply STRIPE_WEBHOOK_SECRET and implement webhook handling before enabling.",
    },
    { status: 501 }
  );
}
