import { emailCourse } from "@/lib/content/emailCourse";
import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "The free 5-day email course";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free 5-day email course", title: emailCourse.title });
}
