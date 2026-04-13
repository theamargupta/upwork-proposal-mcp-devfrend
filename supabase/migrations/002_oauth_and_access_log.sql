-- ── OAuth Client Registration ────────────────────────────
CREATE TABLE IF NOT EXISTS upwork_mcp_oauth_clients (
  client_id text PRIMARY KEY,
  client_secret_hash text,
  client_name text,
  redirect_uris jsonb NOT NULL DEFAULT '[]',
  grant_types text[] DEFAULT ARRAY['authorization_code', 'refresh_token'],
  response_types text[] DEFAULT ARRAY['code'],
  scope text DEFAULT 'mcp:tools',
  token_endpoint_auth_method text DEFAULT 'none',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE upwork_mcp_oauth_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all_upwork_oauth_clients" ON upwork_mcp_oauth_clients
  FOR ALL USING (false);

-- ── Authorization Codes ──────────────────────────────────
CREATE TABLE IF NOT EXISTS upwork_mcp_oauth_authorization_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code_hash text NOT NULL UNIQUE,
  client_id text NOT NULL REFERENCES upwork_mcp_oauth_clients(client_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  redirect_uri text NOT NULL,
  code_challenge text NOT NULL,
  code_challenge_method text NOT NULL DEFAULT 'S256',
  scopes text[],
  resource text,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE upwork_mcp_oauth_authorization_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all_upwork_oauth_codes" ON upwork_mcp_oauth_authorization_codes
  FOR ALL USING (false);

-- ── Access / Refresh Tokens ──────────────────────────────
CREATE TABLE IF NOT EXISTS upwork_mcp_oauth_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id text NOT NULL REFERENCES upwork_mcp_oauth_clients(client_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token_hash text NOT NULL UNIQUE,
  refresh_token_hash text NOT NULL UNIQUE,
  scopes text[],
  resource text,
  expires_at timestamptz NOT NULL,
  refresh_expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE upwork_mcp_oauth_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all_upwork_oauth_tokens" ON upwork_mcp_oauth_tokens
  FOR ALL USING (false);

-- ── Access Log ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS upwork_job_access_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id bigint REFERENCES upwork_jobs(id) ON DELETE SET NULL,
  action text NOT NULL,
  source text NOT NULL DEFAULT 'mcp',
  query text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_upwork_job_access_user_date
  ON upwork_job_access_log(user_id, created_at DESC);

ALTER TABLE upwork_job_access_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own access logs" ON upwork_job_access_log
  FOR SELECT USING (auth.uid() = user_id);
