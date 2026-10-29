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
    subline: "[TODO: copy] Ad subline for the founding-member offer.",
    cta: { kind: "founding" },
    video: { src: null, length: "[TODO] 2 min" },
    points: [
      { name: "The Method", body: "[TODO: copy] Six phases, idea to App Store." },
      { name: "Live calls", body: "[TODO: copy] Twice a week from Jan 1, 2027, all recorded." },
      { name: "A real app", body: "[TODO: copy] You ship your own productivity app, not a tutorial." },
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
