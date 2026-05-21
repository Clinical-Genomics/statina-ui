#!/bin/sh
set -eu

escape_js() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

missing=0

require_env() {
  name="$1"
  eval "value=\${$name:-}"
  if [ -z "$value" ]; then
    echo "Missing required runtime config: $name" >&2
    missing=1
  fi
}

require_env VITE_BACKEND_URL

if [ "$missing" -ne 0 ]; then
  exit 1
fi

cat > /usr/share/nginx/html/env.js <<EOF
window.__RUNTIME_CONFIG__ = {
  VITE_BACKEND_URL: "$(escape_js "${VITE_BACKEND_URL:-}")"
};
EOF
