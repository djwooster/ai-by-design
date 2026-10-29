import { Reveal } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cx } from "@/lib/cx";

/**
 * A homepage section: an optional pill badge, a headline with one accented
 * word, a lede with room under it, then the section's content. `paper`
 * switches it to the light theme; `center` centers the heading block.
 */
export function Section({
  id,
  badge,
  title,
  accent,
  lede,
  center,
  paper,
  className,
  children,
}: {
  id?: string;
  badge?: string;
  title?: string;
  accent?: string;
  lede?: React.ReactNode;
  center?: boolean;
  paper?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const hasHeader = Boolean(badge || title || lede);

  return (
    <section id={id} className={cx("scroll-mt-20", paper && "theme-paper", className)}>
      <Container className="py-24 md:py-36">
        {hasHeader && (
          <Reveal className={cx("max-w-[44rem]", center && "mx-auto text-center")}>
            {badge && <Pill>{badge}</Pill>}
            {title && (
              <h2 className={cx("text-title text-fg", badge && "mt-6")}>
                <AccentText text={title} accent={accent} />
              </h2>
            )}
            {lede && (
              <p className={cx("mt-6 max-w-[36rem] text-lede text-fg-secondary", center && "mx-auto")}>
                {lede}
              </p>
            )}
          </Reveal>
        )}
        {children && <div className={cx(hasHeader && "mt-16 md:mt-20")}>{children}</div>}
      </Container>
    </section>
  );
}
