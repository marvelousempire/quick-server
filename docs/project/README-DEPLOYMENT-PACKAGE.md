# Server Deployment Package — Ready-to-Use Multi-Site Server

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Deployment guide** — Package and distribute the LearnMappers server as a ready-to-use product. Users just drop site folders and run.

## Overview

The server can be packaged as a standalone product that includes:
- ✅ Server application (`server.js`)
- ✅ Default site selector (`sites/default/`)
- ✅ Auto-start scripts (`go`, `go.sh`, `go.bat`)
- ✅ Docker support (optional)
- ✅ All dependencies and configuration

Users simply:
1. **Drop site folders** into `sites/`
2. **Run `go`** (or `./go.sh` / `go.bat`)
3. **Done!** Server automatically detects and serves all sites

## Package Structure

```
learnmappers-server/
├── server.js                     # Main server application
├── package.json                  # Node.js dependencies
├── go                            # Universal startup script
├── go.sh                         # macOS/Linux startup
├── go.bat                        # Windows startup
├── docker-compose.yml            # Docker deployment (optional)
├── Dockerfile                    # Docker image (optional)
├── README.md                     # User instructions
├── README-DEPLOYMENT-PACKAGE.md  # This file (deployment guide)
│
├── sites/                        # Sites directory
│   ├── default/                  # Site selector (included)
│   │   └── pages/
│   │       └── index.html        # Selector page
│   └── [user-sites]/             # Users drop sites here
│
├── scripts/                      # Utility scripts
│   └── init-db.js                # Database initialization
│
└── data/                         # Database storage (created on first run)
    └── learnmappers.db
```

## What Ships with the Server

### Included Files

**Core Server:**
- `server.js` - Main server application
- `package.json` - Dependencies
- `go`, `go.sh`, `go.bat` - Startup scripts

**Site Selector:**
- `sites/default/pages/index.html` - Multi-site selector page
- Automatically shown when multiple sites detected

**Docker (Optional):**
- `docker-compose.yml` - Production deployment
- `docker-compose.dev.yml` - Development deployment
- `Dockerfile` - Production image
- `Dockerfile.dev` - Development image
- `.dockerignore` - Docker ignore rules

**Documentation:**
- `README.md` - User-facing instructions
- `README-DEPLOYMENT-PACKAGE.md` - This deployment guide
- `README-DOCKER.md` - Docker guide (optional)
- `README-GO-ALIAS.md` - Go alias setup (optional)

## Creating the Deployment Package

### Step 1: Prepare Package Directory

```bash
# Create package directory
mkdir learnmappers-server
cd learnmappers-server

# Copy core files
cp ../server.js .
cp ../package.json .
cp ../go .
cp ../go.sh .
cp ../go.bat .
cp ../.dockerignore .

# Copy Docker files (optional)
cp ../docker-compose.yml .
cp ../docker-compose.dev.yml .
cp ../Dockerfile .
cp ../Dockerfile.dev .

# Copy scripts
mkdir scripts
cp ../scripts/init-db.js scripts/

# Copy site selector
mkdir -p sites/default/pages
cp ../sites/default/pages/index.html sites/default/pages/

# Copy documentation
cp ../README-MAIN-PROJECT-ENTRY.md README.md
cp ../README-DEPLOYMENT-PACKAGE.md .
```

### Step 2: Create User README

Create a simple `README.md` for end users:

```markdown
# LearnMappers Server

Multi-site web server. Just drop your site folders into `sites/` and run `go`.

## Quick Start

1. Drop your site folder into `sites/`
2. Run: `./go` (or `go.sh` / `go.bat`)
3. Access your site at `http://localhost:8000`

## Multiple Sites

When you have multiple sites in `sites/`, the server automatically shows a site selector at the root URL.

## Documentation

See `README-DEPLOYMENT-PACKAGE.md` for advanced deployment options.
```

### Step 3: Package for Distribution

**Option A: ZIP Archive**

```bash
# Create distribution package
cd ..
zip -r learnmappers-server-v7.3.zip learnmappers-server/ \
  -x "*.db" "*.db-shm" "*.db-wal" "node_modules/*" ".git/*"
```

**Option B: Tarball**

```bash
tar -czf learnmappers-server-v7.3.tar.gz learnmappers-server/ \
  --exclude="*.db" --exclude="*.db-shm" --exclude="*.db-wal" \
  --exclude="node_modules" --exclude=".git"
```

**Option C: Git Repository**

```bash
cd learnmappers-server
git init
git add .
git commit -m "Initial server package v7.3"
# Push to your repository
```

## Distribution Checklist

- [ ] Server files (`server.js`, `package.json`)
- [ ] Startup scripts (`go`, `go.sh`, `go.bat`)
- [ ] Site selector (`sites/default/pages/index.html`)
- [ ] Database init script (`scripts/init-db.js`)
- [ ] User README (`README.md`)
- [ ] Docker files (optional)
- [ ] Documentation (optional)
- [ ] `.gitignore` (exclude `node_modules`, `data/`, etc.)

## User Experience

### First Time Setup

1. **Download package** (ZIP, tarball, or git clone)
2. **Extract/Clone** to desired location
3. **Run `go`** - Auto-installs dependencies
4. **Drop site folder** into `sites/`
5. **Access** at `http://localhost:8000`

### Adding Sites

1. Create folder: `sites/my-site/`
2. Add your site files (HTML, CSS, JS)
3. Ensure `pages/index.html` or `index.html` exists
4. Restart server (or it auto-detects on next request)
5. Site appears in selector if multiple sites exist

## Site Requirements

For a folder to be detected as a site:

- Must be in `sites/` directory
- Must have `pages/index.html` OR `index.html`
- Folder name cannot start with `.`
- Folder name cannot be `default` (reserved for selector)

## Server Features

- ✅ **Auto-detection** - Automatically finds all sites
- ✅ **Site selector** - Shows when multiple sites detected
- ✅ **REST API** - `/api/inventory`, `/api/stats`, `/api/sites`
- ✅ **SQLite database** - Persistent storage
- ✅ **HTTPS support** - Auto-generates certificates
- ✅ **Network access** - Auto-detects IP
- ✅ **Port management** - Finds available ports

## Customization

### Default Site

To change the default site (when only one site exists):

Edit `server.js`:
```javascript
const SITE_DIR = process.env.SITE_DIR || process.argv[2] || 'sites/your-default-site';
```

### Site Selector

Customize `sites/default/pages/index.html` to match your branding.

### Ports

Set environment variables:
```bash
HTTP_PORT=3000 HTTPS_PORT=3443 ./go
```

## Deployment Options

### Local Development

```bash
./go
```

### Production (Native)

```bash
SITE_DIR=sites/my-site ./go
```

### Production (Docker)

```bash
docker-compose up -d
```

### Cloud Deployment

- **Heroku** - Use Node.js buildpack
- **DigitalOcean** - App Platform or Droplet
- **AWS** - EC2 or Elastic Beanstalk
- **Azure** - App Service
- **Google Cloud** - App Engine or Compute Engine

## Versioning

Include version in package:
- `learnmappers-server-v7.3.0/`
- Or use git tags: `v7.3.0`

## Updates

Users can update by:
1. Downloading new package
2. Replacing files (preserving `sites/` and `data/`)
3. Running `go` again

Or use git:
```bash
git pull origin main
./go
```

## Support

Include in package:
- Issue tracker link
- Documentation link
- Support email/contact

## License

Include `LICENSE` file in package.

## Summary

The deployment package is a **complete, ready-to-use server** that:
- ✅ Ships with site selector
- ✅ Auto-detects sites
- ✅ Works out of the box
- ✅ Just needs site folders dropped in

Users get a **production-ready multi-site server** with zero configuration.

