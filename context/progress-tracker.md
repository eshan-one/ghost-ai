# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Feature 04 (Project Dialogues) — complete

## Current Goal

- Feature 05 (TBD)

## Completed

- Feature 01: Design System — shadcn/ui initialized (style `base-nova`, base color `neutral`, CSS variables, `lucide` icon library) for Tailwind v4. Added Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea to `components/ui/`. `lucide-react` installed. `lib/utils.ts` exports `cn()` (clsx + tailwind-merge). `app/globals.css` rewritten so all shadcn tokens (`--background`, `--foreground`, `--card`, `--primary`, etc.) and the app's own dark palette (`--bg-base`, `--text-primary`, `--accent-primary`, `--accent-ai`, etc., per `context/ui-context.md`) are set once in `:root` — no `.dark` class toggle. Verified with `tsc --noEmit`, `npm run build`, `npm run lint`, and a Playwright screenshot of the homepage under both `light` and `dark` emulated `prefers-color-scheme` (identical dark rendering in both, confirming no light-mode leakage).
- Feature 02: Editor Chrome — added `components/editor/editor-navbar.tsx` (fixed `h-14` header, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose` from `lucide-react` based on an `isSidebarOpen` prop, `bg-bg-surface` with `border-b border-border-default`, right section empty) and `components/editor/project-sidebar.tsx` (`isOpen`/`onClose` props, `fixed` floating panel below the navbar so it overlays the canvas instead of participating in layout flow, `-translate-x-full`/`translate-x-0` slide transition, `Projects` header with close button, shadcn `Tabs` for "My Projects"/"Shared" each with an empty placeholder state, full-width `New Project` button with `Plus` icon pinned at the bottom). Both are plain (non-`"use client"`) presentational components — sidebar-open state is expected to live in whatever client component composes them, per the "add `use client` only when needed" rule in `code-standards.md`. No new dialog component was built — `components/ui/dialog.tsx` already styles via `popover`/`muted`/`border` tokens that map onto the ghost-ai palette in `globals.css`, so the "dialog pattern" requirement was satisfied by verifying the existing primitive rather than adding a file. Verified with `tsc --noEmit`, `npm run lint`, and a temporary wiring into `app/page.tsx` (reverted after verification) screenshotted via Playwright in both the closed and open sidebar states — toggle, slide-in, tabs, and empty states all render as specified with no console errors.
- Wired the two components into a real route: `app/editor/layout.tsx` is a `"use client"` layout holding the `isSidebarOpen` state (`useState`) and rendering `EditorNavbar` + `ProjectSidebar` around `{children}`; `app/editor/page.tsx` is a minimal placeholder ("Canvas coming soon") so the route renders until the canvas feature lands. Verified with `tsc --noEmit` and `npm run lint` only (no browser check this round, per user request).
- Feature 03: Auth — Clerk (`@clerk/nextjs` ^7, Core 3) was already installed and partially scaffolded (`ClerkProvider` in `app/layout.tsx`, `proxy.ts`, `app/sign-in`/`app/sign-up` route folders, `.env.local` keys); this pass finished wiring it per `context/feature-specs/03-auth.md`. `app/layout.tsx` now applies Clerk's `dark` theme (`@clerk/ui/themes`) with every `appearance.variables` color/font/radius mapped to the app's existing CSS custom properties (`var(--accent-primary)`, `var(--bg-elevated)`, `var(--font-geist-sans)`, `var(--radius)`, etc.) — no hardcoded colors. Added `components/auth/auth-page-layout.tsx`: a shared two-panel layout (left panel hidden below `lg`, holds a text-only logo/tagline/feature list; right panel centers the Clerk form) used by both `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`, each just rendering `<SignIn />`/`<SignUp />` inside it. Added `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` to `.env.local` (Clerk's standard env vars, picked up automatically by `ClerkProvider`); `proxy.ts`'s `createRouteMatcher` now builds its public-route list from those two env vars instead of hardcoded path strings, protecting every other route via `auth.protect()`. `app/page.tsx` is now an async Server Component that calls `auth()` and redirects to `/editor` when `isAuthenticated`, else `/sign-in`. `components/editor/editor-navbar.tsx` right section now renders Clerk's `UserButton` directly (dropped the `Show`/`SignInButton`/`SignUpButton` signed-out branch that was there before — `/editor` is already unreachable while signed out because `proxy.ts` protects it, so that branch was dead code). Verified with `tsc --noEmit` and `npm run build` (both pass); no lint run or browser check this round, per user request.
- Feature 04: Project Dialogues — built the `/editor` home screen and project create/rename/delete dialogs per `context/feature-specs/04-project-dialogues`, mock data only, no API/persistence. `app/editor/page.tsx` is now a `"use client"` component rendering the centered heading/description/`New Project` button (no card wrapper), wired to open the Create dialog. Added `types/project.ts` (`Project` interface with `role: "owner" | "collaborator"`), `lib/mock-projects.ts` (mock owned + shared project lists), `lib/slug.ts` (`slugify()` helper for the live slug preview). Added a dedicated `hooks/use-project-dialogs.ts` hook holding all three pieces of state the spec asked for in one place: which dialog is open and for which project (discriminated union: `create` / `rename` / `delete` / `null`), the shared name form field, and an `isLoading` flag (mock async submit with a `setTimeout` — no real request). `components/editor/project-dialogs-provider.tsx` wraps the hook in a React Context (`ProjectDialogsProvider` / `useProjectDialogsContext`) so both the editor home page and the sidebar — separate components under the same layout — can trigger the same dialog state; it renders the three dialogs (`create-project-dialog.tsx`, `rename-project-dialog.tsx`, `delete-project-dialog.tsx`) using the existing `components/ui/dialog.tsx` primitive (untouched, per the protected-foundation-components rule). Create dialog shows a live slug preview via `slugify(name)` that updates on every keystroke. Rename dialog prefills the name input, shows the current name in the description, autofocuses, and submits on Enter. Delete dialog has no input, destructive copy only, and its confirm button uses `variant="destructive"`. `app/editor/layout.tsx` now wraps `ProjectSidebar` and `{children}` in `ProjectDialogsProvider` so the context is available to both. `components/editor/project-sidebar.tsx` renders `mockOwnedProjects`/`mockSharedProjects` through a new `components/editor/project-list-item.tsx` row component; rename/delete icon buttons (`Pencil`/`Trash2`, revealed on row hover) only render when `project.role === "owner"` — shared/collaborator rows show the name only. Added a `fixed inset-0 z-30 bg-black/50 lg:hidden` backdrop scrim rendered alongside the sidebar `<aside>` (only when `isOpen`) whose `onClick` calls the same `onClose` the close button uses, satisfying the mobile tap-outside-to-close + scrim requirement without touching desktop layout. Verified with `tsc --noEmit`, `npm run lint`, and `npm run build` (all pass, zero warnings). Browser/interaction testing intentionally left to the user this round, per their request.

## In Progress

- None.

## Next Up

- Server testing/manual QA of Feature 04 (project dialogs) — left to the user.
- Feature 05 — next feature spec not yet written.

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
