"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { ease } from "@/components/motion/tokens";
import { FocusModeScreen } from "@/components/signature/FocusModeScreen";
import { focusModeStatus } from "@/lib/content/proof";
import { cx } from "@/lib/cx";

/** Hero timing, in ms, shared by the scene clock and the screens. */
export const timing = { char: 26, line: 360, morph: 700 };

/** Counts from 0 to `total`, one step every `every` ms, starting after `delay`. */
function useSteps(total: number, every: number, delay = 0) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setStep((s) => {
          if (s + 1 >= total && id) clearInterval(id);
          return Math.min(total, s + 1);
        });
      }, every);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [total, every, delay]);
  return step;
}

const rise = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: ease.glide },
};

/* ------------------------------------------------------------------ */
/* Claude Code                                                         */
/* ------------------------------------------------------------------ */

export function Terminal({
  prompt,
  lines,
}: {
  prompt: string;
  lines: { text: string; detail?: string; done?: boolean }[];
}) {
  const typed = useSteps(prompt.length, timing.char, timing.morph - 200);
  const typingDone = typed >= prompt.length;
  const shown = useSteps(lines.length, timing.line, timing.morph - 200 + prompt.length * timing.char + 300);

  return (
    <div className="flex size-full flex-col font-mono text-[12.5px] leading-[1.7]">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-line px-4">
        {[0, 1, 2].map((i) => (
          <span key={i} aria-hidden className="size-2.5 rounded-full border border-line-strong" />
        ))}
        <span className="ml-3 text-fg-muted">claude · focusmode</span>
      </div>

      <div className="flex-1 px-5 py-4">
        <div className="flex items-center gap-2 text-fg-muted">
          Claude Code
        </div>

        <div className="mt-3 rounded-md border border-line-strong px-3 py-2 text-fg">
          <span className="text-fg-muted">&gt; </span>
          {prompt.slice(0, typed)}
          {!typingDone && (
            <span aria-hidden className="ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-fg" />
          )}
        </div>

        <ul className="mt-4 space-y-1">
          {lines.slice(0, shown).map((line) => (
            <motion.li key={line.text} {...rise} className="flex items-baseline gap-2.5">
              <span className={line.done ? "text-positive" : "text-accent-fg"}>{line.done ? "✓" : "⏺"}</span>
              <span className={line.done ? "text-fg" : "text-fg-secondary"}>{line.text}</span>
              {line.detail && <span className="ml-auto text-fg-muted">{line.detail}</span>}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The iPhone                                                          */
/* ------------------------------------------------------------------ */

/** The phone's screen inside the morphing surface: status bar, Dynamic Island, home indicator. */
export function PhoneScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-col p-2">
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[40px] border border-line bg-surface">
        <div aria-hidden className="flex h-12 shrink-0 items-center justify-between px-7 font-mono text-ui-sm text-fg">
          <span>9:41</span>
          <span className="flex items-end gap-0.5">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-full bg-fg" style={{ height: h }} />
            ))}
          </span>
        </div>
        <span aria-hidden className="absolute top-3 left-1/2 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-canvas" />
        <div className="flex-1">{children}</div>
        <span aria-hidden className="mx-auto mb-2 block h-1 w-24 rounded-full bg-fg/80" />
      </div>
    </div>
  );
}

export function TimerScreen() {
  return <FocusModeScreen />;
}

const notes = [
  { time: "9:10", tag: "Deep work · 25 min", text: "Finished the onboarding flow. Next: the paywall copy." },
  { time: "8:30", tag: "Writing · 25 min", text: "Outlined the App Store description and keywords." },
];
const dictation = "Paywall copy feels long. Cut it to two lines tomorrow.".split(" ");

export function NotesScreen() {
  const words = useSteps(dictation.length, 140, 900);

  return (
    <div className="px-5 pt-3 pb-5">
      <div className="flex items-baseline justify-between">
        <span className="text-heading text-fg">Notes</span>
        <span className="font-mono text-label uppercase text-fg-muted">Today</span>
      </div>

      {/* The note being dictated right now */}
      <motion.div {...rise} className="mt-5 rounded-2xl border border-accent-fg/40 bg-canvas p-3.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-label uppercase text-accent-fg">
            <span className="size-1.5 rounded-full bg-accent-fg" /> Listening
          </span>
          <Waveform />
        </div>
        <p className="mt-2.5 min-h-[3em] text-ui text-fg">
          {dictation.slice(0, words).join(" ")}
          {words < dictation.length && <span className="text-fg-muted"> …</span>}
        </p>
      </motion.div>

      <ul className="mt-4 space-y-2.5">
        {notes.map((note, i) => (
          <motion.li
            key={note.time}
            {...rise}
            transition={{ ...rise.transition, delay: 0.12 + i * 0.06 }}
            className="rounded-2xl border border-line p-3.5"
          >
            <div className="flex justify-between font-mono text-label uppercase text-fg-muted">
              <span>{note.tag}</span>
              <span>{note.time}</span>
            </div>
            <p className="mt-2 text-ui text-fg-secondary">{note.text}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Voice level bars that settle into a resting shape: they move while dictation runs. */
function Waveform() {
  const bars = [6, 12, 9, 15, 8, 13, 7, 11, 5];
  return (
    <span aria-hidden className="flex h-4 items-center gap-[3px]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-accent-fg"
          initial={{ height: 3 }}
          animate={{ height: [3, h, h * 0.5, h * 0.9, 3 + h * 0.3] }}
          transition={{ duration: 2.4, delay: i * 0.05, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* App Store Connect                                                   */
/* ------------------------------------------------------------------ */

const reviewSteps = ["Prepare for Submission", "Waiting for Review", "In Review", "Ready for Distribution"];

/**
 * The build's review status. It stops at "In Review" until FocusMode's status
 * in lib/content/proof.ts is flipped to approved: never a claim ahead of Apple.
 */
export function ReviewCard() {
  const last = focusModeStatus === "approved" ? reviewSteps.length - 1 : 2;
  const step = useSteps(last, 900, 700);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-4 border-b border-line p-5">
        <span className="flex size-12 items-center justify-center rounded-[12px] border border-line-strong bg-canvas text-fg">
          <GeoIcon name="vision" size={26} />
        </span>
        <div>
          <p className="text-heading text-fg">FocusMode</p>
          <p className="font-mono text-ui-sm text-fg-muted">iOS App · Version 1.0 (4)</p>
        </div>
        <span className="ml-auto font-mono text-label uppercase text-fg-muted">App Store Connect</span>
      </div>

      <ol className="flex-1 p-3">
        {reviewSteps.slice(0, last + 1).map((label, i) => {
          const state = i < step ? "past" : i === step ? "now" : "next";
          return (
            <li
              key={label}
              className={cx(
                "flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-300",
                state === "now" && "bg-canvas",
              )}
            >
              <span
                className={cx(
                  "flex size-5 items-center justify-center rounded-full border transition-colors duration-300",
                  state === "past" && "border-positive text-positive",
                  state === "now" && "border-accent-fg text-accent-fg",
                  state === "next" && "border-line-strong",
                )}
              >
                {state === "past" && <GeoIcon name="check" size={12} />}
                {state === "now" && <span className="size-1.5 rounded-full bg-accent-fg" />}
              </span>
              <span className={cx("text-ui", state === "next" ? "text-fg-muted" : "text-fg")}>{label}</span>
              {state === "now" && (
                <motion.span {...rise} className="ml-auto font-mono text-label uppercase text-accent-fg">
                  Now
                </motion.span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
