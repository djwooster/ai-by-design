import { cx } from "@/lib/cx";

/** A small registration mark (+) for grid intersections. Centered on its anchor point. */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 11 11"
      className={cx("pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-line-strong", className)}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
