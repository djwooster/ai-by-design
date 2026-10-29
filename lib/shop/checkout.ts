"use server";

import { getProduct } from "@/lib/content/products";

export type CheckoutState =
  | { status: "idle" }
  | { status: "redirect"; url: string }
  | { status: "unavailable"; message: string };

/**
 * Starts a purchase. Stubbed until stage 5, when it creates a Stripe Checkout
 * Session for the product and returns its URL; the webhook then emails the
 * download link through Resend.
 */
export async function startCheckout(_previous: CheckoutState, form: FormData): Promise<CheckoutState> {
  const product = getProduct(String(form.get("slug") ?? ""));
  if (!product) return { status: "unavailable", message: "That product isn't available." };

  // [TODO: stage 5] Stripe: create a Checkout Session for `product` and return its URL.
  return { status: "unavailable", message: "[TODO: stage 5] Checkout opens when Stripe is wired." };
}
