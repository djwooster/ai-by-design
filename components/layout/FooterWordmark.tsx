"use client";

import { motion } from "motion/react";
import { site } from "@/lib/content/site";

/**
 * A large, quiet "AI by Design" across the foot of the page. Its letters rise
 * out of a soft blur one after another the first time you reach the bottom.
 * Decorative: the footer already names the site, so screen readers skip it.
 */
export function FooterWordmark() {
  const letters = Array.from(site.name);
  return (
    <motion.p
      aria-hidden
      className="pt-6 pb-[0.12em] text-[clamp(3.25rem,14.5vw,11.5rem)] leading-none font-medium tracking-[-0.055em] whitespace-nowrap text-(--dark-liver) select-none"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "0.35em", filter: "blur(12px)" },
            shown: {
              opacity: 1,
              y: "0em",
              filter: "blur(0px)",
              transition: { type: "spring", bounce: 0, duration: 1, delay: i * 0.045 },
            },
          }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </motion.p>
  );
}
