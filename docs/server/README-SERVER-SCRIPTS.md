# Server Scripts — Python Static Servers

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Python server scripts guide** — Simple HTTP/HTTPS static file servers for development.

This directory contains Python server scripts for serving the LearnMappers PWA as static files.

**Note:** For the full server with **Auto-Fit, Auto-Born, Auto-Heal** features, use the `go.sh` / `go.bat` scripts or `./go` command. These implement automatic dependency installation, database initialization, and health checks. See [README-AUTO-FEATURES.md](README-AUTO-FEATURES.md) for complete details.

## Files

- **`serve.py`** - HTTP server (port 8000)
- **`serve-https.py`** - HTTPS server (port 8443)

## Usage

Both scripts automatically change to the project root directory before serving, so they can be run from anywhere:

```bash
# From project root
python3 servers/serve.py
python3 servers/serve-https.py

# Or from this directory
cd servers
python3 serve.py
python3 serve-https.py
```

## Features

- ✅ Auto-detects network IP
- ✅ Smart port handling (finds next available port if busy)
- ✅ Serves from project root (where HTML files are)
- ✅ PWA-optimized headers

## Note

These are simple static file servers. For full backend features (SQLite, API), use the Node.js server (`server.js` in project root) or run `./go.sh` / `go.bat`.

