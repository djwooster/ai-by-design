import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { proofSection } from "@/lib/content/home";
import { proof } from "@/lib/content/proof";

export function Proof() {
  return (
    <Section
      id="proof"
      badge={proofSection.badge}
      title={proofSection.title}
      accent={proofSection.accent}
      lede={proofSection.lede}
    >
      <Stagger className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-3">
        {proof.map((product) => (
          <StaggerItem key={product.id} className="flex flex-col">
            {/* [TODO: screenshot] DJ is sending real screens for each product */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-line bg-surface">
              <span className="text-ui-sm text-fg-muted">[TODO: screenshot]</span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <h3 className="text-heading text-fg">{product.name}</h3>
              <span className="text-ui-sm text-fg-muted">{product.kind}</span>
            </div>
            <p className="mt-1.5 text-ui text-fg-secondary">{product.summary}</p>
            {product.href && (
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-ui-sm text-accent-fg transition-colors duration-150 hover:text-fg"
              >
                {product.linkLabel}
                <GeoIcon name="arrow" size={14} />
              </a>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
