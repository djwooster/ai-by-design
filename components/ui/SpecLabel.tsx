import { cx } from "@/lib/cx";

/** Spec-sheet label: 11px mono, uppercase, tracked. Pass parts to join them with " · ". */
export function SpecLabel({
  parts,
  children,
  className,
  as: Tag = "p",
}: {
  parts?: (string | number)[];
  children?: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "dt";
}) {
  return (
    <Tag className={cx("font-mono text-label uppercase text-fg-muted", className)}>
      {parts ? parts.join(" · ") : children}
    </Tag>
  );
}
