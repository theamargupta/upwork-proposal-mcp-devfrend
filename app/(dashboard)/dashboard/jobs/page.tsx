import { JobList } from '@/components/jobs/job-list'

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Jobs</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Browse and manage your saved Upwork jobs
        </p>
      </div>

      <JobList />
    </div>
  )
}
