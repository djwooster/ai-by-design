import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { phaseNumber, phases } from "@/lib/content/method";
import { methodImageAlt, methodImageSrc } from "@/lib/content/methodImages";

/** Concept B: two columns of image cards (references: Ticketapp), the picture on top and the outcome below. */
export function ConceptB() {
  return (
    <Stagger as="ol" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {phases.map((phase, index) => {
        const src = methodImageSrc(phase.id);
        const ready = existsSync(join(process.cwd(), "public", src));
        return (
          <StaggerItem key={phase.id} as="li" className="group overflow-hidden rounded-[24px] border border-line bg-surface">
            <div className="relative aspect-[3/2] overflow-hidden border-b border-line bg-canvas">
              {ready ? (
                <Image
                  src={src}
                  alt={methodImageAlt[phase.id]}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-glide group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
                  <span className="text-ui-sm text-fg-muted">[TODO: image]</span>
                  <span className="font-mono text-label text-fg-muted">public{src}</span>
                </div>
              )}
            </div>
            <div className="p-6 md:p-7">
              <h3 className="text-heading text-fg">
                <span className="mr-2.5 font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
                {phase.name}
              </h3>
              <p className="mt-1.5 max-w-[30rem] text-ui text-fg-secondary">{phase.outcome}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
