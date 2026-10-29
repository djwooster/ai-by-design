"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import type { Phase } from "@/lib/content/method";

/*
 * One thin-line isometric drawing per Method phase, each on the same platform,
 * the platform a step higher every phase. Drawn in world units (x right-back,
 * y left-back, z up) and projected to a 240×190 view. Faces fill with the card
 * color so nearer shapes hide farther edges. The object on each platform
 * settles into place when the card scrolls into view; one detail per drawing
 * is in the accent. Adapted from the IsoSteps set on djwooster.com.
 */

type P = [number, number, number];

const OX = 120;
const OY = 118;
const iso = ([x, y, z]: P): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z];
const pts = (list: P[]) => list.map((p) => iso(p).map((n) => n.toFixed(1)).join(",")).join(" ");
const seg = (a: P, b: P) => {
  const [x1, y1] = iso(a);
  const [x2, y2] = iso(b);
  return { x1, y1, x2, y2 };
};

const STROKE = { stroke: "currentColor", strokeWidth: 1, strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" } as const;
const GUIDE = { stroke: "currentColor", strokeWidth: 1, strokeDasharray: "1 3", vectorEffect: "non-scaling-stroke" } as const;

function Box({ x, y, z, w, d, h, className = "fill-surface" }: { x: number; y: number; z: number; w: number; d: number; h: number; className?: string }) {
  const [x2, y2, z2] = [x + w, y + d, z + h];
  return (
    <g className={className}>
      <polygon points={pts([[x2, y, z], [x2, y2, z], [x2, y2, z2], [x2, y, z2]])} {...STROKE} />
      <polygon points={pts([[x, y2, z], [x2, y2, z], [x2, y2, z2], [x, y2, z2]])} {...STROKE} />
      <polygon points={pts([[x, y, z2], [x2, y, z2], [x2, y2, z2], [x, y2, z2]])} {...STROKE} />
    </g>
  );
}

const S = 50;

function Platform({ h }: { h: number }) {
  return (
    <g>
      <g className="text-line-strong">
        {(
          [
            [[S, -S, 0], [S + 22, -S, 0]],
            [[S, -S, 0], [S, -S - 22, 0]],
            [[-S, S, 0], [-S - 22, S, 0]],
            [[-S, S, 0], [-S, S + 22, 0]],
          ] as [P, P][]
        ).map(([a, b], i) => (
          <line key={i} {...seg(a, b)} {...GUIDE} />
        ))}
      </g>
      <Box x={-S} y={-S} z={0} w={S * 2} d={S * 2} h={h} />
      <polygon
        points={pts([[-S + 6, -S + 6, h], [S - 6, -S + 6, h], [S - 6, S - 6, h], [-S + 6, S - 6, h]])}
        {...STROKE}
        fill="none"
        className="text-line-strong"
      />
    </g>
  );
}

/* Each object sits on a platform whose top is at z = h. */

function Vision({ h }: { h: number }) {
  // A stack of notes with a pencil across it, and a pin marking the idea.
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Box key={i} x={-28 + i * 2} y={-32 - i * 3} z={h + i * 3} w={52} d={60} h={2} />
      ))}
      {[0, 10, 20, 30].map((d, i) => (
        <line key={d} {...seg([-18, -28 + d, h + 8], [i === 3 ? 4 : 18, -28 + d, h + 8])} {...STROKE} strokeLinecap="round" />
      ))}
      <line {...seg([24, 24, h], [24, 24, h + 46])} {...STROKE} className="text-accent-fg" />
      <circle cx={iso([24, 24, h + 50])[0]} cy={iso([24, 24, h + 50])[1]} r="4" {...STROKE} className="fill-surface text-accent-fg" />
    </>
  );
}

function Design({ h }: { h: number }) {
  // A phone lying flat with a wireframe on its screen.
  const [x0, y0, w, d] = [-22, -40, 44, 80];
  const top = h + 5;
  const rect = (x: number, y: number, rw: number, rd: number) =>
    pts([[x, y, top], [x + rw, y, top], [x + rw, y + rd, top], [x, y + rd, top]]);
  return (
    <>
      <Box x={x0} y={y0} z={h} w={w} d={d} h={5} />
      <polygon points={rect(x0 + 4, y0 + 4, w - 8, d - 8)} {...STROKE} fill="none" />
      <polygon points={rect(-14, -26, 28, 20)} {...STROKE} fill="none" className="text-accent-fg" />
      <polygon points={rect(-14, 0, 28, 7)} {...STROKE} fill="none" />
      <polygon points={rect(-14, 11, 28, 7)} {...STROKE} fill="none" />
      <polygon points={rect(-14, 25, 28, 6)} {...STROKE} className="fill-current" />
    </>
  );
}

function Build({ h }: { h: number }) {
  // A terminal window standing on the platform, mid-prompt.
  const y = 6;
  const [x0, x1, z0, z1] = [-38, 38, h, h + 60];
  const plane = (x: number, z: number): P => [x, y, z];
  return (
    <>
      <Box x={x0} y={y - 4} z={z0} w={x1 - x0} d={4} h={z1 - z0} />
      <line {...seg(plane(x0, z1 - 10), plane(x1, z1 - 10))} {...STROKE} />
      <polyline points={pts([plane(x0 + 7, z1 - 17), plane(x0 + 12, z1 - 21), plane(x0 + 7, z1 - 25)])} {...STROKE} fill="none" className="text-accent-fg" />
      <line {...seg(plane(x0 + 16, z1 - 25), plane(x0 + 24, z1 - 25))} {...STROKE} strokeWidth={2} className="text-accent-fg" />
      {[33, 41, 49].map((d, i) => (
        <line key={d} {...seg(plane(x0 + 7, z1 - d), plane(x1 - 8 - i * 14, z1 - d))} {...STROKE} strokeLinecap="round" />
      ))}
    </>
  );
}

function Test({ h }: { h: number }) {
  // Two phones standing, one with a check above it: real devices, passing.
  const phone = (x: number) => <Box x={x} y={-6} z={h} w={24} d={4} h={48} />;
  const [cx, cy] = iso([22, -4, h + 64]);
  return (
    <>
      {phone(-30)}
      {phone(8)}
      <circle cx={cx} cy={cy} r="8" {...STROKE} className="fill-surface text-accent-fg" />
      <polyline points={`${cx - 3.5},${cy} ${cx - 1},${cy + 2.5} ${cx + 4},${cy - 2.5}`} {...STROKE} fill="none" className="text-accent-fg" />
    </>
  );
}

function Ship({ h }: { h: number }) {
  // A package on the platform with an upload arrow rising out of it.
  return (
    <>
      <Box x={-24} y={-24} z={h} w={48} d={48} h={30} />
      <line {...seg([-24, 0, h + 30], [24, 0, h + 30])} {...STROKE} />
      <line {...seg([0, 0, h + 36], [0, 0, h + 72])} {...STROKE} className="text-accent-fg" />
      <polyline points={pts([[-7, 0, h + 62], [0, 0, h + 72], [7, 0, h + 62]])} {...STROKE} fill="none" className="text-accent-fg" />
    </>
  );
}

function Launch({ h }: { h: number }) {
  // The app icon standing on the top step, with its rating in front.
  const y = 0;
  const [x0, x1, z0, z1] = [-28, 28, h + 4, h + 60];
  const plane = (x: number, z: number): P => [x, y + 6, z];
  const r = 10;
  const outline: P[] = [];
  const corners: [number, number, number][] = [
    [x1 - r, z1 - r, 0],
    [x0 + r, z1 - r, Math.PI / 2],
    [x0 + r, z0 + r, Math.PI],
    [x1 - r, z0 + r, (3 * Math.PI) / 2],
  ];
  for (const [cx, cz, start] of corners) {
    for (let i = 0; i <= 6; i++) {
      const a = start + (i / 6) * (Math.PI / 2);
      outline.push(plane(cx + r * Math.cos(a), cz + r * Math.sin(a)));
    }
  }
  const back = outline.map(([x, , z]) => [x, y + 2, z] as P);
  return (
    <>
      <polygon points={pts(back)} {...STROKE} className="fill-surface" />
      <polygon points={pts(outline)} {...STROKE} className="fill-surface" />
      <line {...seg(plane(-11, z0 + 13), plane(0, z1 - 11))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-accent-fg" />
      <line {...seg(plane(0, z1 - 11), plane(11, z0 + 13))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-accent-fg" />
      <line {...seg(plane(-15, z0 + 21), plane(15, z0 + 21))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-accent-fg" />
      {[-24, -12, 0, 12, 24].map((x) => {
        const [cx, cy] = iso([x + 14, 30, h]);
        return <ellipse key={x} cx={cx} cy={cy} rx="2.4" ry="1.4" className="fill-current" />;
      })}
    </>
  );
}

const objects: Record<Phase["id"], (props: { h: number }) => React.ReactNode> = {
  vision: Vision,
  design: Design,
  build: Build,
  test: Test,
  ship: Ship,
  launch: Launch,
};

export function IsoPhase({ phase, step }: { phase: Phase["id"]; step: number }) {
  const h = 6 + step * 4;
  const Drawing = objects[phase];
  return (
    <svg viewBox="0 -10 240 200" aria-hidden className="h-auto w-full text-fg-muted">
      <Platform h={h} />
      <motion.g
        variants={{
          hidden: { opacity: 0, y: -14 },
          shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.glide, delay: 0.15 } },
        }}
      >
        <Drawing h={h} />
      </motion.g>
    </svg>
  );
}
