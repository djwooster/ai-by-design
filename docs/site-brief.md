# ai-bydesign.dev — Site Brief

Oct 26, 2026 · DJ Wooster. Copied from the Notion brief on Oct 28 (written for djwooster.com, now moved here). **`docs/build-prompt.md` is the source of truth and wins over everything in this file.** The "Decisions since the brief" section below matches it; the original brief text after that is background, and its prices, checkout and section order are out of date.

## Decisions since the brief (Oct 28, updated to match the build prompt)

- **Source of truth:** `docs/build-prompt.md`, the Phase 1 build prompt from Notion.
- **Two sites.** ai-bydesign.dev is the school: the founding-member pre-sale, the Stripe shop, the free checklist and the blog. It matches DJ's YouTube and Skool name, so video viewers land on one brand. djwooster.com is the person, separate, and links here.
- **No custom members platform.** The course, its checkout and the community all live in Skool. Every "Become a founding member" button links to the Skool checkout. Stripe is for the shop only.
- **Founding offer:** $99 for the first 150 founding members. $249 at launch on Jan 1, 2027, rising as the course grows. The price roadmap is public.
- **Live calls with DJ, twice a week, from Jan 1, 2027.** Q&A, members' app reviews and live builds, all recorded.
- **Course format:** self-paced, in Skool.
- **What members build:** one productivity iOS app, designed, built and shipped to the App Store with Claude Code, following the AI by Design Method (Vision → Design → Build → Test → Ship → Launch).
- **Refund wording:** "If the course doesn't launch, you get every dollar back. Once it does, you have 14 days to ask for a full refund, no questions asked."
- **Proof:** FocusMode, RE-IQ and Coast Gallery (not SourceIQ; SourceIQ appears only as a `/go/` demand test).
- **Design system:** decided in the build prompt (dark-first graphite and sand, Geist, burnt-orange accent, Swiss numerals, isometric Method stack).
- **Reference:** futuredesigner.io (Kyle Skelly) for page structure, offer shape and depth of content. DJ and Claude design our own system; nothing is copied.
- **SEO and AIO matter.** The long, structured course page and the blog should be built to rank and to be cited by LLMs.
- **Reusable work** from djwooster.com sits in `../djwooster/themes/brand/`:
  - `components/landing/`: BuildLive (Claude Code building an iPhone app), LaunchMoment (App Store review to Get), LiveCall, IsoSteps and IPhone
  - `components/VideoPlayer.tsx` and `components/landing/CourseCta.tsx`
  - `app/vibe-code-a-mobile-app/page.tsx`: the ad landing page

## Overview (original brief)

The site is a leverage engine: assets DJ creates once and sells infinitely. Its primary job is pre-selling *Ship Your App with Claude Code*; its second is selling digital products through Stripe. Client work is welcome but never the headline.

**Why it matters:** this site serves a $1M net-worth mission now, and $700K a month in personal profit over time. Digital products target **$5M in total revenue**. SaaS (RE-IQ) is the sticky, recurring side of the business and runs separately.

## Primary audience

People who want to build and ship their own apps with AI: designers, aspiring founders and semi-technical builders who have an idea but haven't shipped.

- **How they arrive:** YouTube (at least one video a week), then paid ads once the offer is validated, plus search and LLM discovery through the blog.
- **What they already know:** usually just one video. They are meeting DJ for the first time.
- **What they need from the site:** proof that DJ actually ships real software, a clear promise, and a low-risk way to get in early.
- **Not the audience:** RE-IQ buyers (separate site), businesses hiring DJ for builds (djwooster.com), corporate training buyers (parked).

## Primary goal and conversion

The single goal is a **founding-member pre-sale** of *Ship Your App with Claude Code* ($495 at full launch). The single primary CTA, in the header, hero and closing section, is a button labeled **Become a founding member**.

- **Goes live now**, while FocusMode is in App Store review. The page tells that story honestly: "My app is in review right now. Join as a founding member and learn the exact process."
- **Founding offer:** $195, 150 spots, a stated launch date, and a full refund if the course doesn't ship.
- **Checkout:** Stripe. Founding members get access to the course and the Skool community at launch.
- **Validation bar:** one pre-sale proves people will pay, which is the signal to build the course. 5–10 sales from strangers is the bar for scaling paid ads.
- **For visitors not ready to buy:** a free App Store submission checklist captures their email, then a sequence moves them toward the pre-sale.
- **The full funnel and upsells** are a separate project. Leave a clearly marked post-purchase step where upsells will go later.

## Secondary goals, ranked

1. **Sell digital products through a Stripe-powered shop, live today.** Instant delivery, each item built once from work DJ already does. Starting catalog:
   - React Native and Claude Code starter kit ($49–149)
   - Claude Code prompt and workflow packs, including CLAUDE.md setups ($19–49)
   - Design system and UI kits ($29–99)
   - Dashboard and landing page templates ($49–199)
   - App Store Submission Playbook ($19–39)
2. **Grow the email list** with the free checklist, the main fallback for visitors not ready to buy.
3. **Prove DJ ships real software.** FocusMode, RE-IQ and SourceIQ appear as proof, not as offers.
4. **Feed YouTube and Skool.** The latest video on the homepage; Skool as where buyers end up.
5. **Get discovered.** The blog, structured data and `llms.txt`.
6. **Client work** lives on djwooster.com, never here.

## Core message

DJ ships real software with Claude Code, and he'll show you how to ship yours, all the way to the App Store. The proof is that he's doing it right now, in public.

| Option | Headline (two-tone: ink, then gray) | Subline |
| --- | --- | --- |
| **A (lead)** | Ship your app to the App Store. *Built with Claude Code.* | I design, build and ship real software with AI. Become a founding member and learn the exact process I'm using to launch FocusMode. |
| B | From idea to App Store. *No engineering team.* | The step-by-step system I use to design, build and publish real apps with Claude Code. |
| C | Stop prototyping. *Start shipping.* | Learn to take an app from idea to the App Store with Claude Code, from someone shipping one right now. |

**Rule:** no claim that FocusMode is approved until Apple approves it. All approval-based marketing is prepared now and released only at approval.

## What the hero shows

The belief a visitor must leave with in five seconds is: **he ships real apps, and I can learn to do it.**

- An iPhone frame running FocusMode, with a mono status chip: `IN APP STORE REVIEW` now, `ON THE APP STORE` at approval.
- A short hero video (DJ on camera plus screen capture, with animations made in Claude Design) about the build and submission, playable inline.
- Headline, subline and **Become a founding member** on the left; device and video on the right. On mobile, text first.
- Under the CTA, in small mono: the founding price, spots remaining, and "Full refund if it doesn't ship."
- Subtle, production-grade motion: the FocusMode timer actually running. No abstract decoration.

## Homepage section order (original brief; to be revisited against the futuredesigner.io structure)

1. **Hero:** the course promise, FocusMode on an iPhone, the hero video; *Become a founding member*.
2. **Proof: shipped software.** FocusMode, RE-IQ (links to its own site) and SourceIQ as product cards with live status.
3. **The course:** what you'll build, the module outline, who it's for, the founding offer and the refund guarantee.
4. **Follow the build:** the FocusMode App Store review story and the latest YouTube video.
5. **Shop:** three featured digital products with a link to the full shop.
6. **Free checklist:** email capture for the App Store submission checklist.
7. **About DJ:** designer turned software builder; product designer for multi-billion-dollar organizations who uses AI and Claude Code every day.
8. **Closing CTA:** *Become a founding member*, with the guarantee.
9. **Footer:** Writing, YouTube, Skool, djwooster.com, RE-IQ, social links.

**Header nav:** Course · Shop · About (plus Writing once it has three real posts), and the **Become a founding member** button.

## Cut or deferred

- "Join the waitlist": replaced by the founding-member pre-sale.
- Funnel upsells: a separate project; only the placeholder step is built now.
- Corporate AI education: parked. Audits for vibe coders: deferred. Claude Code for UX Designers: deferred until the first course is validated.
- Business-idea and ad landing pages: unlisted URLs, excluded from the nav and sitemap.
- The joint venture: off the site until it is live.
- FocusMode approval claims: prepared now, published only at approval.
- Testimonials: only real ones. No placeholders.

## Success metrics: first 90 days

| Metric | 90-day target |
| --- | --- |
| First founding-member pre-sale | Within 30 days (the signal to build the course) |
| Founding sales from people DJ doesn't know | 5–10 (the signal to scale paid ads) |
| Shop products live | 3+ today, growing from there |
| Shop sales | First sale within 30 days |
| YouTube videos published | 13+ (at least one a week) |
| Email subscribers from the checklist | [TODO: target] |
| Visitor-to-checkout rate on the course page | Tracked from day one to set the paid-ads budget |

- **Tracking:** Stripe sales by product and source, CTA clicks per section, email signups by source, and YouTube-to-site traffic.
- **Long-range targets:** $5M total digital-product revenue; $1M net worth; $700K a month in personal profit.
