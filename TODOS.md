# TODOS

## Before launch — needs confirmation

- [x] **Domain.** `fenvolt.com` is registered; `NEXT_PUBLIC_SITE_URL` defaults to `https://fenvolt.com` and feeds canonical tags, the sitemap and OG URLs.
- [ ] **Mailboxes.** The site publishes `hello@fenvolt.com` (new business) and `faizan@fenvolt.com` (founder, used on `/company`). Both need creating at the mail host, with SPF, DKIM and a DMARC record on the domain.
- [ ] **LinkedIn.** `site.socials` points at `linkedin.com/in/faizan-javed-b0267426a`; `site.companyLinkedIn` at `linkedin.com/company/fenvolt`. Confirm the company page has been published.
- [ ] **Company legal name and location.** The footer says "Lahore, Pakistan" and "Fenvolt". Confirm both.
- [ ] **Contact delivery.** The action is wired to Resend and defaults to `hello@fenvolt.com`. Add `RESEND_API_KEY`, set `CONTACT_FROM_EMAIL` to an address on the verified domain, and verify `fenvolt.com` in Resend (SPF + DKIM). Until the key exists the form composes the message and offers a prefilled mailto rather than faking a send.
- [ ] **Office address.** `/company` currently states "visits by appointment — address shared on confirmation". Replace with a street address if one should be public.
- [ ] **Booking link.** "Book a scoping call" points to `/contact`. If a Cal.com/Calendly account exists, swap the CTA target.

## Content that would strengthen the site

- [ ] A third-party reference or client quote (none are published, because none were supplied).
- [ ] Public accuracy or latency measurements for SPECTER, with the evaluation set documented.
- [ ] A short screen recording of SPECTER and OpsNexus cut for the web. The supplied reels pan and zoom across the UI, so this site uses stills from them rather than embedding the raw footage.
- [ ] A team page, if there is a team to name.
- [ ] A short note on the SPECTER evaluation method, if the numbers are ever published.

## Deliberately deferred

- Blog / insights. No content pipeline yet; an empty blog is worse than none.
- Pricing page. No verified price points. Engagement shapes are described instead.
- Case study filtering on `/work`. Three projects do not need a filter.
- Localisation. The site is English; the projects are bilingual.
- Analytics. Not installed. Choose a privacy-respecting provider if wanted.
