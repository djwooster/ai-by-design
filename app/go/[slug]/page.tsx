import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageFallback } from "@/components/layout/PageFallback";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { adPages, getAdPage } from "@/lib/content/ads";

type Params = PageProps<"/go/[slug]">["params"];

export function generateStaticParams() {
  return adPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/go/[slug]">): Promise<Metadata> {
  const page = getAdPage((await params).slug);
  return page ? { title: page.promise, description: page.subline } : {};
}

export default function AdPage({ params }: PageProps<"/go/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Ad params={params} />
    </Suspense>
  );
}

async function Ad({ params }: { params: Params }) {
  const page = getAdPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader label={page.label} title={page.promise} lede={page.subline} />
      <Container className="pb-24">
        <EmptyState stage="Stage 4" title="Ad landing template">
          Video, promise, offer and {page.cta.kind === "founding" ? "the founding CTA" : "an email capture"}, all
          driven by <code className="font-mono text-ui-sm">lib/content/ads.ts</code>.
        </EmptyState>
      </Container>
    </>
  );
}
