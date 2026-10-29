import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Grid } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { fit } from "@/lib/content/home";

const columns = [
  { label: "It's for", items: fit.for, icon: "check", tone: "text-fg", iconTone: "text-positive" },
  { label: "It's not for", items: fit.notFor, icon: "cross", tone: "text-fg-secondary", iconTone: "text-fg-muted" },
] as const;

export function Fit() {
  return (
    <Section id="fit" numeral="10" label="Who it's for" title="[TODO: copy] Built for people with an idea and no engineering team.">
      <Grid className="gap-y-10">
        {columns.map((column) => (
          <div key={column.label} className="col-span-4 md:col-span-6">
            <SpecLabel>{column.label}</SpecLabel>
            <Stagger as="ul" className="mt-4 border-t border-line">
              {column.items.map((item) => (
                <StaggerItem key={item} as="li" className={`flex gap-3 border-b border-line py-4 text-ui ${column.tone}`}>
                  <GeoIcon name={column.icon} size={18} className={`mt-px ${column.iconTone}`} />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </Grid>
    </Section>
  );
}
