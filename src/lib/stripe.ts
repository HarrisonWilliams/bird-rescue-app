import Stripe from "stripe";

// Use the SDK's default API version (avoid type mismatches in CI)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
