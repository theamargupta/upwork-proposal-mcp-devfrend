'use client'

import { Search, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { JOB_STATUSES, STATUS_LABELS, type JobStatus } from '@/lib/types'

type FilterState = {
  status: JobStatus | null
  search: string
  sortBy: string
  sortOrder: string
}

export function JobFilters({
  filters,
  onChange,
  statusCounts,
  total,
}: {
  filters: FilterState
  onChange: (updates: Partial<FilterState>) => void
  statusCounts: Record<JobStatus, number>
  total: number
}) {
  const allStatuses: (JobStatus | null)[] = [null, ...JOB_STATUSES]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-[var(--glass-border)]">
        {allStatuses.map((s) => {
          const isActive = filters.status === s
          const count = s === null ? total : statusCounts[s] || 0
          return (
            <button
              key={s ?? 'all'}
              onClick={() => onChange({ status: s })}
              className={cn(
                'relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                isActive
                  ? 'bg-[#10b981]/10 text-[#34d399] border border-[#10b981]/20'
                  : 'text-[var(--muted-foreground)] hover:text-foreground/70 border border-transparent'
              )}
            >
              {s === null ? 'All' : STATUS_LABELS[s]}
              <span className={cn(
                'ml-1.5 text-[10px] font-mono',
                isActive ? 'text-[#34d399]/70' : 'text-[var(--muted-foreground)]/40'
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search jobs..."
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-[var(--glass-border)] bg-white/[0.02] text-sm text-foreground placeholder:text-[var(--muted-foreground)]/40 focus:outline-none focus:border-[#10b981]/30 focus:ring-2 focus:ring-[#10b981]/10 transition-all"
          />
        </div>
        <button
          onClick={() => {
            const nextOrder = filters.sortOrder === 'desc' ? 'asc' : 'desc'
            onChange({ sortOrder: nextOrder })
          }}
          className="h-9 px-3 rounded-xl border border-[var(--glass-border)] bg-white/[0.02] text-xs text-[var(--muted-foreground)] hover:text-foreground hover:border-[#10b981]/20 transition-all flex items-center gap-1.5"
        >
          <ArrowUpDown size={13} />
          {filters.sortBy === 'score' ? 'Score' : filters.sortBy === 'created_at' ? 'Date' : 'Budget'}
          {filters.sortOrder === 'desc' ? ' (high)' : ' (low)'}
        </button>
      </div>
    </div>
  )
}
