import { Section } from "@/components/layout/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Grid } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { whyNow } from "@/lib/content/home";

export function WhyNow() {
  return (
    <Section id="why-now" numeral="01" label="Why now">
      <Reveal>
        <p className="max-w-[24ch] text-title">
          <span className="text-fg-secondary">{whyNow.statement}</span>{" "}
          <span className="text-fg">{whyNow.turn}</span>
        </p>
      </Reveal>

      <Grid className="mt-16 gap-y-10 md:mt-24">
        {(
          [
            ["Then", whyNow.then, "text-fg-muted line-through decoration-line-strong"],
            ["Now", whyNow.now, "text-fg"],
          ] as const
        ).map(([label, items, tone]) => (
          <div key={label} className="col-span-4 md:col-span-6">
            <SpecLabel>{label}</SpecLabel>
            <Stagger as="ul" className="mt-4 border-t border-line">
              {items.map((item) => (
                <StaggerItem key={item} as="li" className={`border-b border-line py-4 text-ui ${tone}`}>
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
