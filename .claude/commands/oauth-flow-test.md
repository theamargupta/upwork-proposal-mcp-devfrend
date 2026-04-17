# OAuth Flow Test

Use these curl steps to test dynamic client registration, PKCE authorization, token exchange, and MCP access. Replace host, ids, verifier, challenge, and credentials before running.

## 1. Register Client

```bash
curl -sS -X POST "$APP_URL/oauth/register" \
  -H "content-type: application/json" \
  -d '{
    "client_name": "Local MCP Test",
    "redirect_uris": ["http://localhost:8787/callback"],
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "token_endpoint_auth_method": "none"
  }'
```

## 2. Build PKCE Values

```bash
CODE_VERIFIER="$(openssl rand -base64 48 | tr -d '=+/' | cut -c1-64)"
CODE_CHALLENGE="$(printf '%s' "$CODE_VERIFIER" | openssl dgst -sha256 -binary | openssl base64 -A | tr '+/' '-_' | tr -d '=')"
echo "$CODE_VERIFIER"
echo "$CODE_CHALLENGE"
```

## 3. Authorize

Open this URL in a browser while signed in:

```bash
printf '%s\n' "$APP_URL/oauth/authorize?response_type=code&client_id=$CLIENT_ID&redirect_uri=http%3A%2F%2Flocalhost%3A8787%2Fcallback&scope=mcp%3Aread%20mcp%3Awrite&code_challenge=$CODE_CHALLENGE&code_challenge_method=S256&state=test-state"
```

Copy the returned `code` from the redirect URL.

## 4. Exchange Token

```bash
curl -sS -X POST "$APP_URL/oauth/token" \
  -H "content-type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=authorization_code" \
  --data-urlencode "client_id=$CLIENT_ID" \
  --data-urlencode "code=$CODE" \
  --data-urlencode "redirect_uri=http://localhost:8787/callback" \
  --data-urlencode "code_verifier=$CODE_VERIFIER"
```

## 5. Call MCP

```bash
curl -sS -X POST "$APP_URL/api/mcp" \
  -H "authorization: Bearer $ACCESS_TOKEN" \
  -H "content-type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "list_jobs",
      "arguments": { "limit": 5 }
    }
  }'
```
