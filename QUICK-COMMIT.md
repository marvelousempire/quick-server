# Quick Commit Instructions

## Files Ready to Commit

These are the new files we created that should be committed:

### Documentation
- `payloads-builds/README.md` - Main payloads-builds documentation
- `docs/project/README-PAYLOADS-BUILDS.md` - Documentation reference
- `COMMIT-GUIDE.md` - This guide
- `CLI-MESSAGES-FIX.md` - CLI fix documentation

### Seed Templates
- `payloads-builds/wordpress/single-site-seed/` - WordPress single site seed
- `payloads-builds/wordpress/multisite-seed/` - WordPress multisite seed  
- `payloads-builds/vue/dashboard-seed/` - Vue dashboard seed
- `payloads-builds/react/pages-seed/` - React pages seed

### Configuration
- `payloads-builds/.gitignore` - Excludes large WordPress files

### Utilities
- `fix-cli-messages.py` - CLI message fix script
- `commit-payloads-builds.sh` - Automated commit script

## If Git Has Timeout Issues

If git commands are timing out, try these workarounds:

### Option 1: Add Files One at a Time
```bash
git add payloads-builds/README.md
git add payloads-builds/.gitignore
git add docs/project/README-PAYLOADS-BUILDS.md
git commit -m "Add payloads-builds documentation"
```

### Option 2: Use Git Add with Force
```bash
git add -f payloads-builds/wordpress/single-site-seed/
git add -f payloads-builds/wordpress/multisite-seed/
git commit -m "Add WordPress seed templates"
```

### Option 3: Commit Seeds Separately
```bash
# WordPress seeds
git add payloads-builds/wordpress/*-seed/
git commit -m "Add WordPress single-site and multisite seeds"

# Vue seed
git add payloads-builds/vue/dashboard-seed/
git commit -m "Add Vue dashboard seed"

# React seed
git add payloads-builds/react/pages-seed/
git commit -m "Add React pages seed with 7 starter pages"
```

## Recommended Commit Message

```
Add payloads-builds seeds and documentation

- Add WordPress single-site and multisite seed templates
- Add Vue dashboard seed with complete setup
- Add React pages seed with 7 starter pages  
- Add comprehensive README documentation
- Add CLI message fix utility and documentation
- Add .gitignore to exclude large WordPress core files
```

## After Committing

1. **Push to remote:**
   ```bash
   git push origin main
   # or
   git push origin master
   ```

2. **Verify:**
   ```bash
   git log --oneline -5
   git status
   ```

## Note About Large Files

The `.gitignore` excludes WordPress core files (~3000+ files) which are too large for git. These should be downloaded separately when needed. Only the seed templates (small config files) are committed.

