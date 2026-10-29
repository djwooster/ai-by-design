"use client";

import { ButtonLink, type ButtonSize } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { formatPrice, offer } from "@/lib/content/offer";

/**
 * "Become a founding member". Always reads the Skool checkout from config;
 * until it's set, it scrolls to the founding offer instead.
 */
export function CTAButton({
  placement,
  size = "md",
  withPrice,
  className,
}: {
  /** Where the button sits, for the click event: "header", "hero", "final"… */
  placement: string;
  size?: ButtonSize;
  /** Adds the founding price and the struck-through launch price after the label. */
  withPrice?: boolean;
  className?: string;
}) {
  return (
    <ButtonLink
      href={offer.checkoutUrl ?? "/#offer"}
      external={offer.checkoutUrl !== null}
      size={size}
      className={className}
      onClick={() => track({ name: "cta_founding_click", placement })}
    >
      {offer.cta}
      {withPrice && (
        <>
          <span className="font-semibold">{formatPrice(offer.foundingPrice)}</span>
          <span className="line-through opacity-60">{formatPrice(offer.launchPrice)}</span>
        </>
      )}
    </ButtonLink>
  );
}
