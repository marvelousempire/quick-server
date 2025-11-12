# LearnMappers PWA — Main Project Entry

**Created:** 2025-11-08  
**Last Updated:** 2025-11-08

> **Main project entry point** — Start here to understand the project, get started quickly, and find documentation.

## Quick Start

### For Users (Distributed Package)

If you received a packaged server:

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

### For Developers (This Repository)

#### Standalone (No Server)

Simply open `sites/default/pages/index.html` in your browser, or use any static file server.

#### With Server

```bash
# Auto-start (recommended)
go              # Universal command (after alias setup)
./go            # Direct execution
./go.sh         # macOS/Linux
go.bat          # Windows
pnpm go         # Via package manager
```

#### Build Distributable Package

```bash
# Create distributable server package
./build          # Direct execution
npm run build    # Via package manager
```

This creates `dist/learnmappers-server/` with everything users need - they just drop sites in and run `./go`!

**First time setup:** See [docs/project/README-GO-ALIAS.md](docs/project/README-GO-ALIAS.md) to set up the `go` alias.

This will automatically:
- ✅ Auto-detect your operating system
- ✅ Detect all sites in `sites/` folder
- ✅ Show site selector if multiple sites detected
- ✅ Check and install dependencies (UV, Node.js, Python, pnpm)
- ✅ Initialize database
- ✅ Generate SSL certificates
- ✅ Start the server

### Docker Deployment (Optional)

Docker is **completely optional**. For quick containerized deployment:

```bash
docker-compose up -d
```

See [docs/project/README-DOCKER.md](docs/project/README-DOCKER.md) for complete Docker setup guide.

**Note:** Docker is just one deployment option. The system works perfectly without it using the methods above.

## What is LearnMappers?

LearnMappers is a Progressive Web App (PWA) for managing tools, inventory, and services. It features:

- 📱 **PWA** - Installable, works offline
- 🚀 **Standalone** - Works without any server (uses localStorage)
- 🗄️ **Optional SQLite Database** - Node.js server adds database features (optional)
- 🌐 **Network Access** - Access from any device on your network (with server)
- 🔒 **HTTPS Support** - Secure connections for service workers
- 📊 **Inventory Management** - Track tools, gear, and resources
- 📘 **Documentation** - Built-in docs and guides

**Key Point:** The site and server work **completely independently**:
- ✅ **Site works standalone** - No server needed, uses localStorage
- ✅ **Server is optional** - Adds API and database features
- ✅ **Both can run together** - Server enhances standalone site

## Project Structure

```
learnmappers-v7_3-pwa/
├── README-MAIN-PROJECT-ENTRY.md  # 📖 Main project entry (this file)
├── go.sh / go.bat                # 🚀 Auto-start scripts
├── server.js                     # Node.js backend (main server)
├── package.json                  # Node.js dependencies
├── docker-compose.yml             # 🐳 Docker Compose (optional)
├── docker-compose.dev.yml         # 🐳 Docker Compose dev (optional)
├── Dockerfile                    # 🐳 Docker image (optional)
└── Dockerfile.dev                # 🐳 Docker image dev (optional)
│
├── servers/                      # Server scripts
│   ├── serve.py                  # Python HTTP server
│   └── serve-https.py            # Python HTTPS server
│
├── scripts/                      # Utility scripts
│   └── init-db.js                # Database initialization
│
├── docs/                         # Documentation
│   ├── project/                  # Project-level documentation
│   │   ├── README-MAIN-PROJECT-ENTRY.md  # Main entry point (this file)
│   │   ├── README-PROJECT-REPLICATION.md  # Project replication guide
│   │   ├── README-DEPLOYMENT-OPTIONS.md   # Deployment options
│   │   ├── README-DEPLOYMENT-PACKAGE.md   # Deployment packaging
│   │   ├── README-DOCKER.md               # Docker guide
│   │   └── README-GO-ALIAS.md             # Go alias setup
│   ├── server/                   # Server-specific documentation
│   │   ├── README-SERVER.md               # Server guide
│   │   ├── README-AUTO-FEATURES.md        # Auto-Fit, Auto-Born, Auto-Heal
│   │   ├── README-LINUX-DEPLOYMENT.md     # Linux deployment
│   │   ├── README-GLINET-ROUTER.md        # GLiNet router deployment
│   │   ├── README-SERVER-SCRIPTS.md       # Server scripts
│   │   └── README-SITES-DIRECTORY.md      # Sites directory guide
│   ├── testing/                  # Testing documentation
│   │   ├── README-RESOURCE-CARDS-TESTING.md      # Resource cards testing guide
│   │   └── README-RESOURCE-CARDS-TEST-RESULTS.md # Resource cards test results
│   └── schemas/                  # Schema documentation
│       └── README-SCHEMAS.md              # Schema guide
│
├── sites/                        # All sites directory (multi-site support)
│   ├── default/                  # Site selector (shown when multiple sites detected)
│   ├── learnmappers/             # LearnMappers site (default site)
│   │   ├── pages/                # HTML pages directory
│   │   │   ├── index.html        # Main entry point
│   │   │   ├── docs.html         # Documentation page
│   │   │   ├── inventory.html    # Resources/Tools page
│   │   │   └── service-menu.html # Services page
│   │   ├── config.json           # ⚙️ Master config data (JSON - single source of truth)
│   │   ├── config.js             # ⚙️ Config loader (loads config.json)
│   │   ├── schemas/              # 📋 JSON schemas for data validation
│   │   │   ├── resource-schema.json    # Resource data structure
│   │   │   ├── service-schema.json     # Service data structure
│   │   │   ├── person-schema.json      # Person/contact data structure
│   │   │   ├── company-schema.json     # Company/partner data structure
│   │   │   ├── relationship-schema.json # Relationship mapping schema
│   │   │   ├── validator.js             # Schema validation utilities
│   │   │   └── README-SCHEMAS.md       # Schema documentation
│   │   ├── js/                    # JavaScript modules
│   │   │   ├── relationship-mapper.js  # Relationship mapping engine
│   │   │   ├── relationship-modal.js   # Modal UI for relationships
│   │   │   └── vendor-importer.js      # Vendor file import system
│   │   ├── css/                   # Stylesheets
│   │   │   └── relationship-modal.css # Relationship modal styles
│   │   ├── scripts.js            # Client-side router
│   │   ├── service-worker.js     # PWA service worker
│   │   ├── manifest.webmanifest  # PWA manifest
│   │   └── README-CONFIG.md      # Configuration guide
│   └── [other-sites]/            # Additional sites (auto-detected)
│       └── (same structure as default/)
│
└── data/                         # Database (gitignored)
    └── learnmappers.db
```

## Documentation

### Project Documentation (`docs/project/`)
- **[Deployment Options](docs/project/README-DEPLOYMENT-OPTIONS.md)** - ⭐ **Start here!** Compare Fast Python, Node.js, and Docker options
- **[Project Replication](docs/project/README-PROJECT-REPLICATION.md)** - 🚀 **Replicate this project!** Schema-based system for fast project creation
- **[Deployment Package](docs/project/README-DEPLOYMENT-PACKAGE.md)** - Package and distribute the server
- **[Go Alias Setup](docs/project/README-GO-ALIAS.md)** - Set up the universal `go` command
- **[Docker Guide](docs/project/README-DOCKER.md)** - Docker deployment (optional, full stack)

### Server Documentation (`docs/server/`)
- **[Server Guide](docs/server/README-SERVER.md)** - Complete server setup and usage
- **[Auto-Fit, Auto-Born, Auto-Heal](docs/server/README-AUTO-FEATURES.md)** - Automatic setup and maintenance features
- **[Linux Deployment](docs/server/README-LINUX-DEPLOYMENT.md)** - Deploy on any Linux system
- **[GLiNet Router Deployment](docs/server/README-GLINET-ROUTER.md)** - Deploy on GLiNet routers
- **[Server Scripts](docs/server/README-SERVER-SCRIPTS.md)** - Server startup scripts
- **[Sites Directory](docs/server/README-SITES-DIRECTORY.md)** - Multi-site directory structure

### Schema Documentation (`docs/schemas/`)
- **[Schema Documentation](docs/schemas/README-SCHEMAS.md)** - All schemas and their purposes

### Testing Documentation (`docs/testing/`)
- **[Resource Cards Testing](docs/testing/README-RESOURCE-CARDS-TESTING.md)** - Testing guide for resource cards system
- **[Resource Cards Test Results](docs/testing/README-RESOURCE-CARDS-TEST-RESULTS.md)** - Test results and verification status

### In-App Documentation
- **In-App Docs** - Open the app and click "About" for documentation (rendered from markdown files)

## Features

- **Standalone Operation** - Works completely independently without any server (uses localStorage)
- **Optional Server** - Node.js server adds REST API and SQLite database (optional enhancement)
- **Multi-Site Support** - Automatically detects and serves multiple sites from `sites/` folder
- **Site Selector** - Beautiful landing page when multiple sites detected
- **Docker Ready (Optional)** - Full Docker Compose setup available, but not required
- **Auto-Fit, Auto-Born, Auto-Heal** - The `go.sh`/`go.bat` scripts handle everything automatically
- **UV-First** - Uses UV (universal package manager) when available for faster installs
- **SQLite Backend** - Full REST API for inventory management (optional)
- **Network Ready** - Auto-detects IP, serves on network (optional)
- **HTTPS Support** - Service workers work over network
- **Master Config System** - `config.json` (JSON format) + `config.js` loader manage all site settings dynamically
- **JSON Schema System** - Structured schemas for resources, services, persons, and companies ensure consistent imports
- **Relationship Mapping** - Complex data relationship system for visualizing connections and projecting capabilities
- **Vendor Import System** - Intelligent vendor file import (Amazon, eBay, Home Depot, etc.) with schema validation and rich data extraction

## Requirements

- **Node.js 18+** (auto-installed via UV or Homebrew)
- **pnpm or npm** (auto-installed)
- **Python 3.6+** (optional, for Python servers)
- **mkcert** (optional, for HTTPS certificates)

All dependencies are automatically installed by the `go.sh`/`go.bat` scripts.

## License

ISC

---

For detailed server documentation, see [docs/server/README-SERVER.md](docs/server/README-SERVER.md)

