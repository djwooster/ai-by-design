import { faq } from "@/lib/content/faq";
import type { Post } from "@/lib/content/posts";
import { offer } from "@/lib/content/offer";
import type { Product } from "@/lib/content/products";
import { site } from "@/lib/content/site";

/*
 * schema.org data for each page type. Everything is read from the content
 * files, so it can't drift from what the page says. Offers appear only when
 * a real price is set.
 */

const origin = site.url;
const sameAs = site.elsewhere.map((link) => link.href).filter((href) => href.startsWith("http"));

export const organization = {
  "@type": "Organization",
  "@id": `${origin}/#organization`,
  name: site.name,
  url: origin,
  founder: { "@id": `${origin}/#person` },
};

export const person = {
  "@type": "Person",
  "@id": `${origin}/#person`,
  name: site.author,
  url: "https://djwooster.com",
  jobTitle: "Product designer",
  sameAs,
};

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      person,
      {
        "@type": "Course",
        name: offer.course,
        description: offer.promise,
        url: origin,
        provider: { "@id": `${origin}/#organization` },
        instructor: { "@id": `${origin}/#person` },
        offers: {
          "@type": "Offer",
          price: offer.foundingPrice,
          priceCurrency: offer.currency,
          category: "Founding member",
          availability: "https://schema.org/PreOrder",
          url: offer.checkoutUrl ?? `${origin}/#offer`,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          startDate: offer.launchDate,
          instructor: { "@id": `${origin}/#person` },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${origin}/shop/${product.slug}`,
    brand: { "@id": `${origin}/#organization` },
    ...(product.price !== null && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: offer.currency,
        availability: "https://schema.org/InStock",
        url: `${origin}/shop/${product.slug}`,
      },
    }),
  };
}

export function postSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: `${origin}/blog/${post.slug}`,
    author: person,
    publisher: { "@id": `${origin}/#organization` },
  };
}

