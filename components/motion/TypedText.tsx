"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { cx } from "@/lib/cx";

/*
 * Text typed out behind a cursor, like a terminal, then the cursor keeps
 * blinking at the end of the sentence. The untyped rest of the text is laid
 * out invisibly, so the paragraph holds its final shape and nothing reflows
 * while it types. Screen readers get the whole sentence at once. With reduced
 * motion the text is simply there, with a still cursor.
 */
export function TypedText({
  text,
  delay = 0,
  speed = 22,
  className,
}: {
  text: string;
  /** Seconds before typing starts. */
  delay?: number;
  /** Milliseconds per character. */
  speed?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const shown = reduced ? text.length : count;
  const done = shown >= text.length;

  useEffect(() => {
    if (reduced) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((n) => {
          if (n + 1 >= text.length && interval) clearInterval(interval);
          return Math.min(text.length, n + 1);
        });
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed, reduced]);

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden>
        {text.slice(0, shown)}
        <span
          className={cx(
            "relative -mr-[3px] ml-px inline-block h-[1.1em] w-[3px] translate-y-[0.18em] rounded-[1px] bg-accent-fg",
            done && !reduced && "animate-blink",
          )}
        />
        <span className="invisible">{text.slice(shown)}</span>
      </span>
    </p>
  );
}
