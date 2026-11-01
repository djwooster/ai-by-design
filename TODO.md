# TODO

Find every placeholder with `grep -rn "\[TODO" app components lib`.

## Copy pass
First draft written Oct 29 (find it all with `git show` on the "copy draft" commit). Left for DJ:
- [ ] Read the draft through and rewrite anything that doesn't sound like you
- [ ] Write the 5 emails for the free email course and match the day titles on /free/5-day-course
- [ ] `[TODO: confirm]`: claims only DJ can make (`grep -rn "TODO: confirm" app components lib`)
  - Founding perks, and whether founding is one payment or a Skool subscription (`lib/content/home.ts`)
  - What each shop product contains (`lib/content/products.ts`)
  - The checklist items and the email sequence (`lib/content/checklist.ts`, `lib/email/templates.ts`)
- [ ] Lesson titles for every module: first draft is in `lib/content/method.ts` (`[TODO: confirm]`); rewrite to match the real course
- [ ] The three blog posts: bodies are outlines; they need your real story (`content/blog/`)
- [ ] SourceIQ demand-test page (`lib/content/ads.ts`)
- [ ] Legal text for `/privacy`, `/terms`, `/refunds` (`[TODO: legal]` in `lib/content/legal.ts`)

## Assets from DJ
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

## Stage 5: accounts and keys (the code is in; see README → Integrations)
- [ ] Stripe: a sandbox, a restricted key (Checkout Sessions write), the webhook endpoint and its secret
- [ ] Resend: verify the ai-bydesign.dev domain, an API key, segments for the checklist, SourceIQ and the 5-day email course, and the sequence as an automation on each (the course automation sends Day 1 right away, then one a day)
- [ ] Write the delivery and checklist emails (`lib/email/templates.ts`, `[TODO: copy]`)
- [ ] Vercel Blob: a private store, then upload the three product files at their `file.pathname`
- [ ] `DOWNLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `CHECKLIST_URL` in Vercel
- [ ] Turn on Web Analytics in the Vercel project
- [ ] Meta Pixel and Google Ads IDs once ads run
- [ ] Before launch: Stripe's go-live checklist, and a real test purchase end to end
- [ ] `npm audit` flags zod inside `@vercel/blob`'s CLI tooling (not used at runtime); the suggested fix downgrades Blob, so wait for an upstream update

## Launch-dependent
- [ ] Real FocusMode App Store link, and flip its status to `approved` only once Apple approves it
- [ ] Intro video and the free lesson
- [ ] "Meet DJ" video for /free/5-day-course

## Later
- [ ] Light theme, if wanted (add a token block like `.theme-paper` in `app/globals.css`)

- [ ] Make the site sell more than one course: a /courses index with a page per course, and the homepage as the front door for the whole school (see memory note)
