# Add MCP Tool

Use this when adding a new MCP tool for Upwork jobs.

## Checklist
- Read `lib/mcp/CLAUDE.md` and root `CLAUDE.md`.
- Implement the tool in `lib/mcp/tools/jobs.ts`.
- Register the tool in `lib/mcp/server.ts`.
- Use Zod v4 for every input schema.
- Extract the authenticated user id from the OAuth/session context; do not accept `user_id` from tool input.
- Query `upwork_jobs` scoped to the authenticated `user_id`.
- Use the server-only service-role Supabase client for MCP tool database access.
- Insert one `upwork_job_access_log` row for every tool call, including failures when a user id is available.
- Keep `tool_name` exactly equal to the MCP tool registration name.
- Return stable, JSON-serializable data only.

## Required Review
- Confirm all inputs reject unknown or invalid values.
- Confirm no raw OAuth tokens or service-role secrets are returned or logged.
- Confirm the tool cannot read or mutate another user's jobs.
