import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { build } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";

export function Build() {
  return (
    <Section id="build" numeral="03" label="What you'll build" title={build.title} lede={build.body}>
      {/* Idea to App Store: one outcome per phase, read left to right. */}
      <Stagger as="ol" className="grid grid-cols-2 border-t border-l border-line md:grid-cols-6">
        {build.milestones.map((milestone, index) => {
          const phase = phases.find((p) => p.id === milestone.phase)!;
          return (
            <StaggerItem
              key={milestone.phase}
              as="li"
              className="flex min-h-[180px] flex-col border-r border-b border-line p-4"
            >
              <SpecLabel parts={[phaseNumber(index), phase.name]} />
              <GeoIcon name={phase.id} size={24} className="mt-6 text-fg-secondary" />
              <p className="mt-auto pt-6 text-ui text-fg">{milestone.outcome}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
      <div className="mt-3 flex justify-between">
        <SpecLabel as="span">Idea</SpecLabel>
        <SpecLabel as="span">App Store</SpecLabel>
      </div>
    </Section>
  );
}
