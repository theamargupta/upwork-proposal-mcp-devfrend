---
name: job-status-state-machine
description: Ensures job status transitions follow new → maybe → applying → applied → skip.
tools: Read, Grep, Glob
---

Audit `update_job_status` tool and any UI action that updates `upwork_jobs.status`.

Allowed transitions:
- `new` → `maybe` | `applying` | `skip`
- `maybe` → `applying` | `skip` | `new`
- `applying` → `applied` | `skip`
- `applied` → `skip` (terminal otherwise)
- `skip` → `new` (allow un-skipping)

Flag any code that permits `applied` → `applying` or skips validation.

Report violations.
