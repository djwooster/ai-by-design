"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";

/**
 * Then and now, told in one beat as it scrolls into view: a line draws
 * through the "Then" row, and the dimmed "Now" row lights up. Runs once.
 */
export function ThenNow({ rows }: { rows: readonly { era: string; text: string }[] }) {
  return (
    <motion.dl
      className="mt-10 max-w-[28rem] border-t border-line"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {rows.map((row) => {
        const now = row.era === "Now";
        return (
          <motion.div
            key={row.era}
            className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4"
            variants={
              now
                ? {
                    hidden: { opacity: 0.35 },
                    shown: { opacity: 1, transition: { duration: 0.6, ease: ease.glide, delay: 0.95 } },
                  }
                : undefined
            }
          >
            <dt className={now ? "text-ui font-medium text-accent-fg" : "text-ui text-fg-muted"}>{row.era}</dt>
            <dd className={now ? "text-ui text-fg" : "text-ui text-fg-muted"}>
              {now ? (
                row.text
              ) : (
                <span className="relative inline-block">
                  {row.text}
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 top-[55%] h-px origin-left bg-fg-muted"
                    variants={{
                      hidden: { scaleX: 0 },
                      shown: { scaleX: 1, transition: { duration: 0.7, ease: ease.glide, delay: 0.3 } },
                    }}
                  />
                </span>
              )}
            </dd>
          </motion.div>
        );
      })}
    </motion.dl>
  );
}
