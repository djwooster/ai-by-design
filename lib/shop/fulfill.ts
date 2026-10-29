import type Stripe from "stripe";
import { delivery, getProduct } from "@/lib/content/products";
import { getResend, sender } from "@/lib/email/resend";
import { deliveryEmail } from "@/lib/email/templates";
import { downloadUrl } from "@/lib/shop/downloads";

/**
 * Delivers a paid Checkout Session: emails the buyer a signed download link.
 * Stripe retries webhooks, so the email is sent with the session ID as its
 * idempotency key and a retry never sends a second copy.
 */
export async function fulfill(session: Stripe.Checkout.Session) {
  if (session.payment_status === "unpaid") return; // async methods: wait for async_payment_succeeded

  const product = getProduct(session.metadata?.slug ?? "");
  const email = session.customer_details?.email;
  if (!product || !email) throw new Error(`Can't fulfill ${session.id}: missing product or email`);

  const resend = getResend();
  if (!resend) throw new Error("RESEND_API_KEY is not set; can't deliver");

  const message = deliveryEmail({ product: product.name, url: downloadUrl(product.slug, session.id), days: delivery.linkDays });
  const sent = await resend.emails.send({ ...sender, to: email, ...message }, { idempotencyKey: `delivery/${session.id}` });
  if (sent.error) throw new Error(`Delivery email failed for ${session.id}: ${sent.error.message}`);
}
