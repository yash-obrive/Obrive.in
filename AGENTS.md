# Repository Guidelines & Rules

## UI Consistency & Design System Invariants

- **Strict Layout Shell Consistency:** Always reuse the established layout architecture (`Sidebar`, `Header`, `RightPanel`, etc.) for any new dashboard, view, or section. Never create standalone or isolated full-page interfaces from scratch when an established application shell exists.
- **Font & Brand Typography Preservation:** Never replace, remove, or override the global brand typography (e.g., `Michroma` font defined in `layout.tsx`). Headings, navigation items, and section labels must strictly adhere to the brand typography hierarchy.
- **Component & Palette Reuse:** Before building new UI widgets, inspect existing production pages (such as `src/app/(dashboard)/dashboard/employee/page.tsx` and `src/components/dashboard/`) and reuse existing components (`WorkloadSection`, `Projects`, `NearestEvents`, `ActivityStream`, etc.) and brand color tokens (`#073933`, `#F4F9FD`, `#eef7ff`).
- **Global Style Isolation:** Do not inject third-party library CSS (e.g., Leaflet, calendar styles) into root files (`globals.css` or `layout.tsx`) where they could bleed into or conflict with global fonts. Scope third-party styles locally inside dynamic client components.

## Personal Fork Isolation & Git Workflow Rules

- **Target Personal Fork Exclusively:** All code changes, feature branches, pull requests (PRs), and merges in this project must strictly target the user's personal fork (`personal` remote / `naman1904-dot/OBRIVE.COM`) ONLY.
- **Strictly Prohibit Origin Modifying Actions:** Never open PRs targeting `origin` (`obrive-industries/OBRIVE.COM`), never merge changes into `origin` branches, and never propose or run commands that modify `origin`.
- **Pull Request Targeting:** When asked to create, check, or merge a pull request via MCP tools, GitHub APIs, or CLI commands, always specify the base repository as `naman1904-dot/OBRIVE.COM` (e.g. `base: main` on the fork), never `obrive-industries/OBRIVE.COM`.
- **Remote Instructions for User:** When providing git commands for the user to execute (e.g., pushes), always explicitly use the `personal` remote (e.g., `git push personal <branch-name>`), never `origin`.
