import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "The AI by Design shop";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Shop · Instant delivery", title: "Tools from real builds." });
}
