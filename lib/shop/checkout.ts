"use server";

import { getProduct } from "@/lib/content/products";
import { getStripe } from "@/lib/shop/stripe";
import { siteUrl } from "@/lib/siteUrl";

export type CheckoutState =
  | { status: "idle" }
  | { status: "redirect"; url: string }
  | { status: "unavailable"; message: string };

/** Tags these sessions in the Stripe Dashboard, so the shop's checkouts can be compared with others. */
const INTEGRATION = "ai-bydesign-shop-qwkzmfta";

/**
 * Starts a purchase: creates a Stripe Checkout Session for one product and
 * returns its URL. Delivery happens in the webhook, never here.
 */
export async function startCheckout(_previous: CheckoutState, form: FormData): Promise<CheckoutState> {
  const product = getProduct(String(form.get("slug") ?? ""));
  if (!product) return { status: "unavailable", message: "That product isn't available." };
  if (product.price === null) return { status: "unavailable", message: "This one isn't on sale yet." };

  const stripe = getStripe();
  if (!stripe) return { status: "unavailable", message: "Checkout isn't connected yet." };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(product.price * 100),
            product_data: { name: product.name, description: product.summary.replace("[TODO: copy] ", "") },
          },
        },
      ],
      // The webhook reads the slug to know what to deliver.
      metadata: { slug: product.slug },
      payment_intent_data: { metadata: { slug: product.slug } },
      success_url: siteUrl("/shop/thanks"),
      cancel_url: siteUrl(`/shop/${product.slug}`),
      integration_identifier: INTEGRATION,
    });
    if (!session.url) throw new Error("Checkout Session has no URL");
    return { status: "redirect", url: session.url };
  } catch (error) {
    console.error("[checkout]", error);
    return { status: "unavailable", message: "Checkout didn't open. Try again in a moment." };
  }
}
