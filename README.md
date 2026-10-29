# ai-bydesign.dev

The site for AI by Design: the founding-member pre-sale of *Ship Your App with Claude Code*, a Stripe shop, a free App Store checklist and a blog. The spec is `docs/build-prompt.md`.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the keys you have
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type check
npm run lint
```

## Where things live

- **Content:** typed files in `lib/content/`. Pages only render it.
  - `offer.ts`: prices, launch date, founding spots, the Skool checkout URL, the guarantee
  - `home.ts`: homepage sections and their order
  - `products.ts` (shop, prices, Blob file paths), `checklist.ts`, `legal.ts`, `ads.ts` (unlisted `/go/[slug]` pages), `site.ts` (nav, footer, links)
  - `posts.ts` (blog index) with bodies as MDX in `content/blog/`, registered in `postBodies.ts`
- **Design tokens:** `app/globals.css`. Components use semantic names (`bg-canvas`, `text-fg-secondary`, `border-line`, `bg-accent`) and never raw colors. `.theme-light` and `.theme-blue` switch a card or section.
- **Components:** `components/ui/` (primitives) and `components/layout/` (header, footer, sections).
- **Design system page:** `/design` (internal, noindex).

## Common changes

- **Prices:** `foundingPrice`, `launchPrice` and `priceRoadmap` in `lib/content/offer.ts`.
- **Founding spots:** set `foundingSpots.remaining` to the real number from Skool. While it's `null` the site doesn't show a count.
- **Skool checkout:** set `checkoutUrl`. Every "Become a founding member" button reads it.
- **FocusMode status:** `focusModeStatus` in `lib/content/proof.ts`, `in_review` or `approved`. Flip it only after Apple approves.
- **Shop prices:** set `price` on each product in `lib/content/products.ts`. A product can't be bought while it's `null`.
- **A new blog post:** add `content/blog/<slug>.mdx`, its entry in `postBodies.ts` and its metadata in `posts.ts`. Set `draft: false` to publish it (drafts stay out of the sitemap, RSS and llms.txt, and are noindex).

## Integrations

Each one reads its keys from the environment (`.env.example` lists them all). With a key missing, that feature says so and the rest of the site works.

- **Shop: Stripe → webhook → Resend → Blob.** The Buy button creates a Checkout Session (`lib/shop/checkout.ts`). Stripe calls `/api/stripe/webhook`, which verifies the signature and, once the session is paid, emails a download link (`lib/shop/fulfill.ts`). The link is signed and expires after `delivery.linkDays` (`lib/shop/downloads.ts`); `/api/download/[token]` streams the file from the private Blob store.
  - Locally: `stripe listen --forward-to localhost:3003/api/stripe/webhook` prints the webhook secret.
  - In production: add the endpoint in the Stripe Dashboard for `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`.
  - Upload each product file to the Blob store (private) at the `file.pathname` in `products.ts`.
- **Email list: Resend.** Sign-ups join the Resend segment for their tag (`lib/email/subscribe.ts`); checklist sign-ups get the checklist email right away. Build the rest of each sequence as a Resend automation on its segment.
- **Analytics: Vercel Analytics.** Named events in `lib/analytics.ts`: founding CTA clicks (with placement), email sign-ups, product clicks, checkout starts.
- **SEO and AI search:** per-page metadata, Open Graph images (`lib/seo/og.tsx`), JSON-LD (`lib/seo/schema.ts`), `/sitemap.xml`, `/robots.txt` (AI crawlers allowed), `/llms.txt` and `/rss.xml`, all built from the content files.
- **Ad pixels:** Meta and Google Ads load on `/go/*` only, when their IDs are set.
