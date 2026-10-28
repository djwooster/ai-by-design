import { cx } from "@/lib/cx";

export type BadgeTone = "neutral" | "accent" | "positive" | "warning" | "negative";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line-strong text-fg-secondary",
  accent: "border-accent/40 text-accent",
  positive: "border-positive/40 text-positive",
  warning: "border-warning/40 text-warning",
  negative: "border-negative/40 text-negative",
};

/** Tiny status pill in mono caps, with an optional state dot. */
export function Badge({
  tone = "neutral",
  dot,
  className,
  children,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex h-5 items-center gap-1.5 rounded-full border px-2 font-mono text-[10px] uppercase leading-none tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
