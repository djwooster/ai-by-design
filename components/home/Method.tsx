import { PhaseScene } from "@/components/illustrations/PhaseScene";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { method } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";

/** A small dot-grid mark for the card's corner; each phase fills in one more row. */
function DotMark({ filled }: { filled: number }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-fg-muted">
      {Array.from({ length: 16 }, (_, i) => {
        const row = Math.floor(i / 4);
        return <circle key={i} cx={2 + (i % 4) * 4} cy={2 + row * 4} r={1} fill="currentColor" opacity={3 - row < filled ? 1 : 0.25} />;
      })}
    </svg>
  );
}

/*
 * The Method: a centered heading, then the six phases as folded-corner cards.
 * Each names its phase, says what you'll have when it's done, and shows that
 * thing as a small piece of line-drawn UI.
 */
export function Method() {
  return (
    <Section id="method" title={method.title} accent={method.accent} lede={method.lede} center>
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
                  <DotMark filled={Math.ceil(((index + 1) / phases.length) * 4)} />
                </div>
                <p className="mt-8 text-ui text-fg-secondary">{phase.outcome}</p>
                <PhaseScene phase={phase.id} className="mt-6" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
