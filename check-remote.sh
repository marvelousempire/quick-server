#!/usr/bin/env bash
# Remote Server Status Checker
# Connects to remote server and checks LearnMappers status

# Configuration (edit these or set via environment variables)
# Uses SSH config if available, otherwise defaults
SSH_CONFIG_HOST="${SSH_CONFIG_HOST:-251.151.167.72.host.secureserver.net}"
REMOTE_HOST="${REMOTE_HOST:-${SSH_CONFIG_HOST}}"
REMOTE_USER="${REMOTE_USER:-abrownsanta}"
REMOTE_PORT="${REMOTE_PORT:-22}"
REMOTE_PATH="${REMOTE_PATH:-/opt/learnmappers}"
SSH_KEY="${SSH_KEY:-~/.ssh/id_ed25519}"

# If using SSH config host, use that instead
if [ -n "$SSH_CONFIG_HOST" ] && [ "$SSH_CONFIG_HOST" != "your-server.com" ]; then
    # Use SSH config host (simplifies connection)
    SSH_TARGET="${SSH_CONFIG_HOST}"
else
    # Use explicit connection
    SSH_TARGET="${REMOTE_USER}@${REMOTE_HOST}"
fi

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Checking Remote Server Status..."
echo "📍 Host: ${REMOTE_HOST}"
echo "👤 User: ${REMOTE_USER}"
echo "📁 Path: ${REMOTE_PATH}"
echo ""

# Test SSH connection
echo "1️⃣ Testing SSH connection..."
if ssh -i "${SSH_KEY}" -p "${REMOTE_PORT}" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "${REMOTE_USER}@${REMOTE_HOST}" "echo 'Connected'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ SSH connection successful${NC}"
else
    echo -e "${RED}❌ SSH connection failed${NC}"
    echo "💡 Check:"
    echo "   - SSH key permissions: chmod 600 ${SSH_KEY}"
    echo "   - Host, username, and port are correct"
    echo "   - Server is accessible"
    exit 1
fi

# Check if directory exists
echo ""
echo "2️⃣ Checking deployment directory..."
if ssh "${SSH_TARGET}" "[ -d '${REMOTE_PATH}' ]" 2>/dev/null; then
    echo -e "${GREEN}✅ Directory exists: ${REMOTE_PATH}${NC}"
else
    echo -e "${RED}❌ Directory not found: ${REMOTE_PATH}${NC}"
    exit 1
fi

# Check if server files exist
echo ""
echo "3️⃣ Checking server files..."
FILES=("go" "go.sh" "server.js" "package.json")
for file in "${FILES[@]}"; do
    if ssh "${SSH_TARGET}" "[ -f '${REMOTE_PATH}/${file}' ]" 2>/dev/null; then
        echo -e "${GREEN}✅ ${file}${NC}"
    else
        echo -e "${YELLOW}⚠️  ${file} not found${NC}"
    fi
done

# Check if server is running
echo ""
echo "4️⃣ Checking if server is running..."
if ssh "${SSH_TARGET}" "pgrep -f 'node.*server.js\|python.*http.server' > /dev/null" 2>/dev/null; then
    echo -e "${GREEN}✅ Server process is running${NC}"
    
    # Check ports
    echo ""
    echo "5️⃣ Checking ports..."
    if ssh "${SSH_TARGET}" "netstat -tln 2>/dev/null | grep -E ':(8000|8443)' > /dev/null || ss -tln 2>/dev/null | grep -E ':(8000|8443)' > /dev/null" 2>/dev/null; then
        echo -e "${GREEN}✅ Ports 8000/8443 are listening${NC}"
    else
        echo -e "${YELLOW}⚠️  Ports 8000/8443 not listening${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Server process not running${NC}"
fi

# Check API health
echo ""
echo "6️⃣ Testing API health endpoint..."
HTTP_CODE=$(ssh "${SSH_TARGET}" "curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/api/health 2>/dev/null || echo '000'")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ API health check passed (HTTP ${HTTP_CODE})${NC}"
else
    echo -e "${YELLOW}⚠️  API health check failed (HTTP ${HTTP_CODE})${NC}"
fi

# Get recent logs
echo ""
echo "7️⃣ Recent server logs (last 10 lines):"
ssh "${SSH_TARGET}" "tail -n 10 '${REMOTE_PATH}/server.log' 2>/dev/null || echo 'No log file found'"

echo ""
echo "✅ Status check complete!"
echo ""
echo "💡 To start the server on remote:"
echo "   ssh -i ${SSH_KEY} -p ${REMOTE_PORT} ${REMOTE_USER}@${REMOTE_HOST}"
echo "   cd ${REMOTE_PATH}"
echo "   ./go"

