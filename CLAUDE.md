@AGENTS.md

# Upwork Job MCP

## Overview
MCP server + dashboard for Upwork job hunting. Chrome extension extracts jobs → Supabase stores them → MCP tools let Claude analyze/filter → Dashboard for visual tracking. Full OAuth 2.0 with PKCE for Claude/Cursor/ChatGPT clients.

## Nested Context
- `app/` — route groups, auth gate
- `app/api/` — REST + MCP route
- `lib/mcp/` — MCP server + tools + OAuth
- `lib/supabase/` — server / service-role / client
- `components/ui/` — ShadCN
- `supabase/` — migrations, RLS, access log

## Tech Stack
- Next.js 16.2.x (App Router, Server Components)
- React 19, TypeScript strict mode
- Tailwind CSS v4 (CSS variables, dark theme)
- ShadCN UI (base-nova preset)
- Framer Motion for animations
- MCP SDK (@modelcontextprotocol/sdk)
- Supabase (PostgreSQL + Auth + SSR)
- Zod v4 for validation
- Fonts: Bricolage Grotesque (heading), DM Sans (body), JetBrains Mono (mono)

## Commands
```
npm run dev     # Dev server on :3000
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

## Project Structure
```
app/
  (auth)/login/           # Email/password auth
  (dashboard)/dashboard/  # Protected dashboard
    page.tsx              # Stats overview (KPI cards, score chart)
    jobs/page.tsx         # Job list with filters + Copy JSON
    jobs/[id]/page.tsx    # Job detail view
  api/
    mcp/route.ts          # MCP HTTP endpoint (OAuth-gated)
    jobs/route.ts         # GET list, PATCH bulk update
    jobs/[id]/route.ts    # GET detail, PATCH single update
    jobs/stats/route.ts   # Statistics endpoint
  oauth/                  # OAuth 2.0 (authorize, token, register, revoke)
  .well-known/            # OAuth discovery metadata
components/
  ui/                     # ShadCN primitives (don't edit)
  shared/                 # Sidebar, user menu, animated number
  dashboard/              # Stats overview, score chart, recent jobs
  jobs/                   # Job card, filters, detail, status/score badges
lib/
  mcp/
    server.ts             # MCP server factory
    tools/jobs.ts         # 5 tools: list_jobs, get_job, search_jobs, update_job_status, get_top_jobs
    oauth.ts              # OAuth helpers + token validation
  supabase/               # server.ts, client.ts, service-role.ts
  types.ts                # JobStatus, JobSummary, UpworkJob, JobStats
  utils.ts                # cn() helper
supabase/migrations/      # 001_status_notes, 002_oauth_access_log
```

## Code Conventions
- Server Components by default, `'use client'` only when needed
- Components: PascalCase (StatsOverview, ScoreChart)
- Files: kebab-case (app-sidebar.tsx, recent-jobs.tsx)
- Functions: camelCase (createMcpServer, fetchData)
- Types: PascalCase (JobStatus, UpworkJob)
- Glassmorphism styling: glass-card, backdrop-blur, semi-transparent bg
- Color palette: emerald green (#10b981), cyan (#22d3ee)
- CSS variables: --foreground, --glass-border, --muted-foreground

## Job Statuses
`new` → `maybe` → `applying` → `applied` → `skip`

## MCP Tools
1. list_jobs — Filter by status, search, sort, pagination
2. get_job — Full job detail by ID
3. search_jobs — Text search across title/description
4. update_job_status — Change job status
5. get_top_jobs — Top scored jobs

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database
Supabase PostgreSQL. Main table: upwork_jobs (with status, notes, score, client info). OAuth tables: upwork_mcp_oauth_clients, authorization_codes, tokens. Audit: upwork_job_access_log. RLS on all tables.

## Deployment
Vercel. Production URL: https://jobs-mcp.devfrend.com

## Rules
- All MCP tool inputs must be validated with Zod
- OAuth tokens are opaque hashes — never store raw tokens
- Access log every MCP tool call
- Service role client only in API routes (never in components)
- Test MCP tools with Claude Code before deploying
