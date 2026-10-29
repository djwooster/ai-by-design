"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ease } from "@/components/motion/tokens";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { NotesScreen, PhoneScreen, ReviewCard, Terminal, TimerScreen, timing } from "@/components/hero/screens";
import { cx } from "@/lib/cx";

/*
 * The hero: one surface that keeps changing shape. A Claude Code terminal
 * takes a prompt and streams its work, then the window morphs into the
 * iPhone running what it built, then back to the terminal for the next
 * feature, and finally into App Store review. It cycles while on screen,
 * pauses when scrolled away, and shows one still frame for reduced motion.
 * [TODO: match the prompts and file names to FocusMode's real build]
 */

type TerminalLine = { text: string; detail?: string; done?: boolean };
type Scene =
  | { kind: "terminal"; prompt: string; lines: TerminalLine[] }
  | { kind: "app"; screen: "timer" | "notes" }
  | { kind: "review" };

const scenes: Scene[] = [
  {
    kind: "terminal",
    prompt: "Build the focus timer screen from my design",
    lines: [
      { text: "Read design/focus-timer.png" },
      { text: "Write app/timer.tsx", detail: "+142" },
      { text: "Write components/SessionRing.tsx", detail: "+64" },
      { text: "Run on iPhone 16 Pro", done: true },
    ],
  },
  { kind: "app", screen: "timer" },
  {
    kind: "terminal",
    prompt: "Add voice notes to each session",
    lines: [
      { text: "Read app/timer.tsx" },
      { text: "Write lib/speech.ts", detail: "+88" },
      { text: "Write app/notes.tsx", detail: "+117" },
      { text: "Run on iPhone 16 Pro", done: true },
    ],
  },
  { kind: "app", screen: "notes" },
  {
    kind: "terminal",
    prompt: "Get it ready for the App Store",
    lines: [
      { text: "Generate screenshots", detail: "6.9″ 6.5″" },
      { text: "Write PrivacyInfo.xcprivacy", detail: "+31" },
      { text: "Archive FocusMode 1.0 (4)" },
      { text: "Upload to App Store Connect", done: true },
    ],
  },
  { kind: "review" },
];

function duration(scene: Scene) {
  if (scene.kind === "terminal") {
    return timing.morph + scene.prompt.length * timing.char + 300 + scene.lines.length * timing.line + 1300;
  }
  if (scene.kind === "app") return 4600;
  return 5200;
}

/** Each scene's surface, in stage pixels. */
const shells = {
  terminal: { width: 500, height: 330, borderRadius: 14 },
  app: { width: 280, height: 584, borderRadius: 48 },
  review: { width: 430, height: 352, borderRadius: 18 },
} as const;

const STAGE = { width: 560, height: 620 };

const stageOf = (scene: Scene) =>
  scene.kind === "terminal" ? 0 : scene.kind === "app" ? 1 : 2;
const stageLabels = ["Claude Code", "Your app", "App Store"];

export function BuildMorph({ className, maxHeight }: { className?: string; maxHeight?: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const scale = useStageScale(frame, maxHeight);

  const scene = reduced ? scenes[1] : scenes[index];

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % scenes.length), duration(scenes[index]));
    return () => clearTimeout(id);
  }, [index, inView, reduced]);

  return (
    <div className={className}>
      <div ref={frame} className="relative w-full" style={{ height: STAGE.height * (scale ?? 1) }}>
        <div
          className={cx("absolute top-0 left-1/2 origin-top", scale === null && "opacity-0")}
          style={{ width: STAGE.width, height: STAGE.height, transform: `translateX(-50%) scale(${scale ?? 1})` }}
        >
          <div className="flex size-full items-center justify-center">
            <motion.div
              initial={false}
              animate={shells[scene.kind]}
              transition={{ type: "spring", bounce: 0, duration: timing.morph / 1000 }}
              className={cx(
                "relative overflow-hidden border transition-colors duration-500",
                scene.kind === "app" ? "border-line-strong bg-canvas" : "border-line bg-surface",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={reduced ? "still" : index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transition: { delay: 0.28, duration: 0.4, ease: ease.glide } }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.18 } }}
                >
                  <SceneContent scene={scene} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <ol className="mt-6 flex justify-center gap-6" aria-label="What's happening">
        {stageLabels.map((label, i) => (
          <li
            key={label}
            aria-current={stageOf(scene) === i ? "step" : undefined}
            className={cx(
              "flex items-center gap-2 font-mono text-label uppercase transition-colors duration-300",
              stageOf(scene) === i ? "text-fg" : "text-fg-muted",
            )}
          >
            <span
              aria-hidden
              className={cx(
                "size-1.5 rounded-full transition-colors duration-300",
                stageOf(scene) === i ? "bg-accent" : "bg-line-strong",
              )}
            />
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}

function SceneContent({ scene }: { scene: Scene }) {
  if (scene.kind === "terminal") return <Terminal prompt={scene.prompt} lines={scene.lines} />;
  if (scene.kind === "review") return <ReviewCard />;
  return <PhoneScreen>{scene.screen === "timer" ? <TimerScreen /> : <NotesScreen />}</PhoneScreen>;
}

/** Scales the fixed-size stage down to fit its column (and `maxHeight`, if set). Null until measured. */
function useStageScale(ref: React.RefObject<HTMLDivElement | null>, maxHeight?: number) {
  const [scale, setScale] = useState<number | null>(null);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () =>
      setScale(Math.min(1, node.clientWidth / STAGE.width, maxHeight ? maxHeight / STAGE.height : 1));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, maxHeight]);
  return scale;
}
