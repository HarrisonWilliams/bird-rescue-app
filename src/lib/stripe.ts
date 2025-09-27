import Stripe from "stripe";
// Use SDK default API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

