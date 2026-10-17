#!/bin/bash
set -euo pipefail
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE_DIR/nandatown/apps/nest-dashboard"
export NEXT_TELEMETRY_DISABLED=1
exec ./node_modules/.bin/next start --hostname 127.0.0.1 --port "${PORT:-3000}"
