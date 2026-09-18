# Repository Guidelines & Rules

## UI Consistency & Design System Invariants

- **Strict Layout Shell Consistency:** Always reuse the established layout architecture (`Sidebar`, `Header`, `RightPanel`, etc.) for any new dashboard, view, or section. Never create standalone or isolated full-page interfaces from scratch when an established application shell exists.
- **Font & Brand Typography Preservation:** Never replace, remove, or override the global brand typography (e.g., `Michroma` font defined in `layout.tsx`). Headings, navigation items, and section labels must strictly adhere to the brand typography hierarchy.
- **Component & Palette Reuse:** Before building new UI widgets, inspect existing production pages (such as `src/app/(dashboard)/dashboard/employee/page.tsx` and `src/components/dashboard/`) and reuse existing components (`WorkloadSection`, `Projects`, `NearestEvents`, `ActivityStream`, etc.) and brand color tokens (`#073933`, `#F4F9FD`, `#eef7ff`).
- **Global Style Isolation:** Do not inject third-party library CSS (e.g., Leaflet, calendar styles) into root files (`globals.css` or `layout.tsx`) where they could bleed into or conflict with global fonts. Scope third-party styles locally inside dynamic client components.

## Repository Collaboration & Git Workflow Rules

- **Target Repository (`origin`):** The primary remote repository is `origin` (`https://github.com/shivansh-006/obrive.git`).
- **Feature Branch Integration:** `naman-feature` is the user's primary feature/staging branch. All feature work and topic branches merge into `naman-feature`.
- **Pull Request Targeting:** When asked to create or check pull requests, always target `shivansh-006/obrive:main` as the base branch from `naman-feature`.
- **Remote Instructions for User:** When providing git commands for the user to execute (e.g., pushes), always explicitly use the `origin` remote (e.g., `git push origin <branch-name>`), never `upstream-org` or `personal`.

## Git Operations

- **Explicit Commits Only:** Never execute `git commit` unless explicitly and directly requested in the user's most recent prompt.
- **NEVER PUSH:** Absolutely NEVER execute `git push` under any circumstances. All remote pushes must be handled manually by the user in their own terminal.

---

## OBRIVE PERMANENT PROJECT RULES

### 1. SOURCE OF TRUTH

Use this hierarchy for all decisions:

1. **Existing Obrive.com** → primary source of truth for UI/UX, visual design, interactions and user experience.
2. **Existing repository/codebase** → source of truth for architecture, implementation, routes, components, conventions and integrations.
3. **Supplied Obrive sitemap HTML** → source of truth for sitemap/page-directory structure and requirements represented in that file.
4. **My explicit instructions** → override assumptions and recommendations.
5. **Your recommendations** → only recommendations; never silently override the above.

---

### 2. ABSOLUTE UI/UX RULE

**DO NOT REDESIGN OBRIVE.**

The existing Obrive.com UI/UX must remain the design source of truth.

Do not introduce a new:

* visual style
* color palette
* typography system
* spacing system
* button style
* card style
* navigation style
* footer style
* animation language
* component aesthetic
* page template
* generic SaaS look
* generic AI/startup look
* personal design preference

Every new or modified page must look and behave as though it was originally created as part of the existing Obrive website.

---

### 3. REUSE BEFORE CREATE

Before creating any component, utility, style or pattern:

1. Search the existing codebase.
2. Check whether an equivalent already exists.
3. Reuse it when possible.
4. Extend it when necessary.
5. Only create a new implementation when there is no suitable existing solution.

Do not unnecessarily duplicate components.

---

### 4. DO NOT MODIFY WITHOUT UNDERSTANDING

For every significant task:

**Understand → Verify → Reuse → Minimal Change → Test → Report**

Never immediately start coding.

First inspect the relevant implementation and its dependencies.

---

### 5. MINIMUM CHANGE

Make the smallest safe change that completely satisfies the requirement.

Do not:

* refactor unrelated code
* reorganize folders unnecessarily
* rename unrelated files
* rewrite working components without reason
* replace existing libraries without reason
* "clean up" unrelated code
* change architecture simply because you prefer another architecture

---

### 6. DO NOT ASSUME

Never assume that something exists.

Verify:

* routes
* components
* APIs
* database
* authentication
* integrations
* packages
* environment variables
* deployment setup
* CMS
* external services

If something cannot be verified, explicitly mark it:

**UNKNOWN / NEEDS VERIFICATION**

Never invent missing details.

---

### 7. SITEMAP RULE

The supplied sitemap HTML is a **structure/requirements reference**.

It describes the Obrive ecosystem and routes such as:

* Solutions
* Products
* Industries
* Use Cases
* Technology
* Resources
* Company
* Support & Legal

The sitemap page itself is already developed.

**Do not redesign the sitemap page.**

Do not assume that the standalone HTML's CSS/design is a replacement for the actual Obrive website design.

The actual existing Obrive.com UI/UX remains the visual source of truth.

---

### 8. ROUTE SAFETY

Before adding or changing a route:

* verify whether it already exists
* inspect route conventions
* check navigation references
* check internal links
* check SEO implications
* check dependencies

Never create duplicate or conflicting routes.

---

### 9. RESPONSIVE DESIGN

Preserve Obrive's existing responsive behavior.

Future work must be consistent with existing:

* desktop behavior
* tablet behavior
* mobile behavior
* breakpoints
* spacing
* component behavior
* navigation behavior

Do not introduce arbitrary breakpoints unless necessary.

---

### 10. PERFORMANCE

Avoid unnecessary:

* dependencies
* libraries
* JavaScript
* API requests
* heavy assets
* duplicate code
* client-side processing

Use the existing project architecture whenever possible.

---

### 11. DEPENDENCIES

Before installing a package:

1. Check whether the project already has the capability.
2. Check whether an existing dependency can be reused.
3. Determine whether installation is genuinely necessary.
4. Install only when justified.

Never add packages for convenience alone.

---

### 12. SECURITY

Never expose or commit:

* API keys
* passwords
* tokens
* secrets
* private credentials
* production environment values

Use environment variables and existing security patterns.

Never include actual secret values in reports.

---

### 13. PROTECT EXISTING FUNCTIONALITY

Before changing shared code, identify what depends on it.

Do not accidentally break:

* existing pages
* navigation
* routes
* forms
* APIs
* authentication
* database operations
* integrations
* SEO
* responsive behavior
* deployment

Always consider regression risk.

---

### 14. ERROR HANDLING

When something fails:

Do not immediately rewrite the system.

First determine:

1. What failed?
2. Where did it fail?
3. Why did it fail?
4. What is the smallest safe fix?
5. What existing functionality could be affected?

Fix the root cause rather than masking the symptom.

---

### 15. FACT VS INFERENCE

When reporting project information, distinguish:

**VERIFIED**
Confirmed from repository/source.

**INFERRED**
Reasonably inferred but not directly confirmed.

**RECOMMENDATION**
Your suggested approach.

Never present an inference as a fact.

---

### 16. TESTING REQUIREMENT

After making changes, verify the relevant result.

Check as applicable:

* build
* syntax
* imports
* routes
* UI
* interactions
* API behavior
* database behavior
* console errors
* responsive behavior
* regressions

Never claim something is "working", "fixed", "done", or "production ready" without appropriate verification.

---

### 17. NO OVER-ENGINEERING

Prefer:

**existing architecture + minimal extension**

over:

**new architecture + unnecessary abstraction**

Do not introduce new frameworks, state-management systems, CSS systems, architectural patterns or migrations unless explicitly required or technically necessary.

---

### 18. NO GENERIC AI REFACTORING

Do not automatically:

* rewrite components
* introduce TypeScript
* migrate frameworks
* introduce Tailwind
* introduce Redux/Zustand/etc.
* restructure the project
* replace libraries
* create unnecessary abstractions

Only do these when the actual project requirements justify them.

---

### 19. WHEN UNCERTAIN

Use this decision rule:

**Can it be verified?**
→ Verify it.

**Cannot be verified?**
→ Mark UNKNOWN / NEEDS VERIFICATION.

**Existing implementation exists?**
→ Reuse it.

**No existing implementation?**
→ Follow existing project conventions.

**Multiple valid approaches?**
→ Choose the least disruptive approach.

---

### 20. DEVELOPMENT COMMUNICATION

For significant tasks, report:

**What I found**

**What I will change**

**What I will not change**

**Files/components affected**

**Verification performed**

**Remaining risks/unknowns**

Do not hide uncertainty.

---

### 21. MOST IMPORTANT RULE

Memorize:

> **OBRIVE.COM IS THE DESIGN SOURCE OF TRUTH.**

The result must visually and behaviorally belong to Obrive.

---

### 22. SECOND MOST IMPORTANT RULE

Memorize:

> **UNDERSTAND → VERIFY → REUSE → MINIMAL CHANGE → TEST → REPORT**

Never skip directly from understanding to coding without verification.

