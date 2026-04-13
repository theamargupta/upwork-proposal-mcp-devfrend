'use client'

import { motion } from 'framer-motion'

function getBarColor(score: number): string {
  if (score >= 8) return '#10b981'
  if (score >= 5) return '#f59e0b'
  return '#f87171'
}

export function ScoreChart({ distribution }: { distribution: { score: number; count: number }[] }) {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1)

  return (
    <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]/60 mb-4">
        Score Distribution
      </h3>
      <div className="flex items-end gap-2 h-32">
        {distribution.map((d, i) => (
          <div key={d.score} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-[var(--muted-foreground)]/50">
              {d.count > 0 ? d.count : ''}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.count / maxCount) * 100}%` }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
              className="w-full rounded-t-md min-h-[2px]"
              style={{ backgroundColor: getBarColor(d.score) }}
            />
            <span className="text-[10px] font-mono text-[var(--muted-foreground)]/40">
              {d.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
