#!/bin/bash
# Quick setup script for GLiNet router deployment
# Run this on your GLiNet router after copying files to SD card
#
# Deployment Method: SSH/SCP (not SAMBA)
# - Copy files to router via SSH/SCP
# - Server runs directly on router
# - Users access via HTTP (WiFi → Browser)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "🚀 GLiNet Router Setup"
echo "======================"
echo ""

# Detect GLiNet router
GLINET_DETECTED=false
if [ -f /etc/gl-inet/version ]; then
    GLINET_VERSION=$(cat /etc/gl-inet/version 2>/dev/null || echo "unknown")
    GLINET_DETECTED=true
    echo "✓ GLiNet router detected (version: $GLINET_VERSION)"
elif [ -f /etc/openwrt_release ]; then
    OPENWRT_VERSION=$(cat /etc/openwrt_release 2>/dev/null | grep DISTRIB_RELEASE | cut -d "'" -f 2 || echo "unknown")
    echo "✓ OpenWrt detected (version: $OPENWRT_VERSION)"
    echo "  (GLiNet routers run OpenWrt)"
    GLINET_DETECTED=true
elif command -v uci &> /dev/null; then
    echo "✓ OpenWrt/GLiNet system detected (uci found)"
    GLINET_DETECTED=true
else
    echo "⚠️  Warning: This doesn't appear to be a GLiNet/OpenWrt system"
    echo "   GLiNet routers typically have:"
    echo "   - /etc/gl-inet/version"
    echo "   - /etc/openwrt_release"
    echo "   - uci command available"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check SD card mount
SD_MOUNT="/mnt/sd"
if [ ! -d "$SD_MOUNT" ]; then
    echo "❌ SD card not mounted at $SD_MOUNT"
    echo ""
    echo "Please mount SD card first:"
    echo "  mkdir -p /mnt/sd"
    echo "  mount /dev/sda1 /mnt/sd"
    exit 1
fi

echo "✓ SD card detected at $SD_MOUNT"
echo ""

# Check if we're already on SD card
CURRENT_DIR=$(pwd)
if [[ "$CURRENT_DIR" == "$SD_MOUNT"* ]]; then
    echo "✓ Running from SD card"
    SERVER_DIR="$CURRENT_DIR"
else
    echo "📦 Copying server to SD card..."
    SERVER_DIR="$SD_MOUNT/learnmappers"
    mkdir -p "$SERVER_DIR"
    cp -r server.js package.json go.sh .env.example "$SERVER_DIR/"
    cp -r sites "$SERVER_DIR/" 2>/dev/null || true
    cp -r schemas "$SERVER_DIR/" 2>/dev/null || true
    cp -r docs "$SERVER_DIR/" 2>/dev/null || true
    echo "✓ Files copied to $SERVER_DIR"
fi

cd "$SERVER_DIR"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js not found. Installing..."
    
    # Try opkg first
    if command -v opkg &> /dev/null; then
        opkg update
        opkg install node npm 2>/dev/null || {
            echo "⚠️  opkg install failed, trying Entware..."
            if [ -f /opt/bin/opkg ]; then
                /opt/bin/opkg install node
            else
                echo "❌ Could not install Node.js automatically"
                echo "   Please install manually: opkg install node"
                exit 1
            fi
        }
    else
        echo "❌ No package manager found"
        exit 1
    fi
fi

echo "✓ Node.js $(node --version)"

# Install npm packages
if [ -f "package.json" ]; then
    echo "📦 Installing npm packages..."
    npm install --production --no-optional || {
        echo "⚠️  npm install failed, trying with --legacy-peer-deps..."
        npm install --production --no-optional --legacy-peer-deps || {
            echo "⚠️  Installation had issues, but continuing..."
        }
    }
fi

# Create data directory
mkdir -p data
echo "✓ Data directory ready"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    # Set router-friendly defaults
    cat >> .env << EOF

# GLiNet Router Settings
HTTP_PORT=8000
HTTPS_PORT=8443
SSL_ENABLED=false
DB_PATH=$SERVER_DIR/data
EOF
    echo "✓ .env created"
fi

# Make scripts executable
chmod +x go.sh server.js 2>/dev/null || true

# Create startup service
echo ""
echo "🔧 Creating startup service..."
cat > /etc/init.d/learnmappers << EOF
#!/bin/sh /etc/rc.common
START=99
STOP=10

start_service() {
    # Wait for SD card to mount
    sleep 5
    
    # Start server in fast mode (Python, lighter)
    cd $SERVER_DIR
    ./go.sh --fast > /tmp/learnmappers.log 2>&1 &
}

stop_service() {
    killall node 2>/dev/null || true
    killall python3 2>/dev/null || true
}
EOF

chmod +x /etc/init.d/learnmappers
/etc/init.d/learnmappers enable

echo "✓ Service created and enabled"
echo ""

# Configure firewall (allow LAN/WiFi access)
echo "🔥 Configuring firewall..."
if command -v uci &> /dev/null; then
    # Allow HTTP from LAN (WiFi clients)
    uci add firewall rule 2>/dev/null || true
    uci set firewall.@rule[-1].name='LearnMappers HTTP'
    uci set firewall.@rule[-1].src='lan'  # LAN = WiFi clients
    uci set firewall.@rule[-1].dest_port='8000'
    uci set firewall.@rule[-1].target='ACCEPT'
    uci set firewall.@rule[-1].proto='tcp'
    
    uci commit firewall 2>/dev/null || true
    /etc/init.d/firewall reload 2>/dev/null || true
    echo "✓ Firewall configured (LAN/WiFi access enabled)"
else
    echo "⚠️  uci not found, firewall not configured"
fi

echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo "Server location: $SERVER_DIR"
echo ""
echo "📡 Next Steps:"
echo "  1. Configure WiFi in router admin: http://192.168.8.1"
echo "  2. Set SSID (e.g., 'LearnMappers Portal')"
echo "  3. Start server:"
echo "     cd $SERVER_DIR"
echo "     ./go.sh --fast"
echo ""
echo "   Or use service:"
echo "     /etc/init.d/learnmappers start"
echo ""
echo "🌐 Access:"
ROUTER_IP=$(hostname -I | awk '{print $1}' || echo "192.168.8.1")
echo "  - Router IP: http://$ROUTER_IP:8000"
echo "  - Users connect to WiFi → Access site automatically"
echo ""
echo "💡 Tip: Set HTTP_PORT=80 in .env to access without port number"
echo ""

