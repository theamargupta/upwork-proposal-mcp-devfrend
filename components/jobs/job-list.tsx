'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { JobCard } from './job-card'
import { JobFilters } from './job-filters'
import { Loader2 } from 'lucide-react'
import type { JobSummary, JobStatus, JobStats } from '@/lib/types'

export function JobList() {
  const [jobs, setJobs] = useState<JobSummary[]>([])
  const [stats, setStats] = useState<JobStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: null as JobStatus | null,
    search: '',
    sortBy: 'score',
    sortOrder: 'desc',
  })

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.status) params.set('status', filters.status)
    if (filters.search) params.set('search', filters.search)
    params.set('sort_by', filters.sortBy)
    params.set('sort_order', filters.sortOrder)
    params.set('limit', '50')

    const res = await fetch(`/api/jobs?${params}`)
    const data = await res.json()
    setJobs(data.jobs || [])
    setLoading(false)
  }, [filters])

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/jobs/stats')
    const data = await res.json()
    setStats(data)
  }, [])

  useEffect(() => { fetchJobs() }, [fetchJobs])
  useEffect(() => { fetchStats() }, [fetchStats])

  const handleStatusChange = async (jobId: number, status: JobStatus) => {
    await fetch(`/api/jobs/${jobId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)))
    fetchStats()
  }

  const handleFilterChange = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="space-y-6">
      <JobFilters
        filters={filters}
        onChange={handleFilterChange}
        statusCounts={stats?.by_status || { new: 0, maybe: 0, applying: 0, applied: 0, skip: 0 }}
        total={stats?.total || 0}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={20} className="animate-spin text-[#10b981]" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--muted-foreground)] text-sm">No jobs found</p>
          <p className="text-[var(--muted-foreground)]/50 text-xs mt-1">Extract some jobs with the Chrome extension first</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onStatusChange={handleStatusChange} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
