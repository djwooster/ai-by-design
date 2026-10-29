import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { proof } from "@/lib/content/proof";

export function Proof() {
  return (
    <Section
      id="proof"
      numeral="06"
      label="Proof · Shipped with Claude Code"
      title={
        <>
          Real software. <span className="text-fg-secondary">Built the way you&apos;ll learn.</span>
        </>
      }
    >
      <Stagger className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
        {proof.map((product) => (
          <StaggerItem key={product.id} className="col-span-4">
            <Card className="flex h-full flex-col p-0">
              {/* [TODO: screenshot] for each product */}
              <div className="flex aspect-[4/3] items-center justify-center border-b border-line bg-surface-2">
                <SpecLabel>[TODO: screenshot]</SpecLabel>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <SpecLabel as="span">{product.kind}</SpecLabel>
                  <Badge tone={product.status.tone} dot>
                    {product.status.label}
                  </Badge>
                </div>
                <h3 className="mt-5 text-heading text-fg">{product.name}</h3>
                <p className="mt-2 text-ui text-fg-secondary">{product.summary}</p>
                {product.href && (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-ui-sm text-accent-fg transition-colors duration-150 hover:text-fg"
                  >
                    {product.linkLabel}
                    <GeoIcon name="arrow" size={14} />
                  </a>
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
