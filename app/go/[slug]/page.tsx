import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { BuildMorph } from "@/components/hero/BuildMorph";
import { PageFallback } from "@/components/layout/PageFallback";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { Pill } from "@/components/ui/Pill";
import { adPages, getAdPage, type AdPage } from "@/lib/content/ads";
import { formatPrice, offer } from "@/lib/content/offer";
import { cx } from "@/lib/cx";

type Params = PageProps<"/go/[slug]">["params"];

export function generateStaticParams() {
  return adPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/go/[slug]">): Promise<Metadata> {
  const page = getAdPage((await params).slug);
  return page ? { title: page.promise, description: page.subline } : {};
}

export default function AdLandingPage({ params }: PageProps<"/go/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Ad params={params} />
    </Suspense>
  );
}

/** One screen that says it all: promise, CTA, video, three points, and the CTA again at the end. */
async function Ad({ params }: { params: Params }) {
  const page = getAdPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <Container className="pt-14 md:pt-20">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Reveal>
            <Pill>
              <span aria-hidden className="size-1.5 rounded-full bg-accent-fg" />
              {page.label}
            </Pill>
          </Reveal>
          <WordsIn
            as="h1"
            variant="fall"
            lines={[page.promise]}
            accent={page.accent}
            delay={0.15}
            className="mt-7 text-hero text-fg"
          />
          <Reveal delay={0.6}>
            <p className="mt-6 max-w-[34rem] text-lede text-fg-secondary">{page.subline}</p>
          </Reveal>
          <Reveal delay={0.8} className="mt-9 flex w-full flex-col items-center">
            <Action page={page} placement="top" />
          </Reveal>
        </div>

        <Reveal delay={0.7} className="mt-14 md:mt-16">
          <VideoSlot length={page.video.length}>
            {/* The course page borrows the hero's build animation as its poster. */}
            {page.cta.kind === "founding" ? <BuildMorph className="w-full" maxHeight={420} /> : undefined}
          </VideoSlot>
        </Reveal>

        <Stagger as="ul" className="mt-16 grid grid-cols-1 border-t border-line md:grid-cols-3">
          {page.points.map((point, index) => (
            <StaggerItem key={point.name} as="li" className={cx("py-8", index > 0 ? "md:border-l md:border-line md:px-8" : "md:pr-8")}>
              <h2 className="text-heading text-fg">{point.name}</h2>
              <p className="mt-1.5 max-w-[20rem] text-ui text-fg-secondary">{point.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Container className="pt-8 pb-24 md:pb-32">
        <Reveal>
          <div className="flex flex-col items-center rounded-[28px] border border-line bg-surface px-6 py-14 text-center md:py-20">
            <WordsIn lines={[page.promise]} accent={page.accent} className="max-w-[36rem] text-title text-fg" />
            <div className="mt-9 flex w-full flex-col items-center">
              <Action page={page} placement="bottom" />
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

/** The page's one action: the founding checkout, or an email capture for a demand test. */
function Action({ page, placement }: { page: AdPage; placement: "top" | "bottom" }) {
  if (page.cta.kind === "founding") {
    return (
      <>
        <CTAButton placement={`go-${page.slug}-${placement}`} size="lg" withPrice />
        <p className="mt-4 text-ui-sm text-fg-muted">
          {formatPrice(offer.foundingPrice)} for the first {offer.foundingSpots.total} members ·{" "}
          {formatPrice(offer.launchPrice)} at launch · Full refund if it doesn&apos;t launch
        </p>
      </>
    );
  }
  return (
    <EmailCapture
      source={`go-${page.slug}-${placement}`}
      tag={page.cta.tag}
      cta={page.cta.label}
      success={page.cta.success}
      className="w-full text-left"
    />
  );
}
