'use client'

import { useEffect, useState, useCallback } from 'react'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { ScoreChart } from '@/components/dashboard/score-chart'
import { RecentJobs } from '@/components/dashboard/recent-jobs'
import type { JobStats, JobSummary } from '@/lib/types'

export default function DashboardPage() {
  const [stats, setStats] = useState<JobStats | null>(null)
  const [recentJobs, setRecentJobs] = useState<JobSummary[]>([])

  const fetchData = useCallback(async () => {
    const [statsRes, jobsRes] = await Promise.all([
      fetch('/api/jobs/stats'),
      fetch('/api/jobs?sort_by=created_at&sort_order=desc&limit=10'),
    ])
    const statsData = await statsRes.json()
    const jobsData = await jobsRes.json()
    setStats(statsData)
    setRecentJobs(jobsData.jobs || [])
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Your Upwork job hunting overview
        </p>
      </div>

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ScoreChart distribution={stats?.score_distribution || []} />
        <RecentJobs jobs={recentJobs} />
      </div>
    </div>
  )
}
