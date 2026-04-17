# Supabase Migrations Area

Follow root `CLAUDE.md` and `AGENTS.md`.

## Migrations
- Store migrations in `supabase/migrations/`.
- Use three-digit sequential filenames.
- New application tables must use the `upwork_` prefix.
- Enable RLS on every table.
- Scope user-owned data with `auth.uid()`.
- Add indexes for foreign keys and common query filters.
- Avoid destructive migrations unless explicitly planned.

## Access Log
- `upwork_job_access_log.tool_name` must match MCP tool names exactly.
- MCP tools must insert access log rows for every call.
- Keep log rows useful for auditing without storing raw tokens, secrets, or large payloads.
