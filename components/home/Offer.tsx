import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { offerSection } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";
import { cx } from "@/lib/cx";

/** Three steps divided by hairlines, then the founding ticket and the price roadmap. */
export function Offer() {
  const spots = offer.foundingSpots;

  return (
    <Section id="offer" badge={offerSection.badge} title={offerSection.title} accent={offerSection.accent} center>
      <Stagger as="ol" className="grid grid-cols-1 md:grid-cols-3">
        {offerSection.steps.map((step, index) => (
          <StaggerItem
            key={step.name}
            as="li"
            className={cx(
              "border-t border-line-strong pt-6 pb-10 md:px-8 md:pb-4",
              index > 0 && "md:border-l",
              index === 0 && "md:pl-0",
            )}
          >
            <p className="text-display font-normal leading-none text-fg">{index + 1}</p>
            <h3 className="mt-6 text-heading text-fg">{step.name}</h3>
            <p className="mt-2 max-w-[22rem] text-ui text-fg-secondary">{step.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-20 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-surface p-6 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-ui text-fg-secondary">{offer.course}</p>
              <Badge tone="accent">Founding</Badge>
            </div>

            <div className="mt-8 flex items-end gap-5">
              <p className="text-hero leading-none text-fg">{formatPrice(offer.foundingPrice)}</p>
              <div className="pb-1.5">
                <p className="text-ui text-fg-muted line-through">{formatPrice(offer.launchPrice)}</p>
                <p className="text-ui-sm text-fg-muted">At launch, Jan 1, 2027</p>
              </div>
            </div>
            <p className="mt-3 text-ui-sm text-fg-muted">
              {spots.remaining !== null
                ? `${spots.remaining} of ${spots.total} founding spots left`
                : `For the first ${spots.total} founding members`}
            </p>

            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {offer.includes.map((item) => (
                <li key={item} className="flex gap-3 text-ui text-fg">
                  <GeoIcon name="check" size={18} className="mt-px text-positive" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <CTAButton placement="offer" size="lg" />
              <span className="text-ui-sm text-fg-muted">Full refund if it doesn&apos;t launch</span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-ui text-fg-secondary">Price roadmap</p>
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
                        step.current ? "border-accent-fg bg-accent-fg" : "border-line-strong bg-surface",
                      )}
                    />
                    <div className="flex flex-1 items-baseline justify-between gap-4">
                      <div>
                        <p className={cx("text-ui", step.current ? "text-fg" : "text-fg-secondary")}>
                          {step.label}
                          {step.current && <span className="sr-only"> (now)</span>}
                        </p>
                        <p className="mt-0.5 text-ui-sm text-fg-muted">{step.when}</p>
                      </div>
                      <p className="font-mono text-ui text-fg">
                        {step.price !== null ? formatPrice(step.price) : "↑"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-ui text-fg-secondary">Only for founding members</p>
              <ul className="mt-4 space-y-2.5">
                {offerSection.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-ui text-fg">
                    <GeoIcon name="plus" size={16} className="mt-0.5 text-accent-fg" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
