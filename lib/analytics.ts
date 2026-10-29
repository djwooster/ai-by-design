import { track as vercelTrack } from "@vercel/analytics";

/** Named analytics events, sent to Vercel Analytics. */
export type AnalyticsEvent =
  | { name: "cta_founding_click"; placement: string }
  | { name: "email_signup"; source: string; tag: string }
  | { name: "product_click"; slug: string }
  | { name: "checkout_start"; slug: string };

export function track({ name, ...properties }: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, properties);
  vercelTrack(name, properties);
}
