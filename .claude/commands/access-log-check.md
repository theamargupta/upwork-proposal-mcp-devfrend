# Access Log Check

Use this SQL to inspect recent MCP access log rows.

```sql
select
  tool_name,
  count(*) as calls,
  min(created_at) as first_seen,
  max(created_at) as last_seen
from upwork_job_access_log
where created_at >= now() - interval '24 hours'
group by tool_name
order by calls desc, tool_name;
```

Recent detail rows:

```sql
select
  created_at,
  user_id,
  tool_name,
  job_id,
  success,
  error_message
from upwork_job_access_log
order by created_at desc
limit 100;
```
