"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";

/**
 * A paragraph whose sentences come into focus one after another when it
 * mounts, for text revealed by an interaction, like an FAQ answer opening.
 * Opacity and blur only: sentences stay inline so they wrap naturally, and
 * transforms don't apply to inline text.
 */
export function SentencesIn({ text, className }: { text: string; className?: string }) {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [text];
  return (
    <p className={className}>
      {sentences.map((sentence, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: ease.glide, delay: 0.08 + i * 0.12 }}
          className="inline"
        >
          {sentence}
        </motion.span>
      ))}
    </p>
  );
}
