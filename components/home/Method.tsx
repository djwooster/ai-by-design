import { PhaseArt } from "@/components/illustrations/PhaseArt";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { method } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";
import { cx } from "@/lib/cx";

/*
 * The Method and what you'll build, as one grid of light cards on the dark
 * page (after Alfred's feature cards): a bold object drawing, the phase name
 * large, and what you'll have at the end of it. Tones alternate, and the last
 * card, Launch, is the blue one. Setting --bg per card makes the drawings'
 * opaque fills match the card exactly.
 */
const tones = ["var(--card-white)", "var(--card-tint)", "var(--smoke)", "var(--card-tint)", "var(--card-white)", null];

export function Method() {
  return (
    <Section id="method" badge={method.badge} title={method.title} accent={method.accent} lede={method.lede}>
      <Stagger as="ol" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase, index) => {
          const tone = tones[index];
          return (
            <StaggerItem
              key={phase.id}
              as="li"
              className={cx("flex min-h-[440px] flex-col rounded-[22px] p-7", tone ? "theme-light" : "theme-blue")}
              style={tone ? ({ "--bg": tone } as React.CSSProperties) : undefined}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
              </div>
              <div className="my-6 w-[78%] max-w-[260px] text-fg">
                <PhaseArt phase={phase.id} />
              </div>
              <h3 className="mt-auto text-title leading-none text-fg">{phase.name}</h3>
              <p className="mt-3 text-ui text-fg-secondary">{phase.outcome}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
