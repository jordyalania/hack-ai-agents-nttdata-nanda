#!/bin/bash
set -euo pipefail
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE_DIR/nandatown"
export NANDATOWN_HOME="$BASE_DIR/.nandatown-state"
exec .venv/bin/nandatown ui --web --host 127.0.0.1 --port "${PORT:-8901}"
