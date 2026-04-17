# MCP Area

Follow root `CLAUDE.md` and `AGENTS.md`.

## Files
- `server.ts` creates/registers the MCP server.
- `tools/jobs.ts` owns job tools:
  - `list_jobs`
  - `get_job`
  - `search_jobs`
  - `update_job_status`
  - `get_top_jobs`
- `oauth.ts` owns OAuth token validation and context helpers.

## Tool Rules
- Validate all inputs with Zod v4.
- Derive `user_id` from OAuth context/session, never from caller input.
- Use service-role Supabase only from server-only MCP code.
- Scope every `upwork_jobs` query by `user_id`.
- Log every tool call to `upwork_job_access_log`.
- Keep access log `tool_name` equal to the registered tool name.
- Never return secrets, raw tokens, token hashes, or service-role data.

## Status Updates
- Enforce the allowed status state machine before updating `upwork_jobs.status`.
- Reject invalid transitions with a clear tool error.
