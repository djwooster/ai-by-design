import { cx } from "@/lib/cx";

/** The Swiss section numeral: a huge, heavy number set in the grid. Decorative; the heading carries the meaning. */
export function Numeral({ value, className }: { value: string; className?: string }) {
  return (
    <p aria-hidden className={cx("font-sans text-numeral text-fg tabular-nums", className)}>
      {value}
    </p>
  );
}
