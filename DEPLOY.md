# Deploying Fenvolt to Cloudflare

The site is a Next.js 16 app on the OpenNext Cloudflare adapter. Everything the
build needs is already committed: `wrangler.jsonc` (Worker, assets, public vars),
`open-next.config.ts`, and the `cf:*` scripts. What is left is account setup,
one secret, and attaching the domain — all of which need your login, so they
cannot be done from the repo alone.

Total time: about 25 minutes, most of it waiting for DNS.

- Worker bundle: **~1.5 MB gzipped** (limit is 3 MB on the free plan).
- Static assets: 67 files, 8 MB total, including the video loops.
- Runtime: Workers Free is enough. Resend Free covers 3,000 emails/month.

**The short version**, once the domain is on Cloudflare and Resend shows the
sending domain as verified:

```bash
npx wrangler login
npx wrangler secret put RESEND_API_KEY    # paste the re_... key
npm run cf:deploy
```

Then add `fenvolt.com` as a custom domain on the Worker, turn on Email Routing
for `hello@`, and send a test through `/contact`. The sections below explain each
step, the DNS records, and what to do when something fails.

---

## 0. What you need before starting

| Thing | Why | Cost |
| --- | --- | --- |
| Cloudflare account | Hosts the Worker, DNS and mail routing | Free |
| `fenvolt.com` in that account | Custom domain + Resend DNS records | ~$10/yr if you move the registration |
| Resend account | Sends contact-form email | Free (3k/month) |
| Node 20.9+ and this repo | Build and deploy | — |

Check the repo is clean and builds before touching Cloudflare:

```bash
npm ci
npm run build
npm run cf:build
```

`cf:build` writes `.open-next/`. The last line should read
`OpenNext build complete`.

---

## 1. Put `fenvolt.com` on Cloudflare

Skip if the domain already shows as **Active** in the Cloudflare dashboard.

1. Dashboard → **Add a site** → `fenvolt.com` → Free plan.
2. Cloudflare gives you two nameservers. At your registrar, replace the existing
   nameservers with those two.
3. Wait for the zone to go **Active** (minutes to a few hours). Everything below
   needs this first — Resend and Email Routing both write DNS records into the
   zone.

If the domain stays registered elsewhere, that is fine: Cloudflare only needs to
be the DNS host, not the registrar.

---

## 2. Create the Resend key and verify the sending domain

The contact form posts to a server action that calls Resend's API with
`RESEND_API_KEY`. Without the key it degrades to a prefilled `mailto:` — by
design, it never claims to have sent something it did not.

1. Sign up at <https://resend.com>, then **Domains → Add Domain** →
   `fenvolt.com`, region closest to Lahore (or EU/US if you prefer).
2. Resend shows DNS records under the domain's **Records** tab. Add them in
   Cloudflare → **DNS → Records**. The classic layout is three records, all
   **DNS only** (grey cloud, proxy off):

   | Type | Name | Content |
   | --- | --- | --- |
   | MX | `send` | `feedback-smtp.<region>.amazonses.com`, priority 10 |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` |
   | TXT | `resend._domainkey` | the long `p=MIGf...` DKIM key |

   Domains added since August 2026 are often given **CNAME** records instead of
   the TXT/MX rows above. Whichever rows the Records tab lists is what you
   publish; the table is the shape, not a substitute. Copy the literal values —
   never retype a DKIM key.

3. Click **Verify DNS Records** in Resend. It usually turns green within a few
   minutes once the zone is active.

4. Optional but recommended: add a DMARC record so receivers know what to do
   with mail that fails the checks.

   | Type | Name | Content |
   | --- | --- | --- |
   | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@fenvolt.com` |

   Start at `p=none` (monitor only). Tighten to `quarantine` after a few weeks
   of clean reports.
5. **API Keys → Create API Key** → permission **Sending access**, limited to
   `fenvolt.com`. Copy it immediately; it is shown once. It starts with `re_`.

> **Only one SPF record per name.** If Resend ever asks for an SPF record on the
> root (`@`) and Email Routing in step 3 has already created one, merge the
> includes into that single TXT (`v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all`)
> instead of adding a second record. Two SPF records break both senders.

---

## 3. Receive mail at `hello@fenvolt.com`

The site publishes `hello@fenvolt.com` for new business and `faizan@fenvolt.com`
on `/company`. The form sends *to* `hello@`, so it must be a real, monitored
inbox — Cloudflare Email Routing forwards it for free.

1. Dashboard → **Email → Email Routing** → **Enable Email Routing**. Accept the
   MX/SPF records it offers to add (it creates `route1/2/3.mx.cloudflare.net`
   and an SPF TXT on the root).
2. **Destination addresses** → add your personal address → click the
   verification link Cloudflare emails you.
3. **Routing rules → Custom addresses** → create two:
   - `hello@fenvolt.com` → your destination
   - `faizan@fenvolt.com` → your destination
4. Optional: **Catch-all** → send `*@fenvolt.com` to the same inbox so typos in
   a prospect's reply still arrive.

If you would rather have real mailboxes (Gmail/Workspace/Zoho), do that instead —
add the provider's MX records and skip Email Routing. Either way, `hello@` must
accept mail before launch.

---

## 4. Log in to Cloudflare from this machine

```bash
npx wrangler login
npx wrangler whoami
```

The first command opens a browser; approve the **Workers** permission. `whoami`
must print your account name and ID. If it says "not authenticated", the deploy
will fail the same way.

Confirm the Worker name is free (or already yours):

```bash
npx wrangler deployments list
```

---

## 5. Set the one secret

Only the Resend key is a secret. The two contact addresses are non-secret vars
already declared in `wrangler.jsonc` and deployed with the code.

```bash
npx wrangler secret put RESEND_API_KEY
```

Paste the `re_...` key at the prompt. It is encrypted at rest and never appears
in the repo or in `wrangler.jsonc`. To rotate it later, run the same command.

Check what the Worker will see (names only, values are not readable):

```bash
npx wrangler secret list
```

---

## 6. Build and deploy

```bash
npm run cf:deploy
```

That runs `opennextjs-cloudflare build` and then `wrangler deploy` — roughly two
minutes. Success ends with a URL like
`https://fenvolt-site.<account>.workers.dev`.

Before the domain is attached, check it there:

```bash
curl -I https://fenvolt-site.<account>.workers.dev
curl -s https://fenvolt-site.<account>.workers.dev | head -20
```

Two ways to smoke-test the Worker before going live:

```bash
cp .dev.vars.example .dev.vars   # local-only secrets for cf:preview
npm run cf:preview               # local Workers runtime, closest to production
npx wrangler tail --format pretty   # live logs from the deployed Worker
```

`.dev.vars` is gitignored and only used by the local Worker; production reads the
secret set in step 5. `cf:preview` is worth one run: it exercises the real
`workerd` runtime, where `AbortSignal.timeout`, `fetch` and the server action
must all behave.

---

## 7. Attach the domain

Dashboard → **Workers & Pages → fenvolt-site → Settings → Domains & Routes** →
**Add → Custom domain** → `fenvolt.com` → **Add domain**.

Cloudflare creates the DNS record and the certificate itself. It goes live once
the status reads **Active** (usually a minute or two).

Alternative, in `wrangler.jsonc`, replace the comment at the bottom with:

```jsonc
"routes": [{ "pattern": "fenvolt.com", "custom_domain": true }]
```

Then redeploy with `npm run cf:deploy`. Use one method or the other, not both.

### www and https

1. **SSL/TLS → Overview** → encryption mode **Full (strict)**.
2. **SSL/TLS → Edge Certificates** → enable **Always Use HTTPS**.
3. **Rules → Redirect Rules → Create rule**:
   - Name: `www to apex`
   - If: `http.host eq "www.fenvolt.com"`
   - Then: **Dynamic redirect**, expression
     `concat("https://fenvolt.com", http.request.uri.path)`,
     status **301**, preserve query string.
4. Add `www.fenvolt.com` as a **second custom domain** on the Worker, so the
   redirect rule has something to intercept.

The canonical URL is compiled into the HTML at build time from
`NEXT_PUBLIC_SITE_URL`, which already defaults to `https://fenvolt.com`. Only set
that variable if the production origin ever changes, and set it *before*
`cf:build`, because the value is baked into the markup and OG tags.

---

## 8. Verify it end to end

Run these against the live domain:

```bash
curl -I https://fenvolt.com                     # 200, HSTS present
curl -I http://fenvolt.com                      # 301 to https
curl -I https://www.fenvolt.com                 # 301 to apex
curl -s https://fenvolt.com/sitemap.xml | head  # absolute fenvolt.com URLs
curl -s https://fenvolt.com/robots.txt
curl -s https://fenvolt.com/services | grep -c "Four practices"
```

Then the part only a browser can confirm:

1. Open `https://fenvolt.com/contact`, fill the form and send.
2. Expect **"Message sent"** and a real email at `hello@` within a minute or
   two, with the visitor's address as **reply-to**.
3. Reply to that email — it should go to the visitor, not to yourself.
4. If you instead see *"Email delivery is not configured on this deployment
   yet"*, the secret is missing or was set on a different Worker name. Redo
   step 5, then `npx wrangler tail` and send again.
5. Check the videos play on `/services` and `/company`, and that the page is not
   slow on a phone (the loops lazy-load off-screen).

Finally, in Resend → **Emails**, confirm the message shows **Delivered**, not
bounced. A bounce here almost always means the DKIM/SPF records from step 2 are
missing or still propagating.

---

## 9. Day-to-day operations

| Task | Command / place |
| --- | --- |
| Ship a change | `npm run cf:deploy` |
| Roll back | `npx wrangler rollback <version-id>` (from `deployments list`) |
| See versions | `npx wrangler deployments list` |
| Live logs | `npx wrangler tail --format pretty` |
| Rotate the key | `npx wrangler secret put RESEND_API_KEY` |
| Change contact address | edit `vars` in `wrangler.jsonc`, redeploy |
| Errors / traffic | Dashboard → Workers → fenvolt-site → Metrics, Logs |

Each deploy creates a new immutable version, so a rollback is instant and does
not require a rebuild. Static assets are cached at the edge; a redeploy
invalidates them automatically because asset names are content-hashed. If an
image ever looks stale, purge it under **Caching → Configuration → Purge**.

### Optional: deploy from GitHub

If you want `git push` to deploy, add `CLOUDFLARE_API_TOKEN` (template **Edit
Cloudflare Workers**) and `CLOUDFLARE_ACCOUNT_ID` as repository secrets, then
commit this as `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run cf:build
        env:
          NEXT_PUBLIC_SITE_URL: https://fenvolt.com
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

The secret itself is not needed in CI: it already lives on the Worker.

---

## 10. Hardening worth doing once

- **Rate-limit the form.** There is no limiter in the app. Dashboard →
  **Security → WAF → Rate limiting rules** → new rule: when
  `http.request.method eq "POST"` and `http.request.uri.path eq "/contact"`,
  allow 10 requests per minute per IP, action **Block** for 10 minutes. That
  stops a bot hammering Resend and burning your quota.
- **Bot Fight Mode** → on (Security → Bots). Cheap, no config.
- **Turn off `workers.dev`** once the domain works, so the site only answers on
  `fenvolt.com`: Workers → fenvolt-site → Settings → Domains & Routes →
  disable the `workers.dev` route.
- **Keep the secret out of git.** `.env.local` is ignored; production uses
  `wrangler secret`. Never put the Resend key in `wrangler.jsonc` `vars` — those
  are readable in the dashboard and in the deployed script.

---

## 11. If something breaks

| Symptom | Cause | Fix |
| --- | --- | --- |
| `wrangler` says not authenticated | OAuth expired | `npx wrangler login` |
| Deploy fails: "workers.api.error.unauthorized" | Token lacks Workers Edit | recreate the token with the **Edit Cloudflare Workers** template |
| 500 on every route | stale `.open-next`, or Cache Components re-enabled | `rm -rf .open-next && npm run cf:build`; keep `use cache` out (see README) |
| 404 on `/media/*.webm` | assets not rebuilt | `npm run cf:build`, redeploy, hard-refresh |
| Form says delivery is not configured | `RESEND_API_KEY` missing on this Worker | step 5, then `wrangler tail` |
| Form returns "could not send" | Resend rejected: domain unverified | finish step 2, confirm **Verified** |
| Email arrives in spam | DKIM/SPF not applied | re-check the three DNS records, wait for propagation |
| Mail to `hello@` bounces | Email Routing off or MX records missing | step 3 |
| Domain stuck on "Initializing" | zone not active yet | wait, or check nameservers at the registrar |
| www serves the site instead of redirecting | redirect rule or second custom domain missing | step 7 |

---

## 12. What is still on you before announcing the site

- Mailboxes for `hello@` and `faizan@` actually working (step 3).
- `linkedin.com/company/fenvolt` published (`site.companyLinkedIn` points there).
- Legal name and location confirmed for the footer.
- A street address on `/company`, or keep "by appointment".
- The practice list on `/services` reviewed for accuracy — see `TODOS.md`.

Everything else in `TODOS.md` is content, not infrastructure.
