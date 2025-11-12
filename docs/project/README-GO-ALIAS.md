# "go" Command Setup — Universal Auto-Start

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Quick start guide** — Set up the `go` alias to automatically start LearnMappers with one command.

## Overview

The `go` command automatically:
- ✅ Detects your operating system (macOS, Linux, Windows)
- ✅ **Auto-Fit:** Uses UV to hunt for and install missing tools (Node.js, Python, pnpm)
- ✅ **Auto-Born:** Initializes database and certificates on first run
- ✅ **Auto-Heal:** Checks ports, database integrity, and fixes issues
- ✅ Detects all sites in `sites/` folder
- ✅ Shows site selector if multiple sites found
- ✅ Starts the server with optimal settings

**See [README-AUTO-FEATURES.md](../server/README-AUTO-FEATURES.md) for complete details on Auto-Fit, Auto-Born, and Auto-Heal.**

## Quick Setup

### macOS / Linux

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
# LearnMappers "go" alias
alias go='cd ~/Desktop/learnmappers-v7_3-pwa && ./go'
```

Or for any location:

```bash
# LearnMappers "go" alias (update path to your project)
alias go='cd /path/to/learnmappers-v7_3-pwa && ./go'
```

Then reload your shell:

```bash
source ~/.zshrc  # or source ~/.bashrc
```

### Windows

#### Option 1: PowerShell Profile

Add to your PowerShell profile (`$PROFILE`):

```powershell
# LearnMappers "go" alias
function go {
    Set-Location "C:\Users\YourName\Desktop\learnmappers-v7_3-pwa"
    .\go.bat
}
```

#### Option 2: Git Bash / WSL

Add to `~/.bashrc`:

```bash
# LearnMappers "go" alias
alias go='cd ~/Desktop/learnmappers-v7_3-pwa && ./go'
```

#### Option 3: Command Prompt

Create `go.bat` in a directory in your PATH, or add to existing batch file:

```batch
@echo off
cd /d "C:\Users\YourName\Desktop\learnmappers-v7_3-pwa"
call go.bat
```

## Usage

Once set up, simply run:

```bash
go
```

The system will:
1. **Auto-detect** your OS
2. **Check dependencies** (Node.js, pnpm, Python, UV)
3. **Install missing** dependencies automatically
4. **Detect sites** in `sites/` folder
5. **Show selector** if multiple sites found
6. **Start server** with optimal settings

## What Happens

### System Detection

The `go` command automatically detects:
- **macOS** → Uses `go.sh`
- **Linux** → Uses `go.sh`
- **Windows** → Uses `go.bat` (via cmd.exe)

### Dependency Checks

Automatically checks for:
- ✅ Node.js 18+
- ✅ pnpm or npm
- ✅ Python 3.6+ (optional)
- ✅ UV (optional, but recommended)
- ✅ mkcert (optional, for HTTPS)

### Auto-Installation

If dependencies are missing:
- **UV** → Offers to install (can install Node.js, Python, etc.)
- **pnpm** → Offers to install via npm
- **Node.js** → Guides to installation or uses UV
- **Python** → Optional, guides to installation
- **mkcert** → Optional, guides to installation

### Site Detection

- Scans `sites/` folder for all site directories
- Checks for valid entry points (`pages/index.html` or `index.html`)
- Shows numbered list if multiple sites found
- Prompts for selection or uses default

### Server Start

- Initializes SQLite database if needed
- Generates SSL certificates if needed
- Finds available ports (8000, 8443)
- Starts server with optimal settings
- Shows network IP for access

## Examples

### Single Site

```bash
$ go
🚀 LearnMappers PWA - Auto Startup
====================================
Site:    sites/default
...
```

### Multiple Sites

```bash
$ go
🚀 LearnMappers PWA - Auto Startup
====================================

Multiple sites detected:
  1. default (default)
  2. client-site
  3. demo-site

Select site number (1-3) or press Enter for default: 2
Site:    sites/client-site
...
```

## Troubleshooting

### "go: command not found"

Make sure you've:
1. Added the alias to your shell config
2. Reloaded your shell (`source ~/.zshrc`)
3. Updated the path in the alias to match your project location

### Permission Denied

On macOS/Linux:

```bash
chmod +x go
```

### Windows Issues

If `go` doesn't work in Command Prompt:
- Use PowerShell instead
- Or use Git Bash / WSL
- Or run `go.bat` directly

## Advanced Usage

### Custom Site Directory

```bash
SITE_DIR=sites/my-site go
```

### Disable HTTPS

```bash
HTTPS=false go
```

### Custom Ports

```bash
HTTP_PORT=3000 HTTPS_PORT=3443 go
```

## Integration with Other Tools

### VS Code Tasks

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start LearnMappers",
      "type": "shell",
      "command": "go",
      "problemMatcher": []
    }
  ]
}
```

### Makefile

```makefile
.PHONY: go start
go start:
	./go
```

### npm Scripts

Already included in `package.json`:

```json
{
  "scripts": {
    "go": "./go"
  }
}
```

Run with: `npm run go` or `pnpm go`

## Summary

The `go` command is your **one-command solution** to start LearnMappers:

1. ✅ **Auto-detects** everything
2. ✅ **Auto-installs** dependencies
3. ✅ **Auto-configures** server
4. ✅ **Auto-starts** everything

Just run `go` and you're ready!

