import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cx } from "@/lib/cx";

/**
 * A homepage section: an optional pill badge, a headline with one accented
 * word, a lede with room under it, then the section's content. `light`
 * switches it to the light theme; `center` centers the heading block.
 */
export function Section({
  id,
  badge,
  title,
  accent,
  lede,
  center,
  light,
  className,
  children,
}: {
  id?: string;
  badge?: string;
  title?: string;
  accent?: string;
  lede?: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const hasHeader = Boolean(badge || title || lede);

  return (
    <section id={id} className={cx("scroll-mt-20", light && "theme-light", className)}>
      <Container className="py-24 md:py-36">
        {hasHeader && (
          <div className={cx("max-w-[60rem]", center && "mx-auto text-center")}>
            {badge && (
              <Reveal>
                <Pill>{badge}</Pill>
              </Reveal>
            )}
            {title && (
              <WordsIn lines={[title]} accent={accent} delay={0.1} className={cx("text-title text-fg", badge && "mt-6")} />
            )}
            {lede && (
              <Reveal delay={0.35}>
                <p className={cx("mt-6 max-w-[36rem] text-lede text-fg-secondary", center && "mx-auto")}>{lede}</p>
              </Reveal>
            )}
          </div>
        )}
        {children && <div className={cx(hasHeader && "mt-16 md:mt-20")}>{children}</div>}
      </Container>
    </section>
  );
}
