import { cx } from "@/lib/cx";

/*
 * The geometric icon set: circles, arcs and lines only, on a 24px grid with a
 * 1.5px stroke, in the spirit of Braun and the Bauhaus. Add an icon by adding
 * an entry; keep to the same three primitives.
 */
const icons = {
  // The six Method phases
  vision: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </>
  ),
  design: (
    <>
      <circle cx="12" cy="4.5" r="1.5" />
      <line x1="11.2" y1="5.8" x2="6" y2="20" />
      <line x1="12.8" y1="5.8" x2="18" y2="20" />
      <path d="M7.5 15.5a9 9 0 0 0 9 0" />
    </>
  ),
  build: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="13" y2="17" />
      <circle cx="17.5" cy="17" r="1.5" />
    </>
  ),
  test: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12.5" x2="11" y2="15.5" />
      <line x1="11" y1="15.5" x2="16.5" y2="9" />
    </>
  ),
  ship: (
    <>
      <line x1="12" y1="3.5" x2="12" y2="15" />
      <line x1="12" y1="3.5" x2="8" y2="7.5" />
      <line x1="12" y1="3.5" x2="16" y2="7.5" />
      <path d="M4 14a8 6.5 0 0 0 16 0" />
    </>
  ),
  launch: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <line x1="12" y1="2.5" x2="12" y2="5.5" />
      <line x1="12" y1="18.5" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="5.5" y2="12" />
      <line x1="18.5" y1="12" x2="21.5" y2="12" />
      <line x1="5.3" y1="5.3" x2="7.4" y2="7.4" />
      <line x1="16.6" y1="16.6" x2="18.7" y2="18.7" />
      <line x1="5.3" y1="18.7" x2="7.4" y2="16.6" />
      <line x1="16.6" y1="7.4" x2="18.7" y2="5.3" />
    </>
  ),

  // Shop products
  playbook: (
    <>
      <circle cx="5.5" cy="6" r="1.5" />
      <circle cx="5.5" cy="12" r="1.5" />
      <circle cx="5.5" cy="18" r="1.5" />
      <line x1="10" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="10" y1="18" x2="16" y2="18" />
    </>
  ),
  prompt: (
    <>
      <line x1="4" y1="7" x2="9.5" y2="12" />
      <line x1="9.5" y1="12" x2="4" y2="17" />
      <line x1="12" y1="17.5" x2="20" y2="17.5" />
    </>
  ),
  kit: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="16.5" cy="7.5" r="1.5" />
    </>
  ),

  // Course and UI
  video: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="10" y1="8.5" x2="10" y2="15.5" />
      <line x1="10" y1="8.5" x2="15.5" y2="12" />
      <line x1="10" y1="15.5" x2="15.5" y2="12" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8 8a5.7 5.7 0 0 0 0 8" />
      <path d="M16 8a5.7 5.7 0 0 1 0 8" />
      <path d="M5 5a9.9 9.9 0 0 0 0 14" />
      <path d="M19 5a9.9 9.9 0 0 1 0 14" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="6.5" cy="16" r="3" />
      <circle cx="17.5" cy="16" r="3" />
    </>
  ),
  check: (
    <>
      <line x1="5" y1="12.5" x2="10" y2="17.5" />
      <line x1="10" y1="17.5" x2="19" y2="7" />
    </>
  ),
  cross: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  arrow: (
    <>
      <line x1="4" y1="12" x2="19" y2="12" />
      <line x1="13.5" y1="6.5" x2="19" y2="12" />
      <line x1="13.5" y1="17.5" x2="19" y2="12" />
    </>
  ),
  guarantee: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 12a5 5 0 0 0 10 0" />
      <line x1="12" y1="4.5" x2="12" y2="9" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export function GeoIcon({
  name,
  size = 20,
  className,
  label,
}: {
  name: IconName;
  size?: number;
  className?: string;
  /** Give icons that carry meaning on their own a label; decorative ones stay hidden. */
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx("shrink-0", className)}
    >
      {icons[name]}
    </svg>
  );
}
