'use client'

import { cn } from '@/lib/utils'

function getScoreColor(score: number) {
  if (score >= 8) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
  if (score >= 5) return 'bg-amber-500/15 text-amber-400 border-amber-500/25'
  return 'bg-rose-500/15 text-rose-400 border-rose-500/25'
}

function getScoreGlow(score: number) {
  if (score >= 8) return 'shadow-emerald-500/10'
  if (score >= 5) return 'shadow-amber-500/10'
  return 'shadow-rose-500/10'
}

export function ScoreBadge({ score, size = 'sm' }: { score: number | null; size?: 'sm' | 'lg' }) {
  if (score === null) {
    return (
      <span className="inline-flex items-center justify-center rounded-lg border border-zinc-500/20 bg-zinc-500/10 text-zinc-500 text-xs font-mono px-2 py-0.5">
        --
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg border font-mono font-bold shadow-lg',
        getScoreColor(score),
        getScoreGlow(score),
        size === 'lg' ? 'text-2xl px-4 py-2 min-w-[60px]' : 'text-xs px-2 py-0.5 min-w-[32px]'
      )}
    >
      {score}
    </span>
  )
}
