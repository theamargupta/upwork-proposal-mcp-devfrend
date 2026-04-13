'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, DollarSign, Users, BadgeCheck } from 'lucide-react'
import { ScoreBadge } from './score-badge'
import { StatusBadge } from './status-badge'
import type { JobSummary, JobStatus } from '@/lib/types'

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export function JobCard({
  job,
  onStatusChange,
}: {
  job: JobSummary
  onStatusChange: (jobId: number, status: JobStatus) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group relative rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] hover:border-[#10b981]/20 transition-all duration-200"
    >
      <Link href={`/dashboard/jobs/${job.id}`} className="block p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium text-foreground/90 leading-snug line-clamp-2 flex-1 group-hover:text-foreground transition-colors">
            {job.title || 'Untitled Job'}
          </h3>
          <ScoreBadge score={job.score} />
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[var(--muted-foreground)]">
          {job.budget_amount && (
            <span className="flex items-center gap-1">
              <DollarSign size={11} />
              {job.budget_amount}
              {job.budget_type && <span className="opacity-60">({job.budget_type})</span>}
            </span>
          )}
          {job.proposals && (
            <span className="flex items-center gap-1">
              <Users size={11} />
              {job.proposals} proposals
            </span>
          )}
          {job.client_location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {job.client_location}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[var(--muted-foreground)]">
          {job.client_payment_verified && (
            <span className="flex items-center gap-0.5 text-emerald-400">
              <BadgeCheck size={11} /> Verified
            </span>
          )}
          {job.client_total_spent && (
            <span>Spent: {job.client_total_spent}</span>
          )}
          {job.experience_level && (
            <span className="opacity-60">{job.experience_level}</span>
          )}
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-white/[0.04] border border-[var(--glass-border)] px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)]"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="text-[10px] text-[var(--muted-foreground)]/50">+{job.skills.length - 5}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <StatusBadge
              status={job.status}
              interactive
              onChange={(s) => onStatusChange(job.id, s)}
            />
            <span className="text-[10px] text-[var(--muted-foreground)]/50">
              {timeAgo(job.created_at)}
            </span>
          </div>
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--muted-foreground)]/40 hover:text-[#10b981] transition-colors"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
