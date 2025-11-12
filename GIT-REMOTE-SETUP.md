# Git Remote Setup Guide

## Quick Setup Commands

### For Server App (Root Repository)

```bash
cd /Users/nivram/Desktop/learnmappers-v7_3-pwa

# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/learnmappers-server.git

# Or for SSH:
# git remote add origin git@github.com:YOUR_USERNAME/learnmappers-server.git

# Push to remote
git branch -M main
git push -u origin main
```

### For LearnMappers Site

```bash
cd /Users/nivram/Desktop/learnmappers-v7_3-pwa/sites/learnmappers

# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/learnmappers-site.git

# Or for SSH:
# git remote add origin git@github.com:YOUR_USERNAME/learnmappers-site.git

# Push to remote
git branch -M main
git push -u origin main
```

## Repository URLs

Replace `YOUR_USERNAME` with your GitHub/GitLab username and update the repository names as needed.

### Example URLs:
- **GitHub HTTPS**: `https://github.com/marvelousempire/learnmappers-server.git`
- **GitHub SSH**: `git@github.com:marvelousempire/learnmappers-server.git`
- **GitLab HTTPS**: `https://gitlab.com/marvelousempire/learnmappers-server.git`
- **GitLab SSH**: `git@gitlab.com:marvelousempire/learnmappers-server.git`

## Verify Setup

After adding remotes, verify with:
```bash
git remote -v
```

This should show your remote URLs.

## Next Steps

1. Create repositories on GitHub/GitLab (if not already created)
2. Copy the repository URLs
3. Run the commands above with your actual URLs
4. Push your code

