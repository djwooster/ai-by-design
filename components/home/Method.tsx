import { PhaseDiagram } from "@/components/illustrations/PhaseDiagram";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { method } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";

/** A small "+" registration mark, centered on a grid intersection. */
function Plus({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      className={`pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 text-fg-muted ${className}`}
    >
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/*
 * The Method on a light section: six white cards joined by hairlines into one
 * sheet, with registration marks at the corners, each holding a node diagram
 * that draws itself in as the card scrolls into view.
 */
export function Method() {
  return (
    <Section id="method" light badge={method.badge} title={method.title} accent={method.accent} lede={method.lede}>
      <div className="relative">
        <Stagger
          as="ol"
          className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {phases.map((phase, index) => (
            <StaggerItem
              key={phase.id}
              as="li"
              className="flex flex-col bg-canvas px-8 pt-10 pb-9"
              style={{ "--bg": "var(--card-white)" } as React.CSSProperties}
            >
              <div className="mx-auto w-full max-w-[240px] text-fg-muted">
                <PhaseDiagram phase={phase.id} />
              </div>
              <p className="mt-10 font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</p>
              <h3 className="mt-1 text-heading font-medium text-fg">{phase.name}</h3>
              <p className="mt-2 text-ui text-fg-secondary">{phase.outcome}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Registration marks at the sheet's corners and, on large screens, where the cards meet. */}
        {["top-0 left-0", "top-0 left-full", "top-full left-0", "top-full left-full"].map((at) => (
          <Plus key={at} className={at} />
        ))}
        {["top-0 left-1/3", "top-0 left-2/3", "top-1/2 left-0", "top-1/2 left-1/3", "top-1/2 left-2/3", "top-1/2 left-full", "top-full left-1/3", "top-full left-2/3"].map((at) => (
          <Plus key={at} className={`hidden lg:block ${at}`} />
        ))}
      </div>
    </Section>
  );
}
