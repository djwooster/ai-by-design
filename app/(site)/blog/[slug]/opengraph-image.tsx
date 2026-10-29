import { formatDate, getPost, posts } from "@/lib/content/posts";
import { ogContentType, ogImage, ogSize } from "@/lib/seo/og";

export const alt = "A post from the AI by Design blog";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({
    eyebrow: post ? `Blog · ${post.topic}` : "Blog",
    title: post?.title ?? "Notes from the build",
    footnote: post ? formatDate(post.date) : undefined,
  });
}
