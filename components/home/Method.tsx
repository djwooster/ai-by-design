import { PhaseDiagram } from "@/components/illustrations/PhaseDiagram";
import { PhaseImage } from "@/components/illustrations/PhaseImage";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { method } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";
import { phaseImages } from "@/lib/content/phaseImages";

/*
 * The Method: a short title and three plain lines, then the six phases as
 * tall cards drifting past in a marquee. Each card names its phase, shows its
 * scene, and lists what you'll have when it's done.
 */
export function Method() {
  return (
    <section id="method" className="scroll-mt-20 py-24 md:py-36">
      <Container>
        <Reveal>
          <h2 className="text-heading font-medium text-fg">{method.title}</h2>
          <p className="mt-6 max-w-[48rem] text-lede text-fg-secondary">
            {method.lines.map((line) => (
              <span key={line} className="md:block">
                {line}{" "}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>

      <Stagger className="mt-14 md:mt-20">
        <Marquee label="The six phases of the Method" className="px-4 sm:px-6 lg:px-8 xl:pl-[calc(50vw-35.5rem)]">
          {phases.map((phase, index) => {
            const image = phaseImages[phase.id];
            return (
              <StaggerItem
                key={phase.id}
                className="flex min-h-[440px] w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[340px] md:min-h-[480px]"
              >
                <h3 className="text-ui text-fg">
                  <span className="mr-2 font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
                  {phase.name}
                </h3>
                <div className="my-auto py-6">
                  {image ? (
                    <PhaseImage src={image} />
                  ) : (
                    <div className="mx-auto w-full max-w-[220px] text-fg-muted">
                      <PhaseDiagram phase={phase.id} />
                    </div>
                  )}
                </div>
                <ul className="space-y-2">
                  {phase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-ui-sm text-fg-secondary">
                      <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-fg-muted" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Marquee>
      </Stagger>
    </section>
  );
}
