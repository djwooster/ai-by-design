"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import { formatPrice, offer } from "@/lib/content/offer";

/**
 * The founding price moment: as it scrolls into view, a line draws across the
 * launch price, then the founding price settles in beside it out of a soft
 * blur. Runs once.
 */
export function PriceStrike() {
  return (
    <motion.div
      className="mt-8 flex items-end gap-5"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <motion.p
        className="text-hero leading-none text-fg"
        variants={{
          hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
          shown: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", bounce: 0, duration: 0.9, delay: 0.95 },
          },
        }}
      >
        {formatPrice(offer.foundingPrice)}
      </motion.p>
      <div className="pb-1.5">
        <p className="relative inline-block text-ui text-fg-muted">
          {formatPrice(offer.launchPrice)}
          <motion.span
            aria-hidden
            className="absolute inset-x-[-2px] top-1/2 h-[1.5px] origin-left bg-fg-muted"
            variants={{
              hidden: { scaleX: 0 },
              shown: { scaleX: 1, transition: { duration: 0.55, ease: ease.glide, delay: 0.35 } },
            }}
          />
          <span className="sr-only"> (launch price, not today&apos;s price)</span>
        </p>
        <p className="text-ui-sm text-fg-muted">At launch, Jan 1, 2027</p>
      </div>
    </motion.div>
  );
}
