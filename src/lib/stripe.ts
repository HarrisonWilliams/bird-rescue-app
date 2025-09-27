import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripe) {
    const secret = process.env.STRIPE_SECRET_KEY;

    if (!secret) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    // Use the SDK's default API version (avoid type mismatches in CI)
    stripe = new Stripe(secret);
  }

  return stripe;
}
