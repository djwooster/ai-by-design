/**
 * Unlisted ad landing pages at /go/[slug]. Never in the nav or sitemap, always noindex.
 */
export type AdPage = {
  slug: string;
  label: string;
  promise: string;
  subline: string;
  /** `founding` sends to the Skool checkout; `email` collects interest for a demand test. */
  cta: { kind: "founding" } | { kind: "email"; tag: string; label: string };
  video: string | null; // [TODO: video]
};

export const adPages: AdPage[] = [
  {
    slug: "ship-your-app",
    label: "Course",
    promise: "Ship your app to the App Store. Built with Claude Code.",
    subline: "[TODO: copy] Ad subline for the founding-member offer.",
    cta: { kind: "founding" },
    video: null,
  },
  {
    slug: "sourceiq",
    label: "SourceIQ demand test",
    promise: "[TODO: copy] SourceIQ promise.",
    subline: "[TODO: copy] SourceIQ subline.",
    cta: { kind: "email", tag: "sourceiq-interest", label: "[TODO: copy] Get early access" },
    video: null,
  },
];

export function getAdPage(slug: string) {
  return adPages.find((page) => page.slug === slug);
}
