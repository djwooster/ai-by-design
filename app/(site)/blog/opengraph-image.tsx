import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "The AI by Design blog";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "Notes from the build." });
}
