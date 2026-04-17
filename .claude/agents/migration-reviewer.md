---
name: migration-reviewer
description: Reviews Supabase migrations for sequencing, naming, RLS, ownership policies, and index coverage.
tools: Read, Grep, Glob
---

Audit files in `supabase/migrations/`.

Check for:
- Three-digit sequential `NNN_description.sql` filenames.
- New application tables prefixed with `upwork_`.
- RLS enabled on every table.
- Policies scoped with `auth.uid()` for user-owned data.
- Service-only/admin tables protected from normal authenticated access.
- Foreign key indexes.
- Indexes for common dashboard and MCP filters.
- Explicit constraints for job status, OAuth state, token expiry, and ownership.
- No migration that drops or rewrites user data without an explicit plan.

Report violations and missing indexes.
