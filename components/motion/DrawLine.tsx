"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import { cx } from "@/lib/cx";

/** A 1px hairline that draws itself from left to right the first time it scrolls into view. */
export function DrawLine({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cx("block h-px origin-left bg-line-strong", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: ease.glide, delay }}
    />
  );
}
