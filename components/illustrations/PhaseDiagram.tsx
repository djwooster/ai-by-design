"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import type { Phase } from "@/lib/content/method";

/*
 * Abstract node diagrams for the six Method cards, after DJ's "Connect Ideas /
 * Align Teams / Design with Logic" reference: thin gray lines, hollow nodes,
 * one solid node in the accent. When the card scrolls into view the lines
 * draw themselves, then the nodes pop in (they inherit hidden/shown variants).
 * All on a 240×140 canvas.
 */

type Pt = [number, number];

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: ease.glide, delay: 0.1 + i * 0.03 },
  }),
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  shown: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0, duration: 0.45, delay: 0.45 + i * 0.03 },
  }),
};

function Edge({ from, to, i = 0, dashed, faint }: { from: Pt; to: Pt; i?: number; dashed?: boolean; faint?: boolean }) {
  return (
    <motion.path
      d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`}
      custom={i}
      variants={lineVariants}
      strokeOpacity={faint ? 0.35 : 0.6}
      strokeDasharray={dashed ? "2 4" : undefined}
    />
  );
}

function Ring({ at, r, i = 0, faint = true }: { at: Pt; r: number; i?: number; faint?: boolean }) {
  return (
    <motion.circle cx={at[0]} cy={at[1]} r={r} custom={i} variants={lineVariants} strokeOpacity={faint ? 0.3 : 0.6} />
  );
}

function Node({ at, r = 4.5, i = 0, kind = "hollow" }: { at: Pt; r?: number; i?: number; kind?: "hollow" | "solid" | "accent" | "dot" }) {
  const className =
    kind === "accent" ? "fill-(--blue) stroke-(--blue)" : kind === "solid" || kind === "dot" ? "fill-current" : "fill-canvas";
  return (
    <motion.circle
      cx={at[0]}
      cy={at[1]}
      r={kind === "dot" ? 1.6 : r}
      custom={i}
      variants={nodeVariants}
      className={className}
      stroke={kind === "dot" ? "none" : undefined}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

const polar = (c: Pt, r: number, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
};

/* Vision: one idea at the center, thoughts radiating out from it. */
function Vision() {
  const c: Pt = [120, 70];
  const spokes = [0, 60, 120, 180, 240, 300].map((deg, i) => ({ deg, r: i % 2 ? 40 : 50 }));
  return (
    <>
      <Ring at={c} r={16} />
      {spokes.map(({ deg, r }, i) => (
        <Edge key={deg} from={polar(c, 8, deg)} to={polar(c, r, deg)} i={i} />
      ))}
      {[30, 150, 270].map((deg, i) => (
        <Edge key={deg} from={c} to={polar(c, 62, deg)} i={i + 6} dashed faint />
      ))}
      {spokes.map(({ deg, r }, i) => (
        <Node key={deg} at={polar(c, r, deg)} i={i} />
      ))}
      {[30, 150, 270].map((deg, i) => (
        <Node key={deg} at={polar(c, 62, deg)} kind="dot" i={i + 6} />
      ))}
      <Node at={c} r={6} kind="accent" i={9} />
    </>
  );
}

/* Design: a dot grid in the shape of a phone, with its structure ruled in. */
function Design() {
  const [x0, x1, y0, y1, step] = [96, 144, 16, 124, 8];
  const dots: Pt[] = [];
  for (let y = y0; y <= y1; y += step) {
    for (let x = x0; x <= x1; x += step) {
      const corner = (x === x0 || x === x1) && (y === y0 || y === y1);
      if (!corner) dots.push([x, y]);
    }
  }
  const rules = [y0 + step * 2, y0 + step * 6, y0 + step * 10];
  return (
    <>
      <motion.rect x={x0 - 8} y={y0 - 8} width={x1 - x0 + 16} height={y1 - y0 + 16} rx={16} custom={0} variants={lineVariants} strokeOpacity={0.35} />
      {rules.map((y, i) => (
        <Edge key={y} from={[x0 - 16, y]} to={[x1 + 16, y]} i={i + 1} faint />
      ))}
      <Edge from={[120, y0 - 18]} to={[120, y1 + 18]} i={4} faint />
      {dots.map((d, i) => (
        <Node key={`${d[0]}-${d[1]}`} at={d} kind="dot" i={i * 0.15} />
      ))}
      <Node at={[x0 + step, rules[0]]} r={4} i={6} />
      <Node at={[x1 - step, rules[1]]} r={4} i={7} />
      <Node at={[120, rules[2]]} r={5} kind="accent" i={8} />
    </>
  );
}

/* Build: a network assembling, layer by layer, into one working thing. */
function Build() {
  const layers: Pt[][] = [
    [[40, 40], [40, 70], [40, 100]],
    [[90, 28], [90, 56], [90, 84], [90, 112]],
    [[150, 42], [150, 70], [150, 98]],
    [[200, 70]],
  ];
  const edges: [Pt, Pt][] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l]) for (const b of layers[l + 1]) edges.push([a, b]);
  }
  return (
    <>
      {edges.map(([a, b], i) => (
        <Edge key={i} from={a} to={b} i={i * 0.4} faint={i % 3 !== 0} />
      ))}
      {layers.flat().map((p, i) =>
        i === layers.flat().length - 1 ? (
          <Node key={i} at={p} r={6} kind="accent" i={i} />
        ) : (
          <Node key={i} at={p} i={i} />
        ),
      )}
    </>
  );
}

/* Test: everything orbiting one build, each check passing in turn. */
function Test() {
  const c: Pt = [120, 70];
  const orbit = [45, 135, 225, 315];
  const axes = [0, 90, 180, 270];
  return (
    <>
      <Ring at={c} r={40} faint={false} />
      <Ring at={c} r={22} />
      {axes.map((deg, i) => (
        <Edge key={deg} from={polar(c, 7, deg)} to={polar(c, 58, deg)} i={i} />
      ))}
      {axes.map((deg, i) => (
        <Node key={deg} at={polar(c, 58, deg)} r={4} i={i} />
      ))}
      {orbit.map((deg, i) => (
        <Node key={deg} at={polar(c, 40, deg)} r={4.5} kind={i === 3 ? "accent" : "solid"} i={i + 4} />
      ))}
      <Node at={c} r={6} i={8} />
    </>
  );
}

/* Ship: the work converging into one build, then out along a single line. */
function Ship() {
  const sources: Pt[] = [[36, 30], [36, 52], [36, 74], [36, 96], [36, 118]];
  const hub: Pt = [104, 74];
  const out: Pt = [206, 26];
  const along = (t: number): Pt => [hub[0] + (out[0] - hub[0]) * t, hub[1] + (out[1] - hub[1]) * t];
  return (
    <>
      {sources.map((s, i) => (
        <Edge key={i} from={s} to={hub} i={i} faint={i !== 2} />
      ))}
      <Edge from={hub} to={out} i={6} />
      <Edge from={out} to={[226, 16]} i={7} dashed faint />
      {sources.map((s, i) => (
        <Node key={i} at={s} r={3.5} i={i} />
      ))}
      <Node at={along(0.35)} kind="dot" i={6} />
      <Node at={along(0.65)} kind="dot" i={7} />
      <Node at={hub} r={7} i={5} />
      <Node at={out} r={6} kind="accent" i={9} />
    </>
  );
}

/* Launch: one app at the center, reaching further with every ring. */
function Launch() {
  const c: Pt = [120, 70];
  const rings = [20, 38, 56];
  const nodes: [number, number][] = [
    [20, 210], [20, 30],
    [38, 300], [38, 150], [38, 60],
    [56, 0], [56, 110], [56, 200], [56, 250],
  ];
  return (
    <>
      {rings.map((r, i) => (
        <Ring key={r} at={c} r={r} i={i * 3} faint={i > 0} />
      ))}
      {nodes.map(([r, deg], i) => (
        <Node key={i} at={polar(c, r, deg)} r={r === 56 ? 3 : 4} i={i} />
      ))}
      <Node at={c} r={7} kind="accent" i={10} />
    </>
  );
}

const diagrams: Record<Phase["id"], () => React.ReactNode> = {
  vision: Vision,
  design: Design,
  build: Build,
  test: Test,
  ship: Ship,
  launch: Launch,
};

export function PhaseDiagram({ phase }: { phase: Phase["id"] }) {
  const Diagram = diagrams[phase];
  return (
    <svg
      viewBox="0 0 240 140"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className="h-auto w-full overflow-visible"
    >
      <Diagram />
    </svg>
  );
}
