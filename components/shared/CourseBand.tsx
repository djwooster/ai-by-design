import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { formatPrice, offer } from "@/lib/content/offer";

/** A blue band that points inner pages back at the course. */
export function CourseBand({ placement, title, body }: { placement: string; title: string; body: string }) {
  return (
    <Container className="pb-24 md:pb-32">
      <Reveal>
        <div className="theme-blue flex flex-col gap-8 rounded-[28px] p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div className="max-w-[34rem]">
            <p className="text-ui-sm text-fg-secondary">{offer.course}</p>
            <h2 className="mt-3 text-title text-fg">{title}</h2>
            <p className="mt-4 text-lede text-fg-secondary">{body}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <CTAButton placement={placement} size="lg" />
            <p className="text-ui-sm text-fg-secondary">
              {formatPrice(offer.foundingPrice)} founding · {formatPrice(offer.launchPrice)} at launch
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
