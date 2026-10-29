import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { cx } from "@/lib/cx";

/*
 * Editorial type for long-form text: blog posts (through MDX) and the legal
 * pages. A 40rem measure, body at 16/1.6, headings in the site's tight
 * medium weight, code in Geist Mono on the raised surface.
 */

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cx("mt-14 scroll-mt-24 text-[1.5rem] leading-tight font-medium tracking-[-0.025em] text-fg first:mt-0", className)}
      {...props}
    />
  );
}

export function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cx("mt-5 text-body text-fg-secondary first:mt-0", className)} {...props} />;
}

export const prose: MDXComponents = {
  h2: H2,
  h3: ({ className, ...props }) => (
    <h3 className={cx("mt-10 scroll-mt-24 text-heading text-fg", className)} {...props} />
  ),
  p: P,
  a: ({ href = "", className, ...props }) => {
    const classes = cx("text-accent-fg underline decoration-accent-fg/40 underline-offset-[3px] transition-colors hover:decoration-accent-fg", className);
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />
    );
  },
  strong: ({ className, ...props }) => <strong className={cx("font-medium text-fg", className)} {...props} />,
  ul: ({ className, ...props }) => (
    <ul className={cx("mt-5 space-y-2 pl-5 text-body text-fg-secondary marker:text-fg-muted list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cx("mt-5 space-y-2 pl-5 text-body text-fg-secondary marker:font-mono marker:text-ui-sm marker:text-fg-muted list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cx("pl-1.5", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote className={cx("mt-8 border-l-2 border-accent-fg pl-5 text-lede text-fg [&>p]:text-fg", className)} {...props} />
  ),
  hr: () => <hr className="my-12 border-line" />,
  code: ({ className, ...props }) => (
    <code
      className={cx(
        "rounded-[5px] border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-fg",
        "[pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-ui-sm",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cx("mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-5 leading-relaxed", className)} {...props} />
  ),
};

/** The measure and rhythm around a run of prose elements. */
export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("max-w-[40rem]", className)}>{children}</div>;
}
