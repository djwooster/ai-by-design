import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseBand } from "@/components/shared/CourseBand";
import { ButtonLink } from "@/components/ui/Button";
import { delivery } from "@/lib/content/products";

export const metadata: Metadata = { title: "Thanks for your order", robots: { index: false } };

/** Where Stripe Checkout returns after payment. Delivery is the webhook's job; this page only says what happens next. */
export default function ThanksPage() {
  return (
    <>
      <PageHeader
        label="Payment received"
        title="Check your inbox."
        accent="inbox."
        lede={`Your download link is on its way to the email you paid with. It works for ${delivery.linkDays} days.`}
      >
        <ButtonLink href="/shop" variant="secondary" size="lg">
          Back to the shop
        </ButtonLink>
      </PageHeader>
      <div className="pt-8">
        <CourseBand
          placement="shop-thanks"
          title="[TODO: copy] Ready to ship the whole app?"
          body="[TODO: copy] The course takes you from idea to App Store, with two live calls a week."
        />
      </div>
    </>
  );
}
