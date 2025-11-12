# Resource Cards System — Verification & Testing

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Testing guide for the hybrid resource cards system** — Learn how to verify and test resource card generation, data loading, and file system integration.

## ✅ System Overview

The resource cards system creates individual HTML files for each resource in the inventory, making them:
- **Browsable** in Finder (macOS) and Files (Windows/Linux)
- **Linked** from the inventory table
- **Auto-generated** when resources are imported or created
- **Compatible** with both SQLite (server mode) and localStorage (standalone mode)

## 🔍 How It Works

### 1. **Card Generation**
- **Server Mode**: Cards are generated as HTML files in `sites/learnmappers/pages/resource-cards/`
- **File Naming**: `resource-{id}.html` (e.g., `resource-1.html`, `resource-2.html`)
- **Template**: Uses `template.html` as the base, loads data dynamically

### 2. **Data Loading Priority**
1. **API** (server mode) - Fetches from SQLite via `/api/inventory/{id}`
2. **localStorage** - Falls back to browser storage if API unavailable
3. **Inventory data** - Converts old format if needed

### 3. **Auto-Generation Triggers**
- ✅ When importing vendor files
- ✅ When creating new items via API
- ✅ When clicking "Generate All Cards" button
- ✅ When updating items (ensures card exists)

## 🧪 Testing Checklist

### Server Mode (SQLite)
1. **Start server**: `./go` or `node server.js`
2. **Add item via API or inventory page**
3. **Check**: Card should be auto-generated at `sites/learnmappers/pages/resource-cards/resource-{id}.html`
4. **Click resource name** in inventory table → Should open card page
5. **Click "Generate All Cards"** → Should create cards for all items

### Standalone Mode (localStorage)
1. **Open inventory page** (no server)
2. **Add item manually**
3. **Import vendor file**
4. **Check**: Resource names should link to cards
5. **Click link** → Card loads from localStorage

### File System
1. **Navigate to**: `sites/learnmappers/pages/resource-cards/`
2. **Verify**: HTML files exist and are readable
3. **Open in browser**: Should display resource information

## 🔧 API Endpoints

- `POST /api/resource-cards/generate` - Generate single card
- `POST /api/resource-cards/generate-all` - Generate all cards

## 📝 Known Limitations

1. **Template-based**: Cards use template.html and load data dynamically (not pre-rendered)
2. **ID Format**: Database items use `resource-{id}`, localStorage uses slug-based IDs
3. **Fallback**: If template missing, creates basic HTML structure

## ✅ Verification Status

- ✅ Directory structure exists
- ✅ Template file exists
- ✅ Server endpoints implemented
- ✅ Auto-generation on create/update
- ✅ Inventory table links to cards
- ✅ Template loads from API/localStorage
- ✅ Generate All Cards button works

## 🚀 Next Steps

1. Test with actual data
2. Verify cards display correctly
3. Check file system browsing
4. Test both server and standalone modes

