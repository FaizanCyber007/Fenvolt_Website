# Fenvolt

The company site for Fenvolt — an engineering company in Lahore building capacity for product teams and AI systems for document-heavy work. Built as a static-first Next.js application with an editorial "engineering dossier" design system.

## Stack

- Next.js 16.4 (App Router, Turbopack)
- React 19.3, TypeScript strict
- Tailwind CSS v4 with tokens in `src/app/globals.css`
- Motion: `motion` (component and reveal states), GSAP + ScrollTrigger (pinned work track), Lenis (smooth scroll)
- `lucide-react` for the few icons, `clsx` + `tailwind-merge` behind `cn()`

## Commands

```bash
npm run dev        # local development
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Routes

| Route | Contents |
| --- | --- |
| `/` | Positioning, two service tracks, selected work, approach, stack, company, CTA |
| `/services` | Embedded/squad/white-label, AI engineering services, engagement models, fit |
| `/work` | Three featured case studies + archive |
| `/work/[slug]` | SPECTER, Document-Parser, OpsNexus |
| `/company` | Philosophy, six principles, founder background, scope limits |
| `/contact` | Validated enquiry form delivered by Resend |

## Content sources

All professional claims come from the supplied CV (`sample/Faizan Javed.pdf`), the supplied project videos (`sample/brag.mp4`, `sample/OpsNexus_Final.mp4`) and the original logo (`sample/fenvolt-dp.png`). Every project is presented as work delivered by Fenvolt. No testimonials, client logos, accuracy figures or adoption numbers have been added beyond what the supplied material supports.

The product stills in `public/work/` are frames pulled from the supplied SPECTER reel, selected for the clearest view of the running application. The diagrams are original SVG/HTML built from the described architecture.

All media in `public/media/` (`practice-*.webm`, `studio.webm`, `ink.webm` and their posters, plus the archival plates) is downloaded and served from this repository — nothing is hotlinked, and no imagery is taken from another agency's site. The video loops are royalty-free stock, cropped and colour-graded locally, and licensed for commercial use without attribution, which is why no source credit appears on the page.

## Brand assets

- `public/brand/fenvolt-chip.png` — the supplied square mark, used in the header and footer.
- `src/app/icon.png` / `apple-icon.png` — derived from the same supplied mark at icon sizes.

The logo is never stretched, recoloured or replaced. On the ink footer the supplied black ground is blended away with `mix-blend-mode: screen`, which leaves the original white F and cyan slash untouched.

## Environment

Copy `.env.example` to `.env.local`. The contact form posts to a server action, validates, and sends through Resend to `CONTACT_TO_EMAIL` with the visitor's address as reply-to. `RESEND_API_KEY` is required and `fenvolt.com` must be verified in Resend before mail will leave.

If the key is absent the form does not claim to have sent anything: it composes the message and offers a prefilled mailto.

Only `NEXT_PUBLIC_SITE_URL` is exposed to the browser. The Resend key and the mailbox addresses are read inside the server action and never enter the client bundle.

## Deploy to Cloudflare Workers

The site ships with the OpenNext adapter, pinned to the line that supports Next.js 16.4. `wrangler.jsonc` declares the Worker, static assets binding and the public contact variables; `open-next.config.ts` holds the adapter config.

**[DEPLOY.md](./DEPLOY.md) is the step-by-step first deployment**: domain on Cloudflare, Resend DNS and API key, receiving mail at `hello@`, the secret, custom domain, verification, rollback and hardening. This section is the short version.

```bash
npm run cf:build     # next build + .open-next bundle
npm run cf:preview   # run the Worker locally
npm run cf:deploy    # build and deploy
```

Cache Components is deliberately off. Its prerenderer relies on timers the Workers runtime can cancel, which turns every page into a 500 on `wrangler dev` and on the edge. Nothing here uses `use cache`, so the site builds static without it. If it is ever re-enabled, re-test the Worker before shipping.

Secrets are set once, outside the repo, and are encrypted at rest:

```bash
npx wrangler secret put RESEND_API_KEY
```

Then attach `fenvolt.com` under Workers → `fenvolt-site` → Settings → Domains & Routes. The default origin in `src/constants/site.ts` is already `https://fenvolt.com`; set `NEXT_PUBLIC_SITE_URL` in the build environment only if the domain changes, because canonical and OG URLs are generated at build time.

Image optimisation is disabled (`images.unoptimized`) because Workers has no Sharp at runtime. The supplied stills and logo are already sized and compressed; if the site later needs runtime resizing, enable Cloudflare Images and wire the binding instead.

Security headers are set in `next.config.ts` (nosniff, frame options, referrer policy, HSTS). `nodejs_compat` is on for the Node APIs Next needs.

## Structure

```
src/
  app/                 routes, metadata, sitemap, robots, OG image, contact action
  components/
    layout/            header, footer
    sections/          homepage + shared sections
    ui/                button, section head
    visuals/           plates and diagrams (original)
    motion/            reveal, cursor, smooth scroll
    forms/             contact form
  constants/           site, services, projects, case studies, company
  lib/                 metadata, contact validation, utils
  assets/fonts/        Archivo for the OG image
sample/                supplied source material (not deployed)
```

## Notes

- The contact form uses a honeypot and server-side validation. There is no rate limiter in the app; add a Cloudflare WAF rate-limiting rule on `POST /contact` as described in DEPLOY.md.
- `NEXT_PUBLIC_SITE_URL` must be set to the production origin; the default is a placeholder.
- See `TODOS.md` for anything awaiting confirmation.
