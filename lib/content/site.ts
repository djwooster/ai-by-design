export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** DJ's channels off this site, shared by the footer and the instructor section. */
const elsewhere: NavLink[] = [
  { label: "YouTube", href: "[TODO: YouTube URL]", external: true },
  { label: "Skool", href: "[TODO: Skool community URL]", external: true },
  { label: "djwooster.com", href: "https://djwooster.com", external: true },
];

export const site = {
  name: "AI by Design",
  url: "https://ai-bydesign.dev",
  description:
    "Learn to design, build and ship your own iOS app to the App Store with Claude Code, from a designer shipping one right now.",
  author: "DJ Wooster",
  /** Set by hand: Cache Components prerenders pages, so the footer can't read the clock. */
  copyrightYear: 2026,

  nav: [
    { label: "Method", href: "/#method" },
    { label: "Pricing", href: "/#offer" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
  ] satisfies NavLink[],

  elsewhere,

  footer: [
    {
      title: "Course",
      links: [
        { label: "The Method", href: "/#method" },
        { label: "Founding offer", href: "/#offer" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "All products", href: "/shop" },
        { label: "Free App Store checklist", href: "/free/app-store-checklist" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Elsewhere",
      links: elsewhere,
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Refunds", href: "/refunds" },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
};

/** Links still holding a `[TODO: …]` placeholder render as inert text, not broken hrefs. */
export function isPlaceholder(href: string) {
  return href.startsWith("[TODO");
}
