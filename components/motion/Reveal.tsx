"use client";

import { motion, type Variants } from "motion/react";
import { ease, rise } from "@/components/motion/tokens";

const item: Variants = {
  hidden: { opacity: 0, y: rise.distance },
  shown: { opacity: 1, y: 0, transition: { duration: rise.duration, ease: ease.glide } },
};

const viewport = { once: true, margin: "0px 0px -10% 0px" };

/** Fades and rises into place the first time it scrolls into view. */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** A list whose `StaggerItem` children rise in sequence, about 40ms apart. */
export function Stagger({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "ul" | "ol";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={{ shown: { transition: { staggerChildren: rise.stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
