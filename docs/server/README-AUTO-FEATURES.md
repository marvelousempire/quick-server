# Auto-Fit, Auto-Born, Auto-Heal — Complete Guide

**LearnMappers Server — Automatic Setup and Maintenance**

## Overview

The LearnMappers server includes three automatic features that make deployment and operation completely hands-off:

- **Auto-Fit** — Automatically installs missing dependencies and tools
- **Auto-Born** — Automatically initializes database and certificates on first run
- **Auto-Heal** — Automatically checks and fixes issues (ports, database, certificates)

These features work together to ensure the server "just works" with zero manual configuration.

## Auto-Fit: Automatic Dependency Installation

**What It Does:** Automatically detects and installs missing tools and dependencies.

### How It Works

1. **Checks for UV (Universal Package Manager)**
   - If UV not found, offers to install it
   - UV can install Node.js, Python, and other tools

2. **Uses UV to Install Tools:**
   - **Node.js** — `uv tool install nodejs`
   - **Python** — `uv python install`
   - **pnpm** — `uvx --from pnpm pnpm install --global pnpm`

3. **Falls Back to Traditional Methods:**
   - If UV not available, uses system package managers
   - Homebrew (macOS), apt/yum (Linux), etc.

4. **Installs npm/pnpm Packages:**
   - After tools are ready, installs project dependencies
   - Rebuilds native modules (like `better-sqlite3`) if needed

### What Gets Installed

**Required (Full Mode):**
- Node.js 18+ (via UV or system package manager)
- npm or pnpm (comes with Node.js or via UV)
- Python 3.6+ (via UV or system package manager)

**Required (Fast Mode):**
- Python 3.6+ only (no Node.js needed)

**Optional:**
- Docker (for containerized deployment)
- mkcert (for SSL certificate generation)

### Example Output

```
📦 Auto-Fit: Checking dependencies...
   Using UV to hunt for and install missing tools (Node.js, Python)...
✓ UV uv 0.8.15
⚡ Using UV to manage dependencies (Node.js, Python, tools)...
✓ Node.js v24.3.0
✓ Python 3.9.6
✓ pnpm 10.17.1
✓ Dependencies already installed (skipped)
```

### Benefits

- ✅ **Zero manual installation** — Everything installed automatically
- ✅ **Cross-platform** — Works on macOS, Linux, Windows (WSL)
- ✅ **First-time only** — Skips if already installed
- ✅ **Smart fallbacks** — Uses best available method

## Auto-Born: Automatic Initialization

**What It Does:** Automatically creates database, certificates, and data directories on first run.

### How It Works

1. **Creates Data Directory:**
   ```bash
   mkdir -p data
   ```

2. **Initializes Database:**
   - Checks if `data/learnmappers.db` exists
   - If not, runs `scripts/init-db.js` to create it
   - Creates tables: `inventory`, `stats`, etc.

3. **Generates SSL Certificates:**
   - Checks for `localhost+3.pem` and `localhost+3-key.pem`
   - If not found, uses `mkcert` to generate certificates
   - Includes: localhost, 127.0.0.1, ::1, and local network IP

4. **First-Time Only:**
   - All initialization happens once
   - Subsequent runs skip (shows "already exists")

### What Gets Created

**Database:**
- `data/learnmappers.db` — SQLite database
- Tables: `inventory`, `stats`, etc.
- Auto-created schema

**Certificates:**
- `localhost+3.pem` — SSL certificate
- `localhost+3-key.pem` — SSL private key
- Valid for: localhost, 127.0.0.1, ::1, local IP

**Directories:**
- `data/` — Database and data storage
- Auto-created if missing

### Example Output

```
🌱 Auto-Born: Initializing database...
   Database will be auto-created by server.js on first run
✓ Data directory ready
📊 Creating database (first time only)...
✓ Database created
📜 Generating SSL certificates (first time only)...
✓ SSL certificates generated
```

### Benefits

- ✅ **Zero configuration** — Everything created automatically
- ✅ **Secure by default** — HTTPS certificates auto-generated
- ✅ **First-time only** — Fast on subsequent runs
- ✅ **No manual setup** — Just run and go

## Auto-Heal: Automatic Health Checks and Fixes

**What It Does:** Automatically checks system health and fixes common issues.

### How It Works

1. **Port Availability Check:**
   - Checks if ports 8000 (HTTP) and 8443 (HTTPS) are available
   - If in use, offers to kill the process or use different port
   - Server auto-selects available port if needed

2. **Database Integrity Check:**
   - Runs `PRAGMA integrity_check` on SQLite database
   - If corrupted, automatically recreates it
   - Preserves data if possible

3. **Certificate Validation:**
   - Checks if SSL certificates exist and are valid
   - Regenerates if missing or invalid

4. **Dependency Verification:**
   - Verifies Node.js, Python versions
   - Checks if native modules are built correctly
   - Rebuilds if needed

### What Gets Checked

**Ports:**
- HTTP port (8000) — Checks availability
- HTTPS port (8443) — Checks availability
- Auto-finds alternative ports if busy

**Database:**
- File existence
- Integrity (no corruption)
- Schema validity
- Auto-recreates if corrupted

**Certificates:**
- File existence
- Validity
- Auto-regenerates if missing

**Dependencies:**
- Node.js version (18+)
- Python version (3.6+)
- Native module bindings (better-sqlite3)
- Auto-rebuilds if needed

### Example Output

```
🏥 Auto-Heal: Running health checks...
   Checking ports, database, certificates...
✓ Port 8443 available
✓ Port 8000 available
✓ Database integrity OK
✓ SSL certificates valid
```

### Benefits

- ✅ **Self-healing** — Fixes issues automatically
- ✅ **Prevents failures** — Catches problems before they cause errors
- ✅ **Zero downtime** — Auto-recovery from issues
- ✅ **Production-ready** — Handles edge cases automatically

## How They Work Together

### First Run Flow

```
1. Auto-Fit: Install UV → Install Node.js/Python → Install packages
   ↓
2. Auto-Born: Create data/ → Create database → Generate certificates
   ↓
3. Auto-Heal: Check ports → Check database → Verify certificates
   ↓
4. Server starts successfully
```

### Subsequent Runs Flow

```
1. Auto-Fit: ✓ Tools already installed (skipped)
   ↓
2. Auto-Born: ✓ Database exists (skipped) ✓ Certificates exist (skipped)
   ↓
3. Auto-Heal: ✓ Ports available ✓ Database OK ✓ Certificates valid
   ↓
4. Server starts immediately (fast!)
```

## UV's Role

**UV is the "hunter" that enables Auto-Fit:**

- **Hunts for missing tools** — Detects what's not installed
- **Installs automatically** — No manual intervention needed
- **Cross-platform** — Works on any system
- **Fast installation** — Optimized package manager

**UV enables Auto-Born and Auto-Heal by:**
- Providing Node.js (needed for database init)
- Providing Python (needed for fast mode)
- Providing pnpm (needed for package management)

## Configuration

### Environment Variables

You can control auto-features via `.env`:

```bash
# Auto-Fit: Control package manager
PKG_MGR=pnpm  # or npm

# Auto-Born: Control database
DB_TYPE=sqlite  # or mysql
DB_PATH=./data/learnmappers.db

# Auto-Heal: Control ports
HTTP_PORT=8000
HTTPS_PORT=8443
```

### Disabling Features

**Skip Auto-Fit (manual installation):**
```bash
# Install dependencies manually first
npm install
# Then run server
node server.js
```

**Skip Auto-Born (manual setup):**
```bash
# Create database manually
node scripts/init-db.js
# Generate certificates manually
mkcert localhost 127.0.0.1
```

**Skip Auto-Heal (manual checks):**
```bash
# Check ports manually
lsof -i :8000
# Check database manually
sqlite3 data/learnmappers.db "PRAGMA integrity_check;"
```

## Troubleshooting

### Auto-Fit Issues

**UV installation fails:**
```bash
# Install UV manually
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.cargo/bin:$PATH"
```

**Node.js installation fails:**
```bash
# Install via system package manager
# macOS: brew install node
# Ubuntu: apt install nodejs npm
```

### Auto-Born Issues

**Database creation fails:**
```bash
# Check permissions
ls -la data/
# Create manually
node scripts/init-db.js
```

**Certificate generation fails:**
```bash
# Install mkcert
brew install mkcert  # macOS
# Or use HTTP only (set SSL_ENABLED=false)
```

### Auto-Heal Issues

**Port always busy:**
```bash
# Find what's using the port
lsof -i :8000
# Kill process or change port in .env
HTTP_PORT=8080
```

**Database corruption:**
```bash
# Auto-Heal should fix this automatically
# Or manually:
rm data/learnmappers.db
node scripts/init-db.js
```

## Best Practices

1. **Let it run** — Don't interrupt the auto-processes
2. **First run takes time** — 30-60 seconds is normal
3. **Subsequent runs are fast** — Everything is cached
4. **Check logs** — If something fails, check the output
5. **Trust the process** — Auto-features handle 99% of cases

## Summary

**Auto-Fit, Auto-Born, Auto-Heal** work together to make the LearnMappers server:

- ✅ **Zero-configuration** — Just run `./go` and it works
- ✅ **Self-installing** — Installs everything it needs
- ✅ **Self-initializing** — Creates database and certificates
- ✅ **Self-healing** — Fixes issues automatically
- ✅ **Production-ready** — Handles edge cases gracefully

**UV is the key** — It hunts for and installs missing tools, which enables all three auto-features to work seamlessly.

