import { hero } from "@/lib/content/home";
import { formatPrice, offer } from "@/lib/content/offer";
import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = hero.headline.join(" ");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    eyebrow: `Founding members · ${formatPrice(offer.foundingPrice)}`,
    title: hero.headline.join(" "),
    footnote: offer.course,
  });
}
