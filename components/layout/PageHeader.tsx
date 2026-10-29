import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cx } from "@/lib/cx";

/**
 * The top of every inner page: a pill badge, the headline rising in word by
 * word with one accented phrase, a lede, and optional actions under it.
 */
export function PageHeader({
  label,
  title,
  accent,
  lede,
  center,
  className,
  children,
}: {
  label: React.ReactNode;
  title: string;
  accent?: string;
  lede?: React.ReactNode;
  center?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Container className={cx("pt-16 pb-12 md:pt-24 md:pb-16", className)}>
      <div className={cx("max-w-[52rem]", center && "mx-auto flex flex-col items-center text-center")}>
        <Reveal>
          <Pill>{label}</Pill>
        </Reveal>
        <WordsIn as="h1" lines={[title]} accent={accent} delay={0.1} className="mt-6 text-display text-fg" />
        {lede && (
          <Reveal delay={0.3}>
            <p className={cx("mt-6 max-w-[38rem] text-lede text-fg-secondary", center && "mx-auto")}>{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.4} className="mt-9">
            {children}
          </Reveal>
        )}
      </div>
    </Container>
  );
}
