# Example Site — Dynamic JSON-Controlled Template

**Created:** 2025-11-08  
**Last Updated:** 2025-11-08

> **Dynamic template site** — All content, colors, navigation, and layout are controlled by `config.json`. No code changes needed!

## Overview

This is a fully dynamic example site that demonstrates how to create a JSON-controlled site template. Everything is customizable through the `config.json` file:

- ✅ **Site Information** - Name, title, description, version
- ✅ **Navigation** - Logo, menu links
- ✅ **Theme** - Colors, spacing, layout
- ✅ **Content** - Hero section, features, sections, footer
- ✅ **Settings Page** - Visual editor for all config variables (`/settings.html`)
- ✅ **PWA Settings** - Manifest, service worker
- ✅ **API Configuration** - Endpoints, base URL
- ✅ **Type-Based Templates** - Resources automatically use type-specific mockups and layouts
- ✅ **Photorealistic Mockups** - Professional product mockups (toolbox, device, idcard, etc.)
- ✅ **3D Image Support** - Envato 3D images with 360-degree interactive views
- ✅ **ID Card Mockups** - For persons/contacts (idcard, license, passport styles)
- ✅ **Business Card Mockups** - For companies
- ✅ **Complete Data Population** - All schema fields displayed dynamically

## Quick Start

1. **Copy this example site:**
   ```bash
   cp -r sites/dynamic-site sites/my-site
   ```

2. **Edit `config.json`:**
   ```json
   {
     "site": {
       "name": "My Site",
       "title": "My Site — Welcome",
       "description": "My custom site description"
     },
     "theme": {
       "colors": {
         "brand": "#your-color"
       }
     }
   }
   ```

3. **Restart server:**
   ```bash
   ./go
   ```

4. **Access your site:**
   - If only one site: Auto-launches
   - If multiple sites: Select from site selector

## Configuration Structure

### Site Information
```json
{
  "site": {
    "name": "Your Site Name",
    "title": "Your Site Title",
    "description": "Site description",
    "version": "1.0.0",
    "author": "Your Name",
    "themeColor": "#6366f1"
  }
}
```

### Navigation
```json
{
  "navigation": {
    "logo": {
      "text": "Your Logo",
      "showDot": true
    },
    "links": [
      { "label": "Home", "href": "/", "page": "index" },
      { "label": "About", "href": "/about.html", "page": "about" }
    ]
  }
}
```

### Theme
```json
{
  "theme": {
    "colors": {
      "bg": "#0f172a",
      "card": "#1e293b",
      "ink": "#f1f5f9",
      "muted": "#94a3b8",
      "brand": "#6366f1",
      "brand2": "#8b5cf6"
    },
    "spacing": {
      "radius": "12px",
      "gap": "20px"
    }
  }
}
```

### Content
```json
{
  "content": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Subtitle text",
      "description": "Description text",
      "cta": {
        "text": "Get Started",
        "href": "/about.html"
      }
    },
    "features": [
      {
        "title": "Feature Title",
        "description": "Feature description",
        "icon": "✨"
      }
    ],
    "sections": [
      {
        "id": "section-id",
        "title": "Section Title",
        "content": "Section content"
      }
    ]
  }
}
```

## How It Works

1. **`config.js`** - Loads `config.json` and makes it available as `window.CONFIG`
2. **`pages/index.html`** - Reads from `window.CONFIG` and populates all content dynamically
3. **Theme Application** - CSS variables are set from config colors
4. **Dynamic Rendering** - All text, links, and content are rendered from JSON

## Customization Tips

- **Change Colors**: Edit `theme.colors` in `config.json`
- **Update Content**: Modify `content` section in `config.json`
- **Add Pages**: Create new HTML files in `pages/` directory
- **Modify Layout**: Edit CSS in `pages/index.html` (or create separate CSS file)

## Files

- `config.json` - Main configuration file (edit this!)
- `config.js` - Configuration loader
- `content/pages/index.html` - Main page template
- `content/pages/settings.html` - Visual settings editor (edit config via UI)
- `README.md` - This file

## Settings Page

Access the visual settings editor at `/settings.html` to:
- Edit all config variables through a user-friendly interface
- Save changes directly to `config.json`
- Export/Import configuration
- View raw JSON
- Reset to defaults

No need to manually edit JSON files - use the settings page!

## Resource Type System

Resources are categorized by `type` field, which determines:
- **Mockup Style** - Photorealistic mockup (toolbox, device, idcard, etc.)
- **Layout** - Display layout (product, detailed, id-card, etc.)
- **Sections** - Which sections to show
- **Priority Fields** - Which fields to highlight

### Supported Types

- `tool` → Toolbox mockup, product layout
- `equipment` → Device mockup, detailed layout
- `person/contact` → ID card mockup, id-card layout
- `material` → Shelf mockup, product layout
- `appliance` → Device mockup, detailed layout
- `software` → Float mockup, product layout
- `company` → Business card mockup, business-card layout
- `documentation` → Float mockup, detailed layout
- `other` → Box mockup, product layout

### 3D Images & 360 Views

- Add `"is3D": true` to enable 3D effects
- Add `view360.images[]` array for spinning views
- See `docs/schemas/README-ENVATO-3D.md` for full guide

## Next Steps

1. **Customize your site**: Use `/settings.html` or edit `config.json` directly
2. **Add Resources** - Use `type` field for automatic template selection
3. **Add 3D Images** - Use Envato 3D images for professional look
4. Add more pages in `content/pages/` directory
5. Create custom CSS if needed
6. Add PWA manifest if you want installable app
7. Enable API features if using server backend

That's it! Your site is fully dynamic and controlled by JSON configuration.

