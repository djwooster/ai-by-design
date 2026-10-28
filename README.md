# ai-bydesign.dev

The site for AI by Design: the founding-member pre-sale of *Ship Your App with Claude Code*, a Stripe shop, a free App Store checklist and a blog. The spec is `docs/build-prompt.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type check
npm run lint
```

## Where things live

- **Content:** typed files in `lib/content/`. Pages only render it.
  - `offer.ts`: prices, launch date, founding spots, the Skool checkout URL, the guarantee
  - `home.ts`: homepage sections and their order
  - `products.ts`, `posts.ts`, `ads.ts` (unlisted `/go/[slug]` pages), `site.ts` (nav, footer, links)
- **Design tokens:** `app/globals.css`. Components use semantic names (`bg-canvas`, `text-fg-secondary`, `border-line`, `bg-accent`) and never raw colors. `.theme-paper` switches a section to warm paper.
- **Components:** `components/ui/` (primitives) and `components/layout/` (header, footer, sections).
- **Design system page:** `/design` (internal, noindex).

## Common changes

- **Prices:** `foundingPrice`, `launchPrice` and `priceRoadmap` in `lib/content/offer.ts`.
- **Founding spots:** set `foundingSpots.remaining` to the real number from Skool. While it's `null` the site doesn't show a count.
- **Skool checkout:** set `checkoutUrl`. Every "Become a founding member" button reads it.
- **FocusMode status:** one config value, `in_review` or `approved` (added with the proof section in stage 3). Flip it only after Apple approves.
