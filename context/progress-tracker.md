# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Feature 02 (Editor Chrome) — complete

## Current Goal

- Feature 03 (TBD)

## Completed

- Feature 01: Design System — shadcn/ui initialized (style `base-nova`, base color `neutral`, CSS variables, `lucide` icon library) for Tailwind v4. Added Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea to `components/ui/`. `lucide-react` installed. `lib/utils.ts` exports `cn()` (clsx + tailwind-merge). `app/globals.css` rewritten so all shadcn tokens (`--background`, `--foreground`, `--card`, `--primary`, etc.) and the app's own dark palette (`--bg-base`, `--text-primary`, `--accent-primary`, `--accent-ai`, etc., per `context/ui-context.md`) are set once in `:root` — no `.dark` class toggle. Verified with `tsc --noEmit`, `npm run build`, `npm run lint`, and a Playwright screenshot of the homepage under both `light` and `dark` emulated `prefers-color-scheme` (identical dark rendering in both, confirming no light-mode leakage).
- Feature 02: Editor Chrome — added `components/editor/editor-navbar.tsx` (fixed `h-14` header, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose` from `lucide-react` based on an `isSidebarOpen` prop, `bg-bg-surface` with `border-b border-border-default`, right section empty) and `components/editor/project-sidebar.tsx` (`isOpen`/`onClose` props, `fixed` floating panel below the navbar so it overlays the canvas instead of participating in layout flow, `-translate-x-full`/`translate-x-0` slide transition, `Projects` header with close button, shadcn `Tabs` for "My Projects"/"Shared" each with an empty placeholder state, full-width `New Project` button with `Plus` icon pinned at the bottom). Both are plain (non-`"use client"`) presentational components — sidebar-open state is expected to live in whatever client component composes them, per the "add `use client` only when needed" rule in `code-standards.md`. No new dialog component was built — `components/ui/dialog.tsx` already styles via `popover`/`muted`/`border` tokens that map onto the ghost-ai palette in `globals.css`, so the "dialog pattern" requirement was satisfied by verifying the existing primitive rather than adding a file. Verified with `tsc --noEmit`, `npm run lint`, and a temporary wiring into `app/page.tsx` (reverted after verification) screenshotted via Playwright in both the closed and open sidebar states — toggle, slide-in, tabs, and empty states all render as specified with no console errors.
- Wired the two components into a real route: `app/editor/layout.tsx` is a `"use client"` layout holding the `isSidebarOpen` state (`useState`) and rendering `EditorNavbar` + `ProjectSidebar` around `{children}`; `app/editor/page.tsx` is a minimal placeholder ("Canvas coming soon") so the route renders until the canvas feature lands. Verified with `tsc --noEmit` and `npm run lint` only (no browser check this round, per user request).

## In Progress

- None.

## Next Up

- TBD — next feature spec not yet written.

## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui on Tailwind v4 using CSS-variable theming (no `tailwind.config.js`); tokens live in `app/globals.css` under `@theme inline`.
- Dark-only theme: shadcn's `:root` variables are set directly to dark values, and the app's own palette tokens from `context/ui-context.md` live alongside them in the same `:root` block. No `.dark` class or `prefers-color-scheme` toggle exists — verified visually.
- `components/ui/*` are protected foundation components (per `context/ai-workflow-rules.md`) — not modified after `shadcn` CLI generation.

## Session Notes

- Next.js 16.2.10, React 19.2.4, Tailwind v4, npm (no other package managers in use).
- shadcn CLI 4.13.0 auto-detected Next.js + Tailwind v4; used `-d` defaults (`template=next`, `preset=base-nova`), base color `neutral`, component library `@base-ui/react` (not Radix).
- `lucide-react` ^1.23.0 installed as the shadcn icon library.
