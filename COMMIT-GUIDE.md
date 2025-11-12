# Git Commit Guide

## Current Situation

The repository has many new files that need to be committed:
- **payloads-builds/** - Complete seed templates for WordPress, Vue, and React
- **Documentation** - New README files
- **Utility scripts** - CLI message fix tools

## Quick Commit

Use the automated commit script:

```bash
./commit-payloads-builds.sh
```

This will:
1. Add all important payloads-builds seed files
2. Add documentation
3. Add utility scripts
4. Create a commit with a descriptive message

## Manual Commit

If you prefer to commit manually:

```bash
# Add payloads-builds seeds (excluding large WordPress core files)
git add payloads-builds/README.md
git add payloads-builds/.gitignore
git add payloads-builds/wordpress/single-site-seed/
git add payloads-builds/wordpress/multisite-seed/
git add payloads-builds/vue/dashboard-seed/
git add payloads-builds/react/pages-seed/

# Add documentation
git add docs/project/README-PAYLOADS-BUILDS.md

# Add utility scripts
git add fix-cli-messages.py
git add CLI-MESSAGES-FIX.md

# Commit
git commit -m "Add payloads-builds seeds and documentation

- Add WordPress single-site and multisite seed templates
- Add Vue dashboard seed with complete setup
- Add React pages seed with 7 starter pages
- Add comprehensive README documentation
- Add CLI message fix utility and documentation"
```

## What's Excluded

The `.gitignore` in `payloads-builds/` excludes:
- WordPress core files (too large, ~3000+ files)
- WordPress zip archives
- WordPress themes (can be added separately if needed)
- Node modules and build artifacts
- IDE and OS files

## If Git Has Issues

If you're experiencing git timeout issues (like `Operation timed out`), try:

1. **Check large files:**
   ```bash
   find . -type f -size +10M | head -10
   ```

2. **Use git add with specific files:**
   ```bash
   git add -f payloads-builds/README.md
   git add -f payloads-builds/.gitignore
   ```

3. **Commit in smaller batches:**
   ```bash
   git add payloads-builds/wordpress/single-site-seed/
   git commit -m "Add WordPress single-site seed"
   
   git add payloads-builds/wordpress/multisite-seed/
   git commit -m "Add WordPress multisite seed"
   ```

4. **Check git config:**
   ```bash
   git config core.preloadindex true
   git config core.fscache true
   ```

## Regular Commits

To keep up with commits going forward:

1. **Commit after major changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. **Use meaningful commit messages:**
   - Start with a short summary (50 chars)
   - Add detailed description if needed
   - Reference issues/tickets if applicable

3. **Commit frequently:**
   - Don't let changes accumulate
   - Commit logical groups of changes together
   - Push regularly to remote

## Next Steps

1. Run `./commit-payloads-builds.sh` to commit current changes
2. Push to remote: `git push origin main` (or your branch)
3. Set up regular commit habits
4. Consider using `.gitignore` to exclude large/unnecessary files

