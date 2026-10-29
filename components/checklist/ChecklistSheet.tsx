"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { checklistGroups } from "@/lib/content/checklist";
import { cx } from "@/lib/cx";

const ROWS = checklistGroups.slice(0, 4).flatMap((group) => [
  { kind: "group" as const, text: group.name },
  ...group.items.map((text) => ({ kind: "item" as const, text })),
]);
const ITEMS = ROWS.filter((row) => row.kind === "item").length;
const TOTAL = checklistGroups.reduce((sum, group) => sum + group.items.length, 0);
/** How many items tick off before the sheet rests. */
const TICKED = 6;

/**
 * A page of the checklist on paper. Once it's in view, the first few items
 * tick off one by one and the progress bar fills with them, then it rests.
 */
export function ChecklistSheet({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = usePrefersReducedMotion();
  const [ticked, setTicked] = useState(0);
  const done = reduced ? TICKED : ticked;

  useEffect(() => {
    if (!inView || reduced) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTicked(n);
      if (n >= TICKED) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  let itemIndex = 0;
  return (
    <div ref={ref} aria-hidden className={cx("theme-light overflow-hidden rounded-2xl px-6 pt-8 md:px-10 md:pt-12", className)}>
      <div className="mx-auto max-w-[26rem] rounded-t-xl border border-b-0 border-line bg-(--white) px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">App Store checklist</span>
          <span className="font-mono text-[10px] tabular-nums text-fg-muted">
            {done} / {TOTAL}
          </span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${(done / TOTAL) * 100}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
        <ul className="mt-6">
          {ROWS.map((row) => {
            if (row.kind === "group") {
              return (
                <li key={row.text} className="pt-4 pb-1.5 text-[12px] font-medium text-fg first:pt-0">
                  {row.text}
                </li>
              );
            }
            const checked = itemIndex++ < done;
            return (
              <li key={row.text} className="flex items-center gap-3 py-1.5 text-[13px]">
                <span
                  className={cx(
                    "flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300",
                    checked ? "border-accent bg-accent text-on-accent" : "border-line-strong",
                  )}
                >
                  <svg viewBox="0 0 10 10" className="size-2.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <motion.path
                      d="M2.2 5.2L4.2 7.1L7.8 3.2"
                      initial={false}
                      animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </svg>
                </span>
                <span
                  className={cx(
                    "transition-colors duration-300",
                    checked ? "text-fg-muted line-through decoration-fg-muted/50" : "text-fg-secondary",
                  )}
                >
                  {row.text}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 font-mono text-[10px] text-fg-muted">+ {TOTAL - ITEMS} more</p>
      </div>
    </div>
  );
}
