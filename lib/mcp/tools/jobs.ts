import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

const JOB_STATUS_ENUM = z.enum(['new', 'maybe', 'applying', 'applied', 'skip'])

const JOB_SUMMARY_FIELDS = 'id, title, budget_amount, budget_type, score, status, skills, client_total_spent, client_payment_verified, proposals, created_at, url, experience_level, client_location'

function logAccess(userId: string, action: string, source: string, jobId?: number, query?: string) {
  const supabase = createServiceRoleClient()
  void supabase.from('upwork_job_access_log').insert({
    user_id: userId,
    job_id: jobId || null,
    action,
    source,
    query: query || null,
  })
}

export function registerJobTools(server: McpServer) {
  // ── list_jobs ──────────────────────────────────────────
  server.tool(
    'list_jobs',
    'Browse saved Upwork jobs with filters for status, score, sorting, and pagination.',
    {
      status: JOB_STATUS_ENUM.optional().describe('Filter by job status'),
      min_score: z.number().min(1).max(10).optional().describe('Minimum score threshold'),
      sort_by: z.enum(['score', 'created_at', 'budget_amount']).default('score').describe('Sort field'),
      sort_order: z.enum(['asc', 'desc']).default('desc').describe('Sort direction'),
      limit: z.number().min(1).max(50).default(20).describe('Max results (default: 20)'),
      offset: z.number().min(0).default(0).describe('Pagination offset'),
    },
    async ({ status, min_score, sort_by, sort_order, limit, offset }, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string
      if (!userId) throw new Error('Unauthorized')

      const supabase = createServiceRoleClient()
      let query = supabase
        .from('upwork_jobs')
        .select(JOB_SUMMARY_FIELDS)
        .eq('user_id', userId)
        .order(sort_by, { ascending: sort_order === 'asc', nullsFirst: false })
        .range(offset, offset + limit - 1)

      if (status) query = query.eq('status', status)
      if (min_score) query = query.gte('score', min_score)

      const { data, error } = await query
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }], isError: true }

      logAccess(userId, 'list_jobs', authInfo?.clientId || 'mcp')

      return { content: [{ type: 'text' as const, text: JSON.stringify({ jobs: data || [], count: (data || []).length }) }] }
    }
  )

  // ── get_job ────────────────────────────────────────────
  server.tool(
    'get_job',
    'Get full details of a specific Upwork job by ID.',
    {
      job_id: z.number().describe('ID of the job'),
    },
    async ({ job_id }, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string
      if (!userId) throw new Error('Unauthorized')

      const supabase = createServiceRoleClient()
      const { data, error } = await supabase
        .from('upwork_jobs')
        .select('*')
        .eq('id', job_id)
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        return { content: [{ type: 'text' as const, text: 'Error: Job not found' }], isError: true }
      }

      logAccess(userId, 'get_job', authInfo?.clientId || 'mcp', job_id)

      return { content: [{ type: 'text' as const, text: JSON.stringify(data) }] }
    }
  )

  // ── search_jobs ────────────────────────────────────────
  server.tool(
    'search_jobs',
    'Search Upwork jobs by keyword across titles, descriptions, and skills.',
    {
      query: z.string().min(1).describe('Search text'),
      status: JOB_STATUS_ENUM.optional().describe('Filter by status'),
      limit: z.number().min(1).max(20).default(10).describe('Max results (default: 10)'),
    },
    async ({ query: searchQuery, status, limit }, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string
      if (!userId) throw new Error('Unauthorized')

      const supabase = createServiceRoleClient()
      const pattern = `%${searchQuery}%`

      let query = supabase
        .from('upwork_jobs')
        .select(JOB_SUMMARY_FIELDS)
        .eq('user_id', userId)
        .or(`title.ilike.${pattern},description.ilike.${pattern}`)
        .order('score', { ascending: false, nullsFirst: false })
        .limit(limit)

      if (status) query = query.eq('status', status)

      const { data, error } = await query
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }], isError: true }

      logAccess(userId, 'search_jobs', authInfo?.clientId || 'mcp', undefined, searchQuery)

      return { content: [{ type: 'text' as const, text: JSON.stringify({ jobs: data || [], count: (data || []).length, query: searchQuery }) }] }
    }
  )

  // ── update_job_status ──────────────────────────────────
  server.tool(
    'update_job_status',
    'Change the status of an Upwork job (new, maybe, applying, applied, skip). Optionally add notes.',
    {
      job_id: z.number().describe('ID of the job'),
      status: JOB_STATUS_ENUM.describe('New status'),
      notes: z.string().optional().describe('Optional notes (e.g. why skipping, proposal notes)'),
    },
    async ({ job_id, status, notes }, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string
      if (!userId) throw new Error('Unauthorized')

      const supabase = createServiceRoleClient()
      const updates: Record<string, unknown> = { status }
      if (notes !== undefined) updates.notes = notes

      const { data, error } = await supabase
        .from('upwork_jobs')
        .update(updates)
        .eq('id', job_id)
        .eq('user_id', userId)
        .select('id, title, status, notes, score')
        .single()

      if (error || !data) {
        return { content: [{ type: 'text' as const, text: 'Error: Job not found or update failed' }], isError: true }
      }

      logAccess(userId, 'update_status', authInfo?.clientId || 'mcp', job_id)

      return { content: [{ type: 'text' as const, text: JSON.stringify({ ...data, message: `Status updated to "${status}"` }) }] }
    }
  )

  // ── get_top_jobs ───────────────────────────────────────
  server.tool(
    'get_top_jobs',
    'Get highest-scored Upwork jobs that are still actionable (excludes applied/skipped by default).',
    {
      limit: z.number().min(1).max(20).default(10).describe('How many (default: 10)'),
      exclude_status: z
        .array(JOB_STATUS_ENUM)
        .default(['skip', 'applied'])
        .describe('Statuses to exclude (default: skip, applied)'),
    },
    async ({ limit, exclude_status }, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string
      if (!userId) throw new Error('Unauthorized')

      const supabase = createServiceRoleClient()
      let query = supabase
        .from('upwork_jobs')
        .select(JOB_SUMMARY_FIELDS)
        .eq('user_id', userId)
        .not('score', 'is', null)
        .order('score', { ascending: false })
        .limit(limit)

      for (const s of exclude_status) {
        query = query.neq('status', s)
      }

      const { data, error } = await query
      if (error) return { content: [{ type: 'text' as const, text: `Error: ${error.message}` }], isError: true }

      logAccess(userId, 'get_top_jobs', authInfo?.clientId || 'mcp')

      return { content: [{ type: 'text' as const, text: JSON.stringify({ jobs: data || [], count: (data || []).length }) }] }
    }
  )
}
