# Fenvolt — Website Plan

Status: approved for build. Owner: Fenvolt. Built in `Website_Freebuff/`.
Last updated: 12 November 2026.

---

## 1. Research summary

### What the strongest reference sites actually do

Reviewed: Linear, Vercel, Stripe, Stripe Press, utility.agency, AKQA, Instrument, Baillat Studio (Locomotive case study), MindMarket (Awwwards case study), plus current 2026 agency roundups.

Patterns worth keeping:

1. **One organising idea, not a pile of sections.** Baillat runs a two-world system (black-on-white / white-on-black) through every page. MindMarket built its whole site around "the thread" and hand-placed 85 elements. The idea does the art direction.
2. **Editorial grid, variable density.** AKQA's restraint and Instrument's index-like case study lists work because the grid is stable and the content blocks vary. Repetition of identical card units is what makes a site feel generated.
3. **Type carries the brand.** Studio sites that survive a redesign cycle use one distinctive display face and one precise text face. Body typography at real sizes (17–19px, 1.6 leading, 60–75ch measure) reads as confidence.
4. **Proof is specific.** The best engineering sites show the system: a diagram, a real interface, a commit, a repo, a constraint that was hard to solve. They do not lead with logos, awards, or percentage claims.
5. **Navigation is short and the CTA is singular.** Linear/Vercel/Stripe: 3–5 nav items, one primary action, repeated at section boundaries.
6. **Motion is punctuation.** Line reveals, a pinned diagram, a cursor state. Not every section animating.

Patterns to reject:

- Dark neon "AI" pages with glowing dashboards and invented telemetry. The previous Fenvolt build did this: `60% avg latency drop`, `2.5M+ records digitized`, `SOC2 / HIPAA`, `7-day risk-free trial`, `Silicon Valley caliber`. None of those are verifiable from the supplied material and several are plainly fabricated. They also read as template.
- Badge marquees of technologies, pill-shaped labels on every heading, bento grids repeated per section, gradient text, glass cards.
- A 16,000px homepage. The previous homepage was 15,988px tall at 1440px wide with large empty runs; that is a structural problem, not a styling one.

### What the material supports

- **SPECTER** — applied research system for Pakistani legal documents, built in the MPVIR research group at COMSATS. Verified from CV + project demo: bilingual Urdu/English ingestion, OCR and translation of FIRs, hybrid retrieval across FAISS/Pinecone/LanceDB/pgVector, four-LLM benchmarking (OpenAI, Claude, Llama, Qwen), citation grounding to page, court filters (SC/IHC/LHC), diary/hearing tracking, confidentiality controls (row-level security, per-firm keys, masked CNIC/phone in logs, Clerk sign-in with matter access).
- **Document-Parser** — open source, public repo. Seven-phase bilingual legal parsing: triage, layout extraction (DocLayout-YOLO), tiered local-first/cloud-fallback OCR, LLM semantic section tagging, case-metadata extraction, deterministic citation graph, self-correction. Benchmarked against LlamaParse and Reducto with a published structural diff. FastAPI async job API with signed webhooks, offline tests.
- **OpsNexus** — multi-agent document operations. Verified from demo: supervisor routing, invoice reconciliation against purchase orders and approval limits, compliance audit routing, per-document workflow trace with JSON execution output.
- Additional: VLM Urdu OCR with a fine-tuned ByT5 corrector, multi-LLM RAG system, YOLO detection, MSSQL schema work (Arthi), and a production ML role at Arbisoft.
- Identity: Fenvolt mark is an ink "F" plus a cyan slash (`#06B6D4`), supplied as white-on-white and white-on-ink. The company name is set as a wordmark.

What the material does **not** support, and therefore is not claimed anywhere: client names, team size, offices, years in business, SLAs, certifications, uptime, accuracy percentages, latency numbers, pricing, trial policies, or timezone guarantees.

---

## 2. Positioning

**Fenvolt is an engineering practice with two arms: senior capacity you can add to a team, and applied AI engineering you can hand a problem to.**

The differentiator is not "we do AI". It is that the same people can parse a scanned Urdu court record, design the retrieval layer, and ship the API and interface around it — and can also just join your sprint and take tickets.

Audience: CTOs and engineering leads at product companies, and founders of digital agencies who need white-label delivery capacity.

Primary conversion: a scoping call. Secondary: reading a case study that proves technical depth.

Voice: direct, specific, unhurried. Short sentences. No claims we cannot defend. Technical nouns where they help; no jargon for effect.

Headline: **"Engineering capacity for the hard parts."**
Supporting: "We place senior engineers inside product teams, and build the AI systems those teams cannot staff yet — retrieval, document intelligence, and agentic workflows that run on real records."

---

## 3. Sitemap

```
/                     Home — positioning, both arms, proof, approach, conversion
/services             Two tracks in depth + engagement models + fit guidance
/work                 Project index + archive
/work/specter         Flagship case study
/work/document-parser Open-source case study (links to GitHub)
/work/opsnexus        Multi-agent document operations
/company              Philosophy, principles, how we work, founder, scope limits
/contact              Qualified enquiry form, direct email, what happens next
/not-found            Designed 404
```

Every CTA resolves to a real route or a real mailto. No `href="#"`.

---

## 4. Art direction

**Idea: the instrument panel (revision).** The first build was a warm paper dossier. At the client's direction the site now sits on near-black, with one cyan signal taken from the supplied mark. Editorial serif headlines keep it from reading like a SaaS template; the dark surfaces let the real product frames carry the colour. Glass is used in three places only — the navigation bar, the hero console and its floating spec chips — because blur everywhere reads as a theme, not a decision.

Palette (tokens in `globals.css`):

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#05070A` | page ground |
| `--paper-deep` | `#080C11` | alternating bands |
| `--surface` | `#0B1016` | cards |
| `--plate` | `#070B10` | technical plates |
| `--deep` | `#030508` | closing CTA, footer |
| `--ink` | `#F3F6F5` | primary text |
| `--muted` | `#8D989D` | secondary text |
| `--rule` | `rgba(243,246,245,.10)` | hairlines |
| `--accent` | `#22D3EE` | logo cyan, signal |
| `--accent-ink` | `#7DE9F7` | accessible cyan for small text |
| `--glass` | `rgba(255,255,255,.045)` | glass fills |

Rules: no gradient text, no neon bloom, no glass outside the three surfaces above, radius 4px for controls and 10–16px for glass panels. Cyan is signal, never a large fill. Ambient depth comes from a masked 76px grid, two slow aurora blurs behind the hero, and a soft-light grain layer; all three are CSS-only and freeze under `prefers-reduced-motion`.

Type:

- Display: **Instrument Serif** (400 + italic). Large, tight, editorial. Used for h1/h2 and pull quotes only.
- Text/UI: **Inter Tight** (300–600). 17px body, 1.6 leading, 68ch measure.
- Mono: **JetBrains Mono** (400/500). Section indices, metadata, diagram labels, table headers. Uppercase only at 10–11px with 0.12em tracking, and never for headings.

Layout: 12-column grid, fluid gutters, asymmetric splits (7/5, 5/7), full-bleed ink plates. Section index in the left margin (`01 — Capability`). No card grids repeated across sections.

Imagery: original SVG technical plates rather than stock. Plates explain real systems:

1. **Hero console** — a real frame from the SPECTER build in a glass citation viewer, with a scan sweep, a retrieval trace and a page-anchored answer. Fixed pixel labels come from the screenshot, not invented metrics.
2. **Pipeline plate (systems reel)** — the SPECTER path: ingest → parse → chunk/embed → hybrid retrieve → rerank → grounded answer. Interactive; each stage exposes real implementation detail.
3. **Document anatomy** — a scanned FIR decomposed into layout blocks, extracted fields, and a citation anchor. Drawn in HTML/SVG, with a real frame from the project demo as evidence.
4. **Retrieval plate** — candidate set narrowing across keyword + vector + rerank, with a deterministic citation check.
5. **Agent routing plate** — supervisor → specialist tools → structured result (OpsNexus).
6. **Seven-phase band** — Document-Parser's pipeline, with the self-correction pass marked.

Signature interactions (only these): custom cursor (desktop, pointer:fine), masked line-by-line headline reveal, glass console with scan sweep and pointer spotlight, floating spec chips, interactive pipeline plate, pinned horizontal work track on desktop, scroll-drawn approach timeline. All respect `prefers-reduced-motion`, clean up on unmount, and never block input. With reduced motion the pinned track collapses to a vertical stack rather than hiding slides.

---

## 5. Engineering decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js 16.4 App Router, React 19.3, TS strict | Required; scaffold defaults kept (`cacheComponents`, turbopack CSS) |
| Styling | Tailwind v4 + CSS variables | Required; tokens centralised in `globals.css` |
| Motion split | Framer Motion for component/enter states; GSAP ScrollTrigger for scroll-linked pin/draw; Lenis for smooth scroll | One job per library, no overlap |
| Icons | Lucide React, used sparingly (arrows, chevrons, check) | Required |
| Class utils | `clsx` + `tailwind-merge` via `cn()` | Required |
| Validation | Hand-written, typed validators | Avoids a dependency for one form |
| Contact delivery | Server Action → Resend REST API when `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set; otherwise returns an explicit `unconfigured` result and the UI offers a prefilled mailto + copy | Never fakes a submission; no SDK dependency |
| Images | SVG/CSS plates; 3 verified frames from the supplied demos; logo derivatives generated from the supplied PNG | Original artwork without stock or invented UI |
| Fonts | `next/font/google`, subset latin | Self-hosted at build, no layout shift |
| Rendering | Server Components by default; client only for header, cursor, plate, track, timeline, form | Minimal JS |

Domain: canonical/OG URLs read `NEXT_PUBLIC_SITE_URL`, defaulting to `https://fenvolt.com`. The default must be confirmed before launch.

---

## 6. Decision record (6 principles)

1. **Aesthetic revision: dark, not neon.** The first pass used paper/ink to avoid the default AI look. The client asked for a dark, premium direction, so the token layer was rewritten to near-black + cyan and the glass surfaces were added where they carry depth. The anti-slop constraints stay: no gradient text, no glow bloom, no purple, no invented metrics. (P1, P3, client direction)
2. **Three case studies, not six.** SPECTER, Document-Parser, OpsNexus carry real detail; the rest go in an archive table with links. Depth over volume. (P1, P3)
3. **No invented metrics.** Where numbers are unavailable, show architecture and constraints instead. This is also the legal-safe choice. (P1)
4. **Ship one conversion path** — scoping call — repeated at section boundaries, rather than four competing CTAs. (P3, P5)
5. **Build plates in code, not generated images.** Crisper, lighter, themeable, and honest. (P1, P5)
6. **Skip a pricing page.** No verified price points; engagement models explain shape without fake numbers. (P3)
7. **Defer blog/insights.** No content pipeline yet; an empty blog is worse than none. Noted in TODOS.
8. **Contact form degrades honestly.** No credentials in this environment, so configure an explicit `unconfigured` path with mailto fallback and document env vars. (P1, P6)
9. **Homepage budget: ~7 screens at 1440×900**, down from ~18. Cut marquee, telemetry, duplicate bento sections. (P5)

### Notes on the /autoplan pipeline

The autoplan workflow expects an existing plan file plus Codex and subagent voices. There is no prior plan file in this repo, so this document is the input. The four-phase interactive review is collapsed into the decision record above because the master brief explicitly forbids stopping for approvals between stages.

A Codex adversarial pass was attempted and could not run: the installed CLI (`codex-cli 0.144.6`) returns `401 invalid_jwt` and asks for a fresh login. No subagent tool is available in this environment. The review below is therefore a single-reviewer, principle-based review, and the final report says so. It does not claim dual-voice consensus.

---

## 7. TODOS / requires confirmation

- Confirm the production domain and set `NEXT_PUBLIC_SITE_URL`.
- Confirm company legal name, registered location, and the contact address to publish (currently the founder's email from the CV).
- Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` to enable form delivery.
- Optional: booking link (Cal.com/Calendly) once an account exists; CTA currently points to `/contact`.
- Optional: add real client references when available; none are claimed now.
- Deferred: insights/blog, pricing page, team page (no verified team data).
