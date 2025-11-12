#!/usr/bin/env bash
# Git Configuration Setup for Remote Server
# Sets up Git user configuration on remote server via SSH

# Configuration (edit these or set via environment variables)
# Uses SSH config if available, otherwise defaults
SSH_CONFIG_HOST="${SSH_CONFIG_HOST:-251.151.167.72.host.secureserver.net}"
REMOTE_HOST="${REMOTE_HOST:-${SSH_CONFIG_HOST}}"
REMOTE_USER="${REMOTE_USER:-abrownsanta}"
REMOTE_PORT="${REMOTE_PORT:-22}"
SSH_KEY="${SSH_KEY:-~/.ssh/id_ed25519}"

# If using SSH config host, use that instead
if [ -n "$SSH_CONFIG_HOST" ] && [ "$SSH_CONFIG_HOST" != "your-server.com" ]; then
    # Use SSH config host (simplifies connection)
    SSH_TARGET="${SSH_CONFIG_HOST}"
else
    # Use explicit connection
    SSH_TARGET="${REMOTE_USER}@${REMOTE_HOST}"
fi

# Git configuration
GIT_USER_NAME="${GIT_USER_NAME:-marvelousempire}"
GIT_USER_EMAIL="${GIT_USER_EMAIL:-40687021+marvelousempire@users.noreply.github.com}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔧 Setting up Git configuration on remote server..."
echo "📍 Host: ${REMOTE_HOST}"
echo "👤 User: ${REMOTE_USER}"
echo ""

# Test SSH connection
echo "1️⃣ Testing SSH connection..."
if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no "${SSH_TARGET}" "echo 'Connected'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ SSH connection successful${NC}"
else
    echo -e "${RED}❌ SSH connection failed${NC}"
    echo "💡 Check your SSH key, host, username, and port"
    exit 1
fi

# Check if Git is installed
echo ""
echo "2️⃣ Checking if Git is installed..."
if ssh "${SSH_TARGET}" "command -v git > /dev/null 2>&1" 2>/dev/null; then
    GIT_VERSION=$(ssh "${SSH_TARGET}" "git --version" 2>/dev/null)
    echo -e "${GREEN}✅ Git is installed: ${GIT_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠️  Git is not installed${NC}"
    echo "💡 Installing Git..."
    
    # Detect OS and install Git
    OS_TYPE=$(ssh "${SSH_TARGET}" "uname -s" 2>/dev/null)
    
    if [[ "$OS_TYPE" == "Linux" ]]; then
        # Try to detect Linux distribution
        if ssh "${SSH_TARGET}" "command -v apt-get > /dev/null 2>&1" 2>/dev/null; then
            # Debian/Ubuntu
            ssh "${SSH_TARGET}" "sudo apt-get update && sudo apt-get install -y git" 2>&1
        elif ssh "${SSH_TARGET}" "command -v yum > /dev/null 2>&1" 2>/dev/null; then
            # CentOS/RHEL
            ssh "${SSH_TARGET}" "sudo yum install -y git" 2>&1
        elif ssh "${SSH_TARGET}" "command -v pacman > /dev/null 2>&1" 2>/dev/null; then
            # Arch Linux
            ssh "${SSH_TARGET}" "sudo pacman -S --noconfirm git" 2>&1
        else
            echo -e "${RED}❌ Could not detect package manager. Please install Git manually.${NC}"
            exit 1
        fi
    elif [[ "$OS_TYPE" == "Darwin" ]]; then
        # macOS - Git usually comes pre-installed, but can install via Homebrew
        if ssh "${SSH_TARGET}" "command -v brew > /dev/null 2>&1" 2>/dev/null; then
            ssh "${SSH_TARGET}" "brew install git" 2>&1
        else
            echo -e "${YELLOW}⚠️  Homebrew not found. Git should be pre-installed on macOS.${NC}"
        fi
    else
        echo -e "${RED}❌ Unsupported OS: ${OS_TYPE}. Please install Git manually.${NC}"
        exit 1
    fi
    
    # Verify installation
    if ssh "${SSH_TARGET}" "command -v git > /dev/null 2>&1" 2>/dev/null; then
        GIT_VERSION=$(ssh "${SSH_TARGET}" "git --version" 2>/dev/null)
        echo -e "${GREEN}✅ Git installed successfully: ${GIT_VERSION}${NC}"
    else
        echo -e "${RED}❌ Git installation failed${NC}"
        exit 1
    fi
fi

# Configure Git user name
echo ""
echo "3️⃣ Configuring Git user name..."
CURRENT_NAME=$(ssh "${SSH_TARGET}" "git config --global user.name" 2>/dev/null || echo "")
if [ -n "$CURRENT_NAME" ]; then
    echo "   Current name: ${CURRENT_NAME}"
    read -p "   Overwrite with '${GIT_USER_NAME}'? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ssh "${SSH_TARGET}" "git config --global user.name '${GIT_USER_NAME}'" 2>&1
        echo -e "${GREEN}✅ Git user name set to: ${GIT_USER_NAME}${NC}"
    else
        echo -e "${YELLOW}⏭️  Keeping existing name: ${CURRENT_NAME}${NC}"
    fi
else
    ssh "${SSH_TARGET}" "git config --global user.name '${GIT_USER_NAME}'" 2>&1
    echo -e "${GREEN}✅ Git user name set to: ${GIT_USER_NAME}${NC}"
fi

# Configure Git user email
echo ""
echo "4️⃣ Configuring Git user email..."
CURRENT_EMAIL=$(ssh "${SSH_TARGET}" "git config --global user.email" 2>/dev/null || echo "")
if [ -n "$CURRENT_EMAIL" ]; then
    echo "   Current email: ${CURRENT_EMAIL}"
    read -p "   Overwrite with '${GIT_USER_EMAIL}'? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ssh "${SSH_TARGET}" "git config --global user.email '${GIT_USER_EMAIL}'" 2>&1
        echo -e "${GREEN}✅ Git user email set to: ${GIT_USER_EMAIL}${NC}"
    else
        echo -e "${YELLOW}⏭️  Keeping existing email: ${CURRENT_EMAIL}${NC}"
    fi
else
    ssh "${SSH_TARGET}" "git config --global user.email '${GIT_USER_EMAIL}'" 2>&1
    echo -e "${GREEN}✅ Git user email set to: ${GIT_USER_EMAIL}${NC}"
fi

# Configure other useful Git settings
echo ""
echo "5️⃣ Configuring additional Git settings..."

# Set default branch name to 'main'
ssh "${SSH_TARGET}" "git config --global init.defaultBranch main" 2>&1
echo "   ✅ Default branch set to 'main'"

# Set pull strategy
ssh "${SSH_TARGET}" "git config --global pull.rebase false" 2>&1
echo "   ✅ Pull strategy set to merge"

# Set editor (use nano as default, safer than vim)
ssh "${SSH_TARGET}" "git config --global core.editor nano" 2>&1
echo "   ✅ Default editor set to nano"

# Enable color output
ssh "${SSH_TARGET}" "git config --global color.ui auto" 2>&1
echo "   ✅ Color output enabled"

# Verify configuration
echo ""
echo "6️⃣ Verifying Git configuration..."
echo ""
echo "Git Configuration Summary:"
ssh "${SSH_TARGET}" "git config --global --list" 2>/dev/null | grep -E "(user\.|init\.|pull\.|core\.|color\.)" || echo "No configuration found"

echo ""
echo "✅ Git configuration complete!"
echo ""
echo "💡 To use Git on the remote server:"
echo "   ssh ${SSH_TARGET}"
echo "   cd /path/to/your/project"
echo "   git clone https://github.com/marvelousempire/quick-server.git"
echo "   # or"
echo "   git init"
echo "   git remote add origin https://github.com/marvelousempire/quick-server.git"

