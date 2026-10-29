import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { finalCta } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";

export function FinalCta() {
  return (
    <section id="final" className="border-t border-line">
      <Container className="py-28 md:py-40">
        <Reveal className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <WordsIn lines={[finalCta.title]} accent={finalCta.accent} className="text-display text-fg" />
          <p className="mt-5 text-lede text-fg-secondary">{finalCta.body}</p>
          <CTAButton placement="final" size="lg" className="mt-9" />
          <p className="mt-4 text-ui-sm text-fg-muted">
            {formatPrice(offer.foundingPrice)} founding · Full refund if it doesn&apos;t launch
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
