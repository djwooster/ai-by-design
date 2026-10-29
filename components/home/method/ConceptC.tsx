"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PhaseScene } from "@/components/illustrations/PhaseScene";
import { phaseNumber, phases } from "@/lib/content/method";
import { cx } from "@/lib/cx";

/**
 * Concept C: a scroll stepper. The six phases stay pinned on the left, and the
 * current one lights up as its scene scrolls past on the right. No clicks
 * needed; clicking a phase jumps to it.
 */
export function ConceptC() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const block of blocks.current) if (block) observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
      <ol className="hidden self-start lg:sticky lg:top-28 lg:block">
        {phases.map((phase, index) => (
          <li key={phase.id}>
            <a
              href={`#phase-${phase.id}`}
              className={cx(
                "relative flex items-baseline gap-4 py-3 pl-5 transition-colors duration-300",
                index === active ? "text-fg" : "text-fg-muted hover:text-fg-secondary",
              )}
            >
              {index === active && (
                <motion.span
                  layoutId="method-step"
                  className="absolute inset-y-2 left-0 w-px bg-accent-fg"
                  transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                />
              )}
              <span className="font-mono text-ui-sm">{phaseNumber(index)}</span>
              <span className="text-heading">{phase.name}</span>
            </a>
          </li>
        ))}
      </ol>

      <ol className="space-y-6">
        {phases.map((phase, index) => (
          <li
            key={phase.id}
            id={`phase-${phase.id}`}
            data-index={index}
            ref={(node) => {
              blocks.current[index] = node;
            }}
            className={cx(
              "group scroll-mt-28 rounded-[24px] border bg-surface p-6 transition-colors duration-500 md:p-8",
              index === active ? "border-line-strong" : "border-line",
            )}
          >
            <p className="font-mono text-ui-sm text-fg-muted lg:hidden">
              {phaseNumber(index)} · {phase.name}
            </p>
            <p className="max-w-[34rem] text-lede text-fg max-lg:mt-3">{phase.outcome}</p>
            <PhaseScene phase={phase.id} className="mt-6 rounded-xl md:aspect-[16/9]" />
          </li>
        ))}
      </ol>
    </div>
  );
}
