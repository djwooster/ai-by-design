"use client";

import { ButtonLink, type ButtonSize } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { offer } from "@/lib/content/offer";

/**
 * "Become a founding member". Always reads the Skool checkout from config;
 * until it's set, it scrolls to the founding offer instead.
 */
export function CTAButton({
  placement,
  size = "md",
  className,
}: {
  /** Where the button sits, for the click event: "header", "hero", "final"… */
  placement: string;
  size?: ButtonSize;
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
    </ButtonLink>
  );
}
