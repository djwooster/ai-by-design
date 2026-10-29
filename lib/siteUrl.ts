import { site } from "@/lib/content/site";

/** The site's origin for absolute links: the env value in development and previews, the real domain otherwise. */
export function siteUrl(path = "") {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return new URL(path, origin).toString();
}
