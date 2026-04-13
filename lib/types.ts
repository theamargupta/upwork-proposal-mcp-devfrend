export type JobStatus = 'new' | 'maybe' | 'applying' | 'applied' | 'skip'

export const JOB_STATUSES: JobStatus[] = ['new', 'maybe', 'applying', 'applied', 'skip']

export const STATUS_LABELS: Record<JobStatus, string> = {
  new: 'New',
  maybe: 'Maybe',
  applying: 'Applying',
  applied: 'Applied',
  skip: 'Skip',
}

export const STATUS_COLORS: Record<JobStatus, string> = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  maybe: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  applying: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  applied: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  skip: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
}

export type UpworkJob = {
  id: number
  user_id: string
  job_uid: string | null
  title: string | null
  description: string | null
  url: string | null
  budget_amount: string | null
  budget_type: string | null
  experience_level: string | null
  posted_date: string | null
  location: string | null
  project_length: string | null
  project_type: string | null
  proposals: string | null
  skills: string[] | null
  last_viewed: string | null
  interviewing: string | null
  invites_sent: string | null
  bid_high: string | null
  bid_avg: string | null
  bid_low: string | null
  connects_required: string | null
  connects_available: string | null
  client_payment_verified: boolean | null
  client_location: string | null
  client_hire_rate: string | null
  client_open_jobs: string | null
  client_total_spent: string | null
  client_member_since: string | null
  client_rating: string | null
  client_reviews: string | null
  score: number | null
  score_label: string | null
  status: JobStatus
  notes: string | null
  extracted_at: string | null
  created_at: string | null
}

export type JobSummary = Pick<
  UpworkJob,
  'id' | 'title' | 'budget_amount' | 'budget_type' | 'score' | 'status' | 'skills' |
  'client_total_spent' | 'client_payment_verified' | 'proposals' | 'created_at' | 'url' |
  'experience_level' | 'client_location'
>

export type JobStats = {
  total: number
  avg_score: number
  by_status: Record<JobStatus, number>
  score_distribution: { score: number; count: number }[]
}
