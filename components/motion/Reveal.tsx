"use client";

import { motion, type Variants } from "motion/react";
import { ease, rise } from "@/components/motion/tokens";

const item: Variants = {
  hidden: { opacity: 0, y: rise.distance },
  shown: { opacity: 1, y: 0, transition: { duration: rise.duration, ease: ease.glide } },
};

/*
 * Reveal's variants take the delay as `custom`: a variant's own transition
 * overrides the component's `transition` prop, so a delay passed there is lost.
 */
const reveal: Record<"below" | "right", Variants> = {
  below: {
    hidden: { opacity: 0, y: rise.distance },
    shown: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: rise.duration, ease: ease.glide, delay } }),
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    shown: (delay: number) => ({ opacity: 1, x: 0, transition: { type: "spring", bounce: 0, duration: 0.9, delay } }),
  },
};

const viewport = { once: true, margin: "0px 0px -10% 0px" };

/** Fades into place the first time it scrolls into view: rising from below, or gliding in from the right. */
export function Reveal({
  as = "div",
  delay = 0,
  from = "below",
  className,
  children,
}: {
  as?: "div" | "li";
  delay?: number;
  from?: "below" | "right";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={reveal[from]}
      custom={delay}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
    >
      {children}
    </Tag>
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
  style,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} style={style} variants={item}>
      {children}
    </Tag>
  );
}
