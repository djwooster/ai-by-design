import type { MetadataRoute } from "next";
import { posts } from "@/lib/content/posts";
import { products } from "@/lib/content/products";
import { site } from "@/lib/content/site";

/** Every public page. Leaves out /go/* (ad pages), /design, the thanks page and draft posts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/shop"), changeFrequency: "weekly", priority: 0.8 },
    ...products.map((product) => ({ url: url(`/shop/${product.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/free/app-store-checklist"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/free/5-day-course"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...posts
      .filter((post) => !post.draft)
      .map((post) => ({ url: url(`/blog/${post.slug}`), lastModified: post.date, priority: 0.6 })),
    ...["/privacy", "/terms", "/refunds"].map((path) => ({ url: url(path), priority: 0.2 })),
  ];
}
