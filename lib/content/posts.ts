/**
 * Blog post index. Stage 4 moves the bodies to MDX; these three are drafts.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  draft: boolean;
};

export const posts: Post[] = [
  {
    slug: "shipping-focusmode-with-claude-code",
    title: "[TODO: copy] Shipping FocusMode with Claude Code",
    summary: "[TODO: copy] What it took to take a designer's app to App Store review.",
    date: "2026-11-01",
    draft: true,
  },
  {
    slug: "app-store-review-what-to-expect",
    title: "[TODO: copy] App Store review: what to expect",
    summary: "[TODO: copy] The submission steps that trip first-time builders up.",
    date: "2026-11-08",
    draft: true,
  },
  {
    slug: "claude-md-for-designers",
    title: "[TODO: copy] A CLAUDE.md for designers",
    summary: "[TODO: copy] How to set up a project so Claude Code builds what you designed.",
    date: "2026-11-15",
    draft: true,
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
