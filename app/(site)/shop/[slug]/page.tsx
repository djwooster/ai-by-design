import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageFallback } from "@/components/layout/PageFallback";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getProduct, products } from "@/lib/content/products";

type Params = PageProps<"/shop/[slug]">["params"];

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.summary } : {};
}

export default function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader label={`Shop · ${product.format}`} title={product.name} lede={product.summary} />
      <Container className="pb-24">
        <EmptyState stage="Stage 4" title="Product page">
          What&apos;s inside, a preview, the price and a Stripe Checkout button (wired in stage 5).
        </EmptyState>
      </Container>
    </>
  );
}
