import { IllustratedCard } from "@/components/illustrations/IllustratedCard";
import type { SpotName } from "@/components/illustrations/Spot";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { live } from "@/lib/content/home";

const spots: Record<(typeof live.cards)[number]["id"], SpotName> = {
  qa: "qa",
  reviews: "review",
  builds: "live-build",
  community: "community",
};

/** A row of illustrated cards (references/10), one blue for rhythm. */
export function Live() {
  return (
    <Section id="live" badge={live.badge} title={live.title} accent={live.accent} lede={live.lede}>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {live.cards.map((card, i) => (
          <StaggerItem key={card.id}>
            <IllustratedCard
              spot={spots[card.id]}
              title={card.name}
              note={card.body}
              blue={i === 1}
              tall
              className="h-full min-h-[340px]"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
