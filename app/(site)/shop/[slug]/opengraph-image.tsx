import { formatPrice } from "@/lib/content/offer";
import { getProduct, productPrice, products } from "@/lib/content/products";
import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "A product from the AI by Design shop";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  return ogImage({
    eyebrow: product ? `Shop · ${product.format}` : "Shop",
    title: product?.name ?? "The shop",
    footnote: product && product.price !== null ? productPrice(product, formatPrice) : undefined,
  });
}
