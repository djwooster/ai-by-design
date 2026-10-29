import { BuildMorph } from "@/components/hero/BuildMorph";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { DictatedText } from "@/components/motion/DictatedText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Pill } from "@/components/ui/Pill";
import { hero } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";
import { formatPrice, offer } from "@/lib/content/offer";
import { site } from "@/lib/content/site";

/**
 * Centered hero (references/07): status pill, headline, subline, the founding
 * CTA beside "Watch intro", a trust line, then a large window holding the
 * course outline and the intro video.
 */
export function Hero() {
  return (
    <div className="overflow-hidden">
      <Container className="pt-14 md:pt-20">
        <div className="mx-auto flex max-w-[50rem] flex-col items-center text-center">
          <Reveal>
            <Pill>
              <span aria-hidden className="size-1.5 rounded-full bg-accent-fg" />
              {hero.badge}
            </Pill>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 text-hero text-fg">
              {hero.headline[0]}
              <br className="hidden sm:block" /> <span className="text-fg-secondary">{hero.headline[1]}</span>
            </h1>
          </Reveal>
          <DictatedText text={hero.subline} delay={0.4} className="mt-7 max-w-[36rem] text-lede text-fg-secondary" />
          <Reveal delay={0.55} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <CTAButton placement="hero" size="lg" withPrice />
            <ButtonLink href="#intro" variant="secondary" size="lg">
              <GeoIcon name="video" size={18} />
              Watch intro
              <span className="text-fg-muted">{hero.videoLength}</span>
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.65}>
            <p className="mt-6 text-ui-sm text-fg-muted">{hero.trust.join(" · ")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-16 md:mt-20">
          <CourseWindow />
        </Reveal>
      </Container>
    </div>
  );
}

/**
 * The window under the hero: the course outline on the left, the intro video
 * on the right. Until the video exists, its poster is the build animation.
 */
function CourseWindow() {
  return (
    <div id="intro" className="scroll-mt-24 overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface">
      <div className="flex h-12 items-center justify-between border-b border-line px-4">
        <span className="text-ui-sm font-medium text-fg">{site.name}</span>
        <div className="hidden items-center gap-1 rounded-full sm:flex">
          {["Course", "Live calls", "Community"].map((tab, i) => (
            <span
              key={tab}
              className={i === 0 ? "rounded-full bg-surface-2 px-3 py-1 text-ui-sm text-fg" : "px-3 py-1 text-ui-sm text-fg-muted"}
            >
              {tab}
            </span>
          ))}
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-on-accent">
          DJ
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        <aside className="hidden border-r border-line p-3 md:block" aria-label="Course outline">
          <div className="rounded-xl border border-line bg-canvas p-3">
            <p className="text-ui-sm font-medium text-fg">Start here</p>
            <p className="mt-0.5 text-[12px] text-fg-muted">The Method, the community and the live calls</p>
          </div>
          <ol className="mt-3 space-y-0.5">
            {phases.map((phase, index) => (
              <li
                key={phase.id}
                className={
                  index === 0
                    ? "flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2.5"
                    : "flex items-center justify-between px-3 py-2.5"
                }
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-fg-muted">{phaseNumber(index)}</span>
                  <span className={index === 0 ? "text-ui-sm text-fg" : "text-ui-sm text-fg-secondary"}>
                    {phase.name}
                  </span>
                </span>
                <span className="text-[11px] text-fg-muted">
                  {phase.modules.length} {phase.modules.length === 1 ? "module" : "modules"}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 px-3 text-[12px] text-fg-muted">
            Live calls twice a week from Jan 1, 2027 · {formatPrice(offer.foundingPrice)} founding
          </p>
        </aside>

        <div className="relative bg-canvas p-4 md:p-6">
          {/* [TODO: video] the intro; the build animation stands in as its poster */}
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-xl border border-line bg-surface pt-6 pb-20 md:min-h-[560px]">
            <BuildMorph className="w-full" maxHeight={460} />
            <div className="absolute inset-x-0 bottom-5 flex justify-center">
              <span className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-canvas/90 py-1.5 pr-5 pl-1.5 backdrop-blur">
                <span className="flex size-9 items-center justify-center rounded-full bg-fg text-canvas">
                  <svg viewBox="0 0 12 12" className="ml-0.5 size-3" aria-hidden>
                    <path d="M2 1.5L10.5 6L2 10.5Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-ui text-fg">Watch the intro</span>
                <span className="text-ui text-fg-muted">{hero.videoLength}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
