# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Feature 01 (Design System) — complete

## Current Goal

- Feature 02 (TBD)

## Completed

- Feature 01: Design System — shadcn/ui initialized (style `base-nova`, base color `neutral`, CSS variables, `lucide` icon library) for Tailwind v4. Added Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea to `components/ui/`. `lucide-react` installed. `lib/utils.ts` exports `cn()` (clsx + tailwind-merge). `app/globals.css` rewritten so all shadcn tokens (`--background`, `--foreground`, `--card`, `--primary`, etc.) and the app's own dark palette (`--bg-base`, `--text-primary`, `--accent-primary`, `--accent-ai`, etc., per `context/ui-context.md`) are set once in `:root` — no `.dark` class toggle. Verified with `tsc --noEmit`, `npm run build`, `npm run lint`, and a Playwright screenshot of the homepage under both `light` and `dark` emulated `prefers-color-scheme` (identical dark rendering in both, confirming no light-mode leakage).

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
