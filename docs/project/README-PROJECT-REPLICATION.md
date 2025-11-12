# Project Replication Guide

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

Complete guide for replicating this project structure and dynamic features to create new projects quickly.

> **💡 Quick Build:** Run `./build` or `npm run build` to create a distributable server package. Users can then just drop sites in and run `./go`!

---

## Overview

This project uses a **schema-based system** that makes it easy to replicate the structure, features, and functionality. By following the schemas and manifests, you can create new projects with the same capabilities in minutes.

---

## Core Components

### 1. Environment Configuration (`.env`)

**Schema:** `schemas/env-schema.json`

The `.env` file controls all project settings. Use `.env.example` as a template.

**Priority System:**
- **TLD/Domain** (Priority 1) - Set `DOMAIN` or `HOSTNAME`
- **Network IP** (Priority 2) - Auto-detected
- **Localhost** (Priority 3) - Fallback

**Quick Setup:**
```bash
cp .env.example .env
# Edit .env with your settings
```

---

### 2. Project Structure

**Schema:** `schemas/project-structure-schema.json`

**Required Structure:**
```
your-project/
├── server.js              # Core server
├── package.json           # Dependencies
├── go.sh / go.bat / go    # Startup scripts
├── .env                   # Environment config
├── .env.example           # Template
├── sites/
│   ├── default/           # Site selector
│   │   └── pages/
│   │       └── index.html
│   └── your-site/         # Your site
│       ├── config.json    # Site config
│       ├── config.js      # Config loader
│       ├── scripts.js     # Client router
│       ├── manifest.webmanifest
│       ├── service-worker.js
│       └── pages/
│           └── index.html
└── schemas/               # JSON schemas
    ├── env-schema.json
    ├── project-structure-schema.json
    └── core-functions-manifest.json
```

---

### 3. Core Functions

**Manifest:** `schemas/core-functions-manifest.json`

#### Server-Side Functions

**`detectSites()`** - `server.js`
- Auto-detects sites in `sites/` directory
- Returns array of site objects with `name` and `path`
- Skips `default` folder (selector)

**`getAccessInfo()`** - `server.js`
- Returns local, network, and DNS access URLs
- Used by site selector and API endpoints

**`getNetworkIPs()`** - `server.js`
- Gets all non-internal IPv4 addresses
- Used for network access information

#### Client-Side Functions

**`fetchTo()` / `handlePopState()`** - `scripts.js`
- Client-side routing for SPA feel
- Handles navigation without full page reloads

**`loadConfig()`** - `config.js`
- Loads `config.json` and applies settings
- Provides fallbacks for missing values

**`markdownToHTML()`** - `markdown-to-html.js`
- Converts markdown to HTML
- Used for documentation pages

#### Startup Functions

**`detect_sites()`** - `go.sh`
- Detects available sites for selection
- Used during startup

**`get_network_ip()`** - `go.sh`
- Gets network IP address
- Used for URL selection

**`get_best_url()`** - `go.sh`
- Returns best URL (TLD > Network > Localhost)
- Priority-based URL selection

**`open_private_browser()`** - `go.sh`
- Opens default browser in private mode
- Uses best available URL

---

## Quick Start: Replicate This Project

### Step 1: Copy Core Files

```bash
# Create new project
mkdir my-new-project
cd my-new-project

# Copy essential files
cp -r /path/to/learnmappers-v7_3-pwa/server.js .
cp -r /path/to/learnmappers-v7_3-pwa/package.json .
cp -r /path/to/learnmappers-v7_3-pwa/go.sh .
cp -r /path/to/learnmappers-v7_3-pwa/go.bat .
cp -r /path/to/learnmappers-v7_3-pwa/go .
cp -r /path/to/learnmappers-v7_3-pwa/.env.example .
cp -r /path/to/learnmappers-v7_3-pwa/schemas/ ./schemas/
cp -r /path/to/learnmappers-v7_3-pwa/docs/ ./docs/  # Copy documentation structure
```

### Step 2: Create Site Structure

```bash
# Create site directories
mkdir -p sites/default/pages
mkdir -p sites/my-site/pages
mkdir -p sites/my-site/css
mkdir -p sites/my-site/js
mkdir -p sites/my-site/schemas

# Copy site selector
cp -r /path/to/learnmappers-v7_3-pwa/sites/default/pages/index.html sites/default/pages/

# Copy site template files
cp /path/to/learnmappers-v7_3-pwa/sites/learnmappers/config.json sites/my-site/
cp /path/to/learnmappers-v7_3-pwa/sites/learnmappers/config.js sites/my-site/
cp /path/to/learnmappers-v7_3-pwa/sites/learnmappers/scripts.js sites/my-site/
cp /path/to/learnmappers-v7_3-pwa/sites/learnmappers/manifest.webmanifest sites/my-site/
cp /path/to/learnmappers-v7_3-pwa/sites/learnmappers/service-worker.js sites/my-site/
```

### Step 3: Configure Environment

```bash
# Create .env file
cp .env.example .env

# Edit .env
# Set DOMAIN or HOSTNAME (if you have one)
# Set SITE_DIR=sites/my-site
# Configure ports, database, etc.
```

### Step 4: Customize Site

1. **Edit `sites/my-site/config.json`**
   - Set site name, description, theme colors
   - Configure site-specific settings

2. **Create `sites/my-site/pages/index.html`**
   - Your main page
   - Include `config.js` and `scripts.js`

3. **Add your CSS/JS**
   - Place in `sites/my-site/css/` and `sites/my-site/js/`

### Step 5: Run

```bash
./go
```

---

## Feature Checklist

Use this checklist to ensure all features are included:

### Core Features
- [ ] Multi-site detection
- [ ] Site selector page
- [ ] Auto-launch single site
- [ ] Client-side routing (SPA feel)
- [ ] Config system (`config.json` + `config.js`)
- [ ] Environment variables (`.env`)

### PWA Features
- [ ] `manifest.webmanifest`
- [ ] `service-worker.js`
- [ ] Offline support

### Server Features
- [ ] REST API endpoints
- [ ] Database support (SQLite/MySQL)
- [ ] Network IP detection
- [ ] HTTPS support
- [ ] Health checks

### Startup Features
- [ ] Auto-fit (dependency installation)
- [ ] Auto-born (database initialization)
- [ ] Auto-heal (health checks)
- [ ] Browser auto-open (TLD > Network > Localhost)
- [ ] Default browser detection

---

## Schema Files

All schemas are organized as follows:

### Project-Level Schemas (`schemas/`)
1. **`env-schema.json`** - Environment variable schema
2. **`project-structure-schema.json`** - File structure schema
3. **`core-functions-manifest.json`** - Function manifest

### Site-Level Schemas (`sites/*/schemas/`)
4. **Site schemas** (in each site's `schemas/` directory):
   - `resource-schema.json` - Resource data structure
   - `service-schema.json` - Service data structure
   - `person-schema.json` - Person/contact data structure
   - `company-schema.json` - Company/partner data structure
   - `relationship-schema.json` - Relationship mapping schema

**See [docs/schemas/README-SCHEMAS.md](../schemas/README-SCHEMAS.md) for complete schema documentation.**

---

## Customization Points

### 1. Site Configuration
Edit `sites/your-site/config.json`:
- Site name and description
- Theme colors
- Feature flags

### 2. Environment Variables
Edit `.env`:
- Domain/hostname
- Ports
- Database settings
- Feature toggles

### 3. Core Functions
Functions are modular - customize as needed:
- Add new API endpoints in `server.js`
- Extend client router in `scripts.js`
- Add startup checks in `go.sh`

### 4. Schemas
Extend schemas for new data types:
- Create new schema in `sites/your-site/schemas/`
- Follow existing schema patterns
- Use for data validation

---

## Best Practices

1. **Always use `.env.example`** as template
2. **Follow schema structure** for consistency
3. **Use core functions** - don't reinvent
4. **Document custom features** in README
5. **Test with multiple sites** to verify multi-site works
6. **Use TLD when available** for production

---

## Example: Creating a New Project

```bash
# 1. Setup
mkdir my-blog && cd my-blog
cp -r /path/to/learnmappers-v7_3-pwa/{server.js,package.json,go.*,.env.example} .
cp -r /path/to/learnmappers-v7_3-pwa/schemas .

# 2. Create site
mkdir -p sites/my-blog/pages
# Copy template files...

# 3. Configure
cp .env.example .env
# Edit .env: DOMAIN=myblog.com, SITE_DIR=sites/my-blog

# 4. Run
./go
# Opens https://myblog.com:8443 (or network IP, or localhost)
```

---

## Troubleshooting

**Issue:** Browser opens wrong URL
- **Fix:** Check `.env` for `DOMAIN` or `HOSTNAME`
- **Fix:** Verify network IP detection in `go.sh`

**Issue:** Site not detected
- **Fix:** Ensure `sites/your-site/pages/index.html` exists
- **Fix:** Check `SITE_DIR` in `.env`

**Issue:** Config not loading
- **Fix:** Verify `config.json` exists in site directory
- **Fix:** Check `config.js` is included in HTML

---

## Next Steps

1. Review `schemas/` directory for all available schemas
2. Check `schemas/core-functions-manifest.json` for function details
3. Review `docs/` directory structure:
   - `docs/project/` - Project-level documentation
   - `docs/server/` - Server-specific documentation
   - `docs/schemas/` - Schema documentation
4. Customize `.env` for your project
5. Start building your site!

---

**See Also:**
- **[Main Project Entry](README-MAIN-PROJECT-ENTRY.md)** - Main project documentation
- **[Deployment Options](README-DEPLOYMENT-OPTIONS.md)** - Deployment options
- **[Server Guide](../server/README-SERVER.md)** - Complete server documentation
- **[Auto-Features](../server/README-AUTO-FEATURES.md)** - Auto-Fit, Auto-Born, Auto-Heal guide
- **[Configuration Guide](../../sites/learnmappers/README-CONFIG.md)** - Site configuration guide

