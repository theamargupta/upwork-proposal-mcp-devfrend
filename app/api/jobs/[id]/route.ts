import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('upwork_jobs')
    .select('*')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  return NextResponse.json(data)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Body required' }, { status: 400 })

  const updates: Record<string, unknown> = {}
  if (body.status !== undefined) updates.status = body.status
  if (body.notes !== undefined) updates.notes = body.notes

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('upwork_jobs')
    .update(updates)
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .select('id, title, status, notes, score')
    .single()

  if (error || !data) return NextResponse.json({ error: 'Update failed' }, { status: 500 })

  return NextResponse.json(data)
}
