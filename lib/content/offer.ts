export type PriceStep = {
  label: string;
  price: number | null;
  when: string;
  current?: boolean;
};

export const offer = {
  course: "Ship Your App with Claude Code",
  promise:
    "Design, build and ship a productivity iOS app to the App Store with Claude Code, following the AI by Design Method.",
  cta: "Become a founding member",

  /** The Skool checkout. Until it's set, every founding CTA points at the offer section. */
  checkoutUrl: null as string | null, // [TODO: Skool URL]

  foundingPrice: 99,
  launchPrice: 249,
  currency: "USD",
  launchDate: "2027-01-01",

  /**
   * Founding spots. `remaining` shows on the site only when it's a real number
   * DJ has set from Skool; leave it null rather than guess.
   */
  foundingSpots: {
    total: 150,
    remaining: null as number | null,
  },

  liveCallsPerWeek: 2,

  priceRoadmap: [
    { label: "Founding", price: 99, when: "First 150 members", current: true },
    { label: "Launch", price: 249, when: "Jan 1, 2027" },
    { label: "Later", price: null, when: "Rising as the course grows" },
  ] satisfies PriceStep[],

  includes: [
    "The self-paced course and community in Skool",
    "2 live calls a week with DJ from Jan 1, 2027: Q&A, members' app reviews, live builds",
    "Every call recorded",
  ],

  guarantee:
    "If the course doesn't launch, you get every dollar back. Once it does, you have 14 days to ask for a full refund, no questions asked.",
};

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: offer.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
