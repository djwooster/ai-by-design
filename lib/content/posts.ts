/**
 * Blog post index: title, summary and date for each post. Bodies are MDX in
 * `content/blog` (see `postBodies.ts`). Drafts are listed but noindex.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  /** Shown as the post's topic, e.g. "Build log". */
  topic: string;
  draft: boolean;
};

export const posts: Post[] = [
  {
    slug: "shipping-focusmode-with-claude-code",
    title: "How I shipped FocusMode with Claude Code",
    summary: "What it took to get a designer's app from Figma to App Store review.",
    date: "2026-11-01",
    topic: "Build log",
    draft: true,
  },
  {
    slug: "app-store-review-what-to-expect",
    title: "App Store review: what to expect the first time",
    summary: "The submission steps that trip first-time builders up, and how to get past them.",
    date: "2026-11-08",
    topic: "App Store",
    draft: true,
  },
  {
    slug: "claude-md-for-designers",
    title: "A CLAUDE.md for designers",
    summary: "How to set up a project so Claude Code builds what you designed.",
    date: "2026-11-15",
    topic: "Claude Code",
    draft: true,
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** "2026-11-01" → "Nov 1, 2026", read as a calendar date (no time zone shift). */
export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
