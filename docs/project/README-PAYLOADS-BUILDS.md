# Payloads Builds Documentation

This document provides information about the payloads-builds system for quick cloning and deployment.

## Overview

The `payloads-builds/` directory contains ready-to-clone seed templates for various deployment payloads. Each payload is a complete, working setup that can be quickly cloned and customized for new projects.

## Quick Reference

For detailed information about each payload type, see the main README:

📖 **[Main Payloads README](../../payloads-builds/README.md)**

## Available Payloads

### WordPress
- **Single Site Seed**: `payloads-builds/wordpress/single-site-seed/`
- **Multisite Seed**: `payloads-builds/wordpress/multisite-seed/`

### Vue
- **Dashboard Seed**: `payloads-builds/vue/dashboard-seed/`

### React
- **Pages Seed**: `payloads-builds/react/pages-seed/` (7 starter pages)

## Quick Clone Examples

### WordPress Single Site
```bash
cp -r payloads-builds/wordpress/single-site-seed /path/to/your/project/wordpress-single
```

### WordPress Multisite
```bash
cp -r payloads-builds/wordpress/multisite-seed /path/to/your/project/wordpress-multisite
```

### Vue Dashboard
```bash
cp -r payloads-builds/vue/dashboard-seed /path/to/your/project/vue-dashboard
cd /path/to/your/project/vue-dashboard
npm install && npm run dev
```

### React Pages
```bash
cp -r payloads-builds/react/pages-seed /path/to/your/project/react-app
cd /path/to/your/project/react-app
npm install && npm run dev
```

## Integration with Sites Directory

Payloads can be integrated with the `sites/` directory:

```bash
# Clone WordPress to sites directory
cp -r payloads-builds/wordpress/single-site-seed sites/my-wordpress-site

# Clone Vue to sites directory
cp -r payloads-builds/vue/dashboard-seed sites/my-vue-site

# Clone React to sites directory
cp -r payloads-builds/react/pages-seed sites/my-react-site
```

## Related Documentation

- [Deployment Options](./README-DEPLOYMENT-OPTIONS.md)
- [Docker Setup](./README-DOCKER.md)
- [Sites Directory](../server/README-SITES-DIRECTORY.md)

