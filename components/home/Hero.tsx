import { BuildMorph } from "@/components/hero/BuildMorph";
import { DictatedText } from "@/components/motion/DictatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Pill } from "@/components/ui/Pill";
import { hero } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";

/** Split hero: the promise on the left, the build happening live on the right. */
export function Hero() {
  const spots = offer.foundingSpots.remaining;

  return (
    <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        <div className="flex flex-col py-4 lg:py-16">
          <Reveal>
            <Pill>
              <span aria-hidden className="size-1.5 rounded-full bg-info" />
              {hero.badge}
            </Pill>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 text-hero">
              <span className="text-fg">{hero.headline[0]}</span>{" "}
              <span className="text-fg-secondary">{hero.headline[1]}</span>
            </h1>
          </Reveal>
          <DictatedText
            text={hero.subline}
            delay={0.4}
            className="mt-7 max-w-[30rem] text-lede text-fg-secondary"
          />
          <Reveal delay={0.55} className="mt-9">
            <CTAButton placement="hero" size="lg" />
            <p className="mt-4 text-ui-sm text-fg-muted">
              {formatPrice(offer.foundingPrice)} founding · {formatPrice(offer.launchPrice)} from Jan 1, 2027
              {spots !== null && ` · ${spots} of ${offer.foundingSpots.total} spots left`} · Full refund if it
              doesn&apos;t launch
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-14 lg:mt-auto lg:pt-16">
            <p className="text-ui-sm text-fg-muted">Shipped with Claude Code</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {hero.shipped.map((name) => (
                <li key={name} className="text-ui font-medium tracking-[-0.01em] text-fg-secondary">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-[28px] border border-line bg-surface px-4 pt-8 pb-6 sm:px-8 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:22px_22px]">
            <BuildMorph />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
