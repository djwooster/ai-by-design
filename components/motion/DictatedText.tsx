"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

/**
 * Text that arrives as if being dictated: words fade in quickly, in sequence.
 * Use it for one moment only (the hero subline). Screen readers get the whole
 * sentence at once.
 */
export function DictatedText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <p className={className}>{text}</p>;

  const words = text.split(" ");
  return (
    <p className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.055, duration: 0.28, ease: ease.glide }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </p>
  );
}
