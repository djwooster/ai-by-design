import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container, Grid } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { formatPrice } from "@/lib/content/offer";
import { products } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "[TODO: copy] Playbooks, prompt packs and starter kits for shipping apps with Claude Code.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        label="Shop · Instant delivery"
        title="Tools from real builds."
        lede="[TODO: copy] Everything DJ uses to ship, packaged so you can use it today."
      />
      <Container className="pb-24">
        <Grid className="gap-y-4">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group col-span-4 md:col-span-4"
            >
              <Card className="flex h-full flex-col transition-colors duration-150 group-hover:border-line-strong">
                <SpecLabel parts={[String(index + 1).padStart(2, "0"), product.format]} />
                <h2 className="mt-10 text-heading text-fg">{product.name}</h2>
                <p className="mt-2 text-ui text-fg-secondary">{product.summary}</p>
                <SpecLabel className="mt-auto pt-8">
                  {product.price !== null
                    ? formatPrice(product.price)
                    : `${formatPrice(product.priceRange[0])}–${formatPrice(product.priceRange[1])} · [TODO: price]`}
                </SpecLabel>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </>
  );
}
