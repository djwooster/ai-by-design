import { cx } from "@/lib/cx";

/** The 1200px content column with the site gutter: 16px on phones, wider from tablet up. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/** The 12-column Swiss grid. Four columns on phones, twelve from md up. */
export function Grid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6", className)}>
      {children}
    </div>
  );
}
