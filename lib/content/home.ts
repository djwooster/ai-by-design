/**
 * Homepage sections, in order. Reorder or remove here; each one's `job` is
 * what it has to do for the visitor.
 */
export type HomeSection = {
  id: string;
  numeral?: string;
  label: string;
  job: string;
  paper?: boolean;
};

export const homeSections: HomeSection[] = [
  { id: "why-now", numeral: "01", label: "Why now", job: "The shift AI made possible, in one strong statement." },
  { id: "method", numeral: "02", label: "The Method", job: "The isometric stack, phase by phase. The site's signature.", paper: true },
  { id: "build", numeral: "03", label: "What you'll build", job: "The productivity iOS app, from idea to App Store." },
  { id: "curriculum", numeral: "04", label: "Curriculum", job: "Modules grouped by phase, expandable." },
  { id: "live", numeral: "05", label: "Live calls and community", job: "2 calls a week, app reviews, Skool." },
  { id: "proof", numeral: "06", label: "Proof", job: "FocusMode, RE-IQ and Coast Gallery as product cards with live status." },
  { id: "instructor", numeral: "07", label: "Your instructor", job: "Credentials and the build-in-public story." },
  { id: "offer", numeral: "08", label: "Founding offer", job: "What's included, $99 now vs $249 at launch, the price roadmap." },
  { id: "guarantee", numeral: "09", label: "Guarantee", job: "The refund promise, in full.", paper: true },
  { id: "fit", numeral: "10", label: "Who it's for, and who it's not", job: "Help the right people say yes and the wrong ones say no." },
  { id: "faq", numeral: "11", label: "FAQ", job: "Expandable answers to the questions that block a purchase." },
  { id: "checklist", label: "Free checklist", job: "Email capture for the App Store submission checklist." },
  { id: "final", label: "Final CTA", job: "One last, calm ask to become a founding member." },
];
