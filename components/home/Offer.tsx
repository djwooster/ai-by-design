import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { foundingPerks } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";
import { cx } from "@/lib/cx";

export function Offer() {
  const spots = offer.foundingSpots;

  return (
    <Section
      id="offer"
      numeral="08"
      label="Founding offer"
      title={
        <>
          Join early. <span className="text-fg-secondary">Pay the founding price.</span>
        </>
      }
    >
      <Grid className="gap-y-6">
        {/* The ticket: price, what's included, the CTA */}
        <Reveal className="col-span-4 md:col-span-7">
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <SpecLabel as="span">{offer.course}</SpecLabel>
              <Badge tone="accent">Founding</Badge>
            </div>

            <div className="mt-8 flex items-end gap-5">
              <p className="font-mono text-display leading-none text-fg">{formatPrice(offer.foundingPrice)}</p>
              <div className="pb-1">
                <p className="font-mono text-ui text-fg-muted line-through decoration-fg-muted">
                  {formatPrice(offer.launchPrice)}
                </p>
                <SpecLabel>At launch, Jan 1, 2027</SpecLabel>
              </div>
            </div>
            <SpecLabel className="mt-3">
              {spots.remaining !== null
                ? `${spots.remaining} of ${spots.total} founding spots left`
                : `For the first ${spots.total} founding members`}
            </SpecLabel>

            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {offer.includes.map((item) => (
                <li key={item} className="flex gap-3 text-ui text-fg">
                  <GeoIcon name="check" size={18} className="mt-px text-positive" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton placement="offer" size="lg" />
              <SpecLabel as="span">Full refund if it doesn&apos;t launch</SpecLabel>
            </div>
          </Card>
        </Reveal>

        <div className="col-span-4 flex flex-col gap-6 md:col-span-5">
          <Reveal delay={0.06}>
            <Card>
              <SpecLabel>Price roadmap</SpecLabel>
              <ol className="mt-5">
                {offer.priceRoadmap.map((step, index) => (
                  <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < offer.priceRoadmap.length - 1 && (
                      <span aria-hidden className="absolute top-3 left-[5px] h-full w-px bg-line-strong" />
                    )}
                    <span
                      aria-hidden
                      className={cx(
                        "relative mt-1.5 size-[11px] shrink-0 rounded-full border",
                        step.current ? "border-accent-fg bg-accent" : "border-line-strong bg-surface",
                      )}
                    />
                    <div className="flex flex-1 items-baseline justify-between gap-4">
                      <div>
                        <p className={cx("text-ui", step.current ? "text-fg" : "text-fg-secondary")}>
                          {step.label}
                          {step.current && <span className="sr-only"> (now)</span>}
                        </p>
                        <SpecLabel className="mt-0.5">{step.when}</SpecLabel>
                      </div>
                      <p className="font-mono text-ui text-fg">
                        {step.price !== null ? formatPrice(step.price) : "↑"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <SpecLabel>Only for founding members</SpecLabel>
              <ul className="mt-4 space-y-2.5">
                {foundingPerks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-ui text-fg-secondary">
                    <GeoIcon name="plus" size={16} className="mt-0.5 text-fg-muted" />
                    {perk}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Grid>
    </Section>
  );
}
