import { GeoIcon } from "@/components/icons/GeoIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { offer } from "@/lib/content/offer";

/** The one light section: the guarantee, in full, with nothing else around it. */
export function Guarantee() {
  return (
    <section id="guarantee" className="theme-paper scroll-mt-20">
      <Container className="py-24 md:py-32">
        <Reveal className="mx-auto max-w-[48rem] text-center">
          <GeoIcon name="guarantee" size={36} className="mx-auto text-accent-fg" />
          <p className="mt-8 text-title text-fg">{offer.guarantee}</p>
        </Reveal>
      </Container>
    </section>
  );
}
