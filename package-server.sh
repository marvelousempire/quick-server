#!/bin/bash
# Package LearnMappers Server for Distribution
# Creates a ready-to-use server package

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PACKAGE_NAME="learnmappers-server"
VERSION="7.3.0"
PACKAGE_DIR="${PACKAGE_NAME}-v${VERSION}"
DIST_DIR="dist"

echo "📦 Packaging LearnMappers Server v${VERSION}"
echo "=========================================="

# Clean previous builds
if [ -d "$DIST_DIR" ]; then
    rm -rf "$DIST_DIR"
fi
mkdir -p "$DIST_DIR"

# Create package directory
PACKAGE_PATH="$DIST_DIR/$PACKAGE_DIR"
mkdir -p "$PACKAGE_PATH"

echo "📋 Copying core files..."

# Core server files
cp server.js "$PACKAGE_PATH/"
cp package.json "$PACKAGE_PATH/"
cp go "$PACKAGE_PATH/"
cp go.sh "$PACKAGE_PATH/"
cp go.bat "$PACKAGE_PATH/"
cp .dockerignore "$PACKAGE_PATH/" 2>/dev/null || true

# Docker files (optional)
if [ -f "docker-compose.yml" ]; then
    cp docker-compose.yml "$PACKAGE_PATH/"
    cp docker-compose.dev.yml "$PACKAGE_PATH/" 2>/dev/null || true
    cp Dockerfile "$PACKAGE_PATH/" 2>/dev/null || true
    cp Dockerfile.dev "$PACKAGE_PATH/" 2>/dev/null || true
fi

# Scripts
mkdir -p "$PACKAGE_PATH/scripts"
if [ -f "scripts/init-db.js" ]; then
    cp scripts/init-db.js "$PACKAGE_PATH/scripts/"
fi

# Site selector (default folder)
echo "📁 Copying site selector..."
mkdir -p "$PACKAGE_PATH/sites/default/pages"
if [ -f "sites/default/pages/index.html" ]; then
    cp sites/default/pages/index.html "$PACKAGE_PATH/sites/default/pages/"
else
    echo "⚠️  Warning: sites/default/pages/index.html not found"
fi

# Documentation
echo "📚 Copying documentation..."
if [ -f "README-MAIN-PROJECT-ENTRY.md" ]; then
    cp README-MAIN-PROJECT-ENTRY.md "$PACKAGE_PATH/README.md"
fi
if [ -f "README-DEPLOYMENT-PACKAGE.md" ]; then
    cp README-DEPLOYMENT-PACKAGE.md "$PACKAGE_PATH/"
fi
if [ -f "README-DOCKER.md" ]; then
    cp README-DOCKER.md "$PACKAGE_PATH/" 2>/dev/null || true
fi

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > "$PACKAGE_PATH/.gitignore" << 'EOF'
# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml

# Database
data/*.db
data/*.db-shm
data/*.db-wal
data/

# SSL Certificates
localhost+*.pem
localhost+*-key.pem

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# User sites (optional - users may want to track these)
# sites/*/
# !sites/default/
EOF

# Create user README
echo "📖 Creating user README..."
cat > "$PACKAGE_PATH/README.md" << 'EOF'
# LearnMappers Server

**Multi-site web server** — Just drop your site folders into `sites/` and run `go`.

## Quick Start

1. **Drop your site folder** into `sites/`
2. **Run:** `./go` (or `go.sh` / `go.bat`)
3. **Access your site** at `http://localhost:8000`

That's it! The server automatically:
- ✅ Detects all sites in `sites/` folder
- ✅ Shows site selector when multiple sites detected
- ✅ Installs dependencies automatically
- ✅ Sets up database and certificates

## Multiple Sites

When you have multiple sites in `sites/`, the server automatically shows a site selector at the root URL (`/`). Click any site to access it.

## Adding a Site

1. Create folder: `sites/my-site/`
2. Add your site files (HTML, CSS, JS)
3. Ensure `pages/index.html` or `index.html` exists
4. Restart server (or it auto-detects on next request)

## Site Requirements

For a folder to be detected as a site:
- Must be in `sites/` directory
- Must have `pages/index.html` OR `index.html`
- Folder name cannot start with `.`
- Folder name cannot be `default` (reserved for selector)

## Features

- ✅ **Auto-detection** - Automatically finds all sites
- ✅ **Site selector** - Shows when multiple sites detected
- ✅ **REST API** - `/api/inventory`, `/api/stats`, `/api/sites`
- ✅ **SQLite database** - Persistent storage
- ✅ **HTTPS support** - Auto-generates certificates
- ✅ **Network access** - Auto-detects IP
- ✅ **Port management** - Finds available ports

## Documentation

- `README-DEPLOYMENT-PACKAGE.md` - Advanced deployment options
- `README-DOCKER.md` - Docker deployment (if included)

## Support

For issues, documentation, and support, see the main LearnMappers repository.

## License

ISC
EOF

# Make scripts executable
chmod +x "$PACKAGE_PATH/go"
chmod +x "$PACKAGE_PATH/go.sh"

# Create package archives
echo ""
echo "📦 Creating distribution archives..."

cd "$DIST_DIR"

# ZIP
if command -v zip >/dev/null 2>&1; then
    echo "  Creating ZIP archive..."
    zip -r "${PACKAGE_DIR}.zip" "$PACKAGE_DIR" \
        -x "*.db" "*.db-shm" "*.db-wal" "node_modules/*" ".git/*" \
        > /dev/null 2>&1 || echo "  ⚠️  ZIP creation failed"
fi

# Tarball
if command -v tar >/dev/null 2>&1; then
    echo "  Creating tarball..."
    tar -czf "${PACKAGE_DIR}.tar.gz" "$PACKAGE_DIR" \
        --exclude="*.db" --exclude="*.db-shm" --exclude="*.db-wal" \
        --exclude="node_modules" --exclude=".git" \
        2>/dev/null || echo "  ⚠️  Tarball creation failed"
fi

cd "$SCRIPT_DIR"

echo ""
echo "✅ Package created: $DIST_DIR/$PACKAGE_DIR"
echo ""
echo "📦 Distribution files:"
ls -lh "$DIST_DIR"/*.{zip,tar.gz} 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}' || echo "  (No archives created)"
echo ""
echo "🚀 Ready to distribute!"
echo ""
echo "Users can:"
echo "  1. Extract the package"
echo "  2. Drop site folders into sites/"
echo "  3. Run ./go"
echo "  4. Done!"

