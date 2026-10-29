import { cx } from "@/lib/cx";

/**
 * An iPhone drawn in the site's hairline style rather than as a photo-real
 * device: two nested rounded frames, the Dynamic Island and a status bar.
 */
export function IPhone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative mx-auto w-full max-w-[300px] rounded-[52px] border border-line-strong bg-canvas p-2.5",
        className,
      )}
    >
      {/* Side buttons */}
      <span aria-hidden className="absolute top-[120px] -left-px h-8 w-px bg-line-strong" />
      <span aria-hidden className="absolute top-[168px] -left-px h-12 w-px bg-line-strong" />
      <span aria-hidden className="absolute top-[150px] -right-px h-16 w-px bg-line-strong" />

      <div className="relative overflow-hidden rounded-[42px] border border-line bg-surface">
        <div
          aria-hidden
          className="flex h-12 items-center justify-between px-7 font-mono text-ui-sm text-fg"
        >
          <span>9:41</span>
          <span className="flex items-end gap-0.5">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-full bg-fg" style={{ height: h }} />
            ))}
          </span>
        </div>
        <span
          aria-hidden
          className="absolute top-3 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-canvas"
        />
        {children}
        <span aria-hidden className="mx-auto mb-2 block h-1 w-28 rounded-full bg-fg/80" />
      </div>
    </div>
  );
}
