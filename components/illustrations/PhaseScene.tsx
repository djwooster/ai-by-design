import type { Phase } from "@/lib/content/method";
import { cx } from "@/lib/cx";

/*
 * A small, line-drawn piece of UI for each Method phase: the thing you're
 * holding when the phase is done. Hairlines, mono labels and one blue accent,
 * on a faint dashed grid. Inside a `group`, the object lifts a little on hover.
 * Decorative: the card's text says the same thing.
 */
export function PhaseScene({ phase, className }: { phase: Phase["id"]; className?: string }) {
  const Scene = scenes[phase];
  return (
    <div
      aria-hidden
      className={cx(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-line bg-canvas",
        "bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:24px_24px]",
        className,
      )}
    >
      <div className="w-[78%] transition-transform duration-500 ease-glide group-hover:-translate-y-1">
        <Scene />
      </div>
    </div>
  );
}

const frame = "rounded-md border border-line-strong bg-surface";
const label = "font-mono text-[9px] uppercase tracking-[0.12em] text-fg-muted";
const bar = "h-1.5 rounded-full bg-line-strong";

/** The one-page brief. */
function Vision() {
  return (
    <div className={cx(frame, "mx-auto max-w-[180px] px-4 py-4")}>
      <p className={label}>Brief · v1</p>
      <p className="mt-2 text-[12px] font-medium text-fg">A focus timer</p>
      <div className="mt-3 space-y-1.5">
        <div className={cx(bar, "w-full")} />
        <div className={cx(bar, "w-4/5")} />
      </div>
      <div className="mt-3 space-y-1.5 border-t border-line pt-3">
        {["For", "Scope", "Done when"].map((row, i) => (
          <div key={row} className="flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] text-fg-muted">{row}</span>
            <div className={cx(bar, i === 1 ? "w-10 bg-accent-fg/70" : "w-14")} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Three wireframed screens and the tokens beneath them. */
function Design() {
  return (
    <div>
      <div className="flex items-end justify-center gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cx(frame, "flex h-[104px] w-[54px] flex-col gap-1.5 rounded-[10px] p-2", i === 1 && "h-[116px] border-accent-fg/60")}>
            <div className={cx(bar, "w-3/5")} />
            <div className="flex-1 rounded-[4px] border border-dashed border-line-strong" />
            <div className={cx("h-2.5 rounded-[3px]", i === 1 ? "bg-accent-fg/70" : "bg-line-strong")} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {["bg-fg", "bg-fg-secondary", "bg-fg-muted", "bg-accent-fg"].map((tone) => (
          <span key={tone} className={cx("size-3 rounded-full border border-line-strong", tone)} />
        ))}
        <span className="ml-1.5 font-mono text-[9px] text-fg-muted">Aa 17/24</span>
      </div>
    </div>
  );
}

/** Claude Code building a screen. */
function Build() {
  const lines: [string, string][] = [
    ["›", "Build the timer screen from the design"],
    ["", "Reading tokens.ts"],
    ["+", "TimerView.tsx"],
    ["+", "useTimer.ts"],
    ["✓", "Builds. Running on iPhone."],
  ];
  return (
    <div className={cx(frame, "overflow-hidden")}>
      <div className="flex h-6 items-center gap-1 border-b border-line px-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-line-strong" />
        ))}
        <span className="ml-2 font-mono text-[9px] text-fg-muted">Claude Code</span>
      </div>
      <div className="space-y-1 px-3 py-3 font-mono text-[10px] leading-snug">
        {lines.map(([mark, text]) => (
          <p key={text} className="flex gap-2">
            <span className={cx("w-2", mark === "✓" ? "text-positive" : mark === "›" ? "text-accent-fg" : "text-fg-muted")}>{mark}</span>
            <span className={mark === "›" ? "text-fg" : "text-fg-secondary"}>{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

/** A TestFlight build out to testers. */
function Test() {
  return (
    <div className={cx(frame, "px-3.5 py-3")}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-fg">Build 12</p>
        <span className="rounded-full border border-accent-fg/50 px-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-fg">TestFlight</span>
      </div>
      <div className="mt-3 divide-y divide-line">
        {[
          ["Your iPhone", "Installed"],
          ["Tester 1", "Installed"],
          ["Tester 2", "Feedback"],
        ].map(([who, state]) => (
          <div key={who} className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-2 text-[10px] text-fg-secondary">
              <span className="size-3.5 rounded-full border border-line-strong" />
              {who}
            </span>
            <span className={cx("font-mono text-[9px]", state === "Feedback" ? "text-accent-fg" : "text-fg-muted")}>{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The submission, waiting in review. */
function Ship() {
  const steps = ["Prepared for submission", "Waiting for review", "In review"];
  return (
    <div className={cx(frame, "px-3.5 py-3")}>
      <p className={label}>App Store Connect</p>
      <p className="mt-1.5 text-[11px] font-medium text-fg">Your app · 1.0</p>
      <ol className="mt-3">
        {steps.map((step, i) => (
          <li key={step} className="relative flex items-center gap-2.5 pb-2.5 last:pb-0">
            {i < steps.length - 1 && <span className="absolute top-2.5 left-[4px] h-full w-px bg-line-strong" />}
            <span className={cx("relative size-[9px] rounded-full border", i === steps.length - 1 ? "border-accent-fg bg-accent-fg" : "border-line-strong bg-fg-muted")} />
            <span className={cx("text-[10px]", i === steps.length - 1 ? "text-fg" : "text-fg-muted")}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The App Store listing, live. */
function Launch() {
  return (
    <div className={cx(frame, "px-3.5 py-3.5")}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-line-strong">
          <span className="size-4 rounded-full border-2 border-accent-fg" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-fg">Your app</p>
          <p className="text-[9px] text-fg-muted">Productivity</p>
        </div>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-on-accent">Get</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[9/16] rounded-[4px] border border-line-strong" />
        ))}
      </div>
    </div>
  );
}

const scenes: Record<Phase["id"], () => React.ReactNode> = {
  vision: Vision,
  design: Design,
  build: Build,
  test: Test,
  ship: Ship,
  launch: Launch,
};
