# LearnMappers Server — Complete Guide

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Complete server guide** — Multi-site web server with REST API, SQLite database, and automatic site detection. Package and distribute as a standalone product.

## Overview

**Universal Portability:** The LearnMappers server can run on **any system that supports Linux or can run Node.js/Python**, including:
- Any Linux distribution (Ubuntu, Debian, CentOS, Arch, Alpine, etc.)
- Embedded Linux devices (Raspberry Pi, routers, IoT devices)
- Cloud VPS platforms (AWS, GCP, Azure, DigitalOcean, etc.)
- Docker containers
- Virtual machines
- macOS and Windows (via WSL or native Node.js)

See `README-LINUX-DEPLOYMENT.md` for platform-specific deployment guides.

The LearnMappers server is a **production-ready, multi-site web server** that:
- ✅ Automatically detects all sites in `sites/` folder
- ✅ Shows beautiful site selector when multiple sites detected
- ✅ Provides REST API for inventory management
- ✅ Includes SQLite database for persistent storage
- ✅ Auto-generates HTTPS certificates
- ✅ Works out of the box with zero configuration

**Key Point:** The server ships with a **default site selector** (`sites/default/`) that automatically appears when multiple sites are detected. Users just drop site folders and run.

## Quick Start

### For End Users

1. **Drop your site folder** into `sites/`
2. **Run:** `./go` (or `go.sh` / `go.bat`)
3. **Access your site** at `http://localhost:8000`

That's it! The server automatically:
- **Auto-Fit:** Uses UV to hunt for and install missing tools (Node.js, Python, pnpm)
- **Auto-Born:** Creates database and certificates on first run
- **Auto-Heal:** Checks ports, database integrity, and fixes issues
- Detects all sites
- Shows site selector if multiple sites

**See [README-AUTO-FEATURES.md](README-AUTO-FEATURES.md) for complete details on Auto-Fit, Auto-Born, and Auto-Heal.**

### For Developers

```bash
# Clone or download the server package
git clone <repository>
cd learnmappers-server

# Drop your site into sites/
mkdir sites/my-site
# Add your HTML files...

# Start server
./go
```

## Deployment Package

The server can be **packaged and distributed** as a standalone product. See [README-DEPLOYMENT-PACKAGE.md](../README-DEPLOYMENT-PACKAGE.md) for complete packaging instructions.

### What Ships with the Server

**Core Server:**
- `server.js` - Main server application
- `package.json` - Dependencies
- `go`, `go.sh`, `go.bat` - Auto-start scripts

**Site Selector (Included):**
- `sites/default/pages/index.html` - Beautiful Docker Desktop-style site manager
- Automatically shown when multiple sites detected
- Table view with site details and quick access

**Utilities:**
- `scripts/init-db.js` - Database initialization
- Docker files (optional)

### Creating Distribution Package

```bash
# Run packaging script
./package-server.sh
# or
npm run package

# Creates: dist/learnmappers-server-v7.3.0/
# Includes: ZIP and tarball archives
```

## Architecture

### Multi-Site Detection

The server automatically:
1. Scans `sites/` directory on startup
2. Detects folders with `pages/index.html` or `index.html`
3. Excludes `default` folder (it's the selector, not a site)
4. Shows selector if multiple sites found
5. Serves single site directly if only one exists

### Site Selector

When multiple sites are detected:
- Root URL (`/`) shows the site selector
- Docker Desktop-style table interface
- Click any row to open that site
- Shows site name, description, page count, status
- Marks default site (learnmappers)

### Default Behavior

- **Single site:** Serves directly (no selector)
- **Multiple sites:** Shows selector at root
- **No sites:** Redirects to learnmappers (if exists)

## API Endpoints

### `/api/sites`
List all available sites.

**Response:**
```json
{
  "sites": [
    {
      "name": "learnmappers",
      "default": true,
      "pages": 9,
      "description": "LearnMappers PWA"
    }
  ]
}
```

### `/api/inventory`
Inventory management endpoints (GET, POST, PUT, DELETE).

### `/api/stats`
Get inventory statistics.

### `/api/health`
Health check endpoint.

## Use Cases

### 1. Multi-Site Hosting

Host multiple websites from one server:

```
sites/
├── default/          # Site selector (included)
├── client-site/      # Client website
├── demo-site/       # Demo site
└── portfolio/       # Portfolio site
```

All sites automatically detected and accessible via selector.

### 2. Development Environment

Run multiple local projects simultaneously:

```bash
# Drop project folders
sites/
├── project-a/
├── project-b/
└── project-c/

# All accessible via selector
```

### 3. Client Portal System

Build a client portal where each client has their own site:

```
sites/
├── client-001/
├── client-002/
└── client-003/
```

Each client accesses their site via the selector.

### 4. Microservices Frontend

Serve multiple frontend applications:

```
sites/
├── admin-panel/
├── user-dashboard/
├── api-docs/
└── landing-page/
```

All frontends accessible from one server.

### 5. Documentation Sites

Host multiple documentation sites:

```
sites/
├── api-docs/
├── user-guide/
├── developer-guide/
└── changelog/
```

Organized documentation with easy navigation.

### 6. A/B Testing

Serve different versions for testing:

```
sites/
├── version-a/
├── version-b/
└── control/
```

Quickly switch between versions via selector.

### 7. Staging/Production

Separate staging and production sites:

```
sites/
├── staging/
└── production/
```

Access both from same server.

### 8. Multi-Language Sites

Different language versions:

```
sites/
├── en/
├── es/
├── fr/
└── de/
```

Language selector at root.

### 9. Brand Variations

Different brand variations:

```
sites/
├── brand-a/
├── brand-b/
└── brand-c/
```

All brands from one server.

### 10. Educational Platform

Multiple course sites:

```
sites/
├── course-101/
├── course-102/
└── course-103/
```

Students access courses via selector.

## Advanced Features

### Custom Site Configuration

Each site can have its own `config.json`:

```json
{
  "site": {
    "name": "My Site",
    "description": "Site description",
    "version": "1.0.0"
  }
}
```

The description appears in the site selector.

### Environment Variables

```bash
# Custom site directory
SITE_DIR=sites/my-site ./go

# Custom ports
HTTP_PORT=3000 HTTPS_PORT=3443 ./go

# Disable HTTPS
HTTPS=false ./go
```

### Database Per Site

Each site can use the shared database or implement its own storage via API.

### Network Access

Server automatically detects network IP:

```
Access from other devices:
https://YOUR_IP:8443
http://YOUR_IP:8000
```

### SSL Certificates

Auto-generates certificates using `mkcert`:
- Works on localhost
- Works on network IP
- Trusted by browsers

## Site Requirements

For a folder to be detected as a site:

- ✅ Must be in `sites/` directory
- ✅ Must have `pages/index.html` OR `index.html`
- ✅ Folder name cannot start with `.`
- ✅ Folder name cannot be `default` (reserved for selector)

## Site Selector Features

The included site selector (`sites/default/pages/index.html`) provides:

- **Table View** - Docker Desktop-style interface
- **Site Details** - Name, description, page count
- **Status Indicators** - Active/inactive status
- **Quick Access** - Click row to open site
- **Default Marking** - Highlights default site
- **Auto-Redirect** - Redirects if only one site

## API Integration

### Fetching Sites List

```javascript
const response = await fetch('/api/sites');
const data = await response.json();
console.log(data.sites); // Array of site objects
```

### Accessing Sites

Sites are accessible via:
- `/sites/{site-name}/pages/index.html`
- `/sites/{site-name}/index.html`

## Docker Deployment

See [README-DOCKER.md](../README-DOCKER.md) for Docker deployment.

```bash
docker-compose up -d
```

All sites in `sites/` are automatically detected.

## Troubleshooting

### Site Not Appearing

- Check site has `pages/index.html` or `index.html`
- Verify folder name doesn't start with `.`
- Ensure folder name isn't `default`
- Restart server

### Selector Not Showing

- Check multiple sites exist (excluding `default`)
- Verify `sites/default/pages/index.html` exists
- Check server logs for errors

### Port Already in Use

Server automatically finds available ports, or set manually:

```bash
HTTP_PORT=3000 HTTPS_PORT=3443 ./go
```

## Performance

- **Lightweight** - Minimal dependencies
- **Fast** - Express.js with static file serving
- **Scalable** - Handles multiple sites efficiently
- **Cached** - Static files served efficiently

## Security

- **HTTPS Support** - Auto-generated certificates
- **CORS Enabled** - Configurable for API access
- **Path Validation** - Prevents directory traversal
- **Input Sanitization** - API endpoints validate input

## Best Practices

1. **Organize Sites** - Use descriptive folder names
2. **Add Descriptions** - Include `config.json` with site description
3. **Version Control** - Keep `sites/default/` in version control
4. **Backup Database** - Regular backups of `data/` folder
5. **Monitor Logs** - Check server output for issues

## Distribution

### Package Structure

```
learnmappers-server-v7.3.0/
├── server.js
├── package.json
├── go, go.sh, go.bat
├── sites/
│   └── default/          # Site selector (included)
└── scripts/
```

### User Instructions

Users receive:
1. Package archive (ZIP/tarball)
2. Simple README with quick start
3. Drop sites and run

### Updates

Users can update by:
- Downloading new package
- Replacing files (preserving `sites/` and `data/`)
- Running `go` again

## Summary

The LearnMappers server is a **complete, production-ready solution** for:

- ✅ **Multi-site hosting** - Serve multiple sites from one server
- ✅ **Development** - Local development environment
- ✅ **Client portals** - Per-client site hosting
- ✅ **Microservices** - Frontend application serving
- ✅ **Documentation** - Multiple doc sites
- ✅ **A/B testing** - Version testing
- ✅ **Staging/Production** - Environment separation
- ✅ **Multi-language** - Language-specific sites
- ✅ **Brand variations** - Multiple brand sites
- ✅ **Educational** - Course/learning platforms

**The server ships ready-to-use** with the site selector included. Users just drop site folders and run.
