@AGENTS.md

# AI by Design — ai-bydesign.dev

DJ Wooster's school: the founding-member pre-sale of *Ship Your App with Claude Code* (the course, its checkout and the community all live in Skool; there is no custom members platform), a Stripe shop of digital products, a free App Store checklist and a blog.

- **Source of truth:** `docs/build-prompt.md` (the Phase 1 build prompt from Notion). It wins over everything else, including `docs/site-brief.md`, which is background.
- **Sister site:** djwooster.com (`../djwooster`) is DJ's personal site. Don't edit it from here. Reusable components from it sit in `../djwooster/themes/brand/` (see the brief).

## Stack

Next.js 16 (App Router, Cache Components on), TypeScript, Tailwind CSS v4, Motion for animation, MDX for the blog. Stripe, Resend and Vercel Blob are wired only in stage 5. Design tokens live in `app/globals.css`; content lives in typed files under `lib/content/`.

## Working agreement

- **DJ does all visual QA.** Never open the browser to check work. Verify with `npx tsc --noEmit` and `npm run lint`, then stop and summarize.
- **Don't run `npm run build` while the dev server is running.** It leaves the dev CSS stale.
- **Build in the prompt's stages and stop after each one** with a short summary: what's built, what's stubbed, the defaults chosen.
- **Plan together first** on anything that changes the product direction; make sensible defaults on small details and list them.
- Placeholder copy is always marked `[TODO: …]`. No fake testimonials, member counts or approval claims.
- Commit at logical milestones with the attribution trailer. Push only when asked.
