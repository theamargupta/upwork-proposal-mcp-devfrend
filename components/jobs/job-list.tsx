'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { JobCard } from './job-card'
import { JobFilters } from './job-filters'
import { Loader2, Copy, Check } from 'lucide-react'
import type { JobSummary, JobStatus, JobStats } from '@/lib/types'

export function JobList() {
  const [jobs, setJobs] = useState<JobSummary[]>([])
  const [stats, setStats] = useState<JobStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
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

  const handleCopyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(jobs, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFilterChange = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <JobFilters
            filters={filters}
            onChange={handleFilterChange}
            statusCounts={stats?.by_status || { new: 0, maybe: 0, applying: 0, applied: 0, skip: 0 }}
            total={stats?.total || 0}
          />
        </div>
        {jobs.length > 0 && (
          <button
            onClick={handleCopyJson}
            className="mt-[3.25rem] h-9 px-3 rounded-xl border border-[var(--glass-border)] bg-white/[0.02] text-xs text-[var(--muted-foreground)] hover:text-foreground hover:border-[#10b981]/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check size={13} className="text-[#10b981]" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
        )}
      </div>

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
