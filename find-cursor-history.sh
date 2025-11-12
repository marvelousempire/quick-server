#!/usr/bin/env bash
# Find Cursor History Files
# Searches for Cursor conversation history storage locations

echo "🔍 Searching for Cursor history files..."
echo ""

CURSOR_DIR="$HOME/Library/Application Support/Cursor"

if [ ! -d "$CURSOR_DIR" ]; then
    echo "❌ Cursor directory not found: $CURSOR_DIR"
    exit 1
fi

echo "✅ Found Cursor directory: $CURSOR_DIR"
echo ""

# Check for database files
echo "📊 Database files (likely contain history):"
find "$CURSOR_DIR" -name "*.db" -o -name "*.sqlite" -o -name "*.sqlite3" 2>/dev/null | while read file; do
    size=$(du -h "$file" 2>/dev/null | cut -f1)
    echo "   $file ($size)"
done
echo ""

# Check globalStorage
echo "📁 Global Storage directories:"
if [ -d "$CURSOR_DIR/User/globalStorage" ]; then
    ls -la "$CURSOR_DIR/User/globalStorage/" 2>/dev/null | grep "^d" | awk '{print $9}' | grep -v "^\.$" | grep -v "^\.\.$" | while read dir; do
        if [ -n "$dir" ]; then
            echo "   $dir"
            find "$CURSOR_DIR/User/globalStorage/$dir" -type f -name "*.json" -o -name "*.db" 2>/dev/null | head -5 | while read file; do
                size=$(du -h "$file" 2>/dev/null | cut -f1)
                echo "      └─ $(basename "$file") ($size)"
            done
        fi
    done
fi
echo ""

# Check workspaceStorage
echo "📁 Workspace Storage (project-specific):"
if [ -d "$CURSOR_DIR/User/workspaceStorage" ]; then
    count=$(find "$CURSOR_DIR/User/workspaceStorage" -type d -maxdepth 1 2>/dev/null | wc -l | tr -d ' ')
    echo "   Found $count workspace directories"
    find "$CURSOR_DIR/User/workspaceStorage" -name "*.json" -o -name "*.db" 2>/dev/null | head -10 | while read file; do
        size=$(du -h "$file" 2>/dev/null | cut -f1)
        echo "   $(basename "$file") ($size)"
    done
fi
echo ""

# Check for large files (likely contain history)
echo "📦 Large files (>1MB, might contain history):"
find "$CURSOR_DIR" -type f -size +1M 2>/dev/null | while read file; do
    size=$(du -h "$file" 2>/dev/null | cut -f1)
    echo "   $file ($size)"
done
echo ""

# Summary
echo "💡 Most likely locations:"
echo "   1. ~/Library/Application Support/Cursor/User/globalStorage/*/ (extension storage)"
echo "   2. ~/Library/Application Support/Cursor/User/workspaceStorage/*/ (workspace-specific)"
echo "   3. Database files (.db, .sqlite) in the above locations"
echo ""
echo "📝 Note: Cursor may store history in:"
echo "   - SQLite databases"
echo "   - JSON files"
echo "   - Encrypted/compressed formats"
echo "   - Cloud sync (if enabled)"

