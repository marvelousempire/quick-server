#!/usr/bin/env bash
# LearnMappers Server Startup Script
# Auto-detects Node.js and starts the server

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js not found. Please install Node.js first."
  echo "💡 Visit: https://nodejs.org/"
  exit 1
fi

# Check for package.json
if [ ! -f "$SCRIPT_DIR/package.json" ]; then
  echo "❌ package.json not found in $SCRIPT_DIR"
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
  echo "📦 Installing dependencies..."
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install
  elif command -v npm >/dev/null 2>&1; then
    npm install
  else
    echo "❌ Neither pnpm nor npm found. Please install one of them."
    exit 1
  fi
fi

# Start the server
echo "🚀 Starting LearnMappers server..."
echo "📍 Directory: $SCRIPT_DIR"
echo ""

if command -v pnpm >/dev/null 2>&1; then
  pnpm start
elif command -v npm >/dev/null 2>&1; then
  npm start
else
  node server.js
fi

