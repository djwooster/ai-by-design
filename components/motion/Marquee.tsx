"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { cx } from "@/lib/cx";

/** Pixels per second. Slow enough to read a card as it passes. */
const SPEED = 28;

/**
 * A row that drifts sideways on its own and loops. It is a real scroll
 * container, so people can swipe, drag or scroll it too; hovering, focusing or
 * touching it pauses the drift. The items render twice so the loop has no
 * seam, and the copy is hidden from assistive tech and the keyboard. With
 * reduced motion it holds still and scrolls by hand.
 */
export function Marquee({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = scroller.current;
    if (!el || reduced) return;

    let pos = el.scrollLeft;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      // The width of one set: how far the copy starts after the first.
      const loop = (copy.current?.offsetLeft ?? 0) - (first.current?.offsetLeft ?? 0);
      // If someone scrolled it by hand, carry on from where they left it.
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
      if (!paused.current) pos += SPEED * dt;
      if (loop > 0 && pos >= loop) pos -= loop;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <div
      ref={scroller}
      role="region"
      aria-label={label}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={() => window.setTimeout(resume, 2500)}
      className={cx(
        "relative flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]",
        className,
      )}
    >
      <div ref={first} className="flex shrink-0 gap-4 pr-4">
        {children}
      </div>
      {!reduced && (
        <div ref={copy} aria-hidden inert className="flex shrink-0 gap-4 pr-4">
          {children}
        </div>
      )}
    </div>
  );
}
