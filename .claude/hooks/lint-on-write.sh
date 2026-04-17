#!/usr/bin/env bash
set -euo pipefail

# Keep this hook lightweight for documentation-only writes.
if [ ! -f package.json ]; then
  exit 0
fi

if npm run | grep -qE '^[[:space:]]+lint$'; then
  npm run lint
fi
