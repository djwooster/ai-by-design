import { cx } from "@/lib/cx";

/** 1px border that strengthens on focus. The global focus ring stays off inputs; the border does the work. */
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(
        "h-9 w-full rounded-md border border-line-strong bg-surface px-3 text-ui text-fg placeholder:text-fg-muted",
        "transition-colors duration-150 hover:border-fg-muted focus:border-accent-fg focus:ring-1 focus:ring-accent-fg focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
