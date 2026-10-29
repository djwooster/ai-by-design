import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { live } from "@/lib/content/home";
import { offer } from "@/lib/content/offer";

export function Live() {
  return (
    <Section id="live" numeral="05" label="Live calls and community" title={live.title} lede={live.body}>
      <Stagger className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
        {live.formats.map((format) => (
          <StaggerItem key={format.name} className="col-span-4">
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <GeoIcon name={format.icon} size={24} className="text-fg-secondary" />
                <SpecLabel as="span">Live · Recorded</SpecLabel>
              </div>
              <h3 className="mt-10 text-heading text-fg">{format.name}</h3>
              <p className="mt-2 text-ui text-fg-secondary">{format.body}</p>
            </Card>
          </StaggerItem>
        ))}

        <StaggerItem className="col-span-4 md:col-span-12">
          <Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <GeoIcon name="community" size={24} className="mt-0.5 text-fg-secondary" />
              <div>
                <h3 className="text-heading text-fg">{live.community.name}</h3>
                <p className="mt-1 max-w-[34rem] text-ui text-fg-secondary">{live.community.body}</p>
              </div>
            </div>
            <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-1">
              <SpecLabel as="dt">Calls</SpecLabel>
              <dd className="font-mono text-ui-sm text-fg">{offer.liveCallsPerWeek} a week</dd>
              <SpecLabel as="dt">From</SpecLabel>
              <dd className="font-mono text-ui-sm text-fg">Jan 1, 2027</dd>
              <SpecLabel as="dt">When</SpecLabel>
              <dd className="font-mono text-ui-sm text-fg">{live.schedule}</dd>
            </dl>
          </Card>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
