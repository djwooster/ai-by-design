import Link from "next/link";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/88",
  secondary: "border border-line-strong text-fg hover:bg-surface hover:border-fg-muted",
  ghost: "text-fg-secondary hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-ui-sm",
  md: "h-9 px-3.5 text-ui-sm",
  lg: "h-11 px-5 text-ui",
};

/**
 * Small, tight buttons with a brief physical press: they go down fast (80ms)
 * and settle back slower (220ms), like a real switch. Pure CSS, so buttons stay
 * server components.
 */
export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cx(
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,color,transform] duration-220 ease-glide active:scale-[0.965] active:duration-80 active:ease-press",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
  );
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx(buttonStyles(variant, size), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  href,
  external,
  ...props
}: Common & { href: string; external?: boolean; onClick?: () => void }) {
  const classes = cx(buttonStyles(variant, size), className);
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />;
  }
  return <Link href={href} className={classes} {...props} />;
}
