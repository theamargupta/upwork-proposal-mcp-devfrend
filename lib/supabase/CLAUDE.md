# Supabase Area

Follow root `CLAUDE.md` and `AGENTS.md`.

## Clients
- `server.ts` is the SSR/server user client.
- `client.ts` is the browser client.
- `service-role.ts` is server-only and must include `import 'server-only'`.

## Rules
- Never import the service-role client into React components or browser code.
- Use the SSR client for authenticated dashboard reads/writes.
- Use service-role only in API/MCP/OAuth server code when RLS bypass is required.
- Keep user data scoped by `auth.uid()` or explicit authenticated user id.
- Never log Supabase keys or OAuth tokens.
