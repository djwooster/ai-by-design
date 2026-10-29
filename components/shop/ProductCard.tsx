"use client";

import Link from "next/link";
import { ProductCover } from "@/components/shop/ProductCover";
import { track } from "@/lib/analytics";
import { formatPrice } from "@/lib/content/offer";
import { productPrice, type Product } from "@/lib/content/products";

/** A shop card: the cover, then the name, the one-line summary and the price. */
export function ProductCard({ product, heading: Heading = "h2" }: { product: Product; heading?: "h2" | "h3" }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      onClick={() => track({ name: "product_click", slug: product.slug })}
      className="group flex h-full flex-col"
    >
      <ProductCover product={product} />
      <div className="flex flex-1 flex-col px-1 pt-5">
        <Heading className="text-heading text-fg">{product.name}</Heading>
        <p className="mt-1.5 text-ui text-fg-secondary">{product.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-mono text-ui text-fg">
            {productPrice(product, formatPrice)}
            {product.price === null && <span className="ml-2 text-fg-muted">[TODO: price]</span>}
          </span>
          <span className="text-ui-sm text-fg-muted transition-colors duration-150 group-hover:text-fg">
            {product.format} →
          </span>
        </div>
      </div>
    </Link>
  );
}
