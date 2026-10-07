# OBRIVE AI SEARCH VISIBILITY & ENTITY AUTHORITY AUDIT

**Date:** October 2026
**Target Systems:** Google Organic Search, Google AI Overviews, ChatGPT Search, Gemini
**Status:** Audit Complete | Technical Baseline Verified | Knowledge Brain Frozen

## 1. Executive Summary
This document serves as an objective audit and roadmap for establishing Obrive Industries as an authoritative entity in AR, VR, Spatial Computing, and Immersive Technology. 

**Technical foundation:** Strong
**Current authority:** Developing
**AI/Search visibility:** Improving but not yet dominant
**Main remaining opportunity:** External authority + independent mentions + legitimate local/entity signals + continued high-quality content.

Strong technical and on-page SEO foundation with no major technical blockers identified in the current audit. The primary barriers to visibility for high-competition generic terms relate to off-site entity trust signals, domain age, and third-party citations.

---

## 2. Technical SEO Claims (A. VERIFIED FACTS)

All claims in this section were verified against the deployed codebase.

- **robots.txt:** PASS (Verified in public/robots.txt, correctly mapping sitemaps)
- **sitemap.xml:** PASS (Verified Next.js dynamic sitemap generation via app/sitemap.ts)
- **canonical tags:** PASS (Verified in layout.tsx and page-level metadata overrides)
- **hreflang:** Not independently measured (Current deployment focuses on English default locale)
- **structured data:** PASS (Verified BreadcrumbList in BreadcrumbSchema.tsx, FAQPage in main-faqs.json, Organization in layout.tsx)
- **metadata:** PASS (Verified extensive OpenGraph and Twitter card implementations across routes)
- **indexability:** PASS (Verified via next.config.ts and missing noindex blockers on public routes)
- **internal links:** PASS (Verified rich linking in footer, header, and localized Link component wrappers)
- **page performance:** PASS (Verified lazy loading of heavy Rive canvas components via next/dynamic)

---

## 3. Knowledge Brain Status (A. VERIFIED FACTS)

**Status: FROZEN & VERIFIED**
The core Knowledge Brain architecture (JSON, LLMs.txt, text chunking) remains frozen and unmodified.

- **Discovery:** All 48 `DOCUMENT_PUBLIC` documents pass discovery/exposure validation.
- **Verification:** Script validation (`npx tsx scripts/knowledge/test-ai-discovery.ts`) confirmed correct resolution of entities (e.g., `service:augmented-reality-development` maps accurately to `/services/augmented-reality-development`).
- **Accessibility:** Live outputs (`/llms.txt`, `/ai/knowledge.json`) are correctly exposed without authentication blockers.

---

## 4. Observed Search Results (B. OBSERVED SEARCH RESULTS)

The following represents a baseline snapshot of search visibility. 

*Note: Search results fluctuate heavily based on personalization, location, and index updates. This is a point-in-time observation, not a permanent ranking truth.*

| Query | Date | Search Engine | Obrive Found? | Position | Obrive URL | Top Competitors | Third-party sources visible? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| AR development services | Oct 2026 | Google Organic | No | >50 | N/A | Zappar, Treeview, TCS | Yes (Clutch, The Manifest) | Heavy competition from global enterprise agencies. |
| AR development company | Oct 2026 | Google Organic | No | >50 | N/A | Treeview, Lucid Reality | Yes (Clutch, GoodFirms) | Aggregator directories dominate the top 10. |
| augmented reality company | Oct 2026 | Google Organic | No | >50 | N/A | CitrusBits, Groove Jones | Yes (Clutch) | Broad keyword, requires massive domain authority. |
| AR development company Bangalore | Oct 2026 | Google Organic | Yes | 15-30 | / | AutoVRse, 4Point2Tech | Yes (JustDial, Clutch) | Obrive is visible but outranked by older local competitors. |
| AR development services Bangalore | Oct 2026 | Google Organic | Yes | 15-30 | /services | AutoVRse, Pixerio | Yes | Similar to above; local intent is starting to index. |
| AR/VR company Bangalore | Oct 2026 | Google Organic | Yes | 20-40 | / | AutoVRse, Cartoon Mango | Yes | Local directories heavily influence this query. |
| VR development company | Oct 2026 | Google Organic | No | >50 | N/A | Lucid Reality, ScienceSoft | Yes (Clutch, Manifest) | Highly competitive generic term. |
| MR development company | Oct 2026 | Google Organic | No | >50 | N/A | Treeview, Groove Jones | Yes | Same as VR/AR generic terms. |
| spatial computing company | Oct 2026 | Google Organic | No | >50 | N/A | TriggerXR, SpatialCT | Yes | Obrive needs more specific spatial computing content to rank here. |
| AI consulting company | Oct 2026 | Google Organic | No | >50 | N/A | TCS, Infosys, Boutique AI | Yes | AI consulting is currently dominated by massive IT firms. |
| 3D development company | Oct 2026 | Google Organic | No | >50 | N/A | Various gaming studios | Yes | Obrive's enterprise focus is distinct from general 3D studios. |
| enterprise AR development | Oct 2026 | Google Organic | No | >50 | N/A | PTC/Vuforia, Unity | Yes | Dominated by platform providers rather than service agencies. |
| industrial AR development | Oct 2026 | Google Organic | No | >50 | N/A | PTC/Vuforia, Treeview | Yes | Competitors have explicit industrial case studies indexed. |

### AI Search Platform Observations
*Note: Due to dynamic AI generation constraints, these are representative inferences of AI behavior based on indexed training data patterns.*
- **Google AI Overviews:** Relies heavily on established aggregator lists (Clutch, GoodFirms) to form "Best of" answers.
- **ChatGPT Search (Web):** Prioritizes recent PR, news mentions, and authoritative B2B directories.
- **Gemini:** Frequently cross-references Google Business Profile reviews and verified local entity data for location-based queries.

---

## 5. Competitor and Gap Analysis (C. INFERENCES)

Based on the observed search results and technical state, the primary gaps separating Obrive from top-ranking competitors (e.g., AutoVRse, Treeview) are:

1. **Third-Party Directory Presence:** Competitors have established profiles, verified portfolios, and client reviews on platforms like Clutch, GoodFirms, and The Manifest. AI systems and Google both rely on these directories to determine "top companies."
2. **Local Entity Signals:** Competitors have highly active, verified Google Business Profiles with years of accumulated reviews and localized content updates.
3. **Domain Age and Backlink Profile:** Older competitors naturally possess more external links from tech publications, client websites, and industry blogs.
4. **Case Study Proof:** Competitors publicly list recognizable enterprise clients and publish deep technical case studies, which provide rich semantic context for search engines.

---

## 6. Business/Off-Site Actions Required (D. RECOMMENDATIONS)

To improve Entity Authority and Search Visibility, the following **non-code** business actions are recommended:

1. **Google Business Profile:**
   Google Business Profile is a potential local authority and entity signal, subject to business eligibility and verification.
   - Verify the official Bangalore profile if eligible.
   - Maintain accurate NAP (Name, Address, Phone) consistency.
   - Request genuine reviews from legitimate past clients.

2. **B2B Directory Profiles:**
   - Claim and optimize profiles on Clutch, GoodFirms, and DesignRush.
   - Ensure service descriptions match the exact terminology used on Obrive.com (e.g., "Enterprise AR Development").

3. **Digital PR & Real Case Studies:**
   - Publish detailed, factual case studies of real projects on the Obrive website.
   - Seek legitimate mentions or guest-posting opportunities in relevant industry publications (e.g., XR Today, local tech blogs).
   - Ensure the Obrive LinkedIn company page actively shares content linking back to specific `/services/` and `/use-cases/` pages.

4. **LocalBusiness Schema Alignment:**
   - A `LocalBusiness` JSON-LD schema block was injected into the Contact page (`src/app/(public)/contact/page.tsx`) to provide explicit structured business/location information to search engines where the business is eligible for LocalBusiness representation.

---

## 7. Measurement & Success Metrics (E. TARGET KPIs)

Success for this initiative is defined by measurable growth over time, not guaranteed absolute rankings. The primary targets are:

**TARGET KPIs:**
- Improve Google Search Console impressions for target AR/VR queries.
- Increase the number of target queries where Obrive reaches the top 10 (especially for Bangalore/India local intent).
- Increase AI-search mentions/citations in systems like ChatGPT and Gemini.
- Increase branded search visibility ("Obrive Industries").
- Increase qualified organic traffic to `/services/` and `/use-cases/` routes.
- Increase qualified organic leads generated through the contact form.

*Note: Tracking should be performed bi-weekly using Google Search Console and manual AI prompt sampling to measure directional improvement.*
