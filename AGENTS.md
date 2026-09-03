# Repository Guidelines & Rules

## UI Consistency & Design System Invariants

- **Strict Layout Shell Consistency:** Always reuse the established layout architecture (`Sidebar`, `Header`, `RightPanel`, etc.) for any new dashboard, view, or section. Never create standalone or isolated full-page interfaces from scratch when an established application shell exists.
- **Font & Brand Typography Preservation:** Never replace, remove, or override the global brand typography (e.g., `Michroma` font defined in `layout.tsx`). Headings, navigation items, and section labels must strictly adhere to the brand typography hierarchy.
- **Component & Palette Reuse:** Before building new UI widgets, inspect existing production pages (such as `src/app/(dashboard)/dashboard/employee/page.tsx` and `src/components/dashboard/`) and reuse existing components (`WorkloadSection`, `Projects`, `NearestEvents`, `ActivityStream`, etc.) and brand color tokens (`#073933`, `#F4F9FD`, `#eef7ff`).
- **Global Style Isolation:** Do not inject third-party library CSS (e.g., Leaflet, calendar styles) into root files (`globals.css` or `layout.tsx`) where they could bleed into or conflict with global fonts. Scope third-party styles locally inside dynamic client components.
