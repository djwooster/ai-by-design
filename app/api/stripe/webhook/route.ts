import type Stripe from "stripe";
import { fulfill } from "@/lib/shop/fulfill";
import { getStripe } from "@/lib/shop/stripe";

/**
 * Stripe's events for the shop. Verifies the signature, then delivers on a
 * paid session. Any error returns 500 so Stripe retries.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return new Response("Stripe isn't configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await fulfill(event.data.object);
        break;
      case "checkout.session.async_payment_failed":
        console.warn("[stripe] payment failed", event.data.object.id);
        break;
    }
  } catch (error) {
    console.error("[stripe]", event.type, error);
    return new Response("Fulfillment failed", { status: 500 });
  }

  return Response.json({ received: true });
}
