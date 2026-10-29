import { Container, Grid } from "@/components/ui/Container";
import { Numeral } from "@/components/ui/Numeral";
import { RegMark } from "@/components/ui/RegMark";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { cx } from "@/lib/cx";

/**
 * A homepage section on the Swiss grid: a hairline divider on top with
 * registration marks where it meets the content edges, and an optional huge
 * numeral anchoring the heading. `paper` switches it to the warm light theme.
 */
export function Section({
  id,
  numeral,
  label,
  title,
  lede,
  paper,
  className,
  children,
}: {
  id?: string;
  numeral?: string;
  label?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  paper?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx("scroll-mt-28 border-t border-line md:scroll-mt-16", paper && "theme-paper", className)}
    >
      <Container>
        <div className="relative py-20 md:py-32">
          <RegMark className="top-0 left-0" />
          <RegMark className="top-0 left-full" />
          {(numeral || label || title) && (
            <Grid className="gap-y-6">
              {numeral && <Numeral value={numeral} className="col-span-4" />}
              <div className={numeral ? "col-span-4 md:col-span-8" : "col-span-4 md:col-span-12"}>
                {label && <SpecLabel>{label}</SpecLabel>}
                {title && <h2 className="mt-4 max-w-[20ch] text-title text-fg">{title}</h2>}
                {lede && <p className="mt-5 max-w-[38rem] text-body text-fg-secondary">{lede}</p>}
              </div>
            </Grid>
          )}
          {children && (
            <div className={cx(Boolean(numeral || label || title) && "mt-12 md:mt-20")}>{children}</div>
          )}
        </div>
      </Container>
    </section>
  );
}
