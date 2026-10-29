import { GeoIcon } from "@/components/icons/GeoIcon";
import { DictatedText } from "@/components/motion/DictatedText";
import { Reveal } from "@/components/motion/Reveal";
import { FocusModeScreen } from "@/components/signature/FocusModeScreen";
import { IPhone } from "@/components/signature/IPhone";
import { Badge } from "@/components/ui/Badge";
import { Container, Grid } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { RegMark } from "@/components/ui/RegMark";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { hero } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";
import { focusModeStatus, focusModeStatusLabel } from "@/lib/content/proof";

export function Hero() {
  const spots = offer.foundingSpots.remaining;

  return (
    <Container className="pt-14 pb-20 md:pt-24 md:pb-28">
      <Grid className="items-center gap-y-14">
        <div className="col-span-4 md:col-span-7">
          <Reveal>
            <SpecLabel parts={[offer.course, "Founding members"]} />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[22ch] text-hero">
              <span className="text-fg">{hero.headline[0]}</span>{" "}
              <span className="text-fg-secondary">{hero.headline[1]}</span>
            </h1>
          </Reveal>
          <DictatedText
            text={hero.subline}
            delay={0.35}
            className="mt-5 max-w-[34rem] text-body text-fg-secondary"
          />
          <Reveal delay={0.5} className="mt-8">
            <CTAButton placement="hero" size="lg" />
            <SpecLabel
              className="mt-4"
              parts={[
                `${formatPrice(offer.foundingPrice)} founding`,
                `${formatPrice(offer.launchPrice)} from Jan 1, 2027`,
                ...(spots !== null ? [`${spots} of ${offer.foundingSpots.total} spots left`] : []),
                "Full refund if it doesn't launch",
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={0.2} className="col-span-4 md:col-span-5">
          <IPhone>
            <FocusModeScreen />
          </IPhone>
          <div className="mt-5 flex items-center justify-center gap-3">
            <SpecLabel as="span">FocusMode · iOS</SpecLabel>
            <Badge tone={focusModeStatus === "approved" ? "positive" : "info"} dot>
              {focusModeStatusLabel[focusModeStatus]}
            </Badge>
          </div>
        </Reveal>
      </Grid>

      <Reveal className="mt-20 md:mt-28">
        <VideoSlot />
      </Reveal>
    </Container>
  );
}

/** The intro video. Until there's a file, a quiet frame that says what goes here. */
function VideoSlot() {
  return (
    <figure className="relative">
      <RegMark className="top-0 left-0" />
      <RegMark className="top-0 left-full" />
      <RegMark className="top-full left-0" />
      <RegMark className="top-full left-full" />
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-lg border border-line bg-surface">
        <GeoIcon name="video" size={44} className="text-fg-secondary" />
        <SpecLabel>[TODO: video]</SpecLabel>
      </div>
      <figcaption className="mt-3 flex justify-between gap-4">
        <SpecLabel as="span">{hero.video.label}</SpecLabel>
        <SpecLabel as="span">{hero.video.length}</SpecLabel>
      </figcaption>
    </figure>
  );
}
