import { cx } from "@/lib/cx";

/** The small rounded badge that sits above a headline. */
export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex h-7 items-center gap-2 rounded-full border border-line bg-surface px-3 text-ui-sm text-fg-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
