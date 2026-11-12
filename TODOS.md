# TODOS

## Before launch — needs confirmation

- [ ] **Domain.** `NEXT_PUBLIC_SITE_URL` defaults to `https://fenvolt.com`. Confirm the real origin; it feeds canonical tags, the sitemap and OG URLs.
- [ ] **Published contact address.** The site uses `faizanjaved246@gmail.com` from the supplied CV. Replace with a company address if one exists.
- [ ] **Company legal name and location.** The footer says "Lahore, Pakistan" and "Fenvolt". Confirm both.
- [ ] **Contact delivery.** Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Until then the form validates, composes the message and offers a prefilled mailto rather than faking a send.
- [ ] **Booking link.** "Book a scoping call" points to `/contact`. If a Cal.com/Calendly account exists, swap the CTA target.

## Content that would strengthen the site

- [ ] A third-party reference or client quote (none are published, because none were supplied).
- [ ] Public accuracy or latency measurements for SPECTER, with the evaluation set documented.
- [ ] Links to live demos or videos for SPECTER and OpsNexus. The supplied MP4s are not published; only two stills are used.
- [ ] A team page, if there is a team to name.
- [ ] A short note on the SPECTER evaluation method, if the numbers are ever published.

## Deliberately deferred

- Blog / insights. No content pipeline yet; an empty blog is worse than none.
- Pricing page. No verified price points. Engagement shapes are described instead.
- Case study filtering on `/work`. Three projects do not need a filter.
- Localisation. The site is English; the projects are bilingual.
- Analytics. Not installed. Choose a privacy-respecting provider if wanted.
