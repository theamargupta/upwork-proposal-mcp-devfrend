#!/usr/bin/env bash
set -euo pipefail

payload="$(cat || true)"

# Block staging or committing local environment files through Claude Bash hooks.
if printf '%s' "$payload" | grep -Eq 'git (add|commit|rm|mv)'; then
  if printf '%s' "$payload" | grep -Eq '(^|[[:space:]/])\.env(\.|[[:space:]"'"'"'\\]|$)|\.env\.local|\.env\.production|\.env\.development'; then
    echo "Blocked: do not stage, commit, remove, or move environment files." >&2
    exit 2
  fi
fi

exit 0
