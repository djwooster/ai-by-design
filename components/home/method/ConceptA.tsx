import { DotMark, dotsFor } from "@/components/home/method/DotMark";
import { PhaseScene } from "@/components/illustrations/PhaseScene";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { phaseNumber, phases } from "@/lib/content/method";

/** Concept A: folded-corner cards, each with a line-drawn piece of UI at the foot. */
export function ConceptA() {
  return (
    <Stagger as="ol" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {phases.map((phase, index) => (
        <StaggerItem key={phase.id} as="li" className="group relative">
          {/* The folded corner: the card is clipped, and a hairline draws the fold. */}
          <div className="flex h-full flex-col bg-line p-px [clip-path:polygon(0_0,calc(100%-22px)_0,100%_22px,100%_100%,0_100%)]">
            <div className="flex flex-1 flex-col bg-surface p-5 [clip-path:polygon(0_0,calc(100%-21.5px)_0,100%_21.5px,100%_100%,0_100%)]">
              <div className="flex items-start justify-between gap-4 pr-4">
                <h3 className="font-mono text-ui-sm uppercase tracking-[0.06em] text-fg">
                  <span className="text-fg-muted">{phaseNumber(index)}</span> {phase.name}
                </h3>
                <DotMark filled={dotsFor(index, phases.length)} />
              </div>
              <p className="mt-8 text-ui text-fg-secondary">{phase.outcome}</p>
              <PhaseScene phase={phase.id} className="mt-6" />
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
