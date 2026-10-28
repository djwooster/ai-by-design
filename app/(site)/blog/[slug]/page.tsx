import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageFallback } from "@/components/layout/PageFallback";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getPost, posts } from "@/lib/content/posts";

type Params = PageProps<"/blog/[slug]">["params"];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    robots: post.draft ? { index: false } : undefined,
  };
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: { params: Params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        label={`Blog · ${post.date}${post.draft ? " · Draft" : ""}`}
        title={post.title}
        lede={post.summary}
      />
      <Container className="pb-24">
        <EmptyState stage="Stage 4" title="Post body">
          The MDX body, set in the editorial type scale.
        </EmptyState>
      </Container>
    </>
  );
}
