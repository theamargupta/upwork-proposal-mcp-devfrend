# API Area

Follow root `CLAUDE.md`, `app/CLAUDE.md`, and `AGENTS.md`.

## MCP
- `app/api/mcp/route.ts` is stateless and OAuth-gated.
- Require a valid bearer token before creating or invoking MCP tools.
- Tool execution must use the authenticated OAuth user context.
- Do not cache MCP responses.

## REST
- `/api/jobs/*` routes support dashboard calls.
- Validate request bodies and query params with Zod.
- Use the Supabase SSR client for user dashboard operations.
- Use the service-role client only for admin/server-only operations that require it.
- Scope job reads and writes by the authenticated user.
- Return JSON as `{ success, data }` on success.
- Return JSON errors with a stable shape and appropriate HTTP status.
