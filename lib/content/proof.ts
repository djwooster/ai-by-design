/**
 * Shipped software, shown as proof. FocusMode's App Store status is one value:
 * flip it to "approved" only after Apple approves the app.
 */
export type FocusModeStatus = "in_review" | "approved";

export const focusModeStatus = "in_review" as FocusModeStatus;

export const focusModeStatusLabel: Record<FocusModeStatus, string> = {
  in_review: "In App Store review",
  approved: "On the App Store",
};

export type ProofProduct = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  /** A mock-up in `public/images/proof`, or null until there is one. */
  image: { src: string; alt: string } | null;
  href: string | null;
  linkLabel?: string;
};

export const proof: ProofProduct[] = [
  {
    id: "focusmode",
    name: "FocusMode",
    kind: "iOS app · Web app",
    summary:
      "A focus timer with a Live Activity, voice-first session notes and Pro subscriptions. The web app is live; the iPhone app is in App Store review.",
    image: { src: "/images/proof/focusmode.png", alt: "FocusMode's Stats screen on an iPhone: a running work timer and a week of focus time" },
    href: null, // [TODO: FocusMode web app or App Store URL]
  },
  {
    id: "re-iq",
    name: "RE-IQ",
    kind: "Web app",
    summary: "A multifamily asset-management dashboard.",
    image: { src: "/images/proof/re-iq.png", alt: "RE-IQ's portfolio overview on an iPhone: revenue opportunities and the gap to budget by driver" },
    href: "https://re-iq.vercel.app",
    linkLabel: "re-iq.vercel.app",
  },
  {
    id: "coast-gallery",
    name: "Coast Gallery",
    kind: "Website",
    summary: "The website for a luxury art gallery in Laguna Beach.",
    image: { src: "/images/proof/coast-gallery.png", alt: "Coast Gallery's homepage on a laptop: an abstract painting in a sunlit room, under the line \"Work that rises off the wall.\"" },
    href: "https://coast-gallery.vercel.app",
    linkLabel: "coast-gallery.vercel.app",
  },
];
