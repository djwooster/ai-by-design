"use client";

import { motion, type Variants } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { cx } from "@/lib/cx";

/*
 * Text that arrives a word at a time, iOS style: each word comes out of a soft
 * blur and settles into place on a critically damped spring (no bounce).
 *
 *   fall  words drop gently from above: the hero headline, once, on load
 *   rise  words lift from just below: section headings, as they scroll in
 *
 * Screen readers get the whole line at once; the animated words are hidden
 * from them. With reduced motion the text simply renders.
 */

const STAGGER = 0.055;

const word: Record<"fall" | "rise", Variants> = {
  fall: {
    hidden: { opacity: 0, y: "-0.45em", filter: "blur(10px)" },
    shown: (i: number) => ({
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { type: "spring", bounce: 0, duration: 0.9, delay: i * STAGGER },
    }),
  },
  rise: {
    hidden: { opacity: 0, y: "0.35em", filter: "blur(8px)" },
    shown: (i: number) => ({
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { type: "spring", bounce: 0, duration: 0.8, delay: i * STAGGER },
    }),
  },
};

export type WordsInLine = { text: string; className?: string };

const bare = (w: string) => w.replace(/[.,!?;:]$/, "");

/** Positions of the words in `words` that make up the `accent` phrase, matched as a whole. */
function accentPositions(words: string[], accent?: string) {
  const target = accent ? accent.split(" ") : [];
  const hit = new Set<number>();
  if (!target.length) return hit;
  for (let start = 0; start + target.length <= words.length; start++) {
    if (target.every((t, k) => bare(words[start + k]) === bare(t))) {
      target.forEach((_, k) => hit.add(start + k));
      break;
    }
  }
  return hit;
}

export function WordsIn({
  lines,
  accent,
  accentClassName = "text-accent-fg",
  label: labelOverride,
  as: Tag = "h2",
  variant = "rise",
  delay = 0,
  className,
}: {
  /** One entry per line; each line can carry its own color class. */
  lines: (string | WordsInLine)[];
  /** A word or phrase to set in the accent color. */
  accent?: string;
  /** The color for the accent phrase; the site accent unless set. */
  accentClassName?: string;
  /** What screen readers hear, when the visible text includes a symbol. */
  label?: string;
  as?: "h1" | "h2" | "h3" | "p";
  variant?: "fall" | "rise";
  /** Seconds before the first word. */
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const normalized = lines.map((line) => (typeof line === "string" ? { text: line } : line));
  const label = labelOverride ?? normalized.map((line) => line.text).join(" ");

  if (reduced) {
    return (
      <Tag className={className} aria-label={labelOverride}>
        {normalized.map((line) => {
          const words = line.text.split(" ");
          const accented = accentPositions(words, accent);
          return (
            <span key={line.text} className={cx(normalized.length > 1 && "block", line.className)}>
              {words.map((w, i) => (
                <span key={i} className={accented.has(i) ? accentClassName : undefined}>
                  {w}
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </span>
          );
        })}
      </Tag>
    );
  }

  let index = Math.round(delay / STAGGER);
  const trigger =
    variant === "fall"
      ? { initial: "hidden", animate: "shown" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className} aria-label={label}>
      <motion.span aria-hidden className="block" {...trigger}>
        {normalized.map((line) => {
          const words = line.text.split(" ");
          const accented = accentPositions(words, accent);
          return (
            <span key={line.text} className={cx(normalized.length > 1 ? "block" : "inline", line.className)}>
              {words.map((w, i) => (
                <span key={i}>
                  <motion.span
                    custom={index++}
                    variants={word[variant]}
                    className={cx("inline-block will-change-transform", accented.has(i) && accentClassName)}
                  >
                    {w}
                  </motion.span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
