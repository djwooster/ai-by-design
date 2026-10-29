import { checklistPage } from "@/lib/content/checklist";
import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "The free App Store submission checklist";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free checklist", title: checklistPage.title });
}
