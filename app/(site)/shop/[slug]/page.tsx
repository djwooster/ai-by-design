import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { PageFallback } from "@/components/layout/PageFallback";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { BuyButton } from "@/components/shop/BuyButton";
import { ProductCard } from "@/components/shop/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCover } from "@/components/shop/ProductCover";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { formatPrice } from "@/lib/content/offer";
import { delivery, getProduct, productPrice, products } from "@/lib/content/products";
import { productSchema } from "@/lib/seo/schema";

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

/** The cover and what's inside on the left; the price and Buy button stay in view on the right. */
async function Product({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const others = products.filter((p) => p.slug !== product.slug);
  const price = productPrice(product, formatPrice);

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <Container className="pt-10 md:pt-14">
        <Link href="/shop" className="text-ui-sm text-fg-muted transition-colors duration-150 hover:text-fg">
          ← Shop
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div>
            <Reveal>
              <Pill>
                <GeoIcon name={product.icon} size={14} />
                {product.format}
              </Pill>
            </Reveal>
            <WordsIn as="h1" lines={[product.name]} delay={0.1} className="mt-6 text-display text-fg" />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[36rem] text-lede text-fg-secondary">{product.description}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <ProductCover product={product} large />
            </Reveal>

            <h2 className="mt-16 text-heading text-fg">What&apos;s inside</h2>
            <Stagger as="ol" className="mt-5 border-t border-line">
              {product.includes.map((item, index) => (
                <StaggerItem key={item.name} as="li" className="flex gap-5 border-b border-line py-5">
                  <span className="pt-0.5 font-mono text-ui-sm text-fg-muted">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-ui text-fg">{item.name}</p>
                    <p className="mt-0.5 text-ui-sm text-fg-secondary">{item.note}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <aside className="lg:pt-[4.25rem]">
            <Reveal delay={0.25} className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
                <p className="text-ui text-fg-secondary">{product.name}</p>
                <p className="mt-4 font-mono text-[2.5rem] leading-none tracking-[-0.03em] text-fg">{price}</p>
                {product.price === null && <p className="mt-2 text-ui-sm text-fg-muted">[TODO: price] Planned range</p>}

                <div className="mt-8">
                  <BuyButton slug={product.slug} label={product.price !== null ? `Buy now · ${price}` : "Buy now"} />
                </div>

                <dl className="mt-8 space-y-3 border-t border-line pt-6 text-ui-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-muted">Delivery</dt>
                    <dd className="text-right text-fg">{delivery.how}</dd>
                  </div>
                  {product.specs.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-fg-muted">{label}</dt>
                      <dd className="text-right text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-ui-sm text-fg-muted">
                  {delivery.note}{" "}
                  <Link href="/refunds" className="underline underline-offset-[3px] transition-colors hover:text-fg">
                    Refund policy
                  </Link>
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>

      <Container className="py-24 md:py-32">
        <h2 className="text-title text-fg">More from the shop</h2>
        <Stagger className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-2">
          {others.map((other) => (
            <StaggerItem key={other.slug}>
              <ProductCard product={other} heading="h3" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}
