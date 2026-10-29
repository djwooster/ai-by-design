import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { posts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "[TODO: copy] Notes on designing, building and shipping apps with Claude Code.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label="Blog"
        title="Notes from the build."
        lede="[TODO: copy] What I learn shipping real apps with Claude Code, written down as I go."
      />
      <Container className="pb-24">
        <ul className="border-t border-line">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-4 gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:gap-x-6"
              >
                <SpecLabel className="col-span-4 md:col-span-2 md:pt-1">{post.date}</SpecLabel>
                <div className="col-span-4 md:col-span-8">
                  <h2 className="text-heading text-fg transition-colors duration-150 group-hover:text-accent-fg">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-ui text-fg-secondary">{post.summary}</p>
                </div>
                {post.draft && (
                  <div className="col-span-4 md:col-span-2 md:justify-self-end md:pt-1">
                    <Badge tone="info">Draft</Badge>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
