#!/bin/bash
set -e

# Skip '--' if passed as first argument
if [ "$1" = "--" ]; then
  shift
fi

APP=$1
if [ -z "$APP" ]; then
  echo "Usage: vp run deploy:app -- <app-name>"
  exit 1
fi
echo "Building app '$APP'..."
vp run build:app -- "$APP"

echo ""
echo "Deploying app '$APP'..."
wrangler pages deploy dist --project-name=orderly --branch="$APP"
echo ""
echo "✓ DEPLOYED TO ${APP^^}"
