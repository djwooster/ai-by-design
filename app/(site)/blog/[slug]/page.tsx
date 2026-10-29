import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { PageFallback } from "@/components/layout/PageFallback";
import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Prose } from "@/components/prose/elements";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { checklist } from "@/lib/content/home";
import { postBodies } from "@/lib/content/postBodies";
import { formatDate, getPost, posts } from "@/lib/content/posts";
import { site } from "@/lib/content/site";
import { postSchema } from "@/lib/seo/schema";

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

/** The title block, the MDX body at a reading measure, then the checklist sign-up. */
async function Post({ params }: { params: Params }) {
  const slug = (await params).slug;
  const post = getPost(slug);
  const load = postBodies[slug];
  if (!post || !load) notFound();
  const { default: Body } = await load();

  return (
    <article>
      <JsonLd data={postSchema(post)} />
      <Container className="pt-10 md:pt-14">
        <div className="mx-auto max-w-[40rem]">
          <Link href="/blog" className="text-ui-sm text-fg-muted transition-colors duration-150 hover:text-fg">
            ← Blog
          </Link>
          <Reveal className="mt-10">
            <p className="flex items-center gap-3 text-ui-sm text-fg-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              {post.topic}
              {post.draft && <Badge tone="info">Draft</Badge>}
            </p>
          </Reveal>
          <WordsIn as="h1" lines={[post.title]} delay={0.1} className="mt-5 text-display text-fg" />
          <Reveal delay={0.3}>
            <p className="mt-6 text-lede text-fg-secondary">{post.summary}</p>
            <p className="mt-8 flex items-center gap-3 border-b border-line pb-8 text-ui-sm text-fg-secondary">
              <span className="flex size-7 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-on-accent">
                DJ
              </span>
              {site.author}
            </p>
          </Reveal>
        </div>
      </Container>

      <Container className="pt-10 pb-20">
        <Reveal delay={0.4}>
          <Prose className="mx-auto">
            <Body />
          </Prose>
        </Reveal>
      </Container>

      <Container className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[40rem] rounded-2xl border border-line bg-surface p-6 md:p-8">
          <p className="text-heading text-fg">{checklist.title}</p>
          <p className="mt-1.5 text-ui text-fg-secondary">{checklist.body}</p>
          <EmailCapture source={`blog-${post.slug}`} tag="app-store-checklist" className="mt-6" />
        </div>
      </Container>
    </article>
  );
}
