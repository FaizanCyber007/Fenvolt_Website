# Fenvolt

The company site for Fenvolt — an AI engineering and staff augmentation practice. Built as a static-first Next.js application with an editorial "engineering dossier" design system.

## Stack

- Next.js 16.4 (App Router, Cache Components, Turbopack)
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
| `/contact` | Validated enquiry form with honest fallback |

## Content sources

All professional claims come from the supplied CV (`sample/Faizan Javed.pdf`), the supplied project videos (`sample/brag.mp4`, `sample/OpsNexus_Final.mp4`) and the original logo (`sample/fenvolt-dp.png`). No clients, testimonials, certifications, accuracy figures or adoption numbers are invented. Where a metric was not supplied, the site describes architecture and constraints instead.

The two product stills in `public/work/` are frames from the supplied SPECTER demo. The diagrams are original SVG/HTML built from the described architecture.

## Brand assets

- `public/brand/fenvolt-chip.png` — the supplied square mark, used in the header and footer.
- `src/app/icon.png` / `apple-icon.png` — derived from the same supplied mark at icon sizes.

The logo is never stretched, recoloured or replaced. On the ink footer the supplied black ground is blended away with `mix-blend-mode: screen`, which leaves the original white F and cyan slash untouched.

## Environment

Copy `.env.example` to `.env.local`. Without the Resend variables the contact form still validates and composes the message, then offers a prefilled mailto; it does not claim to have sent anything.

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
  assets/fonts/        Instrument Serif for the OG image
sample/                supplied source material (not deployed)
```

## Notes

- The contact form uses a honeypot and server-side validation. There is no rate limiter; put the deployment behind a platform with abuse protection before launch.
- `NEXT_PUBLIC_SITE_URL` must be set to the production origin; the default is a placeholder.
- See `TODOS.md` for anything awaiting confirmation.
