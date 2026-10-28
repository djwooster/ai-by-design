@AGENTS.md

# AI by Design — ai-bydesign.dev

DJ Wooster's school: the founding-member pre-sale of *Ship Your App with Claude Code*, DJ's own members platform (course player, progress, the build and template library), a Stripe shop of digital products, a free App Store checklist and a blog. The community lives in Skool.

- **Strategy and decisions:** `docs/site-brief.md`. Its "Decisions since the brief" section wins over everything else.
- **Sister site:** djwooster.com (`../djwooster`) is DJ's personal site. Don't edit it from here. Reusable components from it sit in `../djwooster/themes/brand/` (see the brief).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4. Payments through Stripe. Design system to be designed with DJ; nothing is decided yet.

## Working agreement

- **DJ does all visual QA.** Never open the browser to check work. Verify with `npx tsc --noEmit` and `npm run lint`, then stop and summarize.
- **Don't run `npm run build` while the dev server is running.** It leaves the dev CSS stale.
- **Plan together first** on anything that changes the product direction; make sensible defaults on small details and list them.
- Placeholder copy is always marked `[TODO: …]`. No fake testimonials, member counts or approval claims.
- Commit at logical milestones with the attribution trailer. Push only when asked.
