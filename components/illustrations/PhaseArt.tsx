"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import type { Phase } from "@/lib/content/method";

/*
 * Bold object illustrations for the six Method cards, after Alfred's feature
 * cards and the chunky app icons in DJ's references: heavy single-weight
 * strokes, a solid black layer for depth, and one blue detail. Opaque areas
 * fill with the card's own background, so they also work on the blue card.
 *
 * Each drawing is built from depth layers that assemble in order when the
 * card scrolls into view (they inherit the card's hidden/shown variants):
 * the shadow, then the object, then the blue detail on top.
 */

function Layer({ depth, children }: { depth: number; children: React.ReactNode }) {
  return (
    <motion.g
      variants={{
        hidden: { opacity: 0, y: 10 + depth * 6 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.glide, delay: 0.15 + depth * 0.12 } },
      }}
    >
      {children}
    </motion.g>
  );
}

const paper = "fill-canvas";
const solid = "fill-current";
const blue = "fill-(--blue)";
const blueLine = "stroke-(--blue)";

/** An isometric keycap or slab: top rhombus plus two side faces. */
function IsoSlab({ cx, cy, w = 40, h = 22, t = 10, sides = paper, top = paper }: { cx: number; cy: number; w?: number; h?: number; t?: number; sides?: string; top?: string }) {
  return (
    <g>
      <path d={`M${cx - w} ${cy}L${cx} ${cy + h}V${cy + h + t}L${cx - w} ${cy + t}Z`} className={sides} />
      <path d={`M${cx} ${cy + h}L${cx + w} ${cy}V${cy + t}L${cx} ${cy + h + t}Z`} className={sides === paper ? solid : sides} />
      <path d={`M${cx - w} ${cy}L${cx} ${cy - h}L${cx + w} ${cy}L${cx} ${cy + h}Z`} className={top} />
    </g>
  );
}

/** Text laid flat on an isometric top face, reading up and to the right. */
function IsoLabel({ cx, cy, children, className }: { cx: number; cy: number; children: string; className?: string }) {
  return (
    <text
      transform={`translate(${cx} ${cy}) matrix(0.876 -0.48 0.876 0.48 0 0)`}
      textAnchor="middle"
      dominantBaseline="central"
      stroke="none"
      className={className}
      style={{ font: "600 15px var(--font-geist-mono), monospace" }}
    >
      {children}
    </text>
  );
}

function Vision() {
  return (
    <>
      <Layer depth={0}>
        <rect x="74" y="22" width="92" height="68" rx="12" className={solid} />
      </Layer>
      <Layer depth={1}>
        <rect x="58" y="38" width="92" height="68" rx="12" className={paper} />
      </Layer>
      <Layer depth={2}>
        <rect x="42" y="54" width="92" height="68" rx="12" className={paper} />
        <path d="M100 76H120M100 88H114M58 106H120" />
      </Layer>
      <Layer depth={3}>
        <path d="M72 70L76 82L88 86L76 90L72 102L68 90L56 86L68 82Z" className={blue} strokeWidth={3} />
      </Layer>
    </>
  );
}

function Design() {
  return (
    <>
      <Layer depth={0}>
        <rect x="86" y="20" width="60" height="114" rx="16" transform="rotate(14 116 77)" className={solid} />
      </Layer>
      <Layer depth={1}>
        <rect x="56" y="22" width="60" height="114" rx="16" className={paper} />
        <rect x="65" y="36" width="42" height="86" rx="8" strokeOpacity={0.35} />
      </Layer>
      <Layer depth={2}>
        <rect x="72" y="44" width="28" height="22" rx="5" className={blue} />
        <path d="M73 78H99M73 89H92" />
        <rect x="72" y="102" width="28" height="10" rx="5" className={solid} />
      </Layer>
    </>
  );
}

function Build() {
  return (
    <>
      <Layer depth={0}>
        <IsoSlab cx={100} cy={112} sides={solid} top={solid} />
      </Layer>
      <Layer depth={1}>
        <IsoSlab cx={100} cy={88} />
        <IsoLabel cx={100} cy={88} className="fill-current">⌘</IsoLabel>
      </Layer>
      <Layer depth={2}>
        <IsoSlab cx={100} cy={62} />
        <IsoLabel cx={100} cy={62} className={blue}>{">_"}</IsoLabel>
      </Layer>
    </>
  );
}

function Test() {
  return (
    <>
      <Layer depth={0}>
        <rect x="76" y="26" width="62" height="112" rx="16" className={solid} />
      </Layer>
      <Layer depth={1}>
        <rect x="64" y="16" width="62" height="112" rx="16" className={paper} />
        {[44, 66, 88].map((y, i) => (
          <g key={y}>
            <circle cx="82" cy={y} r="6" className={i < 2 ? solid : paper} />
            <path d={`M96 ${y}H${i === 1 ? 108 : 114}`} />
          </g>
        ))}
      </Layer>
      <Layer depth={2}>
        <circle cx="128" cy="112" r="21" className={blue} />
        <path d="M118 112L125 119L139 104" className="stroke-canvas" strokeWidth={5} />
      </Layer>
    </>
  );
}

function Ship() {
  return (
    <>
      <Layer depth={0}>
        <path d="M60 98L100 120V148L60 126Z" className={paper} />
        <path d="M100 120L140 98V126L100 148Z" className={solid} />
        <path d="M60 98L100 76L140 98L100 120Z" className={paper} />
        <path d="M80 87L120 109" />
      </Layer>
      <Layer depth={1}>
        <path d="M78 64V48M122 64V48" strokeDasharray="2 7" />
      </Layer>
      <Layer depth={2}>
        <path d="M100 70V16M84 32L100 16L116 32" className={blueLine} strokeWidth={6} />
      </Layer>
    </>
  );
}

function Launch() {
  return (
    <>
      <Layer depth={0}>
        <rect x="134" y="24" width="34" height="34" rx="11" className={solid} />
        <rect x="134" y="68" width="34" height="34" rx="11" className={paper} />
        <circle cx="151" cy="85" r="7" />
        <circle cx="146" cy="116" r="4" className={solid} />
        <rect x="156" y="111" width="11" height="11" rx="3" className={paper} />
      </Layer>
      <Layer depth={1}>
        <rect x="38" y="24" width="88" height="88" rx="24" className={blue} />
      </Layer>
      <Layer depth={2}>
        <circle cx="82" cy="68" r="22" className="stroke-canvas" strokeWidth={8} />
      </Layer>
    </>
  );
}

const art: Record<Phase["id"], () => React.ReactNode> = {
  vision: Vision,
  design: Design,
  build: Build,
  test: Test,
  ship: Ship,
  launch: Launch,
};

export function PhaseArt({ phase }: { phase: Phase["id"] }) {
  const Drawing = art[phase];
  return (
    <svg
      viewBox="0 0 200 160"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-auto w-full overflow-visible"
    >
      <Drawing />
    </svg>
  );
}
