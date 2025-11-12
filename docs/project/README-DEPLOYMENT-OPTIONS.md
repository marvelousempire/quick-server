# Deployment Options Guide

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

LearnMappers supports **three deployment options**, each optimized for different use cases. Choose the right one for your needs.

---

## Quick Comparison

| Feature | Fast Python | Node.js Server | Docker Stack |
|---------|-------------|---------------|--------------|
| **Speed** | ⚡ Fastest startup | ⚡ Fast | 🐢 Slower (container build) |
| **Setup Time** | Instant | ~30-60s first run | ~2-5min first run |
| **Best For** | SPAs, static sites | Full-stack apps, APIs | Production, scaling |
| **Database** | ❌ No | ✅ SQLite (auto) | ✅ SQLite or MySQL |
| **API Endpoints** | ❌ No | ✅ Full REST API | ✅ Full REST API |
| **HTTPS** | ❌ No | ✅ Optional (mkcert) | ✅ Auto (Caddy/Traefik) |
| **Reverse Proxy** | ❌ No | ❌ No | ✅ Caddy/Traefik |
| **Multi-Site** | ❌ No | ✅ Yes | ✅ Yes |
| **Auto-Fit/Born/Heal** | ⚡ Instant | ✅ Yes | ✅ Yes |
| **Resource Usage** | 🟢 Minimal | 🟢 Low | 🟡 Medium |
| **Production Ready** | 🟡 Dev/Testing | 🟢 Yes | 🟢 Enterprise |

---

## 1. Fast Python Mode ⚡

**Command:** `./go --fast` or `./go fast`

### What It Is
- Python's built-in HTTP server (`python3 -m http.server`)
- **Zero dependencies** - uses system Python
- **Instant startup** - no installation needed
- **Perfect for SPAs** - serves static files only

### When to Use
✅ **Perfect for:**
- Quick development/testing
- Static sites and SPAs (React, Vue, Angular)
- Frontend-only projects
- When you just need to serve files
- Prototyping and demos

❌ **Not for:**
- Backend APIs
- Database operations
- Multi-site hosting
- Production deployments
- HTTPS requirements

### Features
- ⚡ **Instant startup** - runs immediately
- 📁 **File serving** - serves static files
- 🔄 **Auto-reload** - reflects file changes
- 🌐 **Network access** - accessible on local network
- 💾 **Zero setup** - no dependencies to install

### Limitations
- No database support
- No API endpoints
- No HTTPS (HTTP only)
- No multi-site detection
- No reverse proxy

### Example
```bash
# Start fast Python server
./go --fast

# Access
http://localhost:8000
http://YOUR_IP:8000
```

---

## 2. Node.js Server 🚀

**Command:** `./go` (default)

### What It Is
- Full-featured Node.js/Express server
- **Fast startup** after first-time setup (~30-60s)
- **Auto-fit, auto-born, auto-heal** - handles everything
- **Production-ready** with minimal overhead

### When to Use
✅ **Perfect for:**
- Full-stack applications
- REST API backends
- Database-driven apps
- Multi-site hosting
- Production deployments
- When you need APIs + static files

❌ **Not for:**
- Pure static sites (use Fast Python instead)
- When you need advanced reverse proxy features
- Enterprise scaling requirements

### Features
- ⚡ **Fast** - optimized Node.js/Express
- 🗄️ **SQLite database** - auto-created, persistent
- 🔌 **REST API** - full CRUD endpoints
- 🔒 **HTTPS support** - via mkcert (optional)
- 🌐 **Multi-site** - auto-detects and serves multiple sites
- 🔄 **Auto-reload** - development mode
- 📊 **Statistics** - API for inventory stats
- 🛡️ **Health checks** - `/api/health` endpoint

### First-Time Setup
```bash
# First run: ~30-60 seconds
./go

# What happens:
# 1. Checks for Node.js (installs via UV if needed)
# 2. Installs dependencies (pnpm/npm)
# 3. Creates database (auto-born)
# 4. Generates SSL certificates (optional)
# 5. Starts server

# Subsequent runs: ~2-5 seconds
./go  # Skips already-completed steps
```

### Performance
- **Startup:** ~2-5s (after first run)
- **Memory:** ~50-100MB
- **CPU:** Low (event-driven)
- **Concurrency:** Excellent (Node.js async)

### Example
```bash
# Start server
./go

# Access
http://localhost:8000
https://localhost:8443  # If SSL configured
http://YOUR_IP:8000

# API endpoints
GET  /api/inventory
POST /api/inventory
GET  /api/stats
GET  /api/health
```

---

## 3. Docker Stack 🐳

**Command:** `docker-compose up -d`

### What It Is
- **Full containerized stack** - everything in Docker
- **Heaviest but most powerful** - enterprise-grade
- **Auto-fit, auto-born, auto-heal** - containerized
- **Production-ready** - scaling, monitoring, orchestration

### When to Use
✅ **Perfect for:**
- Production deployments
- Enterprise applications
- High-traffic sites
- Multi-service architectures
- When you need MySQL (not just SQLite)
- Automatic HTTPS with Let's Encrypt
- Advanced reverse proxy features
- Container orchestration (Kubernetes-ready)
- CI/CD pipelines

❌ **Not for:**
- Quick development/testing (use Fast Python)
- Simple static sites (use Fast Python)
- When Docker isn't available
- Low-resource environments

### Features
- 🐳 **Containerized** - isolated, reproducible
- 🗄️ **Database options** - SQLite or MySQL
- 🔄 **Reverse proxy** - Caddy or Traefik
- 🔒 **Automatic HTTPS** - Let's Encrypt integration
- 📊 **Monitoring** - health checks, logs
- 🔁 **Auto-heal** - container restart policies
- 📈 **Scalable** - horizontal scaling ready
- 🌐 **Multi-site** - advanced routing
- 🔐 **Security** - isolated containers

### Components
1. **learnmappers-app** - Application server
2. **learnmappers-mysql** - MySQL database (optional)
3. **learnmappers-caddy** - Caddy reverse proxy (optional)
4. **learnmappers-traefik** - Traefik reverse proxy (optional)

### First-Time Setup
```bash
# First run: ~2-5 minutes
docker-compose up -d

# What happens:
# 1. Builds Docker image
# 2. Installs dependencies in container
# 3. Creates database volume
# 4. Starts all services
# 5. Configures networking

# Subsequent runs: ~10-30 seconds
docker-compose up -d  # Uses cached images
```

### Performance
- **Startup:** ~10-30s (after first build)
- **Memory:** ~200-500MB (with MySQL)
- **CPU:** Medium (container overhead)
- **Concurrency:** Excellent (container isolation)

### Example
```bash
# Basic (SQLite)
docker-compose up -d

# With MySQL
DB_TYPE=mysql docker-compose --profile mysql up -d

# With Caddy (automatic HTTPS)
CADDY_ENABLED=true docker-compose --profile caddy up -d

# Full stack
DB_TYPE=mysql CADDY_ENABLED=true docker-compose --profile mysql --profile caddy up -d
```

---

## Decision Tree

### "I just want to serve my SPA/static site quickly"
→ **Use Fast Python:** `./go --fast`

### "I need a backend API and database"
→ **Use Node.js Server:** `./go`

### "I need production-grade infrastructure"
→ **Use Docker Stack:** `docker-compose up -d`

### "I'm developing and testing"
→ **Use Fast Python** (instant) or **Node.js** (if you need APIs)

### "I'm deploying to production"
→ **Use Node.js** (simple) or **Docker** (enterprise)

### "I need MySQL and automatic HTTPS"
→ **Use Docker Stack** with MySQL and Caddy/Traefik

---

## Do You Need Docker?

### ❌ **No Docker Needed If:**
- You're serving static files/SPAs → Use Fast Python
- You need simple APIs with SQLite → Use Node.js
- You're developing/testing → Use Fast Python or Node.js
- You want minimal setup → Use Fast Python or Node.js

### ✅ **Docker Recommended If:**
- You need MySQL (not just SQLite)
- You want automatic HTTPS with Let's Encrypt
- You need reverse proxy features (Caddy/Traefik)
- You're deploying to production at scale
- You need container orchestration
- You want isolated, reproducible environments

---

## Performance Comparison

### Startup Time
1. **Fast Python:** ⚡ Instant (0-1s)
2. **Node.js:** ⚡ Fast (2-5s after first run)
3. **Docker:** 🐢 Slower (10-30s after first build)

### Resource Usage
1. **Fast Python:** 🟢 Minimal (~10-20MB RAM)
2. **Node.js:** 🟢 Low (~50-100MB RAM)
3. **Docker:** 🟡 Medium (~200-500MB RAM with MySQL)

### Feature Richness
1. **Fast Python:** 🟡 Basic (file serving only)
2. **Node.js:** 🟢 Full (APIs, database, multi-site)
3. **Docker:** 🟢 Enterprise (everything + reverse proxy)

---

## Migration Path

### Development → Production
```
Fast Python (dev) → Node.js (staging) → Docker (production)
```

### Simple → Complex
```
Fast Python → Node.js → Docker
```

### Static → Dynamic
```
Fast Python → Node.js (add APIs) → Docker (add MySQL)
```

---

## Summary

- **Fast Python** = ⚡ **Instant, simple, perfect for SPAs**
- **Node.js** = 🚀 **Fast, full-featured, production-ready**
- **Docker** = 🐳 **Heaviest, most powerful, enterprise-grade**

**You don't need Docker for most use cases.** Fast Python handles SPAs perfectly, and Node.js handles full-stack apps excellently. Docker is for when you need the **heaviest, most robust infrastructure** with MySQL, reverse proxies, and enterprise features.

