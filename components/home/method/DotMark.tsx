/** A small dot-grid mark for a card's corner; each phase fills in one more row. */
export function DotMark({ filled }: { filled: number }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-fg-muted">
      {Array.from({ length: 16 }, (_, i) => {
        const row = Math.floor(i / 4);
        return <circle key={i} cx={2 + (i % 4) * 4} cy={2 + row * 4} r={1} fill="currentColor" opacity={3 - row < filled ? 1 : 0.25} />;
      })}
    </svg>
  );
}

/** How many rows of the mark a phase fills, out of four. */
export const dotsFor = (index: number, total: number) => Math.ceil(((index + 1) / total) * 4);
