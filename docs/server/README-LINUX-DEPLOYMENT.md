# Linux Deployment Guide

**Deploy LearnMappers Server on Any Linux System**

## Overview

The LearnMappers server can run on **any system that supports Linux or can run Node.js/Python**, making it extremely portable and versatile.

## Supported Platforms

### ✅ Full Support (Tested)

- **Linux Distributions:**
  - Ubuntu/Debian
  - CentOS/RHEL
  - Fedora
  - Arch Linux
  - Alpine Linux
  - OpenWrt (routers)
  - Any Linux distribution

- **Embedded Linux:**
  - Raspberry Pi (all models)
  - GLiNet routers
  - Other ARM-based devices
  - MIPS devices (routers)

- **Container Platforms:**
  - Docker
  - Podman
  - Kubernetes
  - LXC/LXD

- **Cloud Platforms:**
  - AWS EC2
  - Google Cloud Platform
  - Azure
  - DigitalOcean
  - Linode
  - Vultr
  - Any VPS provider

- **Virtual Machines:**
  - VMware
  - VirtualBox
  - QEMU/KVM
  - Hyper-V (Linux guest)

### ✅ Also Supported

- **macOS** (Unix-based, similar to Linux)
- **Windows** (via WSL2 or native Node.js)
- **BSD Systems** (FreeBSD, OpenBSD, NetBSD)

## Requirements

### Minimum Requirements

- **OS:** Linux (any distribution) or Unix-like system
- **CPU:** Any architecture (x86_64, ARM, MIPS, etc.)
- **RAM:** 128MB minimum (256MB+ recommended)
- **Storage:** 100MB+ for server files
- **Network:** Ethernet or WiFi

### Software Requirements

**Option 1: Fast Mode (Python Only)**
- Python 3.6+ (usually pre-installed on Linux)
- No Node.js needed
- Lightest option

**Option 2: Full Mode (Node.js)**
- Node.js 16+ (or use UV to install)
- Python 3.6+ (for some features)
- More features, more resources

## Quick Start on Any Linux System

### 1. Copy Server Files

```bash
# Option A: From build package
scp -r dist/learnmappers-server/* user@linux-server:/opt/learnmappers/

# Option B: Clone repository
git clone https://github.com/YOUR_USERNAME/learnmappers-server.git
cd learnmappers-server

# Option C: Extract from archive
tar -xzf learnmappers-server-v7.3.0.tar.gz
cd learnmappers-server
```

### 2. Run - UV Handles Everything!

**The `go.sh` script uses UV to automatically:**
- **Auto-Fit:** Hunt for and install missing tools (Node.js, Python, pnpm)
- **Auto-Born:** Initialize database and certificates (via server.js)
- **Auto-Heal:** Check and fix ports, database, certificates

**See [README-AUTO-FEATURES.md](README-AUTO-FEATURES.md) for complete explanation of how Auto-Fit, Auto-Born, and Auto-Heal work together.**

```bash
# Just run - UV handles tool installation automatically!
./go.sh

# Or fast mode (Python only, lighter)
./go.sh --fast
```

**What UV Does:**
- Installs UV itself (if not present)
- Installs Node.js (if missing)
- Installs Python (if missing)
- Installs pnpm (via uvx, if missing)

**What the Script Does:**
- Installs npm packages (after tools are ready)
- Initializes database (Auto-Born)
- Runs health checks (Auto-Heal)
- Starts the server

### Manual Setup (If Needed)

**Fast Mode (Python only):**
```bash
# Python is usually pre-installed
python3 --version

# That's it! No other dependencies needed.
```

**Full Mode (Node.js):**
```bash
# UV will install Node.js automatically, or:
# Ubuntu/Debian: apt install nodejs npm
# CentOS/RHEL: yum install nodejs npm
# Arch: pacman -S nodejs npm
```

### 3. Configure (Optional)

```bash
cd /opt/learnmappers  # or your install directory
cp .env.example .env
nano .env  # Edit as needed
```

## Platform-Specific Guides

### Raspberry Pi

```bash
# Works on all Pi models (Pi 1, 2, 3, 4, Zero, etc.)
# Use fast mode for older models
./go.sh --fast
```

### Cloud VPS

```bash
# Works on any VPS provider
# Set up firewall rules for ports 8000/8443
# Use systemd service for auto-start
```

### Docker

See `README-DOCKER.md` for complete Docker setup.

### GLiNet Routers

See `README-GLINET-ROUTER.md` for router-specific setup.

## Architecture Support

The server supports multiple CPU architectures:

- **x86_64** (Intel/AMD 64-bit) - Most servers, desktops
- **ARM64** (aarch64) - Raspberry Pi 4+, modern ARM devices
- **ARMv7** (armhf) - Raspberry Pi 1-3, older ARM devices
- **MIPS** - Some routers, embedded devices
- **MIPS64** - Higher-end routers

**Note:** Node.js native modules (like `better-sqlite3`) are compiled for the target architecture. The `go.sh` script handles this automatically.

## System Service Setup

### systemd (Most Linux Distributions)

```bash
cat > /etc/systemd/system/learnmappers.service << 'EOF'
[Unit]
Description=LearnMappers Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/learnmappers
ExecStart=/opt/learnmappers/go.sh --fast
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable learnmappers
systemctl start learnmappers
```

### OpenRC (Alpine, Gentoo)

```bash
# Similar to OpenWrt init.d script
# See README-GLINET-ROUTER.md for example
```

### SysV Init (Older Systems)

```bash
# Use init.d script
# See README-GLINET-ROUTER.md for example
```

## Network Configuration

### Firewall Rules

**UFW (Ubuntu/Debian):**
```bash
ufw allow 8000/tcp
ufw allow 8443/tcp
```

**firewalld (CentOS/RHEL/Fedora):**
```bash
firewall-cmd --add-port=8000/tcp --permanent
firewall-cmd --add-port=8443/tcp --permanent
firewall-cmd --reload
```

**iptables (Generic):**
```bash
iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
iptables -A INPUT -p tcp --dport 8443 -j ACCEPT
```

## Resource Optimization

### Low-Resource Systems

For systems with limited RAM/CPU:

1. **Use Fast Mode:**
   ```bash
   ./go.sh --fast  # Python only, no Node.js
   ```

2. **Disable HTTPS:**
   ```bash
   # In .env
   SSL_ENABLED=false
   ```

3. **Use SQLite (default):**
   ```bash
   # Already default, no MySQL overhead
   DB_TYPE=sqlite
   ```

4. **Limit Sites:**
   - Only host essential sites
   - Remove unused site folders

### High-Performance Systems

For powerful servers:

1. **Use Full Mode:**
   ```bash
   ./go.sh  # Node.js with all features
   ```

2. **Enable MySQL:**
   ```bash
   # In .env or docker-compose.yml
   DB_TYPE=mysql
   ```

3. **Use Reverse Proxy:**
   - Caddy (automatic HTTPS)
   - Traefik (advanced routing)
   - Nginx (traditional)

## Examples

### Raspberry Pi 4

```bash
# Works perfectly, use fast mode for best performance
./go.sh --fast
```

### Old Laptop Running Linux

```bash
# Works great, can use full mode
./go.sh
```

### Cloud VPS (Ubuntu)

```bash
# Standard deployment
./go.sh
# Set up systemd service for auto-start
```

### Router (OpenWrt)

```bash
# See README-GLINET-ROUTER.md
./go.sh --fast
```

### Docker Container

```bash
# See README-DOCKER.md
docker-compose up
```

## Portability

The server is designed to be **highly portable**:

- ✅ **No system-specific dependencies** (except Node.js/Python)
- ✅ **Self-contained** - All files in one directory
- ✅ **SD card friendly** - Can run from removable storage
- ✅ **Cross-architecture** - Works on ARM, x86, MIPS
- ✅ **Minimal requirements** - Runs on 128MB RAM

## Troubleshooting

### "Command not found" errors

```bash
# Make scripts executable
chmod +x go.sh go server.js

# Check Python/Node.js
python3 --version
node --version
```

### Port already in use

```bash
# Find what's using the port
sudo lsof -i :8000
sudo netstat -tlnp | grep 8000

# Change port in .env
HTTP_PORT=8080
```

### Permission denied

```bash
# Run with appropriate permissions
sudo ./go.sh  # If needed

# Or fix ownership
sudo chown -R $USER:$USER /opt/learnmappers
```

## Summary

**Yes, the server can run on anything that can run Linux!**

- ✅ Any Linux distribution
- ✅ Any architecture (x86, ARM, MIPS)
- ✅ Embedded devices (routers, Pi)
- ✅ Cloud VPS
- ✅ Docker containers
- ✅ Virtual machines
- ✅ Even macOS and Windows (with WSL)

The only requirements are:
- Linux/Unix-like OS
- Python 3 (for fast mode) OR Node.js (for full mode)
- Network access
- File system access

That's it! The server is designed to be **universally portable**.

