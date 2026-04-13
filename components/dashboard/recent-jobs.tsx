'use client'

import Link from 'next/link'
import { ScoreBadge } from '@/components/jobs/score-badge'
import { StatusBadge } from '@/components/jobs/status-badge'
import type { JobSummary } from '@/lib/types'

export function RecentJobs({ jobs }: { jobs: JobSummary[] }) {
  return (
    <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]/60">
          Recent Jobs
        </h3>
        <Link href="/dashboard/jobs" className="text-[11px] text-[#10b981] hover:text-[#34d399] transition-colors">
          View all &rarr;
        </Link>
      </div>
      <div className="space-y-2">
        {jobs.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]/50 text-center py-8">No jobs yet</p>
        ) : (
          jobs.slice(0, 10).map((job) => (
            <Link
              key={job.id}
              href={`/dashboard/jobs/${job.id}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <ScoreBadge score={job.score} />
              <span className="flex-1 text-sm text-foreground/80 truncate">
                {job.title || 'Untitled'}
              </span>
              <StatusBadge status={job.status} />
              {job.budget_amount && (
                <span className="text-[11px] text-[var(--muted-foreground)]/50 font-mono">
                  {job.budget_amount}
                </span>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
