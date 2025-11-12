#!/bin/bash
# Start AppleScript Auto-Heal Monitor
# This script launches the AppleScript monitor as a background process

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
AUTO_HEAL_SCRIPT="$SCRIPT_DIR/auto-heal.applescript"

# Get site directory from environment or default
SITE_DIR="${SITE_DIR:-sites/learnmappers}"

# Check if auto-heal is already running
if pgrep -f "auto-heal.applescript" > /dev/null; then
    echo "⚠️  Auto-heal monitor is already running"
    exit 0
fi

# Make script executable
chmod +x "$AUTO_HEAL_SCRIPT"

# Start AppleScript monitor in background
echo "🚀 Starting AppleScript Auto-Heal Monitor..."
# Use nohup to ensure it continues even if terminal closes
nohup osascript "$AUTO_HEAL_SCRIPT" "$PROJECT_DIR" "$SITE_DIR" > /dev/null 2>&1 &

AUTO_HEAL_PID=$!
echo "✅ Auto-heal monitor started (PID: $AUTO_HEAL_PID)"
echo $AUTO_HEAL_PID > "$PROJECT_DIR/.auto-heal-pid"

echo ""
echo "📋 Auto-Heal Monitor Status:"
echo "   PID: $AUTO_HEAL_PID"
echo "   Log: $PROJECT_DIR/server.log"
echo "   PID File: $PROJECT_DIR/.server-pid"
echo ""
echo "💡 To stop: kill $AUTO_HEAL_PID"
echo "💡 Or: ./server/stop-auto-heal.sh"

