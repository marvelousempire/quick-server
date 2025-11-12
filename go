#!/usr/bin/env sh
# Universal "go" command - Auto-detects system and starts LearnMappers server
# Works on macOS, Linux, and Windows (via Git Bash/WSL)
#
# Usage: ./go
# Or set up alias: alias go='if [ -f ./go ]; then ./go; else echo "No go script in current directory"; fi'
#
# This allows each project to have its own go script without conflicts

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Detect OS
OS="$(uname -s)"
case "${OS}" in
  Linux*)     PLATFORM="linux" ;;
  Darwin*)    PLATFORM="macos" ;;
  CYGWIN*)    PLATFORM="windows" ;;
  MINGW*)     PLATFORM="windows" ;;
  MSYS*)      PLATFORM="windows" ;;
  *)          PLATFORM="unknown" ;;
esac

# If Windows, try to use go.bat
if [ "$PLATFORM" = "windows" ]; then
  if [ -f "$SCRIPT_DIR/go.bat" ]; then
    # Use cmd.exe for Windows
    if command -v cmd.exe >/dev/null 2>&1; then
      cmd.exe /c "$SCRIPT_DIR/go.bat"
      exit $?
    else
      # Fallback for Git Bash
      bash "$SCRIPT_DIR/go.bat" 2>/dev/null || "$SCRIPT_DIR/go.bat"
      exit $?
    fi
  fi
fi

# For macOS/Linux, use go.sh
if [ -f "$SCRIPT_DIR/go.sh" ]; then
  bash "$SCRIPT_DIR/go.sh" "$@"
  exit $?
fi

# Fallback: try to run server directly
echo "⚠️  No startup script found. Attempting direct server start..."
if command -v node >/dev/null 2>&1; then
  if [ -f "$SCRIPT_DIR/package.json" ]; then
    if command -v pnpm >/dev/null 2>&1; then
      pnpm start
    elif command -v npm >/dev/null 2>&1; then
      npm start
    else
      node server.js
    fi
  else
    echo "❌ package.json not found"
    exit 1
  fi
else
  echo "❌ Node.js not found. Please install Node.js first."
  echo "💡 Run: ./go.sh (macOS/Linux) or go.bat (Windows) for auto-installation"
  exit 1
fi

