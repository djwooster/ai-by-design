import { cx } from "@/lib/cx";

/*
 * Spot illustrations: single-weight line drawings with a few solid details,
 * in the spirit of references/09 and 10. Illustrative rather than literal,
 * one idea each. They draw in `currentColor`, and their opaque areas fill
 * with the card's own background, so they work on light and dark cards alike.
 * All on a 160×120 canvas. A few parts move on hover when the card around
 * them is a `group` (the Live cards): dots type, the lens sweeps, faces bob.
 */

const paper = "fill-canvas";
const ink = "fill-current";

function star(cx: number, cy: number, r: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(a)).toFixed(1)},${(cy + radius * Math.sin(a)).toFixed(1)}`);
  }
  return points.join(" ");
}

function Face({ cx, cy, r = 13 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className={paper} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.15} r={1.3} className={ink} stroke="none" />
      <circle cx={cx + r * 0.35} cy={cy - r * 0.15} r={1.3} className={ink} stroke="none" />
      <path d={`M${cx - r * 0.4} ${cy + r * 0.25} Q${cx} ${cy + r * 0.6} ${cx + r * 0.4} ${cy + r * 0.25}`} />
    </g>
  );
}

function Sparkle({ x, y, s = 6 }: { x: number; y: number; s?: number }) {
  return <path d={`M${x} ${y - s}V${y + s}M${x - s} ${y}H${x + s}`} />;
}

const drawings = {
  /* Why now */
  "learn-code": (
    <>
      <path d="M80 38C66 32 46 32 30 36V92C46 88 66 88 80 94Z" className={paper} />
      <path d="M80 38C94 32 114 32 130 36V92C114 88 94 88 80 94Z" className={paper} />
      <path d="M80 38V94" />
      <polyline points="46,56 40,62 46,68" />
      <path d="M53 70L59 54" />
      <polyline points="66,56 72,62 66,68" />
      <path d="M90 52H120M90 60H116M90 68H120M90 76H108" />
      <circle cx="136" cy="24" r="10" className={paper} />
      <path d="M136 18V24L140 27" />
    </>
  ),
  "hire-dev": (
    <>
      <path d="M46 20H92L104 32V100H46Z" className={paper} />
      <path d="M92 20V32H104" />
      <circle cx="75" cy="44" r="10" />
      <path d="M79 40C77 37.5 71 37.5 71 41.5C71 45.5 79 43 79 47.5C79 51 72.5 51.5 70.5 48.5M75 35.5V52.5" />
      <path d="M56 64H94M56 72H86M56 80H94" />
      <path d="M72 91H94" strokeWidth={3} />
      <ellipse cx="128" cy="98" rx="15" ry="5.5" className={paper} />
      <ellipse cx="128" cy="91" rx="15" ry="5.5" className={paper} />
      <ellipse cx="128" cy="84" rx="15" ry="5.5" className={paper} />
      <ellipse cx="128" cy="77" rx="15" ry="5.5" className={paper} />
    </>
  ),
  "claude-code": (
    <>
      <rect x="14" y="30" width="80" height="58" rx="5" className={paper} />
      <path d="M14 40H94" />
      <circle cx="21" cy="35" r="1.6" className={ink} stroke="none" />
      <circle cx="27" cy="35" r="1.6" className={ink} stroke="none" />
      <circle cx="33" cy="35" r="1.6" className={ink} stroke="none" />
      <polyline points="22,52 27,56 22,60" />
      <path d="M32 60H40" strokeWidth={2.5} />
      <path d="M22 70H70M22 78H56" />
      <path d="M99 59H113M107 53L113 59L107 65" />
      <rect x="118" y="20" width="32" height="64" rx="7" className={paper} />
      <path d="M129 26H139" />
      <circle cx="134" cy="50" r="9" />
      <path d="M134 41A9 9 0 0 1 143 50" strokeWidth={3} />
      <path d="M126 70H142" />
      <Sparkle x={14} y={18} s={5} />
    </>
  ),

  /* The Method */
  vision: (
    <>
      <rect x="40" y="20" width="64" height="82" rx="4" className={paper} />
      {[32, 46, 60, 74, 88].map((y) => (
        <circle key={y} cx="40" cy={y} r="3" className={paper} />
      ))}
      <rect x="54" y="32" width="22" height="40" rx="4" />
      <path d="M59 40H71M59 47H67M60 64H70" />
      <path d="M84 38H96M84 46H93M84 54H96" />
      <path d="M90 92L126 56L132 62L96 98Z" className={paper} />
      <path d="M90 92L86 102L96 98" className={paper} />
      <path d="M120 62L126 68" />
      <Sparkle x={128} y={28} s={7} />
    </>
  ),
  design: (
    <>
      <rect x="54" y="10" width="50" height="100" rx="9" className={paper} />
      <path d="M71 18H87" />
      <rect x="62" y="28" width="34" height="24" rx="3" />
      <path d="M62 28L96 52M96 28L62 52" strokeOpacity={0.5} />
      <rect x="58" y="24" width="42" height="32" rx="2" strokeDasharray="3 3" />
      <path d="M62 64H96M62 72H86" />
      <rect x="62" y="84" width="34" height="11" rx="5.5" className={ink} />
      <path d="M110 70V94L116 88L121 98L126 96L121 86H130Z" className={paper} />
    </>
  ),
  build: (
    <>
      <rect x="34" y="20" width="92" height="62" rx="5" className={paper} />
      <path d="M24 92H136L128 82H32Z" className={paper} />
      <path d="M45 34L40 39L45 44" />
      <path d="M52 39H76M56 50H96M56 58H86M56 66H102M48 74H68" />
      <Sparkle x={124} y={14} s={7} />
      <path d="M134 26L140 22" />
    </>
  ),
  test: (
    <>
      <rect x="32" y="26" width="40" height="76" rx="8" className={paper} />
      <rect x="86" y="16" width="40" height="76" rx="8" className={paper} />
      <path d="M46 32H58M100 22H112" />
      <circle cx="52" cy="62" r="11" />
      <polyline points="46.5,62 50.5,66 58,57.5" />
      <circle cx="106" cy="52" r="11" className={ink} />
      <polyline points="100.5,52 104.5,56 112,47.5" className="stroke-canvas" />
      <path d="M134 40Q140 48 134 56M140 34Q149 48 140 62" />
    </>
  ),
  ship: (
    <>
      <path d="M46 58L60 46H112L98 58Z" className={paper} />
      <path d="M98 58L112 46V86L98 98Z" className={paper} />
      <rect x="46" y="58" width="52" height="40" className={paper} />
      <path d="M72 58V72" strokeWidth={3} />
      <path d="M79 40V8M70 17L79 8L88 17" />
      <path d="M64 36V24M94 36V24" strokeDasharray="2 4" />
    </>
  ),
  launch: (
    <>
      <rect x="52" y="22" width="56" height="56" rx="15" className={paper} />
      <path d="M69 66L80 38L91 66M73 57H87" strokeWidth={2.5} />
      {[56, 68, 80, 92, 104].map((x) => (
        <polygon key={x} points={star(x, 96, 5)} className={ink} stroke="none" />
      ))}
      <path d="M38 28L45 33M122 22L115 29M124 50H133M28 56H37" />
      <circle cx="124" cy="74" r="2.5" />
      <circle cx="36" cy="78" r="2.5" />
    </>
  ),

  /* Live calls and community */
  qa: (
    <>
      <path d="M38 26H86A14 14 0 0 1 100 40V56A14 14 0 0 1 86 70H58L42 84L46 70H38A14 14 0 0 1 24 56V40A14 14 0 0 1 38 26Z" className={paper} />
      <path d="M55 42C55 35.5 68 35.5 68 43C68 48.5 61.5 48 61.5 54" />
      <circle cx="61.5" cy="60" r="1.6" className={ink} stroke="none" />
      <path d="M88 54H124A14 14 0 0 1 138 68V78A14 14 0 0 1 124 92H120L124 104L110 92H88A14 14 0 0 1 74 78V68A14 14 0 0 1 88 54Z" className={paper} />
      {[94, 106, 118].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="73"
          r="2.6"
          stroke="none"
          className={cx(ink, "[transform-box:fill-box] group-hover:animate-typing")}
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </>
  ),
  review: (
    <>
      <rect x="38" y="12" width="48" height="96" rx="9" className={paper} />
      <path d="M54 20H70" />
      <rect x="46" y="30" width="32" height="20" rx="3" />
      <path d="M46 58H78M46 66H70M46 74H78" />
      <g className="group-hover:animate-sweep">
        <circle cx="98" cy="64" r="20" className={paper} />
        <circle cx="98" cy="64" r="14" strokeOpacity={0.4} />
        <path d="M90 60H106M90 68H101" />
        <path d="M112 79L130 97" strokeWidth={5} />
      </g>
      <circle cx="52" cy="40" r="4.5" className={ink} stroke="none" />
    </>
  ),
  "live-build": (
    <>
      <rect x="26" y="18" width="108" height="68" rx="6" className={paper} />
      <path d="M72 86L68 100H92L88 86M56 100H104" />
      <g className="origin-center [transform-box:fill-box] group-hover:animate-nudge">
        <circle cx="80" cy="52" r="16" className={paper} />
        <path d="M75 44L89 52L75 60Z" className={ink} />
      </g>
      <circle cx="40" cy="31" r="3.5" className={ink} stroke="none" />
      <path d="M140 20Q146 28 140 36M146 14Q155 28 146 42" />
    </>
  ),
  community: (
    <>
      <circle cx="40" cy="74" r="12" strokeDasharray="3 4" />
      <circle cx="122" cy="34" r="10" strokeDasharray="3 4" />
      {(
        [
          [64, 50, 15],
          [96, 44, 13],
          [104, 76, 15],
          [72, 84, 13],
        ] as const
      ).map(([x, y, r], i) => (
        <g key={i} className="group-hover:animate-bob" style={{ animationDelay: `${i * 120}ms` }}>
          <Face cx={x} cy={y} r={r} />
        </g>
      ))}
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type SpotName = keyof typeof drawings;

export function Spot({ name, className }: { name: SpotName; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("h-auto w-full", className)}
    >
      {drawings[name]}
    </svg>
  );
}
