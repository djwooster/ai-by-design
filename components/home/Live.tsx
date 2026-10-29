import { BuildMockup, CallMockup, CommunityMockup, ReviewMockup } from "@/components/home/LiveMockups";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { live } from "@/lib/content/home";

const mockups = {
  qa: CallMockup,
  reviews: ReviewMockup,
  builds: BuildMockup,
  community: CommunityMockup,
} as const;

/** A row of cards: a realistic UI vignette on top, the heading and one line below. */
export function Live() {
  return (
    <Section id="live" badge={live.badge} title={live.title} accent={live.accent} lede={live.lede}>
      <Stagger className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {live.cards.map((card) => {
          const Mockup = mockups[card.id];
          return (
            <StaggerItem key={card.id}>
              <Mockup />
              <h3 className="mt-5 text-heading text-fg">{card.name}</h3>
              <p className="mt-1.5 text-ui text-fg-secondary">{card.body}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
