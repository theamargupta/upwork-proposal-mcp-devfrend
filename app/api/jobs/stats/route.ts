import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { JobStatus, JobStats } from '@/lib/types'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: jobs, error } = await supabase
    .from('upwork_jobs')
    .select('score, status')
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const allJobs = jobs || []
  const total = allJobs.length
  const scores = allJobs.map((j) => j.score).filter((s): s is number => s !== null)
  const avg_score = scores.length > 0 ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0

  const by_status: Record<JobStatus, number> = { new: 0, maybe: 0, applying: 0, applied: 0, skip: 0 }
  for (const job of allJobs) {
    const s = (job.status || 'new') as JobStatus
    by_status[s] = (by_status[s] || 0) + 1
  }

  const scoreCounts = new Map<number, number>()
  for (const s of scores) {
    scoreCounts.set(s, (scoreCounts.get(s) || 0) + 1)
  }
  const score_distribution = Array.from({ length: 10 }, (_, i) => ({
    score: i + 1,
    count: scoreCounts.get(i + 1) || 0,
  }))

  const stats: JobStats = { total, avg_score, by_status, score_distribution }
  return NextResponse.json(stats)
}
