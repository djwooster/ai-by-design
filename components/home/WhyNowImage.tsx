"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import appStore from "@/public/images/why-now-app-store.png";

/**
 * The "your app, on the App Store" photo, with a slow camera push: it eases
 * from slightly zoomed in to its resting frame as the section scrolls past.
 * Scroll-linked rather than looping; still for reduced motion.
 */
export function WhyNowImage() {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.14, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={frame} className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { scale, y }}>
        <Image
          src={appStore}
          alt="A phone on a dark desk showing a newly launched focus app's App Store page, next to the sketchbook it was designed in."
          placeholder="blur"
          fill
          sizes="(min-width: 1024px) 680px, 100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
