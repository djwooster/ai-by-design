# Build: ai-bydesign.dev — course and shop site (Phase 1: design direction)

Copied from the Notion page "ai-bydesign.dev — Course Site Build Prompt (Phase 1: Design Direction)" on Oct 28, 2026. **This is the source of truth.** It wins over `site-brief.md` wherever they differ.

## What we're building
The website for AI by Design, my school for people who want to build and ship their own apps
with AI: designers, aspiring founders and semi-technical builders who have an idea but haven't
shipped. Most visitors arrive from one of my YouTube videos (at least one a week), later from
paid ads, plus search and LLM discovery.

The site's jobs, in order:
1. Pre-sell my course, **Ship Your App with Claude Code**, to founding members. The single
   primary CTA everywhere is **"Become a founding member"**, which links to the course's Skool
   checkout (the course, its checkout and the community all live in Skool).
2. Sell digital products through a Stripe shop with instant delivery.
3. Grow my email list with a free App Store submission checklist.
4. Prove I ship real software (FocusMode, RE-IQ, Coast Gallery).
5. Feed YouTube and Skool.
6. Rank in search and get cited by LLMs.

There is no custom members platform. My personal site, djwooster.com, is separate and links here.

**This is Phase 1: design direction.** Build the design system, the layout and every page's
structure so I can judge the look and feel. Real copy, integrations and polish come in later
passes, after I review.

## How to approach this
- Treat sections and pages as hypotheses, not requirements. Build them so they are easy to
  change, remove or reorder: small components, all content in typed config, no logic buried
  in pages.
- It must feel premium: a product people would pay $249 for after seeing one page. Nothing
  generic, nothing templated, no default shadcn look.
- No lorem ipsum. Use the real decisions and copy below where they exist. Everywhere else,
  write short, plausible structural copy marked `[TODO: copy]` so I can find it.

## Working agreement (read first)
- **Do not QA or test in the browser.** No screenshots, no opening pages to verify, no visual
  checks. I do all visual testing myself.
- **Get it running first, polish later.** First goal: `npm run dev` starts without errors and
  every route renders.
- **Build in stages and stop between them.** After each stage, stop and give me a short summary
  (what's built, what's stubbed, anything you'd flag) and wait for me before continuing.
- **Keep checks lightweight.** A type check or build to confirm nothing is broken is fine. No
  test suites yet.
- **Ask instead of guessing** on anything that changes direction; make sensible defaults on
  small details and list them in your stage summary.

## Stages
1. Project setup, design tokens, fonts, layout shell (header, footer), every route with a clean
   empty state, and an internal `/design` page showing tokens and components. **Stop.**
2. Components and signature elements: Swiss numerals, spec-sheet labels, the isometric Method
   stack, the geometric icon set, buttons, cards, the email capture, motion primitives.
   **Stop.**
3. The homepage, every section in order, using the components. **Stop.**
4. Shop index and product pages, the free checklist page, the `/go/[slug]` ad template, the blog
   scaffold, and the legal pages. **Stop.**
5. (Only after I approve the design.) Wire Stripe, Resend and Vercel Blob, and the SEO/AIO
   layer.

## Who I am (for instructor and proof sections)
DJ Wooster, a product designer who has worked at US Bank, Memorial Sloan Kettering, National
Grid, Inbound Health (founding product designer) and Riverside Insights (an EdTech platform
serving millions). I use AI and Claude Code every day and build my own products:
- **FocusMode:** focus timer with a Live Activity, voice-first session notes and Pro
  subscriptions. Web app live; iPhone app in App Store review.
- **RE-IQ:** multifamily asset-management dashboard (re-iq.vercel.app).
- **Coast Gallery:** website for a luxury art gallery in Laguna Beach
  (coast-gallery.vercel.app).

## The offer (store in `lib/content/offer.ts`)
- Course: **Ship Your App with Claude Code.** Members design, build and ship a productivity
  iOS app to the App Store with Claude Code, following the AI by Design Method.
- Price: **$99 founding** for the first **150** founding members. **$249** at launch on
  **January 1, 2027**, rising as the course grows. Show the price roadmap publicly.
- Includes: the self-paced course and community in Skool, plus **2 live calls a week** with me
  from Jan 1, 2027 (Q&A, members' app reviews, live builds), all recorded.
- Guarantee (exact wording): "If the course doesn't launch, you get every dollar back. Once it
  does, you have 14 days to ask for a full refund, no questions asked."
- Skool checkout URL: `[TODO: Skool URL]`. Every "Become a founding member" button reads it
  from config.
- The founding-spots number shows only if it is real: read it from config, never animate a
  fake counter.

## The Method (signature content)
Six phases, in order: **Vision → Design → Build → Test → Ship → Launch.** The curriculum is
grouped by phase. Store phases, their one-line descriptions and their modules in
`lib/content/method.ts` with `[TODO: copy]` lesson titles.

## Messaging already decided
- Headline: **"Ship your app to the App Store. Built with Claude Code."** (two-tone: first
  sentence in full-strength text, second in secondary text).
- Why now: "Two years ago, shipping an iOS app meant learning Swift or hiring a developer for
  $20K+. Now a designer with Claude Code can ship one in weeks. I just did."
- Not for: people looking for a no-code drag-and-drop tool, experienced iOS engineers, or
  anyone wanting a get-rich-quick app.
- Honesty rules: never claim FocusMode is approved before Apple approves it (status comes from
  one config value: `in_review` | `approved`). Only real testimonials; until there are some,
  show none. No fake counters, no invented student numbers.

## Pages
- `/` **Home, doubling as the long course page.** Sections in order (each one's job):
  1. **Hero:** the promise, headline, the founding CTA with price and guarantee line below it,
     an intro video slot (`[TODO: video]`), and FocusMode shown on an iPhone frame with its
     status chip.
  2. **01 · Why now:** the shift AI made possible, in one strong statement.
  3. **02 · The Method:** the isometric stack, phase by phase. The site's signature.
  4. **03 · What you'll build:** the productivity iOS app, from idea to App Store.
  5. **04 · Curriculum:** modules grouped by phase, expandable.
  6. **05 · Live calls and community:** 2 calls a week, app reviews, Skool.
  7. **06 · Proof:** FocusMode, RE-IQ and Coast Gallery as product cards with live status.
  8. **07 · Your instructor:** credentials and the build-in-public story.
  9. **08 · Founding offer:** what's included, $99 now vs $249 at launch, the price roadmap,
     what founding members get that later members won't (`[TODO: copy]`).
  10. **09 · Guarantee.**
  11. **10 · Who it's for, and who it's not for.**
  12. **11 · FAQ:** expandable.
  13. **Free checklist:** email capture for the App Store submission checklist.
  14. **Final CTA.**
  15. Footer: shop, blog, YouTube, Skool, djwooster.com, legal links.
- `/shop` and `/shop/[slug]`: launch catalog of three products: App Store Submission Playbook
  ($19–39), Claude Code prompt and CLAUDE.md pack ($19–49), React Native and Claude Code
  starter kit ($49–149). Exact prices `[TODO]`. Products live in `lib/content/products.ts`.
- `/free/app-store-checklist`: opt-in page and a confirmation state.
- `/blog` and `/blog/[slug]`: MDX scaffold with three placeholder posts marked as drafts.
- `/go/[slug]`: reusable unlisted ad landing template (video, promise, offer, CTA), driven by
  config, `noindex`, excluded from the sitemap and nav. Seed two examples: the course, and a
  SourceIQ demand test.
- `/privacy`, `/terms`, `/refunds`: simple legal pages with `[TODO: legal]` text.
- Header: wordmark "AI by Design", nav (Method, Curriculum, Shop, Blog), and the primary CTA
  button, always visible.

## Stack
- Latest stable Next.js (App Router), React and TypeScript.
- Tailwind CSS v4 with design tokens as CSS variables.
- Motion (formerly Framer Motion) for animation.
- MDX for the blog.
- Stripe Checkout, Resend and Vercel Blob are planned for stage 5: design the UI and data layer
  for them now (e.g. `lib/shop/checkout.ts` stubbed), but don't wire them until I approve.
- Vercel Analytics, with named events for every CTA click and email signup (stubbed in
  stages 1–4).
- Add other libraries only when clearly needed.

## Design system
Feeling: a premium, precise instrument. Dieter Rams and Teenage Engineering discipline, the
restraint and tight spacing of Linear, Vercel, Supabase and Notion, and Swiss editorial
typography. Calm and confident; nothing shouts. Hierarchy comes from scale, weight and opacity.

**Theme:** dark-first. Occasional light sections (warm paper) for contrast, used sparingly
(for example the Method or the guarantee). Build tokens so a full light theme can be added
later, but ship dark only.

**Tokens (semantic CSS variables; components never hard-code colors):**
- `--bg` `#0B0E10` · `--surface` `#11161A` · `--surface-2` `#182025`
- `--border` cream at 8% opacity · `--border-strong` cream at 16%
- `--text-primary` `#ECE5D8` (warm cream) · `--text-secondary` and `--text-muted` as the same
  cream at about 70% and 50% opacity
- `--accent` `#6C9CB0` (sea blue) · `--accent-deep` `#16303C`
- Light sections: `--paper` `#ECE5D8` background, `--ink` `#0B0E10` text, `--accent-on-paper`
  `#3A6779`
- `--positive`, `--negative`, `--warning`: for states only
- Meet WCAG AA contrast everywhere. Verify every pairing.

**Color rules:** neutral by default. Sea blue is the only accent and appears at most once or
twice per viewport: the primary CTA, the active Method layer, a link, a focus ring. Primary
buttons are sea blue with near-black (`#0B0E10`) text; white text on sea blue fails contrast.
No gradients, no glows, no decorative color.

**Type:**
- Geist Sans for everything; Geist Mono, with tabular numbers, for labels, metadata, prices and
  numbers.
- Headlines are bold and Swiss: Geist at 700–900 weight, tight tracking (about -0.04em), large
  on desktop (up to about 96px for the hero), tight line height.
- **Swiss numerals as a motif:** each section is anchored by a huge bold number (`01`, `02`…)
  set in the grid.
- Spec-sheet labels: 11px Geist Mono, uppercase, tracked about 0.12em, e.g.
  `MODULE 02 · BUILD · 6 LESSONS`.
- Body 16px at 1.6 line height; small UI text 13–14px.

**Layout:**
- 12-column Swiss grid, max content width about 1200px. Show the grid: hairline dividers
  between sections, and small registration marks (`+`) at key intersections.
- Spacing is tight and intentional inside components (Linear-style), generous between sections.
- Mobile-first: works from 360px wide, no horizontal scroll.

**Signature elements:**
- **The isometric Method stack:** an SVG of six thin-line isometric layers (one per phase),
  drawn in cream hairlines on dark. As the visitor scrolls the Method section, the layers
  separate and the active one highlights in sea blue, with its phase name and description
  beside it in spec-sheet style. Reusable in smaller form elsewhere.
- **Geometric icon set:** custom icons built only from circles, arcs and lines (Braun and
  Bauhaus), for modules and shop products. Consistent stroke width.
- **FocusMode on an iPhone frame** in the hero, with its status chip.

**Components:** cards (surface, 1px border, `rounded-lg`, no shadows); small, tight buttons;
inputs with 1px border that strengthens on focus; badges (tiny, `rounded-full`); accordions for
curriculum and FAQ; an `EmailCapture` component with `source` and `tag` props; a `CTAButton`
that always reads the Skool URL from config. All interactive elements get `cursor-pointer`.

## Motion
Elegant, premium UI micro-animation, like Apple and Teenage Engineering, and like the tactile
interactions in FocusMode. Graceful, subtle, never over the top.
- Elements slide gently into place: fade plus 8–12px rise, 300–450ms, ease-out (or critically
  damped springs with no overshoot). Lists stagger at about 40ms.
- Tactile buttons: a brief, physical press (slight scale-down and settle) on click.
- Text can arrive as if being dictated (words fading in quickly in sequence) for one moment
  only, such as the hero subline.
- Numbers (prices, counts) animate between values with Motion's `animate()`.
- Two showpieces only: the Method stack separating on scroll, and the hero. Everything else
  stays quiet.
- No bounce, no infinite loops, no parallax overload. Respect `prefers-reduced-motion`
  everywhere.

## Content and SEO/AIO (structure now, fill later)
- All content in typed files under `lib/content/` (site, offer, method, curriculum, proof,
  products, faq, ad pages).
- Per-page metadata, Open Graph images in the site's style, JSON-LD (`Course`, `Product`,
  `Person`, `FAQPage`, `Organization`), `sitemap.xml`, `robots.txt` that allows AI crawlers,
  `llms.txt` and an RSS feed for the blog. `/go/*` pages are `noindex`.

## Deliverables
1. The site as described, running locally, built in the stages above.
2. A `TODO.md` at the repo root containing:
   - Copy pass: every `[TODO: copy]` item.
   - Stripe Checkout, webhook, Resend delivery email with expiring download links, Vercel Blob.
   - Resend audience and the checklist email sequence.
   - Real FocusMode App Store link and status flip at approval.
   - Intro video and the free lesson.
   - Light theme, if wanted.
   - Meta and Google ad pixels for `/go/*` pages.
3. A short `README.md`: how to run it, where content lives, how to change prices, founding
   spots and the FocusMode status.
