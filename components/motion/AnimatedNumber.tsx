"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import { ease } from "@/components/motion/tokens";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

/**
 * A number that animates between values when it changes. It renders the real
 * value on first paint and never counts up from zero, so it can't read as a
 * fake counter.
 */
export function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toString(),
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || shown.current === value) return;
    if (reduced) {
      shown.current = value;
      node.textContent = format(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.5,
      ease: ease.glide,
      onUpdate: (n) => {
        shown.current = n;
        node.textContent = format(n);
      },
    });
    return () => controls.stop();
  }, [value, format, reduced]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
