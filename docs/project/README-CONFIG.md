# Configuration System — Master Config Guide

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Master configuration guide** — How to manage all site settings from a single file.

## Overview

All site settings are managed from a single master configuration file: **`config.js`**. This file is the single source of truth for all configurable values across all HTML pages.

## File Location

```
sites/default/
├── config.json  ← Master config data (JSON format - single source of truth)
└── config.js    ← Config loader (loads config.json, provides fallback)
```

**Why JSON?**
- ✅ **Validation** - Can be validated with JSON schema
- ✅ **Tooling** - Works with any language/tool
- ✅ **Editing** - Easy to edit (no syntax errors)
- ✅ **Standard** - Universal format
- ✅ **Comments** - Can use JSON5 or JSONC if needed

## Configuration Structure

The `config.js` file contains all settings organized into logical sections:

- **Site Identity** - Name, title, description, version
- **Navigation** - Logo, menu links
- **Theme & Styling** - Colors, spacing, layout
- **Content** - Services, features, sections, testimonials, stats, FAQ
- **Services** - Service categories with features, pricing, duration, tools
- **PWA Settings** - Manifest, service worker, caching
- **API Settings** - Endpoints, base URLs
- **Feature Flags** - Enable/disable features
- **Integrations** - TaskRabbit, Mailchimp, Stripe, reCAPTCHA

## How It Works

1. **Each HTML file** includes `config.js` at the top of the `<head>` section
2. **Config.js loads** `config.json` asynchronously (with inline fallback)
3. **Config is available immediately** via inline defaults in `config.js`
4. **JSON config updates** the config when loaded (takes precedence)
5. **Settings are applied** dynamically to the page (title, theme color, etc.)
6. **JavaScript code** can access `window.CONFIG` for any setting
7. **Config update event** fires when JSON loads: `window.addEventListener('configLoaded', ...)`

## Example Usage

### In HTML Files

```html
<!-- Config section at top of <head> -->
<script src="config.js"></script>
<script>
  // Apply config to page
  document.title = window.CONFIG?.site?.title || 'Default Title';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', window.CONFIG?.site?.themeColor || '#0b0c10');
</script>
```

### In JavaScript Files

```javascript
// Access config anywhere
const siteName = window.CONFIG?.site?.name;
const apiUrl = window.CONFIG?.api?.baseUrl;
const inventoryEndpoint = window.CONFIG?.api?.endpoints?.inventory;
```

## Updating Settings

**To change any setting:**

1. Open `sites/default/config.json` (JSON format - easier to edit)
2. Find the setting you want to change
3. Update the value (must be valid JSON)
4. Save the file
5. Refresh the page

**Example:** To change the site name:

```json
{
  "site": {
    "name": "My New Site Name",  ← Change this
    ...
  }
}
```

**Note:** `config.js` contains inline fallbacks, but `config.json` is the primary source. The JSON file takes precedence when loaded.

## Benefits

✅ **JSON format** - Standard, validatable, tool-friendly  
✅ **Single source of truth** - All settings in `config.json`  
✅ **Easy updates** - Change once, applies everywhere  
✅ **Immediate availability** - Inline fallback in `config.js`  
✅ **Async updates** - JSON loads and updates config dynamically  
✅ **Validation** - JSON can be validated with schema  
✅ **Tooling support** - Works with any language/tool  
✅ **Dynamic** - Settings applied at runtime  
✅ **Consistent** - Same config used across all pages  

## Current Settings

See `config.js` for the complete list of available settings. Key sections include:

- `CONFIG.site` - Site identity and metadata
- `CONFIG.navigation` - Menu links and logo
- `CONFIG.theme` - Colors and styling
- `CONFIG.layout` - Spacing and dimensions
- `CONFIG.content` - Content sections (hero, services, features, testimonials, etc.)
- `CONFIG.content.services` - Service categories with full details
- `CONFIG.pwa` - Progressive Web App settings
- `CONFIG.api` - API endpoints and URLs
- `CONFIG.features` - Feature flags
- `CONFIG.integrations` - Third-party integrations (TaskRabbit, etc.)

**Note:** Services are defined in `CONFIG.content.services.categories`. Each service has an `id` that corresponds to a service card page in `pages/service-cards/{id}.html`. See [Services Documentation](docs-services.html) for details.

## Notes

- Config is loaded **synchronously** at the top of each HTML file
- Settings are applied **immediately** when the page loads
- Config is available **globally** as `window.CONFIG`
- All HTML files should include the config section in their `<head>`

