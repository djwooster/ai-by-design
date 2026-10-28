import { SpecLabel } from "@/components/ui/SpecLabel";
import { cx } from "@/lib/cx";

/** Stand-in for content that a later stage fills. Says what goes here and when. */
export function EmptyState({
  stage,
  title,
  children,
  className,
}: {
  stage: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("rounded-lg border border-dashed border-line-strong px-5 py-8 md:px-8", className)}>
      <SpecLabel parts={["Empty", stage]} />
      <p className="mt-3 text-heading text-fg">{title}</p>
      {children && <div className="mt-2 max-w-[40rem] text-ui text-fg-secondary">{children}</div>}
    </div>
  );
}
