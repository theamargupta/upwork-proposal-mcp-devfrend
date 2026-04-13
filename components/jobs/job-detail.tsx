'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, DollarSign, Clock, Users, BadgeCheck, Star, Building2, Calendar, Zap } from 'lucide-react'
import { ScoreBadge } from './score-badge'
import { StatusBadge } from './status-badge'
import type { UpworkJob, JobStatus } from '@/lib/types'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]/60">
        {title}
      </h3>
      {children}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={14} className="text-[var(--muted-foreground)]/50 shrink-0" />
      <span className="text-[var(--muted-foreground)]/60 text-xs">{label}:</span>
      <span className="text-foreground/80">{value}</span>
    </div>
  )
}

export function JobDetail({ job: initialJob }: { job: UpworkJob }) {
  const [job, setJob] = useState(initialJob)
  const [notes, setNotes] = useState(job.notes || '')
  const [saving, setSaving] = useState(false)

  const handleStatusChange = async (status: JobStatus) => {
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setJob((prev) => ({ ...prev, status }))
  }

  const handleSaveNotes = async () => {
    setSaving(true)
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    })
    setJob((prev) => ({ ...prev, notes }))
    setSaving(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-xl font-heading font-bold tracking-tight text-foreground/90">
            {job.title || 'Untitled Job'}
          </h1>
          <div className="flex items-center gap-3">
            <StatusBadge status={job.status} interactive onChange={handleStatusChange} />
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#10b981] hover:text-[#34d399] transition-colors"
              >
                Open on Upwork <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
        <ScoreBadge score={job.score} size="lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5 space-y-3">
            <Section title="Budget & Type">
              <div className="grid grid-cols-2 gap-3">
                <InfoRow icon={DollarSign} label="Budget" value={job.budget_amount} />
                <InfoRow icon={Zap} label="Type" value={job.budget_type} />
                <InfoRow icon={Clock} label="Length" value={job.project_length} />
                <InfoRow icon={Star} label="Level" value={job.experience_level} />
              </div>
            </Section>
          </div>

          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5 space-y-3">
            <Section title="Competition">
              <div className="grid grid-cols-2 gap-3">
                <InfoRow icon={Users} label="Proposals" value={job.proposals} />
                <InfoRow icon={Zap} label="Connects" value={job.connects_required} />
                <InfoRow icon={DollarSign} label="Bid High" value={job.bid_high} />
                <InfoRow icon={DollarSign} label="Bid Avg" value={job.bid_avg} />
                <InfoRow icon={DollarSign} label="Bid Low" value={job.bid_low} />
              </div>
            </Section>
          </div>

          {job.description && (
            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5">
              <Section title="Description">
                <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </Section>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5">
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-[#10b981]/8 border border-[#10b981]/15 px-2.5 py-1 text-xs text-[#34d399]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )}
        </div>

        {/* Sidebar (1 col) */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5 space-y-3">
            <Section title="Client">
              <div className="space-y-2">
                {job.client_payment_verified && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                    <BadgeCheck size={13} /> Payment Verified
                  </div>
                )}
                {job.client_payment_verified === false && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
                    <BadgeCheck size={13} /> Not Verified
                  </div>
                )}
                <InfoRow icon={MapPin} label="Location" value={job.client_location} />
                <InfoRow icon={DollarSign} label="Total Spent" value={job.client_total_spent} />
                <InfoRow icon={Star} label="Rating" value={job.client_rating} />
                <InfoRow icon={Users} label="Reviews" value={job.client_reviews} />
                <InfoRow icon={Users} label="Hire Rate" value={job.client_hire_rate} />
                <InfoRow icon={Building2} label="Open Jobs" value={job.client_open_jobs} />
                <InfoRow icon={Calendar} label="Member Since" value={job.client_member_since} />
              </div>
            </Section>
          </div>

          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5 space-y-3">
            <Section title="Notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this job..."
                rows={4}
                className="w-full rounded-lg border border-[var(--glass-border)] bg-white/[0.02] text-sm text-foreground placeholder:text-[var(--muted-foreground)]/30 p-3 focus:outline-none focus:border-[#10b981]/30 focus:ring-2 focus:ring-[#10b981]/10 transition-all resize-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={saving || notes === (job.notes || '')}
                className="w-full h-8 rounded-lg bg-[#10b981] text-white text-xs font-semibold hover:bg-[#34d399] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Notes'}
              </button>
            </Section>
          </div>

          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] p-5 space-y-3">
            <Section title="Activity">
              <div className="space-y-2">
                <InfoRow icon={Calendar} label="Extracted" value={job.extracted_at ? new Date(job.extracted_at).toLocaleDateString() : null} />
                <InfoRow icon={Calendar} label="Posted" value={job.posted_date} />
                <InfoRow icon={Clock} label="Last Viewed" value={job.last_viewed} />
                <InfoRow icon={Users} label="Interviewing" value={job.interviewing} />
                <InfoRow icon={Users} label="Invites Sent" value={job.invites_sent} />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
