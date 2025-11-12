#!/bin/bash
# LearnMappers Server - Linux Auto-Heal Monitor
# Monitors server process and automatically restarts on crash or restart flag

PROJECT_PATH="$1"
SITE_DIR="$2"
SERVER_LOG="$PROJECT_PATH/server.log"
RESTART_FLAG="$PROJECT_PATH/.restart-flag"
PID_FILE="$PROJECT_PATH/.server-pid"

cd "$PROJECT_PATH" || exit 1

# Detect package manager
detect_pkg_mgr() {
    if command -v pnpm &> /dev/null; then
        echo "pnpm"
    elif command -v uv &> /dev/null; then
        echo "uv run"
    else
        echo "npm"
    fi
}

PKG_MGR=$(detect_pkg_mgr)

while true; do
    sleep 2
    
    # Check for restart flag
    if [ -f "$RESTART_FLAG" ]; then
        echo "🔄 Restart flag detected, restarting server..." >> "$SERVER_LOG"
        
        # Read current PID if exists
        if [ -f "$PID_FILE" ]; then
            CURRENT_PID=$(cat "$PID_FILE")
            kill "$CURRENT_PID" 2>/dev/null || true
            sleep 1
        fi
        
        # Remove restart flag
        rm -f "$RESTART_FLAG"
        
        # Start new server process
        nohup env SITE_DIR="$SITE_DIR" $PKG_MGR start >> "$SERVER_LOG" 2>&1 &
        NEW_PID=$!
        echo $NEW_PID > "$PID_FILE"
        
        echo "✅ Server restarted (PID: $NEW_PID)" >> "$SERVER_LOG"
        continue
    fi
    
    # Check if server process is still running
    if [ -f "$PID_FILE" ]; then
        CURRENT_PID=$(cat "$PID_FILE")
        
        # Check if process is running
        if ! kill -0 "$CURRENT_PID" 2>/dev/null; then
            # Process died, auto-heal
            echo "⚠️  Server process died, auto-healing..." >> "$SERVER_LOG"
            
            # Start new server process
            nohup env SITE_DIR="$SITE_DIR" $PKG_MGR start >> "$SERVER_LOG" 2>&1 &
            NEW_PID=$!
            echo $NEW_PID > "$PID_FILE"
            
            echo "✅ Server auto-healed (PID: $NEW_PID)" >> "$SERVER_LOG"
        fi
    else
        # No PID file, start server
        echo "🚀 Starting server (no PID file found)..." >> "$SERVER_LOG"
        
        nohup env SITE_DIR="$SITE_DIR" $PKG_MGR start >> "$SERVER_LOG" 2>&1 &
        NEW_PID=$!
        echo $NEW_PID > "$PID_FILE"
        
        echo "✅ Server started (PID: $NEW_PID)" >> "$SERVER_LOG"
    fi
done

