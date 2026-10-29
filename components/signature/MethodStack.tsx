"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ease } from "@/components/motion/tokens";
import { phaseNumber, type Phase } from "@/lib/content/method";
import { cx } from "@/lib/cx";

/*
 * Six thin isometric layers, one per phase, Vision at the bottom and Launch on
 * top. Drawn in world units (x right-back, y left-back, z up) and projected
 * into the SVG. Each layer's faces are filled with the page color so upper
 * layers hide the edges of the ones below.
 */

type P = [number, number, number];

const SIZE = 50; // half the slab's width and depth
const THICKNESS = 5;
const OX = 110;
const OY = 240;
const WIDTH = 340;
const HEIGHT = 300;

const iso = ([x, y, z]: P): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z];
const pts = (list: P[]) => list.map((p) => iso(p).map((n) => n.toFixed(1)).join(",")).join(" ");

const s = SIZE;
const t = THICKNESS;
const faces = {
  top: pts([[-s, -s, t], [s, -s, t], [s, s, t], [-s, s, t]]),
  right: pts([[s, -s, 0], [s, s, 0], [s, s, t], [s, -s, t]]),
  left: pts([[-s, s, 0], [s, s, 0], [s, s, t], [-s, s, t]]),
  inset: pts([[-s + 8, -s + 8, t], [s - 8, -s + 8, t], [s - 8, s - 8, t], [-s + 8, s - 8, t]]),
};
// Where each layer's leader line leaves the slab and where its label sits.
const [anchorX, anchorY] = iso([s, -s, t / 2]);
const labelX = OX + 150;

// Hairlines stay 1px however large the stack is drawn.
const hairline = { stroke: "currentColor", vectorEffect: "non-scaling-stroke" } as const;

/** Vertical distance between layers, in SVG units: collapsed into one block, or fanned out. */
export const GAP = { collapsed: t + 1, separated: 34 };

function Layer({ index, phase, active, compact }: { index: number; phase: Phase; active: boolean; compact: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ y: active ? -8 : 0 }}
      transition={{ duration: 0.45, ease: ease.glide }}
      className={cx("transition-colors duration-300", active ? "text-accent-fg" : "text-fg-muted")}
    >
      <polygon points={faces.left} className="fill-canvas" {...hairline} />
      <polygon points={faces.right} className="fill-canvas" {...hairline} />
      <polygon
        points={faces.top}
        {...hairline}
        className={cx("transition-[fill] duration-300", active ? "fill-accent-deep" : "fill-canvas")}
      />
      <polygon points={faces.inset} fill="none" strokeOpacity={0.5} {...hairline} />
      {!compact && (
        <>
          <line
            x1={anchorX + 4}
            y1={anchorY}
            x2={labelX - 8}
            y2={anchorY}
            strokeDasharray="1 3"
            {...hairline}
          />
          <text
            x={labelX}
            y={anchorY}
            dominantBaseline="middle"
            fill="currentColor"
            className={cx("font-mono text-[9px] uppercase tracking-[0.12em]", active && "fill-accent-fg")}
          >
            {phaseNumber(index)} · {phase.name}
          </text>
        </>
      )}
    </motion.g>
  );
}

/**
 * The stack itself. `gap` can be a number or a scroll-driven motion value;
 * `active` highlights one layer in the accent. `compact` drops the labels for
 * small, inline use.
 */
export function MethodStack({
  phases,
  gap = GAP.separated,
  active = -1,
  compact = false,
  className,
}: {
  phases: Phase[];
  gap?: number | MotionValue<number>;
  active?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={compact ? `0 0 ${OX * 2} ${HEIGHT}` : `0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`The AI by Design Method: ${phases.map((p) => p.name).join(", ")}`}
      className={cx("h-auto w-full overflow-visible", className)}
      strokeWidth={1}
      strokeLinejoin="round"
    >
      {phases.map((phase, index) => (
        <StackedLayer key={phase.id} index={index} gap={gap}>
          <Layer index={index} phase={phase} active={index === active} compact={compact} />
        </StackedLayer>
      ))}
    </svg>
  );
}

/** Lifts layer `index` by `index × gap`, whether gap is static or a live motion value. */
function StackedLayer({
  index,
  gap,
  children,
}: {
  index: number;
  gap: number | MotionValue<number>;
  children: React.ReactNode;
}) {
  if (typeof gap === "number") {
    return <g transform={`translate(0 ${-index * gap})`}>{children}</g>;
  }
  return <LiveLayer index={index} gap={gap}>{children}</LiveLayer>;
}

function LiveLayer({
  index,
  gap,
  children,
}: {
  index: number;
  gap: MotionValue<number>;
  children: React.ReactNode;
}) {
  const y = useTransform(gap, (g) => -index * g);
  return <motion.g style={{ y }}>{children}</motion.g>;
}
