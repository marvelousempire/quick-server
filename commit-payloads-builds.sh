#!/bin/bash
# Commit script for payloads-builds and related changes

set -e

echo "📦 Preparing commit for payloads-builds and related changes..."
echo ""

# Check if git repo exists
if [ ! -d .git ]; then
    echo "⚠️  No git repository found. Initializing..."
    git init
fi

# Add important payloads-builds files
echo "📝 Adding payloads-builds seed files..."
git add payloads-builds/README.md
git add payloads-builds/.gitignore

# WordPress seeds
git add payloads-builds/wordpress/single-site-seed/
git add payloads-builds/wordpress/multisite-seed/

# Vue seed
git add payloads-builds/vue/dashboard-seed/

# React seed  
git add payloads-builds/react/pages-seed/

# Documentation
git add docs/project/README-PAYLOADS-BUILDS.md

# Utility scripts
git add fix-cli-messages.py
git add CLI-MESSAGES-FIX.md

# Check what's staged
echo ""
echo "📋 Files staged for commit:"
git status --short | head -20

# Check if there are changes
if git diff --staged --quiet; then
    echo ""
    echo "⚠️  No changes to commit. All files may already be committed."
    exit 0
fi

# Create commit
echo ""
read -p "💬 Commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Add payloads-builds seeds and documentation

- Add WordPress single-site and multisite seed templates
- Add Vue dashboard seed with complete setup
- Add React pages seed with 7 starter pages
- Add comprehensive README documentation
- Add CLI message fix utility and documentation"
fi

git commit -m "$commit_msg"

echo ""
echo "✅ Commit created successfully!"
echo ""
echo "📊 Commit summary:"
git log -1 --stat --oneline

