'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { STATUS_LABELS, STATUS_COLORS, JOB_STATUSES, type JobStatus } from '@/lib/types'
import { ChevronDown } from 'lucide-react'

export function StatusBadge({
  status,
  onChange,
  interactive = false,
}: {
  status: JobStatus
  onChange?: (newStatus: JobStatus) => void
  interactive?: boolean
}) {
  const [open, setOpen] = useState(false)

  if (!interactive) {
    return (
      <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', STATUS_COLORS[status])}>
        {STATUS_LABELS[status]}
      </span>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open) }}
        className={cn(
          'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium cursor-pointer transition-all hover:brightness-125',
          STATUS_COLORS[status]
        )}
      >
        {STATUS_LABELS[status]}
        <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 rounded-xl border border-[var(--glass-border)] bg-[#14141f] shadow-2xl shadow-black/40 py-1 min-w-[120px]">
            {JOB_STATUSES.map((s) => (
              <button
                key={s}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange?.(s)
                  setOpen(false)
                }}
                className={cn(
                  'w-full text-left px-3 py-1.5 text-xs hover:bg-white/5 transition-colors',
                  s === status ? 'text-foreground font-medium' : 'text-[var(--muted-foreground)]'
                )}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
