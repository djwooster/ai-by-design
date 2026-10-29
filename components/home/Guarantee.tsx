import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { offer } from "@/lib/content/offer";

export function Guarantee() {
  return (
    <Section id="guarantee" numeral="09" label="Guarantee" paper>
      <Reveal className="max-w-[46rem]">
        <GeoIcon name="guarantee" size={40} className="text-fg" />
        <p className="mt-8 text-title text-fg">{offer.guarantee}</p>
      </Reveal>
    </Section>
  );
}
