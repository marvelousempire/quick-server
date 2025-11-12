# GLiNet Router Deployment Guide

**Deploy LearnMappers Server on GLiNet Router with SD Card**

## Overview

This guide explains how to run the LearnMappers server on a GLiNet router using an SD card for storage. GLiNet routers run OpenWrt (Linux) and are perfect for portable, self-hosted deployments.

**Use Case:** Create a WiFi hotspot where users connect to your WiFi network and automatically access the LearnMappers site - perfect for events, demos, or offline access.

## Prerequisites

- GLiNet router (any model with SD card slot and WiFi)
- SD card (8GB+ recommended, Class 10 or better)
- SSH access to router (or use router admin panel)
- Basic Linux knowledge

## Quick Start: WiFi Hotspot Setup

**Goal:** Broadcast WiFi → Users connect → Access LearnMappers site automatically

**How It Works:**
- **Deployment:** Via SSH (copy files to router, server runs on router)
- **User Access:** Via HTTP (users connect to WiFi, access site in browser)
- **NOT using SAMBA:** SAMBA is for file sharing - we run the server directly on the router

1. **Deploy server** to SD card (Step 3) - via SSH/SCP
2. **Configure WiFi** in router admin panel (Step 7)
3. **Start server** on router (Step 8)
4. **Users connect to WiFi** and access site via browser (Step 9)

That's it! Users connecting to your WiFi will have access to the LearnMappers site.

## GLiNet Router Models

Most GLiNet routers support this setup:
- **GL-AR750S** (Slate) - Dual-band, SD card slot
- **GL-MT300N-V2** (Mango) - Compact, SD card slot
- **GL-AR300M** - Compact, SD card slot
- **GL-MT1300** (Beryl) - High-performance, SD card slot
- **GL-AX1800** (Flint) - Wi-Fi 6, SD card slot
- And other models with SD card support

## Step 1: Prepare SD Card

### Format SD Card

1. Insert SD card into your computer
2. Format as **ext4** (Linux filesystem)
   - On macOS: Use Disk Utility or `diskutil eraseDisk ext4 SDCARD /dev/diskX`
   - On Linux: `mkfs.ext4 /dev/sdX1`
   - On Windows: Use a tool like MiniTool Partition Wizard

### Mount SD Card on Router

**Connection Method:** SSH (not SAMBA - SAMBA is for file sharing, we use SSH to run commands directly on the router)

1. **Insert SD card into router**

2. **SSH into router:**
   ```bash
   # Default GLiNet IP is usually 192.168.8.1
   ssh root@192.168.8.1
   
   # Or use GLiNet's default password (check router label)
   # Or use GLiNet mobile app to get SSH access
   ```

3. **Check if SD card is detected:**
   ```bash
   lsblk
   dmesg | grep -i sd
   # Look for /dev/sda1 or /dev/mmcblk0p1
   ```

4. **Mount SD card (if not auto-mounted):**
   ```bash
   mkdir -p /mnt/sd
   mount /dev/sda1 /mnt/sd  # Adjust device name if needed
   # Or for some routers: mount /dev/mmcblk0p1 /mnt/sd
   ```

5. **Make mount persistent (add to `/etc/fstab`):**
   ```bash
   echo '/dev/sda1 /mnt/sd ext4 defaults 0 0' >> /etc/fstab
   # Or: echo '/dev/mmcblk0p1 /mnt/sd ext4 defaults 0 0' >> /etc/fstab
   ```

**Note:** GLiNet routers may auto-mount SD cards. Check with `df -h` to see if already mounted.

## Step 2: Install Dependencies

### Update Package Manager

```bash
opkg update
```

### Install Required Packages

```bash
# Node.js (if available for your architecture)
opkg install node npm

# Or use Node.js from Entware (recommended for more models)
opkg install entware-ng
/opt/bin/opkg install node

# Python 3
opkg install python3 python3-pip

# Essential tools
opkg install git curl wget
```

### Alternative: Use UV (Universal Package Manager)

UV can install Node.js and Python without package manager:

```bash
# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Add to PATH
export PATH="$HOME/.cargo/bin:$PATH"
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc

# Install Node.js and Python via UV
uv tool install nodejs
uv python install
```

## Step 3: Deploy Server to SD Card

**Deployment Method:** SSH/SCP (Secure Copy) - files are copied to router, then server runs directly on router

**NOT using SAMBA:** SAMBA is for file sharing over network. We deploy via SSH, then the server runs natively on the router.

### Option A: Automated Setup Script (Recommended)

1. **Copy setup script to router:**
   ```bash
   # On your computer
   scp scripts/setup-glinet.sh root@192.168.8.1:/mnt/sd/
   ```

2. **SSH into router and run:**
   ```bash
   ssh root@192.168.8.1
   cd /mnt/sd
   chmod +x setup-glinet.sh
   ./setup-glinet.sh
   ```

   The script will:
   - Detect GLiNet router
   - Copy server files
   - Install dependencies
   - Configure firewall
   - Create startup service

### Option B: Copy from Build Package

1. Build the server package on your computer:
   ```bash
   ./build
   ```

2. Copy `dist/learnmappers-server/` to SD card via SCP:
   ```bash
   # On your computer
   scp -r dist/learnmappers-server/* root@192.168.8.1:/mnt/sd/learnmappers/
   ```

3. Or use USB/SD card reader to copy directly (then insert into router)

### Option C: Clone Git Repository

```bash
# On router (via SSH)
cd /mnt/sd
git clone https://github.com/YOUR_USERNAME/learnmappers-server.git
cd learnmappers-server
```

### Option D: Manual Setup

```bash
# On router (via SSH)
cd /mnt/sd
mkdir -p learnmappers
cd learnmappers

# Copy files via SCP from your computer
# scp -r /path/to/server/* root@192.168.8.1:/mnt/sd/learnmappers/
```

## Step 4: Configure Server

### Create Environment File

```bash
cd /mnt/sd/learnmappers
cp .env.example .env
nano .env
```

**Recommended settings for router:**
```bash
# Server Configuration
HTTP_PORT=8000
HTTPS_PORT=8443
SITE_DIR=sites/learnmappers

# Network (use router's IP)
DOMAIN=
HOSTNAME=

# Database
DB_TYPE=sqlite
DB_PATH=/mnt/sd/learnmappers/data

# SSL (optional, can skip for local network)
SSL_ENABLED=false
```

### Install Node.js Dependencies

```bash
cd /mnt/sd/learnmappers

# If using npm
npm install --production

# If using pnpm (install first: npm install -g pnpm)
pnpm install --production

# If using UV
uv pip install -r requirements.txt  # If you have Python requirements
```

### Make Scripts Executable

```bash
chmod +x go.sh
chmod +x server.js
```

## Step 5: Create Startup Script

### Create System Service (Recommended)

```bash
cat > /etc/init.d/learnmappers << 'EOF'
#!/bin/sh /etc/rc.common
START=99
STOP=10

start_service() {
    # Wait for SD card to mount
    sleep 5
    
    # Start server
    cd /mnt/sd/learnmappers
    ./go.sh --fast &
}

stop_service() {
    killall node
    killall python3
}
EOF

chmod +x /etc/init.d/learnmappers
/etc/init.d/learnmappers enable
```

### Or Use Cron for Auto-Start

```bash
# Add to crontab
crontab -e

# Add this line (starts on boot, waits 30 seconds for SD card)
@reboot sleep 30 && cd /mnt/sd/learnmappers && ./go.sh --fast
```

### Or Manual Start Script

```bash
cat > /usr/local/bin/start-learnmappers << 'EOF'
#!/bin/sh
cd /mnt/sd/learnmappers
./go.sh --fast
EOF

chmod +x /usr/local/bin/start-learnmappers
```

## Step 6: Configure Firewall

Allow incoming connections on server ports (for local network access):

```bash
# Allow HTTP from LAN (WiFi clients)
uci add firewall rule
uci set firewall.@rule[-1].name='LearnMappers HTTP'
uci set firewall.@rule[-1].src='lan'  # LAN (WiFi clients)
uci set firewall.@rule[-1].dest_port='8000'
uci set firewall.@rule[-1].target='ACCEPT'
uci set firewall.@rule[-1].proto='tcp'

# Allow HTTPS (if enabled)
uci add firewall rule
uci set firewall.@rule[-1].name='LearnMappers HTTPS'
uci set firewall.@rule[-1].src='lan'  # LAN (WiFi clients)
uci set firewall.@rule[-1].dest_port='8443'
uci set firewall.@rule[-1].target='ACCEPT'
uci set firewall.@rule[-1].proto='tcp'

# Commit changes
uci commit firewall
/etc/init.d/firewall reload
```

**Note:** Using `src='lan'` allows access from WiFi-connected devices. Use `src='wan'` only if you want external internet access.

## Step 7: Configure WiFi Hotspot

### Set Up WiFi Network

1. **Access Router Admin:**
   - Connect to router: `http://192.168.8.1` (default)
   - Or use GLiNet mobile app

2. **Configure WiFi:**
   - Go to **Network** → **Wireless**
   - Enable **Access Point (AP)** mode
   - Set **SSID** (network name): e.g., `LearnMappers Portal`
   - Set **Password** (optional, or leave open)
   - Set **Channel** (auto or specific)
   - **Save & Apply**

3. **Recommended Settings:**
   ```
   SSID: LearnMappers Portal
   Security: WPA2-PSK (or Open for public access)
   Channel: Auto
   Mode: 2.4GHz + 5GHz (if dual-band)
   ```

### Optional: Captive Portal

GLiNet routers support captive portals. You can redirect users to your site:

```bash
# Install nodogsplash (captive portal)
opkg update
opkg install nodogsplash

# Or use GLiNet's built-in captive portal feature
# Check router admin panel: Network → Captive Portal
```

**Configure Captive Portal:**
- Set redirect URL to: `http://192.168.8.1:8000`
- Users connecting to WiFi will be redirected to your site

## Step 8: Start Server

### Manual Start

```bash
cd /mnt/sd/learnmappers
./go.sh --fast
```

### Using Service

```bash
/etc/init.d/learnmappers start
```

### Check Status

```bash
# Check if running
ps | grep -E "node|python"

# Check logs
tail -f /mnt/sd/learnmappers/data/server.log

# Check port
netstat -tlnp | grep -E "8000|8443"
```

## Step 9: User Access Flow

### How Users Access Your Site

1. **User connects to WiFi:**
   - SSID: `LearnMappers Portal` (or your chosen name)
   - Enter password (if set)

2. **Automatic Access:**
   - If captive portal enabled: User redirected to `http://192.168.8.1:8000`
   - If no captive portal: User opens browser and goes to `http://192.168.8.1:8000`

3. **Access Methods:**
   - **Direct IP:** `http://192.168.8.1:8000`
   - **Router Hostname:** `http://router.local:8000` (if mDNS enabled)
   - **Captive Portal:** Automatic redirect

### Make Access Easier

**Option 1: Set Router Hostname**
```bash
# Set friendly hostname
uci set system.@system[0].hostname='learnmappers'
uci commit system
/etc/init.d/system reload

# Access via: http://learnmappers.local:8000
```

**Option 2: Use Port 80 (Standard HTTP)**
```bash
# Change server port to 80 in .env
HTTP_PORT=80

# Users can access: http://192.168.8.1 (no port needed)
```

**Option 3: DNS Redirect**
```bash
# Install dnsmasq (usually pre-installed)
# Add to /etc/dnsmasq.conf:
address=/#/192.168.8.1

# Restart
/etc/init.d/dnsmasq restart
```

### External Access (if configured)

- Set up port forwarding on router
- Use DDNS if you have dynamic IP
- Access via: `http://your-ddns-domain.com:8000`

## Optimization for Router

### Use Fast Mode (Python Only)

The `--fast` flag uses Python's built-in server (no Node.js), which is lighter:

```bash
./go.sh --fast
```

### Reduce Resource Usage

Edit `.env`:
```bash
# Disable HTTPS (saves CPU)
SSL_ENABLED=false

# Use smaller database
DB_TYPE=sqlite

# Reduce logging
LOG_LEVEL=error
```

### Limit Memory Usage

```bash
# For Node.js
NODE_OPTIONS="--max-old-space-size=128" node server.js

# For Python
python3 -O server.py  # Optimized mode
```

## Troubleshooting

### SD Card Not Mounting

```bash
# Check if detected
dmesg | grep -i sd
lsblk

# Manual mount
mount /dev/sda1 /mnt/sd

# Check filesystem
fsck /dev/sda1
```

### Out of Memory

```bash
# Check memory
free -m

# Use swap (if SD card has space)
dd if=/dev/zero of=/mnt/sd/swapfile bs=1M count=256
mkswap /mnt/sd/swapfile
swapon /mnt/sd/swapfile
```

### Port Already in Use

```bash
# Find what's using the port
netstat -tlnp | grep 8000

# Kill process or change port in .env
```

### Service Won't Start

```bash
# Check logs
logread | grep learnmappers

# Test manually
cd /mnt/sd/learnmappers
./go.sh --fast

# Check permissions
ls -la /mnt/sd/learnmappers/go.sh
```

## Performance Tips

1. **Use Fast Mode** - Python server is lighter than Node.js
2. **Disable HTTPS** - Saves CPU for SSL/TLS
3. **Use SQLite** - No MySQL overhead
4. **Limit Sites** - Fewer sites = less memory
5. **SD Card Speed** - Use Class 10 or better for better I/O

## Backup

### Backup Configuration

```bash
# Backup to router storage
tar -czf /root/learnmappers-backup.tar.gz /mnt/sd/learnmappers

# Or backup to another location
scp -r /mnt/sd/learnmappers user@computer:/backup/
```

## Security Considerations

1. **Change Default Password** - Router admin password
2. **Disable WAN Access** - Only allow local network if not needed externally
3. **Use HTTPS** - If accessing from outside local network
4. **Firewall Rules** - Only open necessary ports
5. **Regular Updates** - Keep router firmware updated

## Example Use Cases

- **WiFi Hotspot Portal** - Broadcast WiFi, users connect and access your site automatically
- **Event/Demo Setup** - Create portable demo station with WiFi access
- **Offline Documentation** - Host docs locally, accessible via WiFi
- **Portable Web Server** - Host sites anywhere with internet
- **Local Development** - Test sites on local network
- **Personal Cloud** - Self-hosted services accessible via WiFi
- **IoT Dashboard** - Router-based monitoring accessible to connected devices
- **Educational Content** - Share educational materials via local WiFi network

## Support

For issues specific to GLiNet routers:
- GLiNet Forum: https://forum.gl-inet.com
- OpenWrt Documentation: https://openwrt.org/docs

For server-specific issues, see main README.md

