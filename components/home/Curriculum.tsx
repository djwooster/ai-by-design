import { Spot, type SpotName } from "@/components/illustrations/Spot";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Pill } from "@/components/ui/Pill";
import { curriculum } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";

const moduleNumber = (n: number) => String(n).padStart(2, "0");
const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0);
const lessonCount = phases.reduce(
  (sum, phase) => sum + phase.modules.reduce((n, module) => n + module.lessons.length, 0),
  0,
);

/**
 * The whole syllabus on one screen, nothing to click: the heading stays put on
 * the left while every phase, module and lesson lists down the right.
 */
export function Curriculum() {
  return (
    <section id="curriculum" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <Reveal className="lg:sticky lg:top-28">
              <Pill>{curriculum.badge}</Pill>
              <h2 className="mt-6 text-title text-fg">
                <AccentText text={curriculum.title} accent={curriculum.accent} />
              </h2>
              <p className="mt-6 max-w-[26rem] text-lede text-fg-secondary">{curriculum.lede}</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {(
                  [
                    ["Phases", phases.length],
                    ["Modules", moduleCount],
                    ["Lessons", lessonCount],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dd className="text-display leading-none text-fg">{value}</dd>
                    <dt className="mt-2 text-ui-sm text-fg-muted">{label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12px] text-fg-muted">[TODO: final counts once the course is outlined]</p>
              <CTAButton placement="curriculum" className="mt-10" />
            </Reveal>
          </div>

          <Stagger as="ol" className="border-t border-line">
            {phases.map((phase, index) => (
              <StaggerItem
                key={phase.id}
                as="li"
                className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 border-b border-line py-8 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-8"
              >
                <div className="text-fg-secondary">
                  <Spot name={phase.id as SpotName} />
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
                    <h3 className="text-heading font-semibold text-fg">{phase.name}</h3>
                  </div>
                  <p className="mt-1 text-ui text-fg-secondary">{phase.description}</p>

                  <ul className="mt-5 space-y-4">
                    {phase.modules.map((module) => (
                      <li key={module.number}>
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-ui font-medium text-fg">
                            <span className="mr-2.5 font-mono text-ui-sm font-normal text-fg-muted">
                              {moduleNumber(module.number)}
                            </span>
                            {module.title}
                          </p>
                          <span className="shrink-0 text-ui-sm text-fg-muted">{module.lessons.length} lessons</span>
                        </div>
                        <p className="mt-1 pl-8 text-ui-sm text-fg-muted">{module.lessons.join(" · ")}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
