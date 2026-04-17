#!/usr/bin/env bash
set -euo pipefail

payload="$(cat || true)"

# This project uses Tailwind CSS v4 without tailwind.config.*.
if printf '%s' "$payload" | grep -Eq 'tailwind\.config\.(js|cjs|mjs|ts|cts|mts)'; then
  echo "Blocked: do not create or edit tailwind.config.* in this project." >&2
  exit 2
fi

exit 0
