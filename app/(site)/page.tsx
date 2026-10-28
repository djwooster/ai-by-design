import { EmptyState } from "@/components/layout/EmptyState";
import { Section } from "@/components/layout/Section";
import { Container, Grid } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { homeSections } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";

export default function HomePage() {
  const spots = offer.foundingSpots.remaining;

  return (
    <>
      <Container className="pt-16 pb-20 md:pt-28 md:pb-32">
        <Grid className="gap-y-12">
          <div className="col-span-4 md:col-span-7">
            <SpecLabel parts={[offer.course, "Founding members"]} />
            <h1 className="mt-6 text-hero">
              <span className="text-fg">Ship your app to the App Store.</span>{" "}
              <span className="text-fg-secondary">Built with Claude Code.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-body text-fg-secondary">
              [TODO: copy] I design, build and ship real software with AI. Become a founding
              member and learn the exact process I&apos;m using to launch FocusMode.
            </p>
            <div className="mt-8">
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
            </div>
          </div>
          <div className="col-span-4 md:col-span-5">
            <EmptyState stage="Stage 2–3" title="FocusMode on an iPhone, and the intro video">
              The iPhone frame with the status chip, and the video slot. [TODO: video]
            </EmptyState>
          </div>
        </Grid>
      </Container>

      {homeSections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          numeral={section.numeral}
          label={section.label}
          paper={section.paper}
        >
          <EmptyState stage="Stage 3" title={section.label}>
            {section.job}
          </EmptyState>
        </Section>
      ))}
    </>
  );
}
