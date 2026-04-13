import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { JobStatus } from '@/lib/types'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const params = request.nextUrl.searchParams
  const status = params.get('status') as JobStatus | null
  const search = params.get('search')
  const sortBy = params.get('sort_by') || 'score'
  const sortOrder = params.get('sort_order') || 'desc'
  const limit = Math.min(Number(params.get('limit') || 20), 50)
  const offset = Number(params.get('offset') || 0)
  const minScore = params.get('min_score') ? Number(params.get('min_score')) : null

  let query = supabase
    .from('upwork_jobs')
    .select('id, title, budget_amount, budget_type, score, status, skills, client_total_spent, client_payment_verified, proposals, created_at, url, experience_level, client_location, notes')
    .eq('user_id', user.id)
    .order(sortBy, { ascending: sortOrder === 'asc', nullsFirst: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)
  if (minScore) query = query.gte('score', minScore)
  if (search) {
    const pattern = `%${search}%`
    query = query.or(`title.ilike.${pattern},description.ilike.${pattern}`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ jobs: data || [], count: (data || []).length })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  if (!body || !Array.isArray(body.job_ids) || !body.status) {
    return NextResponse.json({ error: 'job_ids (array) and status required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('upwork_jobs')
    .update({ status: body.status })
    .eq('user_id', user.id)
    .in('id', body.job_ids)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, updated: body.job_ids.length })
}
