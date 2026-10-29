import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { finalCta } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";

export function FinalCta() {
  return (
    <Section id="final">
      <Reveal className="flex flex-col items-start md:items-center md:text-center">
        <h2 className="max-w-[24ch] text-title">
          <span className="text-fg">{finalCta.title[0]}</span>{" "}
          <span className="text-fg-secondary">{finalCta.title[1]}</span>
        </h2>
        <CTAButton placement="final" size="lg" className="mt-8" />
        <SpecLabel
          className="mt-4"
          parts={[`${formatPrice(offer.foundingPrice)} founding`, "Full refund if it doesn't launch"]}
        />
      </Reveal>
    </Section>
  );
}
