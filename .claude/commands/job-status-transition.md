# Job Status Transition

Allowed transition matrix:

| From | To |
| --- | --- |
| `new` | `maybe`, `applying`, `skip` |
| `maybe` | `applying`, `skip`, `new` |
| `applying` | `applied`, `skip` |
| `applied` | `skip` |
| `skip` | `new` |

Linear path: `new` -> `maybe` -> `applying` -> `applied` -> `skip`.

Terminal behavior:
- `applied` is terminal except for moving to `skip`.
- `skip` can only move back to `new`.
- Never permit `applied` -> `applying`.

SQL to find rows with invalid current status values:

```sql
select id, user_id, title, status, updated_at
from upwork_jobs
where status not in ('new', 'maybe', 'applying', 'applied', 'skip')
order by updated_at desc;
```

SQL template to validate transition history if a status history table exists:

```sql
select job_id, from_status, to_status, changed_at
from upwork_job_status_history
where not (
  (from_status = 'new' and to_status in ('maybe', 'applying', 'skip'))
  or (from_status = 'maybe' and to_status in ('applying', 'skip', 'new'))
  or (from_status = 'applying' and to_status in ('applied', 'skip'))
  or (from_status = 'applied' and to_status = 'skip')
  or (from_status = 'skip' and to_status = 'new')
)
order by changed_at desc;
```
