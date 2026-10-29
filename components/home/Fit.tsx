import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { fit } from "@/lib/content/home";

const columns = [
  { label: "It's for", items: fit.for, icon: "check", tone: "text-fg", iconTone: "text-positive" },
  { label: "It's not for", items: fit.notFor, icon: "cross", tone: "text-fg-secondary", iconTone: "text-fg-muted" },
] as const;

export function Fit() {
  return (
    <Section id="fit" badge={fit.badge} title={fit.title} accent={fit.accent}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {columns.map((column) => (
          <div key={column.label}>
            <h3 className="text-heading text-fg">{column.label}</h3>
            <Stagger as="ul" className="mt-5 border-t border-line">
              {column.items.map((item) => (
                <StaggerItem key={item} as="li" className={`flex gap-3 border-b border-line py-4 text-ui ${column.tone}`}>
                  <GeoIcon name={column.icon} size={18} className={`mt-px ${column.iconTone}`} />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </Section>
  );
}
