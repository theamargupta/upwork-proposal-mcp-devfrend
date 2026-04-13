import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { JobDetail } from '@/components/jobs/job-detail'
import type { UpworkJob } from '@/lib/types'

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) notFound()

  const { data, error } = await supabase
    .from('upwork_jobs')
    .select('*')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single()

  if (error || !data) notFound()

  return <JobDetail job={data as UpworkJob} />
}
