# TODO

Find every placeholder with `grep -rn "\[TODO" app components lib`.

## Copy pass
- [ ] Every `[TODO: copy]` item (hero subline, section copy, product summaries, blog drafts, ad pages)
- [ ] Founding-member perks that later members won't get (section 08)
- [ ] SourceIQ demand-test page (`lib/content/ads.ts`)
- [ ] Legal text for `/privacy`, `/terms`, `/refunds` (`[TODO: legal]`)

## Assets from DJ
- [ ] Screenshots of FocusMode, RE-IQ and Coast Gallery for the proof cards
- [ ] A photo for the instructor section
- [ ] Optional: generated background images for the hero and card panels
- [ ] Why now image (`public/images/why-now-app-store.png`): regenerate or retouch without the "4.8 ★ · 12K ratings" row before launch. Invented ratings break the no-fake-numbers rule, even in a staged photo
- [ ] Check the hero's Claude Code prompts and file names against FocusMode's real build (`components/hero/BuildMorph.tsx`)

## Config to fill
- [ ] Skool checkout URL: `offer.checkoutUrl` in `lib/content/offer.ts` (founding CTAs scroll to `#offer` until it's set)
- [ ] Founding spots remaining: `offer.foundingSpots.remaining` (hidden while null)
- [ ] YouTube and Skool community URLs in `lib/content/site.ts`
- [ ] Shop prices in `lib/content/products.ts`
- [ ] Favicon and app icon in the site's style

## Stage 5: integrations (after design approval)
- [ ] Stripe Checkout and webhook for the shop
- [ ] Resend delivery email with expiring download links
- [ ] Vercel Blob for product files
- [ ] Resend audience and the checklist email sequence
- [ ] Vercel Analytics: replace the stub in `lib/analytics.ts`
- [ ] SEO/AIO layer: Open Graph images, JSON-LD (`Course`, `Product`, `Person`, `FAQPage`, `Organization`), `sitemap.xml` (without `/go/*`), `robots.txt` allowing AI crawlers, `llms.txt`, blog RSS
- [ ] Meta and Google ad pixels for `/go/*` pages

## Launch-dependent
- [ ] Real FocusMode App Store link, and flip its status to `approved` only once Apple approves it
- [ ] Intro video and the free lesson

## Later
- [ ] Light theme, if wanted (add a token block like `.theme-paper` in `app/globals.css`)
