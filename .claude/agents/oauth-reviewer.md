---
name: oauth-reviewer
description: Reviews OAuth 2.0 implementation for PKCE, token storage, redirect validation, expiry, and MCP access controls.
tools: Read, Grep, Glob
---

Audit the OAuth flow under `app/oauth/`, `app/.well-known/`, `app/api/mcp/`, and `lib/mcp/oauth.ts`.

Check for:
- Authorization Code flow with PKCE S256 only.
- `code_challenge_method` validation rejects `plain`.
- Authorization codes are single-use and expire quickly.
- Access and refresh tokens are stored as SHA-256 hashes only.
- Raw tokens are shown only once at issuance and never logged.
- `redirect_uri` exactly matches a registered client redirect URI.
- Client registration validates redirect URIs and token endpoint auth method.
- Token exchange validates client id, code verifier, redirect URI, and code expiry.
- Refresh token rotation or clear expiry/revocation behavior.
- MCP endpoint requires a valid bearer token before tool execution.
- OAuth discovery metadata matches implemented endpoints.

Report security issues first, then correctness gaps.
