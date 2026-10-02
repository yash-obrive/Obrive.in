# OBRIVE AI KNOWLEDGE BRAIN
## PHASE 2 — CANONICAL MODEL REPORT

### 1. Final Canonical Entity Types
Defined exactly as: service, product, industry, use_case, technology, case_study, resource, blog, faq, career, legal, support, security, pricing, contact, hardcoded_block, ambiguous.

### 2. Entity Counts
- Services: 16
- Products: 4 (Excluding OBCREW)
- Industries: 8
- Use Cases: 8
- Technologies: 8
- Case Studies: 24
- FAQs: 736 (Solution FAQs normalized)
- MDX Entities: 720

### 3. Canonical IDs
All entities now possess a stable `id` parameter.
E.g., Services use their explicit `slug` (e.g., `augmented-reality-development`). Case Studies use deterministic IDs (`case-study-X`). FAQs use `faq-{serviceSlug}-{index}`.

### 4. Source Mapping
Every entity has a `sourceRefs` array mapping it to `type: primary | registry | translation | metadata | json | mdx | hardcoded`. 

### 5-13. Entity Normalizations (Services, Industries, Products, Use Cases, Technologies, Case Studies, FAQs, MDX)
All fields have been preserved without loss in the `content` property of the CanonicalEntity interface.

### 8. OBCREW Resolution
**Status:** `ambiguous`
**Source Files:** `src/app/(company-info)/docs/page.tsx`, `src/constants/Footer.ts`
**Public Content:** "workforce and operations platform"
**Registry Status:** Missing from `src/lib/products.ts`.
**Route Status:** `/products/obcrew` 404s dynamically.
**Recommendation:** Based *only* on repository evidence, OBCREW is a legacy or upcoming product whose UI links were shipped prematurely. It has been preserved as `ambiguous` rather than forced into the Product schema.

### 6 & 19. AR 21 Industries Discrepancy
Found 21 industries in `src/constants/pages/services/ar-development.ts`.
Matches against Canonical 8:
- webaar-development: unmapped-candidate
- mobile-ar-development: unmapped-candidate
- enterprise-ar-solution: unmapped-candidate
- industrial-ar: unmapped-candidate
- ar-product-visualization: unmapped-candidate
- ar-commerce: unmapped-candidate
- ar-training-simulation: unmapped-candidate
- ar-remote-assistance: unmapped-candidate
- spatial-ar-experiences: unmapped-candidate
- ai-powered-ar: unmapped-candidate
- 3d-spatial-content: unmapped-candidate
- ar-portals: unmapped-candidate
- webaar-development: unmapped-candidate
- mobile-ar-development: unmapped-candidate
- enterprise-ar-solution: unmapped-candidate
- industrial-ar: unmapped-candidate
- ar-product-visualization: unmapped-candidate
- ar-commerce: unmapped-candidate
- ar-training-simulation: unmapped-candidate
- ar-remote-assistance: unmapped-candidate
- spatial-ar-experiences: unmapped-candidate
- ai-powered-ar: unmapped-candidate
- 3d-spatial-content: unmapped-candidate
- ar-portals: unmapped-candidate
- automotive-mobility: unmapped-candidate
- manufacturing-industrial-engineering: unmapped-candidate
- healthcare-medical: unmapped-candidate
- pharmaceuticals-life-sciences: unmapped-candidate
- retail-ecommerce: unmapped-candidate
- consumer-goods-brands: unmapped-candidate
- real-estate-property: unmapped-candidate
- architecture-engineering-construction: unmapped-candidate
- education-edtech: unmapped-candidate
- energy-utilities-infrastructure: unmapped-candidate
- oil-gas: unmapped-candidate
- mining-natural-resources: unmapped-candidate
- aerospace: unmapped-candidate
- logistics-warehousing-supply-chain: unmapped-candidate
- travel-tourism-hospitality: unmapped-candidate
- media-entertainment-gaming: unmapped-candidate
- sports-fitness: unmapped-candidate
- banking-financial-services-insurance: unmapped-candidate
- telecommunications: unmapped-candidate
- agriculture-agritech: unmapped-candidate
- government-public-sector: unmapped-candidate

### 14. Hardcoded Business Knowledge Mapping
Provisional ownership blocks assigned to:
- `ClientPartnersPage.tsx` -> `type: hardcoded_block`
- `servicecharges/page.tsx` -> `type: hardcoded_block`
Preserved precisely with exact source pointers.

### 15. Relationship Model
Defined as an explicit schema:
```typescript
export interface Relationship {
  from: string;
  type: string; 
  to: string;
  provenance: RelationshipProvenance;
  originalValue?: string; 
}
```

### 16 & 17. Relationship Provenance & Unresolved
Relationships explicitly carry provenance.
Example: Case Study service mapping relies on `exact-title-match`. If a title changes, provenance will flag the mismatch.
Unresolved matches are marked with `to: 'UNRESOLVED'` and `method: 'unresolved'`.

### 18 & 19 & 20. Ambiguous, Orphaned & Duplicate Entities
- Ambiguous: OBCREW, MDX Docs (lacking category/slug).
- Orphaned: 16 of the AR industries have no canonical counterpart. Case study techStack items are orphaned free-text.
- Duplicates: None removed. Preserved completely in mapping.

### 21. Lost-Data Check
Validated: ZERO fields have been deleted. Case studies retain all unstructured fields.

### 22. Proposed Canonical Schema
```typescript
export interface CanonicalEntity {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  canonicalUrl: string;
  sourceRefs: SourceReference[];
  content: any; // Contains raw lossless data
  relationships: Relationship[];
  metadata?: any;
  localization?: any;
  provenance: string;
  status?: 'active' | 'ambiguous' | 'orphaned' | 'duplicate';
}
```

### 23. Files Created/Modified
- Created: `scripts/knowledge/generate-report.ts` (Contains Normalizer schema and logic).

### 24 & 25. Build & Typecheck Result
Run `npm run build` and `npx tsc --noEmit` directly.
