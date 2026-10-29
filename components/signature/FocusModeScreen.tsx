"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { cx } from "@/lib/cx";

/*
 * FocusMode's timer screen, redrawn in the site's tokens: a session ring, the
 * time counting down, session dots and the two controls. It ticks only while
 * on screen, and stays still for reduced motion.
 * [TODO: check against the real FocusMode UI and swap in its exact layout]
 */

const SESSION = 25 * 60;
const R = 92;
const C = 2 * Math.PI * R;

const format = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function FocusModeScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const [remaining, setRemaining] = useState(18 * 60 + 42);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!visible || !running || reduced) return;
    const id = setInterval(() => setRemaining((r) => (r <= 1 ? SESSION : r - 1)), 1000);
    return () => clearInterval(id);
  }, [visible, running, reduced]);

  const progress = 1 - remaining / SESSION;
  const angle = progress * 2 * Math.PI - Math.PI / 2;

  return (
    <div ref={ref} className="px-6 pt-4 pb-7">
      <div className="flex items-baseline justify-between">
        <span className="text-heading text-fg">Focus</span>
        <span className="font-mono text-label uppercase text-fg-muted">Session 2 / 4</span>
      </div>

      <div className="mt-6 flex justify-center">
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-line px-2.5 font-mono text-label uppercase text-fg-secondary">
          <span aria-hidden className="size-1.5 rounded-full bg-fg-secondary" />
          Deep work
        </span>
      </div>

      <div className="relative mx-auto mt-5 size-[208px]">
        <svg viewBox="0 0 208 208" className="size-full -rotate-90" aria-hidden>
          <circle cx="104" cy="104" r={R} fill="none" strokeWidth="1.5" className="stroke-line-strong" />
          <motion.circle
            cx="104"
            cy="104"
            r={R}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="stroke-fg"
            strokeDasharray={C}
            initial={false}
            animate={{ strokeDashoffset: C * (1 - progress) }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </svg>
        <motion.span
          aria-hidden
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fg"
          initial={false}
          animate={{ left: 104 + R * Math.cos(angle), top: 104 + R * Math.sin(angle) }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <span
            className="font-mono text-[2.5rem] leading-none tracking-[-0.02em] text-fg tabular-nums"
            aria-label={`${Math.ceil(remaining / 60)} minutes left`}
          >
            {format(remaining)}
          </span>
          <span className="font-mono text-label uppercase text-fg-muted">
            {running ? "Focusing" : "Paused"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cx("h-1 rounded-full", i < 1 ? "w-4 bg-fg" : i === 1 ? "w-4 bg-fg-muted" : "w-1.5 bg-line-strong")}
          />
        ))}
      </div>

      <div className="mt-7 flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="h-10 flex-1 rounded-full bg-fg text-ui font-medium text-canvas transition-transform duration-220 ease-glide active:scale-[0.965] active:duration-80"
        >
          {running ? "Pause" : "Resume"}
        </button>
        <button
          type="button"
          onClick={() => setRemaining(SESSION)}
          className="h-10 flex-1 rounded-full border border-line-strong text-ui font-medium text-fg transition-transform duration-220 ease-glide active:scale-[0.965] active:duration-80"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
