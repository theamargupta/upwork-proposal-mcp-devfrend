# Add Migration

Use this when creating a Supabase migration.

## Naming
- Create the next sequential migration after `002_oauth_access_log.sql`.
- Use a three-digit `NNN_description.sql` filename.
- Prefix new application tables with `upwork_`.

## Requirements
- Enable RLS on every new table.
- Scope user-owned rows with `auth.uid()`.
- Add policies for each operation that should be allowed.
- Add indexes for foreign keys.
- Add indexes used by common filters or joins.
- Use explicit constraints for enums, status values, timestamps, and ownership columns.
- Avoid destructive changes unless the plan explicitly calls them out.

## Verification
```sql
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename like 'upwork_%'
order by tablename;
```
