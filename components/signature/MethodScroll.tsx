"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { ease } from "@/components/motion/tokens";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { GAP, MethodStack } from "@/components/signature/MethodStack";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { phaseNumber, type Phase } from "@/lib/content/method";
import { cx } from "@/lib/cx";

/** Scroll distance per phase, in viewport heights. */
const PER_PHASE_VH = 55;
/** Share of the scroll spent fanning the layers out before the first phase activates. */
const SEPARATE_UNTIL = 0.12;

/**
 * The Method showpiece. The section pins while the visitor scrolls through it:
 * the collapsed stack fans out, then each layer lights up in turn with its
 * phase beside it. With reduced motion it's a static, fully separated stack
 * and the whole list.
 */
export function MethodScroll({ phases }: { phases: Phase[] }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <MethodStatic phases={phases} />;
  return <MethodPinned phases={phases} />;
}

function MethodPinned({ phases }: { phases: Phase[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const gap = useTransform(scrollYProgress, [0, SEPARATE_UNTIL], [GAP.collapsed, GAP.separated], {
    clamp: true,
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const span = (1 - SEPARATE_UNTIL) / phases.length;
    const index = Math.floor((p - SEPARATE_UNTIL) / span);
    setActive(Math.max(0, Math.min(phases.length - 1, index)));
  });

  const phase = phases[active];

  return (
    <div ref={ref} className="relative" style={{ height: `${phases.length * PER_PHASE_VH + 60}vh` }}>
      <div className="sticky top-28 flex min-h-[calc(100svh-7rem)] items-center md:top-14 md:min-h-[calc(100svh-3.5rem)]">
        <div className="grid w-full grid-cols-4 items-center gap-x-4 gap-y-8 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-4 md:col-span-7">
            <MethodStack phases={phases} gap={gap} active={active} className="max-w-[560px]" />
          </div>

          <div className="col-span-4 md:col-span-5" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: ease.glide }}
              >
                <SpecLabel
                  parts={[
                    `Phase ${phaseNumber(active)} of ${phaseNumber(phases.length - 1)}`,
                    `${phase.modules.length} ${phase.modules.length === 1 ? "module" : "modules"}`,
                  ]}
                />
                <div className="mt-5 flex items-center gap-3">
                  <GeoIcon name={phase.id} size={28} className="text-accent" />
                  <h3 className="text-title text-fg">{phase.name}</h3>
                </div>
                <p className="mt-4 max-w-[26rem] text-body text-fg-secondary">{phase.description}</p>
              </motion.div>
            </AnimatePresence>

            <PhaseTicks phases={phases} active={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Six ticks under the phase copy: where you are in the Method at a glance. */
function PhaseTicks({ phases, active }: { phases: Phase[]; active: number }) {
  return (
    <ol className="mt-10 grid max-w-[26rem] grid-cols-6 gap-1.5" aria-label="Phases">
      {phases.map((phase, index) => (
        <li key={phase.id}>
          <span
            className={cx(
              "block h-px transition-colors duration-300",
              index <= active ? "bg-fg" : "bg-line-strong",
              index === active && "bg-accent",
            )}
          />
          <SpecLabel
            as="span"
            className={cx(
              "mt-2 block transition-colors duration-300",
              index === active && "text-fg",
            )}
          >
            {phaseNumber(index)}
          </SpecLabel>
          <span className="sr-only">{phase.name}</span>
        </li>
      ))}
    </ol>
  );
}

function MethodStatic({ phases }: { phases: Phase[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6">
      <div className="col-span-4 md:col-span-6">
        <MethodStack phases={phases} className="max-w-[520px]" />
      </div>
      <ol className="col-span-4 divide-y divide-line border-y border-line md:col-span-6">
        {phases.map((phase, index) => (
          <li key={phase.id} className="flex gap-4 py-5">
            <GeoIcon name={phase.id} className="mt-0.5 text-fg-muted" />
            <div>
              <SpecLabel parts={[phaseNumber(index), phase.name]} />
              <p className="mt-1.5 text-ui text-fg-secondary">{phase.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
