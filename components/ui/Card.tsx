import { cx } from "@/lib/cx";

/** Surface, 1px hairline border, rounded-lg, no shadow. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("rounded-lg border border-line bg-surface p-5", className)}>{children}</div>
  );
}
