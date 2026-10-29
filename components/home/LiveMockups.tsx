"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/tokens";
import { cx } from "@/lib/cx";

/*
 * Small, realistic interface vignettes for the live-calls cards: a call, an
 * app review, a live build and the Skool community. Their parts settle in
 * when the card scrolls into view (they inherit the parent's variants).
 * [TODO: swap in real screens from the calls and Skool once they exist]
 */

const part = (delay: number) => ({
  variants: {
    hidden: { opacity: 0, y: 8 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.glide, delay } },
  },
});

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CallMockup() {
  // Only DJ is named; the other seats stay generic so nothing reads as a real member.
  const tiles = ["DJ", "", "", ""];
  return (
    <Frame>
      <div className="w-full rounded-lg border border-line bg-canvas p-2.5">
        <div className="grid grid-cols-2 gap-1.5">
          {tiles.map((initials, i) => (
            <motion.div
              key={i}
              {...part(0.05 * i)}
              className={cx(
                "flex aspect-video items-center justify-center rounded-md bg-surface",
                i === 0 && "ring-1 ring-accent-fg/60",
              )}
            >
              <span className="flex size-7 items-center justify-center rounded-full border border-line-strong text-[10px] text-fg-secondary">
                {initials || <span className="size-2.5 rounded-full bg-line-strong" />}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div {...part(0.3)} className="mt-2 rounded-md bg-surface px-2.5 py-2 text-[11px] text-fg-secondary">
          <span className="text-fg">Q:</span> How do I set up TestFlight for my first build?
        </motion.div>
      </div>
      <motion.span
        {...part(0.4)}
        className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase text-fg-secondary"
      >
        <span className="size-1.5 rounded-full bg-positive" /> Live
      </motion.span>
    </Frame>
  );
}

export function ReviewMockup() {
  const pins = [
    { top: "28%", left: "62%", n: 1 },
    { top: "58%", left: "30%", n: 2 },
  ];
  return (
    <Frame className="gap-4">
      <div className="relative h-full w-[42%] rounded-[18px] border border-line-strong bg-canvas p-2">
        <div className="space-y-1.5 pt-3">
          <div className="mx-auto h-2 w-1/2 rounded-full bg-surface" />
          <div className="mx-auto mt-3 size-14 rounded-full border border-line-strong" />
          <div className="mx-auto h-1.5 w-2/3 rounded-full bg-surface" />
          <div className="mx-auto h-1.5 w-1/2 rounded-full bg-surface" />
          <div className="mx-auto mt-3 h-5 w-3/4 rounded-full bg-surface" />
        </div>
        {pins.map((pin, i) => (
          <motion.span
            key={pin.n}
            {...part(0.2 + i * 0.12)}
            className="absolute flex size-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-on-accent"
            style={{ top: pin.top, left: pin.left }}
          >
            {pin.n}
          </motion.span>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        {["Tap targets under 44pt", "Ring contrast is too low in dark mode"].map((note, i) => (
          <motion.div
            key={note}
            {...part(0.35 + i * 0.1)}
            className="rounded-md border border-line bg-canvas px-2.5 py-2 text-[11px] text-fg-secondary"
          >
            <span className="mr-1.5 font-mono text-accent-fg">{i + 1}</span>
            {note}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function BuildMockup() {
  const lines = [
    { mark: "⏺", text: "Write app/paywall.tsx", tone: "text-fg-secondary" },
    { mark: "⏺", text: "Edit lib/purchases.ts", tone: "text-fg-secondary" },
    { mark: "✓", text: "Build succeeded", tone: "text-fg" },
  ];
  return (
    <Frame>
      <div className="w-full rounded-lg border border-line bg-canvas font-mono text-[11px]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full border border-line-strong" />
          ))}
          <span className="ml-2 text-fg-muted">claude · live build</span>
        </div>
        <div className="space-y-1 px-3 py-2.5">
          <motion.p {...part(0)} className="text-fg">
            <span className="text-fg-muted">&gt; </span>Add the Pro paywall
          </motion.p>
          {lines.map((line, i) => (
            <motion.p key={line.text} {...part(0.15 + i * 0.1)} className={line.tone}>
              <span className={line.mark === "✓" ? "text-positive" : "text-accent-fg"}>{line.mark}</span> {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function CommunityMockup() {
  // DJ's own posts only: no invented members, replies or counts.
  const posts = [
    { who: "DJ", text: "Thursday's live build: the Pro paywall", meta: "Event" },
    { who: "DJ", text: "Recording: App review #1 is up", meta: "Video" },
    { who: "DJ", text: "Share where you are in the Method this week", meta: "Thread" },
  ];
  return (
    <Frame>
      <div className="w-full space-y-1.5">
        {posts.map((post, i) => (
          <motion.div
            key={post.text}
            {...part(0.08 * i)}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-canvas px-2.5 py-2"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-[9px] text-fg-secondary">
              {post.who}
            </span>
            <span className="flex-1 truncate text-[11px] text-fg-secondary">{post.text}</span>
            <span className="shrink-0 font-mono text-[9px] text-fg-muted">{post.meta}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}
