/**
 * Named analytics events. Stubbed until stage 5, when this calls Vercel Analytics' `track`.
 */
export type AnalyticsEvent =
  | { name: "cta_founding_click"; placement: string }
  | { name: "email_signup"; source: string; tag: string }
  | { name: "product_click"; slug: string };

export function track(event: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event);
  }
}
