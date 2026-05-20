#!/bin/sh
set -eu

escape_js() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

cat > /usr/share/nginx/html/env.js <<EOF
window.__RUNTIME_CONFIG__ = {
  VITE_BACKEND_URL: "$(escape_js "${VITE_BACKEND_URL:-}")"
};
EOF
