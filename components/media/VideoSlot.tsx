import { cx } from "@/lib/cx";

/**
 * Where a video goes. Until it exists, the slot shows a poster (any children,
 * like the build animation) with the play pill over it. [TODO: video]
 */
export function VideoSlot({
  length,
  label = "Watch the video",
  className,
  children,
}: {
  length?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface",
        children ? "min-h-[380px] pt-6 pb-20 md:min-h-[540px]" : "aspect-video min-h-[220px]",
        className,
      )}
    >
      {children}
      <div className={cx("flex justify-center", children ? "absolute inset-x-0 bottom-5" : "relative")}>
        <span className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-canvas/90 py-1.5 pr-5 pl-1.5 backdrop-blur">
          <span className="flex size-9 items-center justify-center rounded-full bg-fg text-canvas">
            <svg viewBox="0 0 12 12" className="ml-0.5 size-3" aria-hidden>
              <path d="M2 1.5L10.5 6L2 10.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-ui text-fg">{label}</span>
          {length && <span className="text-ui text-fg-muted">{length}</span>}
        </span>
      </div>
    </div>
  );
}
