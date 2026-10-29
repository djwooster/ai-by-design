import Stripe from "stripe";

let client: Stripe | null | undefined;

/** The Stripe client, or null until `STRIPE_SECRET_KEY` is set. */
export function getStripe() {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    client = key ? new Stripe(key, { apiVersion: "2026-10-28.endive" }) : null;
  }
  return client;
}
