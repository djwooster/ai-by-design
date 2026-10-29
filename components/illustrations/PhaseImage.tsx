"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { ease } from "@/components/motion/tokens";

/**
 * A Method phase's scene. The images have transparent backgrounds (run
 * through scripts/knockout-bg.mjs), so they sit on any card with no seam. It
 * settles from a small zoom as the card scrolls in (inheriting the card's
 * hidden/shown variants).
 * Decorative: the phase name and outcome sit right under it.
 */
export function PhaseImage({ src }: { src: StaticImageData }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { scale: 1.08, opacity: 0 },
          shown: { scale: 1, opacity: 1, transition: { duration: 0.9, ease: ease.glide, delay: 0.1 } },
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
}
