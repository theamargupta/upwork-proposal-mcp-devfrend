'use client'

import { AnimatedNumber } from '@/components/shared/animated-number'
import { Briefcase, TrendingUp, Send, Ban } from 'lucide-react'
import type { JobStats } from '@/lib/types'

const statCards = [
  { key: 'total', label: 'Total Jobs', icon: Briefcase, color: '#10b981' },
  { key: 'avg_score', label: 'Avg Score', icon: TrendingUp, color: '#22d3ee' },
  { key: 'applying', label: 'Applying', icon: Send, color: '#a78bfa' },
  { key: 'skip', label: 'Skipped', icon: Ban, color: '#f87171' },
] as const

export function StatsOverview({ stats }: { stats: JobStats | null }) {
  function getValue(key: string): number {
    if (!stats) return 0
    if (key === 'total') return stats.total
    if (key === 'avg_score') return stats.avg_score
    if (key === 'applying') return stats.by_status.applying
    if (key === 'skip') return stats.by_status.skip
    return 0
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statCards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]/60">
              {card.label}
            </span>
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${card.color}15` }}
            >
              <card.icon size={14} style={{ color: card.color }} />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold tracking-tight">
            <AnimatedNumber value={getValue(card.key)} />
          </div>
        </div>
      ))}
    </div>
  )
}
