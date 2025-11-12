# Sites Directory — Guide

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Sites directory guide** — How to organize and serve multiple sites in this project.

This directory contains all sites for the project. Each subdirectory is a separate site.

## Structure

```
sites/
├── default/        # Default/main site (served by default)
│   ├── index.html
│   ├── docs.html
│   ├── inventory.html
│   ├── service-menu.html
│   └── ...
├── site1/          # Additional site
│   ├── index.html
│   └── ...
├── site2/          # Another site
│   ├── index.html
│   └── ...
└── ...
```

## Usage

**Serve default site:**
```bash
./go.sh              # Serves sites/default automatically
pnpm start           # Serves sites/default automatically
```

**Serve a specific site:**
```bash
# Via environment variable
SITE_DIR=sites/site1 pnpm start

# Via command line argument
node server.js sites/site1

# Via go script
SITE_DIR=sites/site1 ./go.sh
```

## Example

```bash
# Serve default site (sites/default/)
pnpm start
./go.sh

# Serve site1
SITE_DIR=sites/site1 pnpm start

# Serve site2
node server.js sites/site2
```

Each site directory should contain:
- `index.html` (required - entry point)
- Other HTML, CSS, JS files as needed
- `manifest.webmanifest` (optional - for PWA)
- `service-worker.js` (optional - for offline support)

