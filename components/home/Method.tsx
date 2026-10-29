import { Spot, type SpotName } from "@/components/illustrations/Spot";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { method } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";

/** The Method and what you'll build, as one grid: a card per phase, each with its drawing. */
export function Method() {
  return (
    <Section id="method" badge={method.badge} title={method.title} accent={method.accent} lede={method.lede}>
      <Stagger as="ol" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <StaggerItem
            key={phase.id}
            as="li"
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-title leading-none text-fg">{phase.name}</h3>
              <span className="font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
            </div>
            <div className="mx-auto my-8 w-[72%] max-w-[240px] text-fg-secondary transition-colors duration-300 group-hover:text-fg">
              <Spot name={phase.id as SpotName} />
            </div>
            <p className="mt-auto text-ui text-fg-secondary">{phase.outcome}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
