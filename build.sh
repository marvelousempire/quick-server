#!/bin/bash
# LearnMappers Server - Build & Package Script
# Creates a distributable server product ready for users to drop sites in

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}📦 Building LearnMappers Server Package...${NC}"
echo "=========================================="
echo ""

# Clean previous builds
if [ -d "dist" ]; then
    echo -e "${YELLOW}🧹 Cleaning previous build...${NC}"
    rm -rf dist
fi

# Create distribution directory
mkdir -p dist/learnmappers-server
cd dist/learnmappers-server

echo -e "${GREEN}✓ Creating package structure...${NC}"

# Copy core server files
echo -e "${YELLOW}📋 Copying core server files...${NC}"
cp ../../server.js .
cp ../../package.json .
cp ../../package-lock.json 2>/dev/null || true
cp ../../pnpm-lock.yaml 2>/dev/null || true

# Copy startup scripts
echo -e "${YELLOW}📋 Copying startup scripts...${NC}"
cp ../../go.sh .
cp ../../go.bat .
cp ../../go .
chmod +x go.sh go.bat go

# Copy Docker files
echo -e "${YELLOW}📋 Copying Docker files...${NC}"
cp ../../Dockerfile .
cp ../../docker-compose.yml .
cp ../../docker-compose.dev.yml 2>/dev/null || true
cp ../../Caddyfile 2>/dev/null || true

# Copy configuration templates
echo -e "${YELLOW}📋 Copying configuration templates...${NC}"
cp ../../.env.example .env.example
cp ../../.npmrc 2>/dev/null || true
cp ../../.gitignore .gitignore

# Copy schemas
echo -e "${YELLOW}📋 Copying schemas...${NC}"
mkdir -p schemas
cp -r ../../schemas/* schemas/ 2>/dev/null || true

# Copy default site selector
echo -e "${YELLOW}📋 Copying default site selector...${NC}"
mkdir -p sites/default/pages
cp -r ../../sites/default/pages/index.html sites/default/pages/

# Copy documentation
echo -e "${YELLOW}📋 Copying documentation...${NC}"
cp ../../README-MAIN-PROJECT-ENTRY.md README.md
cp ../../README-PROJECT-REPLICATION.md .
cp ../../docs/project/README-DEPLOYMENT-OPTIONS.md . 2>/dev/null || true
cp ../../docs/project/README-DEPLOYMENT-PACKAGE.md . 2>/dev/null || true
cp ../../docs/project/README-DOCKER.md . 2>/dev/null || true
cp ../../docs/schemas/README-SCHEMAS.md schemas/README.md 2>/dev/null || true

# Create quick start guide
echo -e "${YELLOW}📋 Creating quick start guide...${NC}"
cat > QUICK-START.md << 'EOF'
# Quick Start Guide

**Welcome to LearnMappers Server!**

This is a complete, ready-to-use server. Just drop your sites in and run.

## Quick Start

### 1. Add Your Site

```bash
# Create your site directory
mkdir -p sites/my-site/pages

# Add your index.html
# (Copy your site files to sites/my-site/)
```

### 2. Configure (Optional)

```bash
# Copy environment template
cp .env.example .env

# Edit .env if needed (set DOMAIN, ports, etc.)
```

### 3. Run

```bash
# Start the server
./go

# Or use fast mode (Python, no Node.js)
./go --fast
```

That's it! Your site is live.

## What's Included

- ✅ **Multi-site server** - Host multiple sites
- ✅ **Auto-detection** - Automatically finds your sites
- ✅ **Site selector** - Choose site when multiple detected
- ✅ **REST API** - Full API endpoints (Node.js mode)
- ✅ **Database** - SQLite (auto-created)
- ✅ **HTTPS support** - Automatic SSL (optional)
- ✅ **Docker ready** - Full Docker Compose setup

## Next Steps

- Read `README.md` for full documentation
- See `README-PROJECT-REPLICATION.md` to understand the structure
- Check `schemas/README.md` for schema documentation

## Support

All documentation is included in this package. Start with `README.md`.
EOF

# Copy dynamic site (JSON-controlled template)
echo -e "${YELLOW}📋 Copying dynamic site (JSON template)...${NC}"
mkdir -p sites/dynamic-site/pages
if [ -d "../../sites/dynamic-site" ]; then
    cp -r ../../sites/dynamic-site/* sites/dynamic-site/ 2>/dev/null || true
else
    # Create minimal dynamic site if source doesn't exist
    echo "⚠️  Dynamic site source not found, creating minimal version..."
    cp ../../sites/dynamic-site/config.json sites/dynamic-site/ 2>/dev/null || true
    cp ../../sites/dynamic-site/config.js sites/dynamic-site/ 2>/dev/null || true
    cp ../../sites/dynamic-site/pages/index.html sites/dynamic-site/pages/ 2>/dev/null || true
fi

# Copy deployment schema
echo -e "${YELLOW}📋 Copying deployment schema...${NC}"
cp ../../schemas/deployment-schema.yaml . 2>/dev/null || true

# Create YAML configuration file
echo -e "${YELLOW}📋 Creating YAML configuration...${NC}"
cat > server-config.yaml << EOF
# LearnMappers Server Configuration
# This file defines the server setup and can be used for automated deployment

version: "1.0"

server:
  name: "LearnMappers Server"
  version: "7.3.0"
  description: "Multi-site hosting server with auto-detection and REST API"

# URL Priority Configuration
url:
  priority:
    - type: "tld"
      source: "DOMAIN"
      description: "Top-level domain (e.g., mysite.com)"
    - type: "tld"
      source: "HOSTNAME"
      description: "Hostname (e.g., mysite.local)"
    - type: "network"
      source: "auto-detect"
      description: "Auto-detected network IP"
    - type: "localhost"
      source: "fallback"
      description: "Localhost fallback"

# Server Configuration
ports:
  http: 8000
  https: 8443

# Site Configuration
sites:
  directory: "sites/"
  selector: "sites/default/pages/index.html"
  detection:
    - "pages/index.html"
    - "index.html"

# Features
features:
  multiSite: true
  siteSelector: true
  restAPI: true
  database:
    types: ["sqlite", "mysql"]
    default: "sqlite"
  https: true
  docker: true
  fastMode: true

# Startup Configuration
startup:
  autoFit: true
  autoBorn: true
  autoHeal: true
  browserOpen: true
  urlPriority: ["tld", "network", "localhost"]

# Docker Configuration
docker:
  services:
    - name: "learnmappers-app"
      image: "learnmappers-server"
      ports:
        - "8000:8000"
        - "8443:8443"
    - name: "learnmappers-mysql"
      image: "mysql:8.0"
      profiles: ["mysql"]
    - name: "learnmappers-caddy"
      image: "caddy:2-alpine"
      profiles: ["caddy"]
    - name: "learnmappers-traefik"
      image: "traefik:v2.11"
      profiles: ["traefik"]

# Required Files
files:
  core:
    - "server.js"
    - "package.json"
    - "go.sh"
    - "go.bat"
    - "go"
    - ".env.example"
  site:
    - "config.json"
    - "config.js"
    - "scripts.js"
    - "pages/index.html"
  optional:
    - "manifest.webmanifest"
    - "service-worker.js"
    - "css/"
    - "js/"
    - "schemas/"

# Schemas
schemas:
  - "env-schema.json"
  - "project-structure-schema.json"
  - "core-functions-manifest.json"
EOF

# Create deployment YAML (for automated setup)
echo -e "${YELLOW}📋 Creating deployment YAML...${NC}"
cat > deploy.yaml << 'EOF'
# LearnMappers Server - Automated Deployment Configuration
# Use with: docker-compose -f deploy.yaml up

version: '3.8'

services:
  learnmappers-server:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: learnmappers-server
    ports:
      - "${HTTP_PORT:-8000}:8000"
      - "${HTTPS_PORT:-8443}:8443"
    volumes:
      - ./sites:/app/sites:ro
      - ./data:/app/data
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - SITE_DIR=${SITE_DIR:-sites/learnmappers}
      - DB_TYPE=${DB_TYPE:-sqlite}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  data:
    name: learnmappers-data
EOF

# Get version from package.json
VERSION=$(node -p "require('../package.json').version" 2>/dev/null || echo "7.3.0")

# Create package info
echo -e "${YELLOW}📋 Creating package info...${NC}"
cat > PACKAGE-INFO.md << EOF
# Package Information

**Package Name:** LearnMappers Server  
**Version:** $VERSION  
**Build Date:** $(date +%Y-%m-%d)  
**Type:** Complete Server Product

## What's Included

This package contains everything needed to run the LearnMappers server:

- ✅ Complete server application
- ✅ Multi-site hosting system
- ✅ Site selector interface
- ✅ REST API endpoints
- ✅ Database support (SQLite/MySQL)
- ✅ Docker configuration
- ✅ Startup scripts (go.sh, go.bat, go)
- ✅ Configuration templates (.env.example)
- ✅ Schema system for replication
- ✅ Complete documentation

## Quick Start

1. **Add your site:**
   ```bash
   mkdir -p sites/my-site/pages
   # Add your index.html to sites/my-site/pages/
   ```

2. **Run:**
   ```bash
   ./go
   ```

That's it! Your site is live.

## File Structure

```
learnmappers-server/
├── server.js              # Core server
├── package.json           # Dependencies
├── go.sh / go.bat / go    # Startup scripts
├── .env.example           # Environment template
├── docker-compose.yml     # Docker setup
├── Dockerfile             # Docker image
├── sites/
│   ├── default/           # Site selector
│   └── dynamic-site/      # Dynamic JSON-controlled template site
├── schemas/               # JSON schemas
└── README.md              # Documentation
```

## Documentation

- `README.md` - Main documentation
- `QUICK-START.md` - Quick start guide
- `README-PROJECT-REPLICATION.md` - How to replicate
- `schemas/README.md` - Schema documentation

## Support

All documentation is included. Start with `README.md`.
EOF

# Create archive
cd ..
echo -e "${GREEN}📦 Creating archives...${NC}"

# Create ZIP
if command -v zip &> /dev/null; then
    echo -e "${YELLOW}📦 Creating ZIP archive...${NC}"
    zip -r "learnmappers-server-v${VERSION}.zip" learnmappers-server/ -x "*.DS_Store" "*.git*" > /dev/null
    echo -e "${GREEN}✓ Created: learnmappers-server-v${VERSION}.zip${NC}"
fi

# Create tarball
if command -v tar &> /dev/null; then
    echo -e "${YELLOW}📦 Creating tarball...${NC}"
    tar -czf "learnmappers-server-v${VERSION}.tar.gz" learnmappers-server/ 2>/dev/null
    echo -e "${GREEN}✓ Created: learnmappers-server-v${VERSION}.tar.gz${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}✅ Build Complete!${NC}"
echo "=========================================="
echo ""
echo -e "${GREEN}Package location:${NC} dist/learnmappers-server/"
echo ""
echo -e "${GREEN}Archives created:${NC}"
[ -f "learnmappers-server-v${VERSION}.zip" ] && echo "  📦 learnmappers-server-v${VERSION}.zip"
[ -f "learnmappers-server-v${VERSION}.tar.gz" ] && echo "  📦 learnmappers-server-v${VERSION}.tar.gz"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "  1. Distribute the package or archive"
echo "  2. Users extract and add their sites"
echo "  3. Users run ./go"
echo ""
echo -e "${YELLOW}💡 Users can now:${NC}"
echo "  - Drop sites into sites/ directory"
echo "  - Run ./go to start"
echo "  - Everything else is automatic!"
echo ""

