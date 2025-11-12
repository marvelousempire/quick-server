# Standalone Site Operation — No Server Required

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Standalone operation guide** — The site works completely independently without any server. All data is stored in browser localStorage.

## Overview

The LearnMappers PWA is designed to work **completely standalone** without any server. You can:

- ✅ **Open HTML files directly** in a browser (file:// protocol)
- ✅ **Serve with any static file server** (Python, Node.js, nginx, Apache, etc.)
- ✅ **Deploy to static hosting** (Netlify, Vercel, GitHub Pages, etc.)
- ✅ **Use offline** - Service worker caches everything

## How It Works Standalone

### Data Storage

All data is stored in **browser localStorage**:

- **Inventory data** - Stored in `localStorage.getItem('lm_inventory')`
- **Documentation checkboxes** - Stored in `localStorage.getItem('lm_doc_checks')`
- **No database required** - Everything is client-side

### No Server Dependencies

The site has **zero server dependencies**:

- ✅ No API calls required
- ✅ No database connections
- ✅ No backend services
- ✅ Works with `file://` protocol
- ✅ Works offline (after first load)

### Optional Server Features

The Node.js server (`server.js`) provides **optional enhancements**:

- **REST API** - `/api/inventory`, `/api/stats` (optional)
- **SQLite database** - Persistent storage across devices (optional)
- **Network serving** - Share on local network (optional)

**But these are NOT required** - the site works perfectly without them.

## Running Standalone

### Option 1: Direct File Access

Simply open `sites/default/pages/index.html` in your browser:

```bash
# macOS/Linux
open sites/default/pages/index.html

# Or just double-click the file
```

**Note:** Service worker may not work with `file://` protocol, but everything else works.

### Option 2: Simple Static Server

Use any static file server:

```bash
# Python (built-in)
cd sites/default
python3 -m http.server 8000

# Node.js (http-server)
npx http-server sites/default -p 8000

# Or use the included Python servers
python3 servers/serve.py
python3 servers/serve-https.py
```

### Option 3: Deploy to Static Hosting

Deploy `sites/default/` to:
- **Netlify** - Drag and drop the folder
- **Vercel** - `vercel sites/default`
- **GitHub Pages** - Push to `gh-pages` branch
- **Any static host** - Upload the folder

## What Works Standalone

✅ **All pages** - Home, Docs, Resources, Services  
✅ **Inventory management** - Add, edit, filter, export  
✅ **Vendor imports** - CSV, JSON, ZIP file imports  
✅ **Documentation** - All guides and schemas  
✅ **Navigation** - Client-side routing  
✅ **Offline support** - Service worker caching  
✅ **PWA features** - Installable, offline-capable  

## What Requires Server

❌ **REST API endpoints** - `/api/inventory`, `/api/stats`  
❌ **SQLite database** - Persistent cross-device storage  
❌ **Network sharing** - Access from other devices  

**But these are optional** - the site works fine without them using localStorage.

## Data Persistence

### Standalone (localStorage)
- Data stored in browser
- Persists across sessions
- **Not shared** between devices
- Cleared if browser data is cleared

### With Server (SQLite)
- Data stored in database file
- **Shared** across devices on same network
- Persistent and backed up
- Can be exported/imported

## Migration Between Modes

### Standalone → Server

1. Start the server: `./go.sh` or `pnpm start`
2. Data continues to work in localStorage
3. API endpoints become available (optional to use)

### Server → Standalone

1. Stop the server
2. Data remains in localStorage
3. Site continues to work normally

## File Structure

```
sites/default/
├── pages/              # HTML pages (standalone-ready)
│   ├── index.html     # Main entry point
│   ├── docs.html      # Documentation
│   ├── inventory.html # Resources (uses localStorage)
│   └── ...
├── config.js          # Configuration (standalone)
├── scripts.js         # Router (standalone)
├── service-worker.js  # Offline support (standalone)
└── manifest.webmanifest # PWA manifest (standalone)
```

**No server files needed** - everything in `sites/default/` is standalone.

## Benefits of Standalone

✅ **Zero dependencies** - No Node.js, Python, or database required  
✅ **Portable** - Copy folder anywhere, it works  
✅ **Fast** - No server overhead  
✅ **Simple** - Just HTML, CSS, JavaScript  
✅ **Private** - All data stays in browser  
✅ **Offline-first** - Works without internet  

## When to Use Server

Use the server when you need:

- **Multi-device sync** - Share data across devices
- **Backup/restore** - Database backups
- **API access** - External integrations
- **Network sharing** - Access from other devices
- **Persistent storage** - Database instead of localStorage

## Summary

**The site and server are completely independent:**

- ✅ **Site works standalone** - No server needed
- ✅ **Server is optional** - Adds API and database features
- ✅ **Both can run together** - Server enhances standalone site
- ✅ **No breaking changes** - Site works the same either way

You can use the site as a pure static PWA, or add the server for enhanced features. Both work independently!

