import { Spot, type SpotName } from "@/components/illustrations/Spot";
import { cx } from "@/lib/cx";

/**
 * A light card with a spot illustration on top and a title and short note
 * below (references/09 and 10). `blue` makes it the blue card; `tall`
 * centers the drawing and sets the text at the bottom, for cards in a row.
 */
export function IllustratedCard({
  spot,
  eyebrow,
  title,
  note,
  blue,
  tall,
  className,
}: {
  spot: SpotName;
  eyebrow?: string;
  title: string;
  note?: string;
  blue?: boolean;
  tall?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col rounded-2xl p-6",
        blue ? "theme-blue" : "theme-light",
        className,
      )}
    >
      <div className={cx("w-[70%] max-w-[200px] text-fg", tall && "mx-auto mb-auto pt-4 pb-8")}>
        <Spot name={spot} />
      </div>
      {eyebrow && <p className="mt-6 font-mono text-label uppercase text-fg-muted">{eyebrow}</p>}
      <h3 className={cx("text-heading font-semibold text-fg", eyebrow ? "mt-2" : "mt-6")}>{title}</h3>
      {note && <p className="mt-1.5 text-ui text-fg-secondary">{note}</p>}
    </div>
  );
}
