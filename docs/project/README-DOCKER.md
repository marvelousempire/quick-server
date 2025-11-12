# Docker Deployment — Quick Server Setup (Optional)

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Docker deployment guide** — Spin up the LearnMappers server quickly using Docker Compose. Perfect for deploying the server as a reusable product.
>
> **💡 Not sure if you need Docker?** See [README-DEPLOYMENT-OPTIONS.md](./README-DEPLOYMENT-OPTIONS.md) to compare Fast Python, Node.js, and Docker options.
>
> **⚠️ Docker is completely optional!** The system works perfectly without Docker:
> - ⚡ **Fast Python** (`./go --fast`) - Instant, perfect for SPAs
> - 🚀 **Node.js** (`./go`) - Fast, full-featured, production-ready
> - 🐳 **Docker** - Heaviest, most powerful, enterprise-grade

## When to Use Docker

Docker is the **heaviest but most powerful** option. Use it when you need:
- ✅ MySQL database (not just SQLite)
- ✅ Automatic HTTPS with Let's Encrypt
- ✅ Reverse proxy features (Caddy/Traefik)
- ✅ Production-grade infrastructure
- ✅ Container orchestration
- ✅ Enterprise scaling

**For simple use cases (SPAs, static sites, basic APIs), consider:**
- ⚡ **Fast Python** (`./go --fast`) - Instant, perfect for SPAs
- 🚀 **Node.js** (`./go`) - Fast, full-featured, production-ready

See [README-DEPLOYMENT-OPTIONS.md](./README-DEPLOYMENT-OPTIONS.md) for a full comparison.

## Overview

The server can be deployed as a standalone product using Docker. Just drop your site folder into `sites/` and run `docker-compose up`.

## Quick Start

```bash
# Start server (Auto-Fit, Auto-Born, Auto-Heal included!)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop server
docker-compose down
```

**What happens automatically:**
- ✅ **Auto-Fit** - Dependencies installed during build
- ✅ **Auto-Born** - Database created on first container start
- ✅ **Auto-Heal** - Container auto-restarts if unhealthy (Docker HEALTHCHECK)

## Features

- ✅ **Auto-Fit** - Dependencies automatically installed in container
- ✅ **Auto-Born** - Database auto-created on first run (via server.js)
- ✅ **Auto-Heal** - Docker HEALTHCHECK automatically restarts unhealthy containers
- ✅ **Multi-site support** - Automatically detects all sites in `sites/` folder
- ✅ **Site selector** - Shows landing page when multiple sites detected
- ✅ **HTTPS ready** - Includes SSL certificate support (mount certificates or use HTTP)
- ✅ **SQLite database** - Persistent data storage (auto-initialized)
- ✅ **MySQL database** - Production-ready database (optional, via Docker)
- ✅ **Caddy reverse proxy** - Automatic HTTPS with Let's Encrypt (optional)
- ✅ **Traefik reverse proxy** - Advanced routing and service discovery (optional)
- ✅ **REST API** - Full API endpoints for inventory management
- ✅ **Auto-reload** - Development mode with hot reload

## File Structure

```
learnmappers-v7_3-pwa/
├── docker-compose.yml      # Production deployment (full stack)
├── docker-compose.dev.yml  # Development deployment
├── Dockerfile              # Production image
├── Dockerfile.dev          # Development image
├── Caddyfile               # Caddy reverse proxy configuration
├── sites/                  # All sites directory
│   ├── default/            # Default site
│   ├── site1/              # Additional site
│   └── site2/              # Another site
└── data/                   # Database storage (created automatically)
```

## Container Architecture

**Container Names (Easy to Read):**
- `learnmappers-app` - Main application server
- `learnmappers-mysql` - MySQL database (optional)
- `learnmappers-caddy` - Caddy reverse proxy (optional)
- `learnmappers-traefik` - Traefik reverse proxy (optional)

**Network:**
- `learnmappers-network` - Internal Docker network

**Volumes:**
- `learnmappers-mysql-data` - MySQL persistent data
- `learnmappers-caddy-data` - Caddy SSL certificates
- `learnmappers-caddy-config` - Caddy configuration
- `learnmappers-traefik-letsencrypt` - Traefik SSL certificates

## Usage

### Production

**Basic Setup (SQLite):**
```bash
# Build and start
docker-compose up -d

# Access
https://localhost:8443
http://localhost:8000
```

**With MySQL (More Robust):**
```bash
# Start with MySQL service
DB_TYPE=mysql docker-compose --profile mysql up -d

# Or create .env file:
# DB_TYPE=mysql
# DB_HOST=learnmappers-mysql
# DB_NAME=learnmappers
# DB_USER=learnmappers
# DB_PASSWORD=your-secure-password

# Access
https://localhost:8443
http://localhost:8000
# MySQL on localhost:3306
```

**With Caddy (Automatic HTTPS):**
```bash
# Start with Caddy reverse proxy
CADDY_ENABLED=true docker-compose --profile caddy up -d

# Caddy automatically:
# - Gets SSL certificates from Let's Encrypt
# - Handles HTTPS termination
# - Routes to learnmappers-app

# Access
https://your-domain.com  # Automatic HTTPS!
http://your-domain.com   # Auto-redirects to HTTPS
```

**With Traefik (Advanced Routing):**
```bash
# Start with Traefik reverse proxy
TRAEFIK_ENABLED=true docker-compose --profile traefik up -d

# Traefik provides:
# - Automatic service discovery
# - Let's Encrypt integration
# - Dashboard at http://localhost:8080
# - Advanced routing rules

# Access
https://your-domain.com
http://localhost:8080  # Traefik dashboard
```

**Full Stack (MySQL + Caddy):**
```bash
DB_TYPE=mysql CADDY_ENABLED=true docker-compose --profile mysql --profile caddy up -d
```

**Full Stack (MySQL + Traefik):**
```bash
DB_TYPE=mysql TRAEFIK_ENABLED=true docker-compose --profile mysql --profile traefik up -d
```

### Development

```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up

# Access
https://localhost:8443
```

## Auto-Fit, Auto-Born, Auto-Heal in Docker

### Auto-Fit ✅
- Dependencies installed during `docker build`
- No manual installation needed
- Uses `pnpm` or falls back to `npm`

### Auto-Born ✅
- Database directory created in Dockerfile
- Database tables auto-created by `server.js` on first run
- No manual database setup required
- Data persists via volume mount: `./data:/app/data`

### Auto-Heal ✅
- Docker HEALTHCHECK monitors container health
- Automatically restarts unhealthy containers
- Health check endpoint: `/api/health`
- Check interval: 30 seconds
- MySQL health checks ensure database is ready before app starts

### SSL Certificates (Multiple Options)

**Option 1: Manual Certificates (mkcert)**
```bash
# Mount certificates
volumes:
  - ./localhost+3.pem:/app/localhost+3.pem:ro
  - ./localhost+3-key.pem:/app/localhost+3-key.pem:ro
```

**Option 2: Caddy (Automatic HTTPS)**
```bash
# Caddy automatically gets Let's Encrypt certificates
CADDY_ENABLED=true docker-compose --profile caddy up -d
```

**Option 3: Traefik (Automatic HTTPS)**
```bash
# Traefik automatically gets Let's Encrypt certificates
TRAEFIK_ENABLED=true docker-compose --profile traefik up -d
```

**Option 4: HTTP Only**
Remove certificate volumes, server uses HTTP

## Reverse Proxy Options

### Caddy (Recommended for Simplicity)
- ✅ **Automatic HTTPS** - Gets Let's Encrypt certificates automatically
- ✅ **Zero configuration** - Works out of the box
- ✅ **HTTP/2 and HTTP/3** - Modern protocols
- ✅ **Simple Caddyfile** - Easy to customize

**Usage:**
```bash
CADDY_ENABLED=true docker-compose --profile caddy up -d
```

**Configuration:**
Edit `Caddyfile` to customize domains, routing, and headers. Replace `localhost` with your actual domain name.

### Traefik (Recommended for Advanced Use)
- ✅ **Service discovery** - Automatically detects Docker services
- ✅ **Let's Encrypt integration** - Automatic SSL certificates
- ✅ **Dashboard** - Web UI for monitoring and configuration
- ✅ **Advanced routing** - Complex routing rules and middleware
- ✅ **Load balancing** - Built-in load balancing

**Usage:**
```bash
TRAEFIK_ENABLED=true docker-compose --profile traefik up -d
```

**Access Dashboard:**
```
http://localhost:8080
```

**Configuration:**
Uses Docker labels on services for automatic configuration.

## Environment Variables

```bash
# .env file

# Application
HTTP_PORT=8000
HTTPS_PORT=8443
SITE_DIR=sites/default
HTTPS=true
NODE_ENV=production

# Database (MySQL)
DB_TYPE=sqlite  # or mysql
DB_HOST=learnmappers-mysql
DB_PORT=3306
DB_NAME=learnmappers
DB_USER=learnmappers
DB_PASSWORD=your-secure-password
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_PORT=3306

# Caddy
CADDY_ENABLED=false
CADDY_HTTP_PORT=80
CADDY_HTTPS_PORT=443
DOMAIN=your-domain.com
ACME_EMAIL=admin@your-domain.com

# Traefik
TRAEFIK_ENABLED=false
TRAEFIK_HTTP_PORT=80
TRAEFIK_HTTPS_PORT=443
TRAEFIK_DASHBOARD_PORT=8080
TRAEFIK_DOMAIN=learnmappers.localhost
ACME_EMAIL=admin@your-domain.com
```

## Multi-Site Support

When multiple sites are detected in `sites/` folder:

1. **Site selector appears** at root URL (`/`)
2. **Shows all available sites** with descriptions
3. **Click to access** any site
4. **Default site** is marked

### Adding a New Site

1. Create folder: `sites/my-site/`
2. Add your site files (HTML, CSS, JS)
3. Restart server: `docker-compose restart`
4. Site selector will show your new site

## Server as a Product

This server can be used independently for any project:

1. **Copy server files** - `server.js`, `package.json`, Docker files
2. **Drop your site** - Put your site in `sites/your-site/`
3. **Run** - `docker-compose up`
4. **Done!** - Your site is live with full server features

## Database Options

### SQLite (Default)
- ✅ **Auto-created** on first run
- ✅ **No setup required**
- ✅ **Perfect for development**
- ✅ **File-based** - stored in `./data/learnmappers.db`

### MySQL (Optional - More Robust)
- ✅ **Production-ready** for high-traffic applications
- ✅ **Better concurrency** and performance
- ✅ **Docker integration** - MySQL service included
- ✅ **Auto-configured** via Docker Compose

**To use MySQL:**
```bash
# Start with MySQL
DB_TYPE=mysql docker-compose --profile mysql up -d

# Or set in .env file:
# DB_TYPE=mysql
# DB_HOST=mysql
# DB_PORT=3306
# DB_NAME=learnmappers
# DB_USER=learnmappers
# DB_PASSWORD=learnmappers
```

**MySQL Features:**
- Auto-creates database and user
- Persistent data via Docker volume
- Accessible on port 3306 (configurable)
- Auto-heals with container restart

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/sites` - List all available sites
- `GET /api/inventory` - Get inventory items
- `POST /api/inventory` - Create item
- `GET /api/inventory/:id` - Get single item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item
- `GET /api/stats` - Get statistics

## Volumes

- `./sites` - Site files (read-only in production)
- `./data` - SQLite database (persistent, if using SQLite)
- `mysql_data` - MySQL database (persistent, if using MySQL)
- `./localhost+3.pem` - SSL certificate (optional)
- `./localhost+3-key.pem` - SSL key (optional)

## Network Access

The server automatically detects your network IP. Access from other devices:

```
https://YOUR_IP:8443
http://YOUR_IP:8000
```

## Container Management

### View Running Containers
```bash
docker ps
# Shows all containers with clear names:
# - learnmappers-app
# - learnmappers-mysql (if enabled)
# - learnmappers-caddy (if enabled)
# - learnmappers-traefik (if enabled)
```

### View Logs
```bash
# Application logs
docker logs learnmappers-app -f

# MySQL logs
docker logs learnmappers-mysql -f

# Caddy logs
docker logs learnmappers-caddy -f

# Traefik logs
docker logs learnmappers-traefik -f

# All logs
docker-compose logs -f
```

### Stop Services
```bash
# Stop all
docker-compose down

# Stop specific profile
docker-compose --profile mysql down
docker-compose --profile caddy down
docker-compose --profile traefik down
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific container
docker restart learnmappers-app
docker restart learnmappers-mysql
```

## Troubleshooting

### Port Already in Use

```bash
# Change ports in docker-compose.yml
ports:
  - "8001:8000"  # Different host port
  - "8444:8443"
```

### SSL Certificate Missing

```bash
# Generate certificates
mkcert localhost 127.0.0.1 ::1

# Or disable HTTPS
HTTPS=false docker-compose up
```

### Site Not Appearing

- Check site has `pages/index.html` or `index.html`
- Verify folder name doesn't start with `.`
- Restart container: `docker-compose restart`

## Production Deployment

```bash
# Build optimized image
docker-compose build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f learnmappers

# Stop
docker-compose down
```

## Development

```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild after changes
docker-compose -f docker-compose.dev.yml build
```

