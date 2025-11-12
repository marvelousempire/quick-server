#!/bin/bash
# Stop AppleScript Auto-Heal Monitor

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$PROJECT_DIR/.auto-heal-pid"

if [ -f "$PID_FILE" ]; then
    AUTO_HEAL_PID=$(cat "$PID_FILE")
    
    if kill -0 "$AUTO_HEAL_PID" 2>/dev/null; then
        echo "🛑 Stopping auto-heal monitor (PID: $AUTO_HEAL_PID)..."
        kill "$AUTO_HEAL_PID" 2>/dev/null || true
        
        # Also kill any remaining AppleScript processes
        pkill -f "auto-heal.applescript" 2>/dev/null || true
        
        rm -f "$PID_FILE"
        echo "✅ Auto-heal monitor stopped"
    else
        echo "⚠️  Auto-heal monitor process not found"
        rm -f "$PID_FILE"
    fi
else
    # Try to find and kill by process name
    if pgrep -f "auto-heal.applescript" > /dev/null; then
        echo "🛑 Stopping auto-heal monitor..."
        pkill -f "auto-heal.applescript"
        echo "✅ Auto-heal monitor stopped"
    else
        echo "ℹ️  Auto-heal monitor is not running"
    fi
fi

