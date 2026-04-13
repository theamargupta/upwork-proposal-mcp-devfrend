-- Add status column for workflow tracking
ALTER TABLE upwork_jobs
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- Add check constraint separately
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'upwork_jobs_status_check'
  ) THEN
    ALTER TABLE upwork_jobs
      ADD CONSTRAINT upwork_jobs_status_check
      CHECK (status IN ('new', 'maybe', 'applying', 'applied', 'skip'));
  END IF;
END $$;

-- Add notes column for Claude/user notes
ALTER TABLE upwork_jobs
  ADD COLUMN IF NOT EXISTS notes text;

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_upwork_jobs_status ON upwork_jobs(status);

-- Backfill existing rows: set status = 'new' where null
UPDATE upwork_jobs SET status = 'new' WHERE status IS NULL;
