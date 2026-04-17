# App Area

Follow root `CLAUDE.md` and `AGENTS.md`.

## Routing
- This is Next.js 16 App Router.
- Route groups:
  - `(auth)` contains login/auth screens.
  - `(dashboard)` contains the protected dashboard.
- Route group folder names do not appear in URLs.
- Keep auth gate behavior in dashboard layouts/routes.

## Components
- Server Components are the default.
- Add `'use client'` only for browser APIs, state, effects, event handlers, or interactive components.
- Keep data fetching close to server routes/pages when possible.
- Do not expose service-role Supabase clients or secrets to components.

## Responses
- Prefer typed data passed into focused UI components.
- Keep dashboard routes user-scoped through the SSR Supabase client.
