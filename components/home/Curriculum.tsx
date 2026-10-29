import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Grid } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { phaseNumber, phases } from "@/lib/content/method";

const moduleNumber = (n: number) => String(n).padStart(2, "0");
const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0);

export function Curriculum() {
  return (
    <Section
      id="curriculum"
      numeral="04"
      label={`Curriculum · ${phases.length} phases · ${moduleCount} modules`}
      title="[TODO: copy] Everything, in the order you'll need it."
    >
      <div className="space-y-14 md:space-y-20">
        {phases.map((phase, index) => (
          <Reveal key={phase.id}>
            <Grid className="gap-y-5">
              <div className="col-span-4 md:col-span-4">
                <div className="flex items-center gap-3">
                  <GeoIcon name={phase.id} size={22} className="text-fg-secondary" />
                  <SpecLabel parts={[`Phase ${phaseNumber(index)}`]} />
                </div>
                <h3 className="mt-3 text-title text-fg">{phase.name}</h3>
                <p className="mt-2 max-w-[22rem] text-ui text-fg-secondary">{phase.description}</p>
              </div>
              <div className="col-span-4 md:col-span-8">
                <Accordion
                  items={phase.modules.map((module) => ({
                    id: `module-${module.number}`,
                    title: (
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-ui-sm text-fg-muted">{moduleNumber(module.number)}</span>
                        {module.title}
                      </span>
                    ),
                    meta: `${module.lessons.length} lessons`,
                    content: (
                      <ol className="space-y-2 pl-9">
                        {module.lessons.map((lesson, i) => (
                          <li key={lesson} className="flex gap-4">
                            <span className="font-mono text-ui-sm text-fg-muted">
                              {moduleNumber(module.number)}.{i + 1}
                            </span>
                            {lesson}
                          </li>
                        ))}
                      </ol>
                    ),
                  }))}
                />
              </div>
            </Grid>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
