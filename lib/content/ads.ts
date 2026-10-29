/**
 * Unlisted ad landing pages at /go/[slug]. Never in the nav or sitemap, always noindex.
 * Each page is the same template: promise, video, three points, the CTA, then the CTA again.
 */
export type AdPage = {
  slug: string;
  label: string;
  promise: string;
  /** A phrase in the promise to set in the accent color. */
  accent?: string;
  subline: string;
  /** `founding` sends to the Skool checkout; `email` collects interest for a demand test. */
  cta: { kind: "founding" } | { kind: "email"; tag: string; label: string; success: string };
  video: { src: string | null; length: string }; // [TODO: video]
  /** Three short reasons, shown as a row under the video. */
  points: { name: string; body: string }[];
};

export const adPages: AdPage[] = [
  {
    slug: "ship-your-app",
    label: "Founding members · $99",
    promise: "Ship your app to the App Store. Built with Claude Code.",
    accent: "Claude Code.",
    subline: "Learn the exact process I used to take FocusMode from idea to App Store review. $99 for the first 150 founding members.",
    cta: { kind: "founding" },
    video: { src: null, length: "[TODO] 2 min" },
    points: [
      { name: "The Method", body: "Six phases, from idea to App Store. Every one ends with something real." },
      { name: "Live calls", body: "Twice a week from January 1, 2027. Every call recorded." },
      { name: "A real app", body: "You build your own productivity app, not a tutorial project." },
    ],
  },
  {
    slug: "sourceiq",
    label: "SourceIQ · Early access",
    promise: "[TODO: copy] SourceIQ promise.",
    subline: "[TODO: copy] SourceIQ subline.",
    cta: {
      kind: "email",
      tag: "sourceiq-interest",
      label: "[TODO: copy] Get early access",
      success: "[TODO: copy] You're on the list. I'll email you when it opens.",
    },
    video: { src: null, length: "[TODO] 1 min" },
    points: [
      { name: "[TODO: copy] Point one", body: "[TODO: copy] What it does." },
      { name: "[TODO: copy] Point two", body: "[TODO: copy] Who it's for." },
      { name: "[TODO: copy] Point three", body: "[TODO: copy] Why now." },
    ],
  },
];

export function getAdPage(slug: string) {
  return adPages.find((page) => page.slug === slug);
}
